const Discord = require("discord.js")
 
 module.exports.run = async (client, message, args) => {


let gay = Math.round(Math.random() * 100)
 let mentionedUser = message.mentions.users.first() || message.author;
    let ballembed = new Discord.MessageEmbed()
   
    .setColor("#00ff00")
    .setDescription(`${mentionedUser} é ${gay}% gay!`)

    message.channel.send(ballembed)


 }