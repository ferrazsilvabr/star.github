const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR"))
    return message.reply(
      "Você precisa de permissão de Admininstrador para ultilizar este comando"
    );
    
    let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send("Por favor, mencione o canal.")
    }
    
    //Now we gonna use quick.db
    
    db.set(`welchannel_${message.guild.id}`, channel.id)
    
    message.channel.send(`O Canal de boas vindas agora é ${channel}`)
  }
exports.help = {
    name: 'welcome',
    aliases: ['boas-vindas']
}