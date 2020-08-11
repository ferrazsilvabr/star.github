exports.run = async (client, message) => {

 const ms = await message.channel.send("🏓┃Pong!");
	const clientms = ms.createdTimestamp - message.createdTimestamp;
  
  ms.edit({embed: {
  color: 15158332,
  description: (`📡┃Latência do Servidor: **${ms.createdTimestamp -
      message.createdTimestamp}ms**\n🛰️┃Latência da API: **${Math.round(
      client.ws.ping
    )}ms**`)
}});
}