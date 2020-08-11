const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('s!'))return;
  if (!['422535241211707393', '717766639260532826' , '622922897509580821', '664174201220890645'].some(a => message.author.id === a)) return message.channel.send('Apenas desenvolvedores do bot podem utilizar este comando!')

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.add(`money_${message.guild.id}_${user.id}`, args[1])
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)

    let moneyEmbed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setDescription(`:white_check_mark: Adicionado ${args[1]} StarCoins\n\nNova Quantidade: ${bal}`);
    message.channel.send(moneyEmbed)
}