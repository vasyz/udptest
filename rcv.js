const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const port = 2222;
const timeout = 60000; // час очікування повідомлення , мс
const clients = {}; // тут зберігаємо всіх клієнтів

server.on('listening', () => {
	console.log(`Сервер слухає порт ${port}`);
});

server.on('message', (message, remoteInfo) => {
	const data = JSON.parse(message.toString('utf8'))
	const clientKey = `${remoteInfo.address}:${remoteInfo.port}`;
	console.log(`Повідомлення отримано від ${data.last_name}  ${data.name} ${data.father_name} з хосту  ${clientKey}`);
	// оновлюємо інфу про клієнта
	clients[clientKey] = {
		lastSeen: Date.now(),
		data:data
	};
});

// перевіряєм чи є на зв'язку клієнт кожні 10 сек
setInterval(() => {
	const now = Date.now();
	Object.keys(clients).forEach((clientKey) => {

		const client = clients[clientKey];

		const timeDiff = now - client.lastSeen;

		if (timeDiff > timeout) {

			console.error(`${client.data.last_name}  ${client.data.name} ${client.data.father_name} з хосту ${clientKey} не виходить на зв'язок`);
		//	delete clients[clientKey]; //  моживо видаляти при бажанні
		}
	});
}, 10000); // ждем 10 секунд

server.bind(port);
