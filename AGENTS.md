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

## 2025-08-27 - Ajustes de física e música de fundo

- Gravidade intensificada e maior atrito para impedir que os carros decolem.
- Carros remodelados com rodas e damping para curvas mais suaves.
- Música de fundo dinâmica com aumento de intensidade conforme a vida do jogador.
- Próximos passos: adicionar sistema de partículas de poeira ao derrapar.

## 2025-08-28 - Múltiplos bots e IA aprimorada

- Adicionadas rotinas de IA para perseguir o jogador com leve aleatoriedade.
- Dois bots inimigos agora aparecem na arena.
- Força de aceleração do carro do jogador aumentada.
- Próximos passos: implementar power-ups temporários espalhados pela arena.

## 2025-08-29 - Correções de câmera e movimento

- Câmera pode ser reposicionada segurando o botão direito do mouse.
- Força de aceleração reduzida e curva com limite de rotação para evitar derrapagens.
- Bots agora recebem força maior para se moverem.
- Testes atualizados e novo teste para cálculo de câmera.
- Próximos passos: ajustar derrapagem lateral do carro.

## 2025-08-30 - Containerização com Docker

- Adicionada imagem Docker multi-stage para build e preview do jogo.
- Instruções de uso com Docker documentadas no README.
- Próximos passos: configurar pipeline de CI para gerar a imagem automaticamente.

## 2025-08-31 - Partículas de poeira

- Sistema de poeira exibido quando o carro derrapa.
- Flag de derrapagem exposta no corpo do carro.
- Testes garantem visibilidade apenas durante a derrapagem.
- Próximos passos: implementar power-ups temporários e sistema de clima dinâmico.

## 2025-09-01 - Power-ups temporários

- Carros podem receber power-ups temporários de armadura.
- Testes garantem que os efeitos expiram corretamente.
- Próximos passos: implementar sistema de clima dinâmico e achievements para jogadores.
