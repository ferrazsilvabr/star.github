const commando = require('discord.js-commando');
const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");


class UserInfoCommand extends commando.Command
{
    constructor(client)
    {
        super(client,{
            name: "userinfo",
            group: "simple",
            memberName: "userinfo",
            description: "Gives the user's info"
        });
    }

    async run(message, args)
    {
        let user = message.mentions.users.first(); message.author;

        let userInfo = {};
        userInfo.avatar = user.displayAvatarURL()
        userInfo.name = user.username
        userInfo.discrim - `#${user.discriminator}`;
        userInfo.id = user.id
        userInfo.registered = moment.utc(message.guild.members.get(user.id).user.createdAt).format("dddd, MMMM Do, YYYY")
        userInfo.joined = moment.utc(message.guild.members.get(user.id).joinedAt).format("dddd, MMMM Do, YYYY");
        
        const embed = new Discord.MessageEmbed()
        .setAuthor(user.tag, userInfo.avatar)
        .setThumbnail(userInfo.avatar)
        .addField('Username', userInfo.name, true)
        .addField('Discriminator', userInfo.discrim, true)
        .addField('ID' , userInfo.id, true)
        .addField('Registered', userInfo.registered)
        .addField('Joined', userInfo.joined)

       return message.channel.send(embed);
    }

}

module.exports = UserInfoCommand;