# Car Destruction Arena

Protótipo de jogo web onde carros batalham em uma arena 3D até que reste apenas um. O projeto usa **Three.js** com **TypeScript** e prepara a base para futuro modo online.

## Como rodar localmente
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Abra `http://localhost:5173` no navegador.

## Tecnologias
- [Three.js](https://threejs.org/) para renderização 3D
- [Cannon-es](https://github.com/pmndrs/cannon-es) para física
- [Vite](https://vitejs.dev/) para bundling
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/) para testes unitários
- ESLint + Prettier para padronização de código

## Roadmap
- [x] Protótipo single-player com dois carros e barras de vida
- [ ] Sistema de upgrades/modificações
- [ ] Suporte a multiplayer com Socket.IO
- [ ] Persistência de dados em banco
- [ ] Containerização com Docker

## Estrutura de Pastas
```
/ (raiz)
├─ src/            # código TypeScript
├─ public/assets/  # recursos estáticos
├─ docs/           # documentação adicional
└─ tests/          # testes unitários
```
