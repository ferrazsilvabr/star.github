const Discord = require('discord.js');

const items = [
	{
		question: 'Normalmente, quantos litros de sangue uma pessoa tem? Em média, quantos são retirados numa doação de sangue?',
		answer: ['4 a 6 litros', '4 a 6l', '450ml'],
	},
	{
		question: 'De quem é a famosa frase “Penso, logo existo”?',
		answer: ['Descartes'],
	},
	{
		question: 'De onde é a invenção do chuveiro elétrico?',
		answer: ['Brasil'],
	},
	{
		question: 'Quais o menor e o maior país do mundo?',
		answer: [
			'Vaticano e Rússia',
			'Vaticano',
			'Rússia',
		],
	},
	{
		question:
			'Qual o nome do presidente do Brasil que ficou conhecido como Jango?',
		answer: ['João Goulart'],
	},
	{
		question: 'Qual o livro mais vendido no mundo a seguir à Bíblia?',
		answer: ['Dom Quixote'],
	},
	{
		question: 'Quantas casas decimais tem o número pi?',
		answer: ['Infinitas', 'infinitas'],
	},
	{ question: 'Atualmente, quantos elementos químicos a tabela periódica possui?', answer: ['118'] },
	{ question: 'Quais os países que têm a maior e a menor expectativa de vida do mundo?', answer: ['Japão e Serra Leoa', 'Japão', 'Serra Leoa'] },
	{
		question: 'O que a palavra legend significa em português?',
		answer: [
			'Lenda',
			'lenda',
		],
	},
	{
		question: 'Qual o número mínimo de jogadores numa partida de futebol?',
		answer: ['7'],
	},
	{
		question: 'Quais os principais autores do Barroco no Brasil?',
		answer: ['Gregório de Matos', 'Bento Teixeira', 'Manuel Botelho de Oliveira'],
	},
	{ question: 'Quais as duas datas que são comemoradas em novembro?', answer: ['Proclamação da República e Dia Nacional da Consciência Negra'] },
	{
		question: 'Quem pintou "Guernica"?',
		answer: ['Pablo Picasso'],
	},
	// {question: 'Quantos seguidores tem o Twitter da He4rt?', answer: ['']},
	// {question: 'Quantos usuários apresentados?', answer: ['']},
	{ question: 'Quanto tempo a luz do Sol demora para chegar à Terra?', answer: ['8 minutos', '8m'] },
	{ question: 'Qual a tradução da frase “Fabiano cogió su saco antes de salir”?', answer: ['Fabiano pegou seu paletó antes de sair'] },
];

const config = {
	max: 1,
	time: 50000,
	errors: ['time'],
};

const random = items[Math.floor(Math.random() * items.length)];

module.exports = {
	async run(client, message) {
		if (!message.member.hasPermission('ADMINISTRATOR')) {
			return message.channel.send(
				new Discord.MessageEmbed()
					.setTitle(':x: Você não tem permissão ! :x:')
					.setDescription(
						'Infelizmente você não tem permissão para utilizar esse comando'
					)
					)
					.setColor('RED')
					.setTimestamp()
			);
		}

		let tempo = 0;

		const addTime = setInterval(() => {
			tempo += 1;
		}, 1000);

		// Manda o tempo do jogo, a cada 30 seg
		const sendTime = setInterval(() => {
			message.channel.send(
				`⌚ O jogo está rolando! Já se passaram ${tempo + 1} segundos`
			);
		}, 30000);

		const question = new Discord.MessageEmbed()
			.setTitle(`\`\`🏆\`\` EVENTO QUIZ\n**${random.question}**`)
			.setDescription(
				'``❗`` Lembre-se que todas as respostas estão em português e somente será válida a que estiver escrita corretamente.'
			)
			.setColor('#FFB900');

		message.channel.send('Irá começar em :three: segundos...');
		setTimeout(() => {
			message.channel.send('Irá começar em :two: segundos...');
		}, 1000);
		setTimeout(() => {
			message.channel.send('Irá começar em :one: segundos...');
		}, 2000);
		setTimeout(() => {
			message.channel.send(question);
		}, 3000);

		try {
			const collector = await message.channel.awaitMessages(
				answer => random.answer.includes(answer.content.toLowerCase()),
				config
			);
			const winnerAnswer = collector.first();
			winnerAnswer.delete();

			const win = new Discord.MessageEmbed()
				.setTitle(
					`\`\`🏆\`\` EVENTO QUIZ\n**${winnerAnswer.author.username} acertou.**`
				)
				.setDescription(
					`**Informações:**\n🔹 Ganhador: ${winnerAnswer.author.username}\n🔹 Pergunta: \`\`${random.question}\`\`\n🔹 Premiação: \`\`XP BOOST\`\`.` +
						`\n🔹 Tempo de jogo: \`\`${tempo} segundos\`\`.`
				)
				.setColor('#FFB900');

			message.channel.send(win);
			clearInterval(addTime);
			return clearInterval(sendTime);
		} catch (e) {
			console.log('aaaaaaaaaaaaa', e);
			// if(e.message == 'time') {
			const timeout = new Discord.MessageEmbed()
				.setTitle(
					'``🏆`` EVENTO QUIZ\n**' +
						'Quiz finalizado pois não houve acertos.' +
						'**'
				)
				.setDescription(
					`${'**Informações:**\n🔹 Ganhador: ' +
						'Ninguém' +
						'\n🔹 Pergunta: ``'}${
						random.question
					}\`\`\n🔹 Premiação: \`\`XP BOOST\`\`.` +
						`\n🔹 Tempo de jogo: \`\`${tempo} segundos\`\`.`
				)
				.setColor('#FFB900');
			message.channel.send(timeout);
			clearInterval(addTime);
			return clearInterval(sendTime);
			// }
		}
	},

	get command() {
		return {
			name: 'quiz',
			category: categories.ADM,
			description: 'Comando para iniciar o evento Quiz.',
			usage: 'comando',
		};
	},
};