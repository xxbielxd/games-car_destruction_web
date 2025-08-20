# Car Destruction Arena

Prototype of a destruction derby style web game built with Three.js and TypeScript. The goal is to crash into other cars until only one survives.

## Features
- Basic 3D arena with ground and simple boundaries.
- Controllable cars with health bars.
- Simple physics using cannon-es (integration prepared).
- Cars explode (removed) when health reaches zero.
- Code organized in modular TypeScript classes.
- Unit test for core car logic using Node's test runner.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run in development mode:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Run tests:
   ```bash
   npm test
   ```

## Technologies
- [Three.js](https://threejs.org/)
- [cannon-es](https://github.com/pmndrs/cannon-es) (physics)
- TypeScript
- Vite
- ESLint + Prettier

## Roadmap
- Multiplayer support via Node.js and Socket.IO backend.
- Upgrade system for cars (armor, speed, impact force).
- Persistent player data in database.
- Docker configuration for deployment.

## Structure
```
./
├── src          # TypeScript source files
├── public/assets# Static assets
├── docs         # Additional documentation
└── test         # Unit tests
```

## Notes
Backend and advanced features are placeholders for future development.
