module.exports = {
  name: "Desmutar",
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

    if (!user) {
      return message.channel.send(
        "**Você Precisa Mencionar O Usuário Que Deseja Desmutar!**"
      );
    }
    
    let muterole = message.guild.roles.cache.find(x => x.name === "StarMute")
    
    
 if(user.roles.cache.has(muterole)) {
      return message.channel.send("**Este Usuário Já Foi Desmutado!**")
    }
    
    
    user.roles.remove(muterole)
    
    await message.channel.send(`**${message.mentions.users.first().username}** Desmutado!`)

  }
};