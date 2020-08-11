/**
 * O Comando "botinfo"mostrará informações do bot
 */

const Discord = require('discord.js')
const moment = require('moment')

moment.locale('pt-br')

module.exports = {

  run: function (client, message, args) {
    const inline = true
    const botAvatar = client.user.displayAvatarURL
    const date = client.user.createdAt
    const userName = client.user.username
    const servsize = client.guilds.size
    const usersize = client.users.size
    const status = {
      online: '<:online:556678187786960897> Online',
      offline: '<:offline:556678259778256896> Offline'
    }
      let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let uptime = `🗓️ ${days.toFixed()} dias\n🗓️ ${hours.toFixed()} horas\n🗓️ ${minutes.toFixed()} minutos\n🗓️ ${seconds.toFixed()} segundos`;


    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle('🤖 • Minhas informações!')
      .addField('**Meu nick:**', userName, false)
      .addField('**Meu ID:**', client.user.id, false)
      .addField('**Servidores:**', ` ${client.guilds.cache.size}`, false)
      .addField('**Usuários:**', `${client.users.cache.size}`, false)
      .addField('**Estou online há:**', `${uptime}`)
      .addField('**Criado em:**', formatDate('DD/MM/YYYY, às HH:mm:ss', date))
      .setImage("https://top.gg/api/widget/719524114536333342.svg")
      .setFooter(`2020 © ${client.user.username}.`)
      .setTimestamp()

    if (client.user.presence.status) {
      embed.addField(
        '**Status**',
        `${status[client.user.presence.status]}`,
        inline,
        true
      )
    }

    message.channel.send(embed)
  },

  conf: {},

  get help () {
    return {
      name: 'botinfo',
      category: 'Info',
      description: 'Mostra informações do bot.',
      usage: 'botinfo'
    }
  }
}
/**
 * Formata a data passada para o padrão do Brasil.
 * @param {string} template
 * @param {Date=} [date]
 * @return {string}
 */
function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}