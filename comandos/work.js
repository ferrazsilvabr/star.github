const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('s!'))return;  

    let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`:cross: Você ja ´trabalhou!\n\nTrabalhe de novo em: ${time.minutes} Minutos e ${time.seconds} Segundos!`);
        message.channel.send(timeEmbed)
      } else {

        let replies = ['Progamador','Construtor','Garçom','Motorista','Chefe','Mecânico']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 80) + 1;
        let embed1 = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`✅ Você trabalhou como ${replies[result]} e ganhou ${amount} StarCoins!`);
        message.channel.send(embed1)
        
        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`work_${message.guild.id}_${user.id}`, Date.now())
    };
}