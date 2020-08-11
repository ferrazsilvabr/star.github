const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let botEmbed = new Discord.MessageEmbed()

    .setAuthor("Redes Sociais")
    .setColor("#28a18f")
    .setDescription(`Meu Twitter: [@Starzinha_BOT](https://twitter.com/Starzinha_BOT) \nTwitter do ADG: [@4DG_YT](https://twitter.com/4DG_YT)`)
    message.channel.send(botEmbed);
}