const Discord = require('discord.js');

exports.run = (client, message, args) => {

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Você precisa da permissão `BAN_MEMBERS` para executar essa ação.");
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Eu não tenho permissão para fazer isso!");
    
        let banMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!banMember) return message.channel.send("Por favor, coloque um usuario valido para eu banir!");

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "O motivo não foi informado.";

        
        try {
            message.guild.ban(banMember, {days: 7}).then(() => {
                message.guild.unban(banMember);
            }).catch((e) => {
                console.log(e);
            });
        } catch (e) {
            console.log(e);
    }
    
    message.channel.send(`${banMember.user.username} foi banido pelo motivo ${reason}`);
 
}