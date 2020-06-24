const Discord = require("discord.js");

module.exports.run = async (client,message,args) => {
        if(message.guild === null)message.channel.send("Isso não é um Servidor!")
    else{
        var rolename = args.slice().join(" ");
        if(message.member.hasPermission('ADMINISTRATOR' || 'MANAGE_ROLES')){
            if(args[0]){
  /*          message.guild.createRole({
   name: rolename,
   hoist: false, 
   mentionable: false
   })*/
   message.guild.roles.create({
    data: {
      name: rolename,
    },reason: `Criado por: ${message.author.username} (${message.author.id})`,})
   message.channel.send("Criei o cargo: " + rolename);
   }
   else message.channel.send("Não Consigo Criar um Cargo com esse Nome")
        }
        else message.channel.send("Você não Tem Permissão")
    }
}

module.exports.help = {
    name: "createrole",
    aliases: ['cr']
}