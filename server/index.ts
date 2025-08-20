// Placeholder de backend Node.js + Socket.IO
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('Novo cliente conectado');
});

httpServer.listen(3000, () => {
  console.log('Servidor Socket.IO escutando na porta 3000');
});
