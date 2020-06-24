const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  message.delete()
  if(!message.member.permissions.has("BAN_MEMBERS")) {
    return message.reply("Você não tem a permissão necessária!")
  }
  
  if(!message.guild.me.permissions.has("BAN_MEMBERS")) {
    return message.reply("Eu não tenho a permissão necessária!")
  }
  
  let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!membro) return message.reply("Você precisa mencionar alguem!")
  if(membro.user.id === message.author.id) {
    return message.reply("Você não pode se banir!")
  }
  if(membro.user.id === client.user.id) {
    return message.reply("Por que você quer me banir?")
  }
  if(!membro.bannable) {
    return message.reply("Eu não posso banir este membro!")
  }
 
  let motivo = args.slice(1).join(" ")
  if(!motivo) motivo = "Não Definido"
  membro.ban({reason: motivo})
  
}