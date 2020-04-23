const koa = require('koa');
const http = require('http');
const socket = require('socket.io');

const app = new koa();
const server = http.createServer(app.callback());
const io = socket(server);

const SERVER_HOST = 'localhost';
const SERVER_PORT = 8080;

// Conectar alguém...
io.on('connection', socket => {
    // Pega menssagem enviada por alguém e manda pra todos...
    socket.on('chat.message', (data) => {
        io.emit('chat.message', data);
        console.log('[Back-End] {Chat-Message} ', data);
    });

    // Desconecta alguém...
    socket.on('disconnect', () => {

        console.log('[Back-End] {Socket} Um socket/pessoa foi desconectado(a)!');
    });

    console.log('[Back-End] {Socket} Novo socket/pessoa conectado(a)!');
});

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[Back-End] Runnig...`);
    console.log(`[Back-End] http://${SERVER_HOST}:${SERVER_PORT}/`);
    console.log(`[Back-End] CTRL + C para parar o servidor.`);
});
