const LenoxCommand = require('../LenoxCommand.js');
const Discord = require('discord.js');

module.exports = class tictactoeCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'tictactoe',
			group: 'fun',
			memberName: 'tictactoe',
			description: 'Play a round of TicTacToe against another Discord user',
			format: 'tictactoe {@User}',
			aliases: ['ttt'],
			examples: ['tictactoe @Tester#7584'],
			clientpermissions: ['SEND_MESSAGES'],
			userpermissions: [],
			shortDescription: 'Games',
			dashboardsettings: true
		});
	}

	async run(msg) {
		const langSet = msg.client.provider.getGuild(msg.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);

		const mention = msg.mentions.members.first();
		const validation = [0, 0, 0, 0, 0, 0, 0, 0, 0];

		if (!mention) return msg.channel.send(lang.tictactoe_nomention);
		if (mention.presence.status === 'offline') return msg.reply(lang.tictactoe_notoline);
		if (mention.user.bot) return msg.channel.send(lang.tictactoe_botmention);
		if (msg.author.id === mention.id) return msg.channel.send(lang.tictactoe_error);

		let wantToPlayMessage;
		let wantToPlay;
		try {
			const wannaplay = lang.tictactoe_wannaplay.replace('%mention', mention).replace('%author', msg.author);
			wantToPlayMessage = await msg.channel.send(wannaplay);
			wantToPlay = await msg.channel.awaitMessages(msg2 => msg2.author.id === mention.id, {
				max: 1,
				time: 60000,
				errors: ['time']
			});
		} catch (error) {
			return wantToPlayMessage.delete();
		}

		if (wantToPlay.first().content.toLowerCase() !== 'yes') {
			const gamecanceled = lang.tictactoe_gamecanceled.replace('%mention', mention.user.tag);
			return msg.reply(gamecanceled);
		}

		await wantToPlayMessage.delete();
		await wantToPlay.first().delete();

		await msg.channel.send(`${lang.tictactoe_gamecreated} 😼`);
		let gameEmbed = new Discord.MessageEmbed()
			.setTitle(lang.tictactoe_title)
			.setDescription('``` 1 | 2 | 3 \n---|---|--  \n 4 | 5 | 6 \n---|---|--  \n 7 | 8 | 9```')
			.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
			.setColor('BLUE');
		const game = await msg.channel.send({
			embed: gameEmbed
		});

		try {
			const yourTurnMessage = await msg.channel.send(`${msg.author}, ${lang.tictactoe_turn} ‼`);
			const response1 = await msg.channel.awaitMessages(msg2 => msg.author.id === msg2.author.id && msg2.content > 0 && msg2.content < 10 && validation[msg2.content - 1] === 0, {
				max: 1,
				time: 15000,
				errors: ['time']
			});

			await yourTurnMessage.delete();
			await response1.first().delete();

			const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === msg.author.id ? 'X' : 'O');
			gameEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_title)
				.setDescription(editedDescription)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('BLUE');

			await game.edit({
				embed: gameEmbed
			});
			validation[response1.first().content - 1] = 1;
		} catch (error) {
			const noanswer = lang.tictactoe_noanswer.replace('%user', mention).replace('%author', msg.author);
			const noAnswerEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_noanswertitle)
				.setDescription(noanswer)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('RED');
			return msg.channel.send({
				embed: noAnswerEmbed
			});
		}

		try {
			const yourTurnMessage = await msg.channel.send(`${mention}, ${lang.tictactoe_turn} ‼`);
			const response1 = await msg.channel.awaitMessages(msg2 => msg2.author.id === mention.id && msg2.content > 0 && msg2.content < 10 && validation[msg2.content - 1] === 0, {
				max: 1,
				time: 15000,
				errors: ['time']
			});

			await yourTurnMessage.delete();
			await response1.first().delete();

			const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === msg.author.id ? 'X' : 'O');
			gameEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_title)
				.setDescription(editedDescription)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('BLUE');

			await game.edit({
				embed: gameEmbed
			});
			validation[response1.first().content - 1] = 2;
		} catch (error) {
			const noanswer = lang.tictactoe_noanswer.replace('%user', msg.author).replace('%author', mention);
			const noAnswerEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_noanswertitle)
				.setDescription(noanswer)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('RED');
			return msg.channel.send({
				embed: noAnswerEmbed
			});
		}

		try {
			const yourTurnMessage = await msg.channel.send(`${msg.author}, ${lang.tictactoe_turn} ‼`);
			const response1 = await msg.channel.awaitMessages(msg2 => msg.author.id === msg2.author.id && msg2.content > 0 && msg2.content < 10 && validation[msg2.content - 1] === 0, {
				max: 1,
				time: 15000,
				errors: ['time']
			});

			await yourTurnMessage.delete();
			await response1.first().delete();

			const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === msg.author.id ? 'X' : 'O');
			gameEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_title)
				.setDescription(editedDescription)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('BLUE');

			await game.edit({
				embed: gameEmbed
			});
			validation[response1.first().content - 1] = 1;
		} catch (error) {
			const noanswer = lang.tictactoe_noanswer.replace('%user', mention).replace('%author', msg.author);
			const noAnswerEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_noanswertitle)
				.setDescription(noanswer)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('RED');
			return msg.channel.send({
				embed: noAnswerEmbed
			});
		}

		try {
			const yourTurnMessage = await msg.channel.send(`${mention}, ${lang.tictactoe_turn} ‼`);
			const response1 = await msg.channel.awaitMessages(msg2 => msg2.author.id === mention.id && msg2.content > 0 && msg2.content < 10 && validation[msg2.content - 1] === 0, {
				max: 1,
				time: 15000,
				errors: ['time']
			});

			await yourTurnMessage.delete();
			await response1.first().delete();

			const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === msg.author.id ? 'X' : 'O');
			gameEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_title)
				.setDescription(editedDescription)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('BLUE');

			await game.edit({
				embed: gameEmbed
			});
			validation[response1.first().content - 1] = 2;
		} catch (error) {
			const noanswer = lang.tictactoe_noanswer.replace('%user', msg.author).replace('%author', mention);
			const noAnswerEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_noanswertitle)
				.setDescription(noanswer)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('RED');
			return msg.channel.send({
				embed: noAnswerEmbed
			});
		}

		try {
			const yourTurnMessage = await msg.channel.send(`${msg.author}, ${lang.tictactoe_turn} ‼`);
			const response1 = await msg.channel.awaitMessages(msg2 => msg.author.id === msg2.author.id && msg2.content > 0 && msg2.content < 10 && validation[msg2.content - 1] === 0, {
				max: 1,
				time: 15000,
				errors: ['time']
			});

			await yourTurnMessage.delete();
			await response1.first().delete();

			const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === msg.author.id ? 'X' : 'O');
			gameEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_title)
				.setDescription(editedDescription)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('BLUE');

			await game.edit({
				embed: gameEmbed
			});
			validation[response1.first().content - 1] = 1;
		} catch (error) {
			const noanswer = lang.tictactoe_noanswer.replace('%user', mention).replace('%author', msg.author);
			const noAnswerEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_noanswertitle)
				.setDescription(noanswer)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('RED');
			return msg.channel.send({
				embed: noAnswerEmbed
			});
		}

		try {
			const yourTurnMessage = await msg.channel.send(`${mention}, ${lang.tictactoe_turn} ‼`);
			const response1 = await msg.channel.awaitMessages(msg2 => msg2.author.id === mention.id && msg2.content > 0 && msg2.content < 10 && validation[msg2.content - 1] === 0, {
				max: 1,
				time: 15000,
				errors: ['time']
			});

			await yourTurnMessage.delete();
			await response1.first().delete();

			const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === msg.author.id ? 'X' : 'O');
			gameEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_title)
				.setDescription(editedDescription)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('BLUE');

			await game.edit({
				embed: gameEmbed
			});
			validation[response1.first().content - 1] = 2;
		} catch (error) {
			const noanswer = lang.tictactoe_noanswer.replace('%user', msg.author).replace('%author', mention);
			const noAnswerEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_noanswertitle)
				.setDescription(noanswer)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('RED');
			return msg.channel.send({
				embed: noAnswerEmbed
			});
		}

		const winnerEmbed = new Discord.MessageEmbed()
			.setTitle(lang.tictactoe_gameend)
			.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
			.setColor('GREEN');

		if (validation[0] === 1 && validation[1] === 1 && validation[2] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[2] === 1 && validation[5] === 1 && validation[8] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[6] === 1 && validation[7] === 1 && validation[8] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 1 && validation[3] === 1 && validation[6] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 1 && validation[4] === 1 && validation[8] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[2] === 1 && validation[4] === 1 && validation[6] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[1] === 1 && validation[4] === 1 && validation[7] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[3] === 1 && validation[4] === 1 && validation[6] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 2 && validation[1] === 2 && validation[2] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[2] === 2 && validation[5] === 2 && validation[8] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[6] === 2 && validation[7] === 2 && validation[8] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 2 && validation[3] === 2 && validation[6] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 2 && validation[4] === 2 && validation[8] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[2] === 2 && validation[4] === 2 && validation[6] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[1] === 2 && validation[4] === 2 && validation[7] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[3] === 2 && validation[4] === 2 && validation[6] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		}

		try {
			const yourTurnMessage = await msg.channel.send(`${msg.author}, ${lang.tictactoe_turn} ‼`);
			const response1 = await msg.channel.awaitMessages(msg2 => msg.author.id === msg2.author.id && msg2.content > 0 && msg2.content < 10 && validation[msg2.content - 1] === 0, {
				max: 1,
				time: 15000,
				errors: ['time']
			});

			await yourTurnMessage.delete();
			await response1.first().delete();

			const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === msg.author.id ? 'X' : 'O');
			gameEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_title)
				.setDescription(editedDescription)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('BLUE');

			await game.edit({
				embed: gameEmbed
			});
			validation[response1.first().content - 1] = 1;
		} catch (error) {
			const noanswer = lang.tictactoe_noanswer.replace('%user', mention).replace('%author', msg.author);
			const noAnswerEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_noanswertitle)
				.setDescription(noanswer)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('RED');
			return msg.channel.send({
				embed: noAnswerEmbed
			});
		}

		if (validation[0] === 1 && validation[1] === 1 && validation[2] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[2] === 1 && validation[5] === 1 && validation[8] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[6] === 1 && validation[7] === 1 && validation[8] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 1 && validation[3] === 1 && validation[6] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 1 && validation[4] === 1 && validation[8] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[2] === 1 && validation[4] === 1 && validation[6] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[1] === 1 && validation[4] === 1 && validation[7] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[3] === 1 && validation[4] === 1 && validation[6] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 2 && validation[1] === 2 && validation[2] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[2] === 2 && validation[5] === 2 && validation[8] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[6] === 2 && validation[7] === 2 && validation[8] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 2 && validation[3] === 2 && validation[6] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 2 && validation[4] === 2 && validation[8] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[2] === 2 && validation[4] === 2 && validation[6] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[1] === 2 && validation[4] === 2 && validation[7] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[3] === 2 && validation[4] === 2 && validation[6] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		}

		try {
			const yourTurnMessage = await msg.channel.send(`${mention}, ${lang.tictactoe_turn} ‼`);
			const response1 = await msg.channel.awaitMessages(msg2 => msg2.author.id === mention.id && msg2.content > 0 && msg2.content < 10 && validation[msg2.content - 1] === 0, {
				max: 1,
				time: 15000,
				errors: ['time']
			});

			await yourTurnMessage.delete();
			await response1.first().delete();

			const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === msg.author.id ? 'X' : 'O');
			gameEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_title)
				.setDescription(editedDescription)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('BLUE');

			await game.edit({
				embed: gameEmbed
			});
			validation[response1.first().content - 1] = 2;
		} catch (error) {
			const noanswer = lang.tictactoe_noanswer.replace('%user', msg.author).replace('%author', mention);
			const noAnswerEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_noanswertitle)
				.setDescription(noanswer)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('RED');
			return msg.channel.send({
				embed: noAnswerEmbed
			});
		}

		if (validation[0] === 1 && validation[1] === 1 && validation[2] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[2] === 1 && validation[5] === 1 && validation[8] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[6] === 1 && validation[7] === 1 && validation[8] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 1 && validation[3] === 1 && validation[6] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 1 && validation[4] === 1 && validation[8] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[2] === 1 && validation[4] === 1 && validation[6] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[1] === 1 && validation[4] === 1 && validation[7] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[3] === 1 && validation[4] === 1 && validation[6] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 2 && validation[1] === 2 && validation[2] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[2] === 2 && validation[5] === 2 && validation[8] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[6] === 2 && validation[7] === 2 && validation[8] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 2 && validation[3] === 2 && validation[6] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 2 && validation[4] === 2 && validation[8] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[2] === 2 && validation[4] === 2 && validation[6] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[1] === 2 && validation[4] === 2 && validation[7] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[3] === 2 && validation[4] === 2 && validation[6] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		}

		try {
			const yourTurnMessage = await msg.channel.send(`${msg.author}, ${lang.tictactoe_turn} ‼`);
			const response1 = await msg.channel.awaitMessages(msg2 => msg.author.id === msg2.author.id && msg2.content > 0 && msg2.content < 10 && validation[msg2.content - 1] === 0, {
				max: 1,
				time: 15000,
				errors: ['time']
			});

			await yourTurnMessage.delete();
			await response1.first().delete();

			const editedDescription = gameEmbed.description.replace(response1.first().content, response1.first().author.id === msg.author.id ? 'X' : 'O');
			gameEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_title)
				.setDescription(editedDescription)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('BLUE');

			await game.edit({
				embed: gameEmbed
			});
			validation[response1.first().content - 1] = 1;
		} catch (error) {
			const noanswer = lang.tictactoe_noanswer.replace('%user', mention).replace('%author', msg.author);
			const noAnswerEmbed = new Discord.MessageEmbed()
				.setTitle(lang.tictactoe_noanswertitle)
				.setDescription(noanswer)
				.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
				.setColor('RED');
			return msg.channel.send({
				embed: noAnswerEmbed
			});
		}

		if (validation[0] === 1 && validation[1] === 1 && validation[2] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[2] === 1 && validation[5] === 1 && validation[8] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[6] === 1 && validation[7] === 1 && validation[8] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 1 && validation[3] === 1 && validation[6] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 1 && validation[4] === 1 && validation[8] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[2] === 1 && validation[4] === 1 && validation[6] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[1] === 1 && validation[4] === 1 && validation[7] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[3] === 1 && validation[4] === 1 && validation[6] === 1) {
			const win = lang.tictactoe_win.replace('%user', msg.author);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 2 && validation[1] === 2 && validation[2] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[2] === 2 && validation[5] === 2 && validation[8] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[6] === 2 && validation[7] === 2 && validation[8] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 2 && validation[3] === 2 && validation[6] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[0] === 2 && validation[4] === 2 && validation[8] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[2] === 2 && validation[4] === 2 && validation[6] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[1] === 2 && validation[4] === 2 && validation[7] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		} else if (validation[3] === 2 && validation[4] === 2 && validation[6] === 2) {
			const win = lang.tictactoe_win.replace('%user', mention);
			winnerEmbed.setDescription(win);
			return msg.channel.send({
				embed: winnerEmbed
			});
		}
		const drawEmbed = new Discord.MessageEmbed()
			.setTitle(lang.tictactoe_gameend)
			.setDescription(lang.tictactoe_draw)
			.setFooter(`${msg.author.tag} vs ${mention.user.tag}`)
			.setColor('ORANGE');

		return msg.channel.send({
			embed: drawEmbed
		});
	}
};;

// Fun command

/**
 * Re-creating the tic-tac-toe game but it's in Discord
 * @param {Discord.Client} Client the client
 * @param {Discord.Message} Message the message that contains the command name
 * @param {string[]} args the command args
 * @param {any} options some options
 */
export async function run(Client: Discord.Client, message: Discord.Message, args: string[], ops: any) {
    let grid = {};
    let turn = "J1";
    let firstMessageID;
    let secondPlayer;

    waitForSecondPlayer();

    function waitForSecondPlayer() {
        const filter = (reaction, user) => {
            return user.id != message.author.id;
        };

        let msgid;

        message.channel.send("> Waiting for the 2nd player to approve... (click on the reaction to begin the game)").then(async msg => {
            msgid = msg.id;
            await msg.react("👍🏻");

            setTimeout(function () {
                msg.awaitReactions(filter, { max: 1 })
                    .then(collected => {
                        secondPlayer = collected.first().users.cache.last();
                        message.channel.messages.fetch(msgid).then(msg => msg.edit(`2nd player is **${secondPlayer.tag}**. Init...`));
                        generateGrid();
                    }).catch(err => {
                        message.channel.messages.fetch(msgid).then(msg => msg.edit("Nobody has clicked the reaction for 30 seconds. Game cancelled."));
                    });
            }, 200);
        });
    }

    function generateGrid() {
        initGrid();
        let numbers = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

        message.channel.send("> Status: init :eyes:").then(msg => firstMessageID = msg.id);

        message.channel.send("> I am currently generating the grid. Please wait a bit..").then(async msg => {
            for (let number of numbers) {
                await msg.react(number);
            }

            numbers = ["1️⃣", "2️⃣", "3️⃣", "\n4️⃣", "5️⃣", "6️⃣", "\n7️⃣", "8️⃣", "9️⃣"];

            await msg.edit(numbers.join(" "));
            setTimeout(function () {
                createReactionCollector(msg);
            }, 300)
        });
    }

    function initGrid() { // init the grid with a JSON object
        for (let i = 0; i < 10; i++) {
            grid[i] = {};
            grid[i]["occupied"] = false;
            grid[i]["player"] = null;
        }

    }

    function createReactionCollector(msg: Discord.Message) {
        const filter: Discord.CollectorFilter = (reaction, user) => {
            return user.id === message.author.id || user.id === secondPlayer.id;
        }

        msg.awaitReactions(filter, { max: 1 })
            .then(collected => {
                if (secondPlayer == collected.first().users.cache.last() && turn != "J2" || message.author == collected.first().users.cache.last() && turn != "J1") {
                    collected.last().remove();
                    return createReactionCollector(msg);
                }

                if (isCaseOccupied(emojiToLetter(collected.first().emoji.name))) {
                    const status = new Discord.MessageEmbed()
                        .setAuthor(collected.first().users.cache.last().tag, collected.first().users.cache.last().avatarURL())
                        .setColor("#1E90FF")
                        .setDescription(`**${collected.first().users.cache.last().tag}** tried to react with the ${collected.first().emoji.name} emoji, but this case is already occupied by a player...`);

                    msg.channel.messages.fetch(firstMessageID).then(msg => msg.edit(status));

                    collected.last().users.remove(collected.first().users.cache.last().id);
                    return createReactionCollector(msg);
                }

                const status = new Discord.MessageEmbed()
                    .setAuthor(collected.first().users.cache.last().tag, collected.first().users.cache.last().avatarURL())
                    .setColor("#1E90FF")
                    .setDescription(`**${collected.first().users.cache.last().tag}** reacted with the ${collected.first().emoji.name} emoji.`);

                msg.channel.messages.fetch(firstMessageID).then(msg => msg.edit(status));

                editGrid(msg, collected.first().emoji.name);

                if (checkIfWin(turn)) {
                    const status = new Discord.MessageEmbed()
                        .setAuthor(collected.first().users.cache.last().tag, collected.first().users.cache.last().avatarURL())
                        .setColor("#ffff00")
                        .setDescription(`**${collected.first().users.cache.last().tag}** won the game. GG!`);

                    msg.channel.messages.fetch(firstMessageID).then(msg => msg.edit(status));
                    return;
                } else if (checkIfEgality()) {
                    const status = new Discord.MessageEmbed()
                        .setAuthor(collected.first().users.cache.last().tag, collected.first().users.cache.last().avatarURL())
                        .setColor("#1E90FF")
                        .setDescription(`:crossed_swords: Nobody won... That's a draw!`);

                    msg.channel.messages.fetch(firstMessageID).then(msg => msg.edit(status));
                }

                detectPlayer(); // changes turn
                collected.last().users.remove(collected.first().users.cache.last().id); // removes user reaction
                createReactionCollector(msg); // wait for reaction once the turn is finished
            }).catch(err => {
                createReactionCollector(msg);
            });
    }

    function isCaseOccupied(coords) {
        if (grid[coords].occupied) {
            return true;
        } else {
            return false;
        }
    }

    async function editGrid(msg: Discord.Message, emoji) {
        let getGrid = msg.content.split(" ");
        let gridToObject = Object.values(getGrid);
        let selectEmoji = turn == "J1" ? ":x:" : ":o:";
        let letterToNumber = parseInt(emojiToLetter(emoji));

        if (gridToObject[letterToNumber - 1].startsWith("\n")) {
            selectEmoji = `\n${selectEmoji}`;
        }

        gridToObject.splice((letterToNumber - 1), 1, selectEmoji);
        grid[parseInt(emojiToLetter(emoji))].occupied = true;
        grid[parseInt(emojiToLetter(emoji))].player = turn;
        await msg.edit(gridToObject.join(" "));
    }

    function detectPlayer() { // changing player, when last turn is finished
        if (turn == "J1") {
            return turn = "J2";
        } else {
            return turn = "J1";
        }
    }

    function checkIfWin(turn) {
        if (checkGridCases(1, 2, 3, turn)) return true;
        if (checkGridCases(3, 6, 9, turn)) return true;
        if (checkGridCases(9, 8, 7, turn)) return true;
        if (checkGridCases(7, 4, 1, turn)) return true;
        if (checkGridCases(2, 5, 8, turn)) return true;
        if (checkGridCases(7, 5, 3, turn)) return true;
        if (checkGridCases(1, 5, 9, turn)) return true;
        if (checkGridCases(4, 5, 6, turn)) return true;
    }

    function checkIfEgality() {
        if (grid[1].occupied == true && grid[2].occupied == true && grid[3].occupied == true && grid[4].occupied == true && grid[5].occupied == true && grid[6].occupied == true && grid[7].occupied == true && grid[8].occupied == true && grid[9].occupied == true) return true;
    }

    function checkGridCases(a, b, c, turn) {
        if (grid[a].player == turn && grid[b].player == turn && grid[c].player == turn) return true;
    }

    function emojiToLetter(emoji) { // transforms emoji (reaction) to text
        var unicodeChars = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
        var chars = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        let index = unicodeChars.indexOf(emoji);
        return chars[index];
    }
}