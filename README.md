# Car Destruction Arena

Protótipo de jogo web em Three.js onde o objetivo é destruir os outros carros e ser o último sobrevivente. Este projeto está estruturado em TypeScript e preparado para evoluir para multiplayer online com Socket.IO.

## Visão Geral
- Arena 3D simples com Two carros: jogador e bot.
- Física de colisão utilizando Cannon-es.
- Barra de vida acima de cada carro.
- Quando a vida chega a zero o carro é removido da arena.
- Estrutura modular para futura expansão e suporte a multiplayer.

## Tecnologias
- [Three.js](https://threejs.org/)
- [Cannon-es](https://github.com/pmndrs/cannon-es)
- TypeScript
- Node.js
- Vite

## Como rodar localmente
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Rodar testes:
   ```bash
   npm test
   ```

## Rodar com Docker
1. Construir a imagem:
   ```bash
   docker build -t car-destruction .
   ```
2. Executar o container:
   ```bash
   docker run -p 4173:4173 car-destruction
   ```

## Estrutura de Pastas
```
├─ src/          # código fonte
├─ public/       # assets estáticos
├─ tests/        # testes unitários
├─ docs/         # documentação complementar
```

## Roadmap
- [x] Sistema de upgrades/modificações.
- [x] Múltiplos bots com IA melhorada.
- [x] Explosões visuais ao destruir carros.
- [ ] Backend com Socket.IO e Redis para multiplayer.
- [ ] Persistência de upgrades em banco de dados.
- [x] Containerização com Docker.
- [x] Efeitos sonoros ao colidir e destruir carros.
- [x] Música de fundo dinâmica durante a batalha.
- [x] Sistema de partículas de poeira ao derrapar.
- [x] Power-ups temporários espalhados pela arena.
- [ ] Sistema de replays das partidas.
- [x] Sistema de clima dinâmico (dia/noite e chuva).
- [x] Sistema de achievements para jogadores.
- [ ] Leaderboard global de pontuações.
- [ ] Sistema de personalização de carros.

## Licença
Projeto criado para fins educativos.
