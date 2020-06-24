const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let jsicon = "https://discord.js.org/static/logo-square.png"

    message.delete();

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Você não tem permissão para desbanir alguém!");
    let reason = args.slice(1).join(' ');

    let user = args[0];
    if (reason.length < 1) return message.reply('Você deve fornecer um motivo para desbanir.');
    if (!user) return message.reply('Você deve fornecer a id do usuário.').catch(console.error);

    let unbanEmbed = new Discord.MessageEmbed()
    .setDescription("Unban")
    .setColor("#ff2848")
    .addField("Usuário:", `${user}`)
    .addField("Moderador:", `<@${message.author.id}> ID: ${message.author.id}`)
    .addField("Desbanido em", message.channel)
    .addField("Tempo:", message.createdAt)
    .addField("RMotivo:", reason)
    .setTimestamp()
    .setFooter("Star ©2020", jsicon);

    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return message.channel.send("Não foi possível encontrar o canal.");

    message.guild.unban(user);
    incidentchannel.send(unbanEmbed);
}

module.exports.help = {
    name: "unban"

}