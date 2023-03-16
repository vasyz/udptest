const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const hostname = 'localhost';
const port = 2222;
const name = 'Василь'; // тут ім'я
const last_name = 'Василенко'; // тут прізвище
const father_name = 'Васильович' ;// тут по батькові
const key = "1488" ; // тут додав від себе ункальний номер клієнта , в подальшому буде легше зрозуміти хто саме не вийшов на зв'язок, як варіант
setInterval(() => {
	const message = Buffer.from(JSON.stringify({key, father_name , name,last_name}));
	client.send(message, port, hostname, (err) => {
		if (err) {
			console.error(`Помилка при відправленні повідомлення : ${err}`);
		} else {
			console.log(`Повідомлення відправлено від:  ${last_name} ${name} ${father_name}`);
		}
	});
}, 10000); // ждем 10 секунд і знову шлем
