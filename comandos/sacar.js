const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('s!'))return;  

  let user = message.author;

  let member = db.fetch(`money_${message.guild.id}_${user.id}`)
  let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)

  if (args[0] == 'all') {
    let money = await db.fetch(`bank_${message.guild.id}_${user.id}`)
    
    db.subtract(`bank_${message.guild.id}_${user.id}`, money)
    db.add(`money_${message.guild.id}_${user.id}`, money)
    let embed5 = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setDescription(`✅ Você sacou todo o dinheiro do banco.`);
  message.channel.send(embed5)
  
  } else {

  let embed2 = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setDescription(`:x: Especifique uma quantidade para sacar`);
  
  if (!args[0]) {
      return message.channel.send(embed2)
  }
  let embed3 = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setDescription(`:x: Você não pode sacar dinheiro positivo`);

  if (message.content.includes('-')) { 
      return message.channel.send(embed3)
  }
  let embed4 = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setDescription(`:x: Você não tem esse dinheiro`);

  if (member2 < args[0]) {
      return message.channel.send(embed4)
  }

  let embed5 = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setDescription(`✅ Você sacou ${args[0]} StarCoins do banco`);

  message.channel.send(embed5)
  db.subtract(`bank_${message.guild.id}_${user.id}`, args[0])
  db.add(`money_${message.guild.id}_${user.id}`, args[0])
  }
}