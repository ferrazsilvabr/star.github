const db = require('quick.db')
const discord = require('discord.js')
const { getInfo } = require("../level.js")
module.exports = {
  name: "level",
  description: "Get the level of author or mentioned",
  usage: "level <user>",
  category: "info",
  run: (client, message, args) => {
    const user = message.mentions.users.first() || message.author;
    
    if(user.id === client.user.id) { //IF BOT
      return message.channel.send("😉 | Estou no nível 100")
    }
    
    if(user.bot) {
      return message.channel.send("Bots não tem xp")
    }
    
    let xp = db.get(`xp_${user.id}_${message.guild.id}`) || 0;
    
    const {level, remxp, levelxp} = getInfo(xp);
    if(xp === 0) return message.channel.send(`**${user.tag}** não tem nível...`)
    
    let embed = new discord.MessageEmbed()
    .setAuthor(user.username, message.guild.iconURL())
    .setColor("#ff2050")
    .setThumbnail(user.avatarURL())
    .setDescription(`**NÍVEL** - ${level}
**XP** - ${remxp}/${levelxp}`)
    
 message.channel.send(embed)   
    
    
    
    
  }
}