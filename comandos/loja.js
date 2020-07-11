const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('s!'))return;  


    let embed = new Discord.MessageEmbed()
    .setDescription("**VIP:**\n\nVIP Bronze: 3500 Coins [s!comprar bronze]\n\n**Itens TodaVida**\n\nSapatos Nike: 600 [s!comprar nike]\nCarro: 800 [s!comprar carro]\nMansão: 1200 [s!comprar mansão]")
    .setColor("#ff0000")
    message.channel.send(embed)




}