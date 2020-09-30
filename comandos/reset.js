const Discord = require('discord.js')
const mongoose = require('mongoose')
const logChannel = require('../messagelog.js')
const autorole = require('../autorole.js')

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) {
  return message.channel.send('❌ Você precisa de permissão de ADMINISTRADOR para ultilizar este comando')
  }

  if(!args[0]) {
  let argsembed = new Discord.MessageEmbed()
  .setTitle('Resetar')
  .setDescription(`Escolha um comando para resetar\n
  \`s!reset messagelog\` Reseta as logs de mensagens.
  \`s!reset autorole\` Reseta o cargo automatico do servidor.`)
  .setColor('GREEN')
  message.channel.send(argsembed)
  } else
if(message.author.bot || message.channel.type === 'dm') {return;}
        let messageinfocontent = message.content.toLowerCase()
    switch(args[0]) {
      case 'messagelog':
        logChannel.deleteOne({ GuildID: message.guild.id }, (err) => console.log(err))
        let messagelogembed = new Discord.MessageEmbed()
        .setTitle('Logs Resetadas')
        .setDescription('O Canal de logs neste servidor foi resetada!')
        .setColor('GREEN')
        message.channel.send(messagelogembed)
        break;
      case 'autorole':
      autorole.deleteOne({ GuildID: message.guild.id }, (err) => console.log(err))
      let autoroleembed = new Discord.MessageEmbed()
      .setTitle('Autorole Resetado')
      .setDescription('O Cargo automatico foi resetado!')
      .setColor('GREEN')
      message.channel.send(autoroleembed)
    }
}
exports.help = {
    name: 'reset',
    aliases: ['resetar']
}