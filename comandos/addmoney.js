const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('s!'))return;  
  let ownerID = '717766639260532826'
  if(message.author.id !== ownerID) return;

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.add(`money_${message.guild.id}_${user.id}`, args[1])
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)

    let moneyEmbed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setDescription(`:white_check_mark: Adicionado ${args[1]} StarCoins\n\nNova Quantidade: ${bal}`);
    message.channel.send(moneyEmbed)

};