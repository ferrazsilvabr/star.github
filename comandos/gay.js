const Discord = require('discord.js'); // puxando a livraria 'discord.js'

exports.run = (client, message, args) => { // setando as bases
    var numero = Math.floor(Math.random() * 100) + 0;

        let embed = new Discord.MessageEmbed()

        .setTitle(`:rainbow_flag: │ Máquina Gay`)
        .setDescription(`Você é ${numero}% gay`)
        .setColor('#FF0084')
        
                let embedowner = new Discord.MessageEmbed()

        .setTitle(`:rainbow_flag: │ Máquina Gay`)
        .setDescription(`Você é 0% gay`)
        .setColor('#FF0084')


        let embed100 = new Discord.MessageEmbed()

        .setTitle(`:rainbow_flag: │ Máquina Gay`)
        .setDescription(`Você é 100% gay`)
        .setColor('#FF0084')
 
if(message.author.id === "461967932650422273") return message.channel.send(embed100)

if(message.author.id === "717766639260532826") return message.channel.send(embedowner)
        message.channel.send(embed)
}
exports.help = { // setando o nome do arquivo, seguido do prefix
    name: 'gay'
}