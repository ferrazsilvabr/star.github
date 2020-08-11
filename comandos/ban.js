var Discord = require('discord.js');

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('BAN_MEMBERS')) return msg.reply('Você não pode Ultilizar este comando!');

    if(!message.guild.me.permissions.has("BAN_MEMBERS")) {
    return message.reply("Eu não tenho a permissão necessária!")
  }

    var user = msg.mentions.users.first();
    if(!user) return msg.reply('Mencione um Usuário!');

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(member){
        if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply('Não posso banir esta pessoa!');
    }

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply('Você não deu uma Rasão!');

   
    msg.guild.members.ban(user); // This should not be user.id like I said in my video. I made a mistake. Sorry! :)

    msg.channel.send(`**${user}** foi banido por: **${msg.author}**!`);
}