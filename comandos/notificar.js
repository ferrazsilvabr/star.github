const Discord = require("discord.js");

exports.run = (client, message, args) => {

const role = guild.roles.cache.find(role => role.name === '❪ 🔔 ❱❱❱ Notificar (s!notificar)');
const member = message.mentions.members.first();
member.roles.add(role);
}