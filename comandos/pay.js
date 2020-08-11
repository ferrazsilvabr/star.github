                                               const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('s!'))return;  

  let user = message.mentions.members.first() 

  let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)

  let embed1 = new Discord.MessageEmbed()
  .setColor("#ff0000")
  .setDescription(`:cross: Mencione alguem para pagar`);

  if (!user) {
      return message.channel.send(embed1)
  }
  let embed2 = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setDescription(`:cross: Diga quanto deseja pagar`);
  
  if (!args[1]) {
      return message.channel.send(embed2)
  }
  let embed3 = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setDescription(`:cross: Você não pode pagar dinheiro negativo`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setDescription(`:cross: Você não tem esse dinheiro`);

  if (member < args[1]) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setDescription(`:white_check_mark:  Você pagou ${user.user.username} ${args[1]} StarCoins`);

  message.channel.send(embed5)
  db.add(`money_${message.guild.id}_${user.id}`, args[1])
  db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])

}