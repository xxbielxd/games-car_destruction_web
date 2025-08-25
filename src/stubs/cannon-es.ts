export class Vec3 {
  x: number; y: number; z: number;
  constructor(x=0,y=0,z=0){this.x=x;this.y=y;this.z=z;}
  vsub(v: Vec3, target: Vec3 = new Vec3()): Vec3 { target.x=this.x - v.x; target.y=this.y - v.y; target.z=this.z - v.z; return target; }
  dot(v: Vec3): number { return this.x*v.x + this.y*v.y + this.z*v.z; }
  length(): number { return Math.hypot(this.x,this.y,this.z); }
  lengthSquared(): number { return this.x*this.x + this.y*this.y + this.z*this.z; }
  normalize(): Vec3 { const len=this.length(); if(len>0){this.x/=len; this.y/=len; this.z/=len;} return this; }
  scale(s: number, target: Vec3 = this): Vec3 { target.x = this.x*s; target.y = this.y*s; target.z = this.z*s; return target; }
  clone(): Vec3 { return new Vec3(this.x,this.y,this.z); }
  cross(v: Vec3, target: Vec3 = new Vec3()): Vec3 { target.x = this.y*v.z - this.z*v.y; target.y = this.z*v.x - this.x*v.z; target.z = this.x*v.y - this.y*v.x; return target; }
  vadd(v: Vec3, target: Vec3 = new Vec3()): Vec3 { target.x = this.x + v.x; target.y = this.y + v.y; target.z = this.z + v.z; return target; }
  set(x: number, y: number, z: number): Vec3 { this.x = x; this.y = y; this.z = z; return this; }
  copy(v: Vec3): Vec3 { this.x = v.x; this.y = v.y; this.z = v.z; return this; }
}

class Quaternion {
  x = 0;
  y = 0;
  z = 0;
  w = 1;
  _euler = { x: 0, y: 0, z: 0 };
  vmult(v: Vec3, target: Vec3): Vec3 {
    target.x = v.x;
    target.y = v.y;
    target.z = v.z;
    return target;
  }
  toEuler(v: Vec3): void {
    v.x = this._euler.x;
    v.y = this._euler.y;
    v.z = this._euler.z;
  }
  setFromEuler(x: number, y: number, z: number): void {
    this._euler.x = x;
    this._euler.y = y;
    this._euler.z = z;
  }
  set(x: number, y: number, z: number, w: number): void {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
  copy(q: Quaternion): void {
    this.x = q.x;
    this.y = q.y;
    this.z = q.z;
    this.w = q.w;
  }
}

export class Body {
  position: Vec3 = new Vec3();
  velocity: Vec3 = new Vec3();
  angularVelocity: Vec3 = new Vec3();
  quaternion: Quaternion = new Quaternion();
  torque: Vec3 = new Vec3();
  mass: number;
  angularFactor: Vec3 = new Vec3(1,1,1);
  linearDamping = 0;
  angularDamping = 0;
  constructor(opts:any={}){ this.mass = opts.mass ?? 1; if(opts.position) this.position = opts.position; }
  applyForce(_force: Vec3, _pos?: Vec3){}
  wakeUp(){}
  addShape(_shape: any){}
  addEventListener(_e: string, _cb: any){}
}

export class Box {
  constructor(_halfExtents: Vec3){}
}

export class Plane {}

export class World {
  gravity: Vec3;
  defaultContactMaterial: any = {};
  solver: any = { iterations: 0, tolerance: 0 };
  allowSleep = false;
  bodies: Body[] = [];
  constructor(opts:any={}){ this.gravity = opts.gravity || new Vec3(); }
  addBody(body: Body){ this.bodies.push(body); }
  removeBody(body: Body){ this.bodies = this.bodies.filter(b=>b!==body); }
  step(_dt: number, _dt2?: number, _dt3?: number){}
}

export default { Vec3, Body, Box, World };
