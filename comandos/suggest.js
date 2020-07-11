const Discord = require('discord.js')
const c = require('../config.json')
exports.run = async (client, message, args) => {

    let mensg = args.join(' ')
    if (!mensg) {
        message.channel.send(`${message.author}, digite uma sugestão. :mailbox_with_no_mail:`)
        return undefined;
    }

    const embed = new Discord.MessageEmbed()
        .setAuthor(`Sugestão de ${message.author.username}#${message.author.discriminator}`, message.author.AvatarURL)
        .setDescription(`${mensg}`)
        .setColor('RANDOM')
        .setThumbnail(message.author.AvatarURL)
        .setTimestamp()
    client.channels.cache.get(`727241470406426714`).send(embed)
        .then(function (msg) {
            msg.react(":sim:723648837692162088");
            msg.react(":nao:723648836278681682"); 
            message.delete({
                timeout: 1000
            });
            message.channel.send(`**Sua sugestão foi enviada! :mailbox_with_no_mail:**`).then(msg => msg.delete(5000))
        }).catch(function (error) {
            console.log(error);
        });
}