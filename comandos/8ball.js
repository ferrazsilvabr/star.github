const Discord = require("discord.js");

var eightball = [ 
        "Sim!",
        "Não",
        "Talvez",
        "Provavelmente",
        "Acho que não.",
        "Nunca!",
        "Você pode tentar...",
        "Você Decide!",
        "SEM DÚVIDAS!",
]

module.exports.run = async (bot,message,args) => {
     if (args[0] != null) {
        var embed = new Discord.MessageEmbed()
        .setAuthor("🎱 Bola Nº8")
        .setColor("RED")
        .setThumbnail("https://i.imgur.com/w6snGX9.gif")
        .addField("**Sua Resposta é...**", eightball[Math.floor(Math.random() * eightball.length).toString(16)] )
        message.channel.send(embed)
    }
    
     else message.channel.send("Qual sua Pergunta? ultilize s!8ball pergunta")
}
module.exports.help = {
    name: "8ball",
    aliases: ['8b']
}