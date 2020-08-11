const Discord = require("discord.js");
const {
    get
} = require("snekfetch");
module.exports.run = async (bot, message, args) => {
    try {
        get("https://nekos.life/api/v2/fact").then(res => {
            const embed = new Discord.MessageEmbed()
                .setDescription(res.body.fact)
                .setColor("fea5ff")
                .setAuthor(`Fatos!`)
            setTimeout(() => {
                return message.channel.send({
                    embed
                });
            }, 300);
        });
    } catch (err) {
        console.log(err);
    }

}