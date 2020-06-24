const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
 if (!['717766639260532826' , '622922897509580821' , '422535241211707393'].some(a => message.author.id === a)) return message.channel.send('Apenas meu criadores podem utilizar este comando!')
  
  if(!message.guild.me.permissions.has("BAN_MEMBERS")) {
    return message.reply("Eu não tenho a permissão necessária!")
  }
  
  let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!membro) return message.reply("Você precisa mencionar alguem!")
  if(membro.user.id === message.author.id) {
    return message.reply("Você não pode se banir!")
  }
  if(membro.user.id === client.user.id) {
    return message.reply("Por que você quer banir?")
  }
  if(!membro.bannable) {
    return message.reply("Eu não posso banir este membro!")
  }
  
  let motivo = args.slice(1).join(" ")
  if(!motivo) motivo = "Não Definido"
  
  const embed = new Discord.MessageEmbed()
  .setTitle("Alguém foi banido da Star!")
  .setColor("#ff2848")
  .addField("Membro", membro.user.tag, false)
  .addField("Moderador", message.author.tag, false)
  .addField("Motivo", motivo, false)
  message.channel.send(embed)
  membro.ban({reason: motivo})
  
}