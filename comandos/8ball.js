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
        .setThumbnail("https://images-ext-1.discordapp.net/external/TeHeMmuw7prUjDbVy-3iT8oQ8JcJFiiIqPLj25VvANM/https/cdn.pixabay.com/photo/2015/04/11/14/35/billiards-717769_960_720.png?width=567&height=564")
        .addField("**Sua Resposta é...**", eightball[Math.floor(Math.random() * eightball.length).toString(16)] )
        message.channel.send(embed)
    }
    
     else message.channel.send("Qual sua Pergunta? ultilize s!8ball pergunta")
}

module.exports.help = {
    name: "8ball",
    aliases: ['8b']
}