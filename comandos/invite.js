const Discord = require("discord.js");

module.exports.run = async (client,message,args) => {
    var embed = new Discord.MessageEmbed()
        	.setTitle("<:earlysupporter:556682087579516968> • Convites!")        	
          .addField("1 »  Você quer Me Adicionar?", "[Clique Aqui!](https://discord.com/oauth2/authorize?client_id=719524114536333342&permissions=-1&scope=bot)")
          .addField("2 »  Precisa de Ajuda? Entre em Meu Suporte!", "[Clique Aqui!](https://discord.gg/mxTfuYw)")
          .setColor(`PURPLE`)
          .setFooter('© Star 2020', client.user.displayAvatarURL());
    message.channel.send(embed)
}

module.exports.help = {
    name: "invite",
    aliases: ['invites']
}