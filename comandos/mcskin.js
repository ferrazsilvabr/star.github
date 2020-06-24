const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let reason = args.slice(0).join(' ');
    if (reason.length < 1) return message.reply('**Cite um nick de minecraft**')

    let embed = new Discord.MessageEmbed()
        .setTitle(`<a:mine:725328951710318701>┃Skin de ${args[0]}`)
        .setDescription(`Para baixar [Clique Aqui!](https://mc-heads.net/download/${args[0]})`)
        .setImage(`https://mc-heads.net/body/${args[0]}`)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp(new Date())
        .setColor('RANDOM')
    message.channel.send(embed)
}

exports.help = {
    name: 'mcskin'
}