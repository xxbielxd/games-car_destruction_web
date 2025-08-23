# Agents.md (Guia Vivo)

Documento para **registrar decisões** e **orquestrar tarefas** futuras.
Atualize sempre que implementar algo relevante.

## Regras importantes

- Sempre verifique os testes se não quebraram.
- Sempre crie testes para novas funcionalidades.
- Ajuste os testes se necessário.

## 2025-08-20 - Setup inicial do projeto

- Estrutura base com Three.js e TypeScript.
- Arquivos principais criados: Car, Arena, Physics e index.
- Configuração de Vite, ESLint e Prettier.
- Testes unitários básicos para lógica de vida do carro.
- Próximos passos: adicionar upgrades, múltiplos bots e suporte a multiplayer com Socket.IO.

## 2025-08-23 - Sistema de upgrades

- Carro pode receber upgrades de armadura que aumentam vida máxima.
- Atalho 'u' adiciona upgrade ao jogador.
- Testes cobrindo aplicação de upgrades.
- Próximos passos: expandir tipos de upgrades e efeitos visuais.

## 2025-08-23 - Explosões visuais

- Adicionadas explosões simples ao destruir carros.
- Testes cobrindo criação e remoção das explosões.
- Próximos passos: adicionar efeitos sonoros ao colidir e destruir carros.

## 2025-08-24 - Efeitos sonoros

- Sons ao colidir e destruir carros utilizando elemento de áudio.
- Testes garantem que os sons são disparados corretamente.
- Próximos passos: adicionar música de fundo e controle de volume.

## 2025-08-25 - Visão em primeira pessoa e novos controles

- Câmera posicionada dentro do carro do jogador.
- Controles alterados para WASD com espaço como freio de mão.
- Testes cobrindo força aplicada e freio de mão.

## 2025-08-26 - Visão em terceira pessoa e correções de movimento

- Câmera segue o carro em terceira pessoa.
- Controles WASD aplicam força relativa à orientação do carro.
