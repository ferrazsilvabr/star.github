const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('s!'))return;  

    let user = message.author;

    let author = db.fetch(`money_${message.guild.id}_${user.id}`)

    let Embed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setDescription(`:cross:  Você precisa de 3500 StarCoins para comprar o VIP Bronze!`);

    if (args[0] == 'bronze') {
        if (author < 3500) return message.channel.send(Embed)
        
        db.fetch(`bronze_${message.guild.id}_${user.id}`);
        db.set(`bronze_${message.guild.id}_${user.id}`, true)

        let Embed2 = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`:white_check_mark:  Você comprou VIP Bronze por 3500 StarCoins`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 3500)
        message.channel.send(Embed2)
    } else if(args[0] == 'nike') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`:cross: Você precisa de 600 StarCoins para comprar um Sapato da Nike!`);

        if (author < 600) return message.channel.send(Embed2)
       
        db.fetch(`nikes_${message.guild.id}_${user.id}`)
        db.add(`nikes_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`:white_check_mark: Você comprou um Sapato da Nike!`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 600)
        message.channel.send(Embed3)
    } else if(args[0] == 'carro') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`:cross: Você precisa de 800 StarCoins para comprar um carro!`);

        if (author < 800) return message.channel.send(Embed2)
       
        db.fetch(`car_${message.guild.id}_${user.id}`)
        db.add(`car_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`:white_check_mark:  Você comprou um carro novo por 800 StarCoins!`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 800)
        message.channel.send(Embed3)
    } else if(args[0] == 'mansão') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`:cross: Você precisa de 1200 StarCoins para uma mansão!`);

        if (author < 1200) return message.channel.send(Embed2)
       
        db.fetch(`house_${message.guild.id}_${user.id}`)
        db.add(`house_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`:white_check_mark: Você comprou uma mansão!`);

        db.subtract(`money_${message.guild.id}_${user.id}`, 1200)
        message.channel.send(Embed3)
    } else {
        let embed3 = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(':cross: Esse item foi digitado incorretamente ou não existe!')
        message.channel.send(embed3)
    }

}