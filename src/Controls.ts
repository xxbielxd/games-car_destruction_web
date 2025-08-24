// src/Controls.ts
import * as CANNON from 'cannon-es';

/**
 * Controles estáveis para carro arcade (CANNON):
 * - PD de yaw com torque limitado (sem 360)
 * - Slip estável via |lateral| vs |longitudinal|
 * - "Modo reto": se W e sem steer, não aplica torque de curva
 * - Estabilizador só quando realmente escorregando
 * - Ré com ganho reduzido e direção invertida
 * - Damping lateral dinâmico
 */
export function applyCarControls(
  body: any,
  keys: Record<string, boolean>,
  dt: number = 1 / 60,
): void {
  if (!body || !body.quaternion || !body.velocity) return;

  const Vec3 = CANNON.Vec3;

  // ====== Constantes gerais ======
  const MAX_FWD = 36;             // m/s
  const MAX_REV = 10;             // m/s
  const ACCEL   = 30000;          // ajuste conforme a massa

  const BASE_LATERAL_DAMP = 0.10;
  const HIGH_LATERAL_DAMP = 0.22;

  // Direção / yaw
  const YAW_RATE_LOW  = 1.9;      // rad/s parado
  const YAW_RATE_HIGH = 0.55;     // rad/s em alta
  const YAW_KP_BASE   = 90;       // P menor para não "puxar"
  const YAW_KD        = 80;       // D maior para amortecer
  const YAW_TORQUE_MAX_PER_MASS = 1600;
  const YAW_SOFT_CLAMP = 2.2;

  // Slew de entrada
  const STEER_SLEW     = 3.8;
  const THROTTLE_SLEW  = 3.0;

  // Zonas mortas
  const STEER_DEADZONE  = 0.08;
  const ALIGN_DEADZONE  = 0.12;   // ~6.9°
  const MIN_ALIGN_SPEED = 1.8;    // m/s

  // Polaridade do seu mundo (troque para +1 se D estiver invertido)
  const STEER_DIR = -1;

  // ====== Estado interno ======
  const anyBody = body as any;
  if (!anyBody._ctrl) anyBody._ctrl = { throttle: 0, steer: 0 };
  const ctrl = anyBody._ctrl as { throttle: number; steer: number };

  // ====== Inputs ======
  const forwardPressed = !!(keys['w'] || keys['arrowup']);
  const backPressed    = !!(keys['s'] || keys['arrowdown']);
  const leftPressed    = !!(keys['a'] || keys['arrowleft']);
  const rightPressed   = !!(keys['d'] || keys['arrowright']);
  const brakePressed   = !!keys[' '];

  const rawThrottle = (forwardPressed ? 1 : 0) + (backPressed ? -1 : 0);
  const rawSteer    = (rightPressed ? 1 : 0) - (leftPressed ? 1 : 0); // D=+1, A=-1

  // Slew (moveToward)
  const moveToward = (a: number, b: number, maxDelta: number) =>
    (Math.abs(b - a) <= maxDelta) ? b : (a + Math.sign(b - a) * maxDelta);

  ctrl.throttle = moveToward(ctrl.throttle, rawThrottle, THROTTLE_SLEW * dt);
  ctrl.steer    = moveToward(ctrl.steer,    rawSteer,    STEER_SLEW     * dt);

  if (Math.abs(ctrl.steer) < STEER_DEADZONE) ctrl.steer = 0;

  // ====== Direções/velocidades ======
  const forwardLocal = new Vec3(0, 0, -1);
  const forwardWorld = new Vec3();
  body.quaternion.vmult(forwardLocal, forwardWorld);

  const v = body.velocity as any;
  const speed = v.length();

  // Decompõe velocidade em longitudinal vs lateral
  const speedForward = v.dot(forwardWorld);               // componente longitudinal
  const fwdVel = new Vec3();
  forwardWorld.scale(speedForward, fwdVel);

  const lateralVel = new Vec3();
  v.vsub(fwdVel, lateralVel);                             // componente lateral
  const lateralLen = Math.hypot(lateralVel.x, lateralVel.z);

  // Calcula sinal lateral com "vetor esquerda" (up x forward)
  const up = new Vec3(0, 1, 0);
  const leftWorld = new Vec3();
  up.cross(forwardWorld, leftWorld);                      // left = up × forward
  leftWorld.y = 0;
  const vel2d = new Vec3(v.x, 0, v.z);
  const lateralSign = (leftWorld.dot(vel2d) >= 0) ? 1 : -1;

  // Ângulo de slip estável: atan2(lateral, |long|)
  const slipAngle = Math.atan2(lateralLen, Math.abs(speedForward) + 1e-6);

  const drifting = slipAngle > 0.35; // ~20°
  anyBody._drifting = drifting;

  // ====== Damping lateral dinâmico ======
  {
    const reversing = speedForward < -0.5;
    const damp = (drifting || reversing) ? HIGH_LATERAL_DAMP : BASE_LATERAL_DAMP;

    const reduce = new Vec3();
    lateralVel.scale(damp, reduce);
    v.vsub(reduce, v);
  }

  // ====== Modo RETO: quando for "W reto", desliga torques de curva ======
  const steerAbs = Math.abs(ctrl.steer);
  const throttleAbs = Math.abs(ctrl.throttle);
  const goingForward = speedForward > 0.5;
  const straightMode =
    forwardPressed && !backPressed &&
    steerAbs < 0.02 &&
    slipAngle < 0.10 &&
    goingForward;

  if (straightMode) {
    // Mate a ressonância de yaw e limpe lateral mais forte
    body.angularVelocity.y *= 0.90;

    const extra = new Vec3();
    lateralVel.scale(0.30, extra); // reforça a correção lateral só nesse modo
    v.vsub(extra, v);
  }

  // ====== Direção PD (yaw) ======
  const speedRatio = Math.min(1, Math.abs(speed) / MAX_FWD);
  const yawRateTarget = (1 - speedRatio) * YAW_RATE_LOW + speedRatio * YAW_RATE_HIGH;

  const reversing = speedForward < -0.5;
  const steerSign = reversing ? -1 : 1;          // inverter na ré
  const steerGain = reversing ? 0.55 : 1.0;      // ré mais dócil

  // Se estamos no modo reto, não pedimos yaw (deixa só amortecer o que sobrou)
  const desiredYawVel = straightMode
    ? 0
    : ctrl.steer * STEER_DIR * steerSign * yawRateTarget * steerGain;

  // PD
  const yawErr = desiredYawVel - body.angularVelocity.y;
  const kp = YAW_KP_BASE * (0.7 + 0.3 * (1 - speedRatio));
  const kd = YAW_KD;

  let torqueYaw = (kp * yawErr + kd * (-body.angularVelocity.y)) * body.mass;

  // Limite de torque
  const TORQUE_MAX = YAW_TORQUE_MAX_PER_MASS * body.mass;
  torqueYaw = Math.max(-TORQUE_MAX, Math.min(TORQUE_MAX, torqueYaw));
  body.torque.y += torqueYaw;

  // ====== Estabilizador: só quando realmente escorregando e sem steer forte ======
  if (!straightMode && slipAngle > ALIGN_DEADZONE && Math.abs(speedForward) > MIN_ALIGN_SPEED && steerAbs < 0.25 && throttleAbs < 0.6) {
    const scale = (slipAngle - ALIGN_DEADZONE);
    const STAB_BASE = reversing ? 300 : 180;  // ainda mais suave
    const STAB = STAB_BASE * (0.7 + 0.3 * (1 - speedRatio));
    let t = (-lateralSign) * scale * STAB * body.mass;

    const STAB_MAX = 0.4 * TORQUE_MAX;
    t = Math.max(-STAB_MAX, Math.min(STAB_MAX, t));
    body.torque.y += t;
  }

  // Limites de yaw / anti-ressonância
  if (Math.abs(body.angularVelocity.y) > YAW_SOFT_CLAMP) {
    body.angularVelocity.y *= 0.95;
  }
  if (steerAbs < 0.01 && slipAngle < 0.03 && Math.abs(body.angularVelocity.y) < 0.8) {
    body.angularVelocity.y *= 0.96;
  }

  // ====== Aceleração / Ré com reversão suave ======
  const wantForward = ctrl.throttle > 0.15;
  const wantReverse = ctrl.throttle < -0.15;
  const reversingAgainstMotion =
    (wantForward && speedForward < -1.0) || (wantReverse && speedForward > 1.0);

  if (brakePressed || reversingAgainstMotion) {
    const tmp = new Vec3();
    forwardWorld.scale(speedForward * (brakePressed ? 0.20 : 0.14), tmp);
    v.vsub(tmp, v);
  } else {
    if (wantForward && speedForward < MAX_FWD) {
      const f = new Vec3();
      forwardWorld.scale(ACCEL * Math.max(0, ctrl.throttle), f);
      body.applyForce(f, body.position);
    } else if (wantReverse && -speedForward < MAX_REV) {
      const f = new Vec3();
      forwardWorld.scale(ACCEL * Math.min(0, ctrl.throttle) * 0.55, f);
      body.applyForce(f, body.position);
    }
  }

  // ====== Downforce dinâmica ======
  const downforceN = body.mass * (7 + speed * 0.9);
  body.applyForce(new Vec3(0, -downforceN, 0), body.position);
}
