var Discord = require('discord.js');

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.reply('Você não pode Ultilizar este comando!');

    var user = msg.mentions.users.first();
    if(!user) return msg.reply('Mencione um Usuário!');

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(!member) return msg.reply('O Usuário não está no servidor!');
    if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('Não posso expulsar esta pessoa!');

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('Você não deu uma Rasão!');

    member.kick(reason);

    msg.channel.send(`**${user}** foi expulso por: **${msg.author}**!`);
}