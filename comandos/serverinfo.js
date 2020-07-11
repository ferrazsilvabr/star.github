/**
 * O Comando "serverinfo" mostrará informações do servidor
 */

const Discord = require('discord.js')
let longify = require('nekos-longify-function');

const moment = require('moment')
moment.locale('pt-br')

module.exports = {
  

  run: function (client, message, args) {
    const date = message.guild.createdAt
    const joined = message.member.joinedAt

    const region = {
      brazil: ':flag_br: Brazil',
      europe: 'Europa',
      hongkong: 'Hong Kong',
      india: 'Índia',
      japan: 'Japão',
      russia: 'Rússia',
      singapore: 'Singapore',
      southafrica: 'Africa do Sul',
      sydney: 'sydney',
      uscentral: 'US Central',
      useast: 'US East',
      ussouth: 'US Sul',
      uswest: 'US West'
    }

    const verificationLevel = {
      none: 'Nenhuma',
      low: 'Baixa',
      medium: 'Média',
      high: 'Alta',
      taller: 'Mais Alta!'
    }

    const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setThumbnail(message.guild.iconURL())
      .setTitle("<:earlysupporter:556682087579516968> • Informações do servidor!")
      .addField('**<a:verificado:708359371507105893> Nome:**', message.guild.name, true)
      .addField('**<:certified:556682763814699008> ID:**', message.guild.id, true)
      .addField('**<:owner:556682207532679189> Posse:**', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
      .addField('**Região:**', region[message.guild.region], true)
      .addField('**Membros:**',  `${message.guild.memberCount}`, true)
      .addField('**Canais:**', message.guild.channels.cache.size, true)
      .addField('**<:earlysupporter:556682087579516968> Criado dia:**', formatDate('DD/MM/YYYY, às HH:mm:ss', date), true)
      .addField('**<a:updating:556685577152626688> Você entrou dia:**', formatDate('DD/MM/YYYY, às HH:mm:ss', joined), true)
      .addField('**Verificação:**', message.guild.verificationLevel, true)
      .setFooter('2020 © Star™️.')
      .setTimestamp()

    // Aqui sera enviado o embed no canal que o usuário executo o comando
    message.channel.send(embed)
  },
  /**
     * Aqui podemos colocar mais algumas configurações do comando.
     */
  conf: {},

  /**
     * Aqui exportamos ajuda do comando como o seu nome categoria, descrição, etc...
     */
  get help () {
    return {
      name: 'serverinfo',
      category: 'Info',
      description: 'Informação sobre o servidor',
      usage: 'serverinfo'
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