# Car Destruction Arena

Protótipo de jogo web em **Three.js** com **TypeScript** onde o objetivo é destruir outros carros e ser o último sobrevivente.

## Visão Geral
- Arena simples com carros que colidem e perdem vida.
- Estrutura preparada para expansão com upgrades, física avançada e multiplayer.

## Como Rodar Localmente
1. Instale as dependências: `npm install` *(necessário acesso ao npm)*.
2. Execute o modo desenvolvimento: `npm run dev`.
3. Para rodar os testes: `npm test`.

> **Nota:** O protótipo atual funciona sem backend. O arquivo `server/index.ts` é apenas um placeholder para futura integração com Socket.IO.

## Tecnologias Usadas
- TypeScript
- Three.js
- (Planejado) Cannon.js para física
- Vite para build
- ESLint + Prettier

## Roadmap de Features
- [ ] Implementar física real com Cannon.js ou Ammo.js.
- [ ] Adicionar sistema de upgrades e power-ups.
- [ ] Suporte a multiplayer online via Socket.IO.
- [ ] Persistência de dados com banco de dados.
- [ ] Deploy containerizado com Docker.

## Estrutura de Pastas
```
/src        Código fonte TypeScript
/server     Placeholder para backend Node.js
/public     Assets estáticos
/docs       Documentação adicional
/tests      Testes unitários
```
