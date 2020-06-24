exports.run = async (client, message) => {

 const ms = await message.channel.send("🏓┃Pong!");
	const clientms = ms.createdTimestamp - message.createdTimestamp;
  
  ms.edit({embed: {
  color: 15158332,
  description: ('📡┃Meu ping Atual é: ' + clientms + 'ms')
}});
}