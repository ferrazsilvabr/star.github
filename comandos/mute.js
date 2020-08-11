const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mutar",
  usage: "mute <@mention> <reason>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "**Você Não Tem Permissão Para Executar Esse Comando!**"
      );
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("**Eu Não Tenho Permissão Para Gerenciar Os Cargos!**");
    }

    const user = message.mentions.members.first();
    
    if(!user) {
      return message.channel.send("**Você Precisa Mencionar O Usuário Que Deseja Mutar!**")
    }

    if(user.id === message.author.id) {
      return message.channel.send("**Você Não Pode Mutar Você Mesmo**");
    }
    
    
    let reason = args.slice(1).join(" ")
    
    
    if(!reason) {
      return message.channel.send("**Você Precisa Colocar O Motivo Do Mute!**")
    }
    
  //TIME TO LET MUTED ROLE
    
    let muterole = message.guild.roles.cache.find(x => x.name === "StarMute")
    
    
      if(!muterole) {
      return message.channel.send("**Este Server Precisa Ter O Cargo** `StarMute`**!**")
    }
    
    
   if(user.roles.cache.has(muterole)) {
      return message.channel.send("**O Usuário Ja Foi Mutado!**")
    }
    
  
    
    
    user.roles.add(muterole)
    
await message.channel.send(`**Mutado:** ${message.mentions.users.first().username} **Motivo:** \`${reason}\``)
    
  }
};