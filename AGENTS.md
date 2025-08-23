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
