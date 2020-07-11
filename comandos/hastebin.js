const hastebin = require('hastebin-gen');
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
exports.run = (client, message, args, level) => {
  hastebin(args.join(' '), "js").then(r => {
      var hastLink = r
      const hastEmb = new MessageEmbed()
      .setAuthor("📜┃Hastebin")
      .setColor("RED")
      .setURL(hastLink)
      .addField('Link: ', `${hastLink}`)
       message.channel.send({embed: hastEmb})
  }).catch(console.error);  
}