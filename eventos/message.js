const config = require("../config.json");
const prefix = config.prefix
const cooldownMap = new Map();
const db = require("quick.db");
const Discord = require('discord.js')

let server = "749990091174445078"
module.exports = (client, message) => {
    

  if (message.content.indexOf(prefixo) !== 0) return;

  const args = message.content.slice(prefixo.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  
  const cmdParaExecutar = client.cmds.get(cmd) || client.aliases.get(cmd);
  if (!cmdParaExecutar) return;
  let user = db.fetch(`failon_${message.author.id}`);
  if(user == true) return message.channel.send("Você está proíbido de usar meus comandos!");
  
  client.channels.cache.get("704313434367459359").send(`\`${message.author.tag} | ${message.author.id}\` usou o comando \`${cmd}\` no servidor \`${message.guild.name}\``)
  if (cmdParaExecutar != null) cmdParaExecutar.run(client, message, args);
  })
// ASSUMPTIONS:
// message is the message that triggered the command
// the channel of the invite will be the channel where the message has been sent


// ASSUMPTIONS:
// message is the message that triggered the command
// the channel of the invite will be the channel wh
 /* let invite = message.channel.createInvite(
  
    maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
    maxUses: 1 // maximum times it can be used
  })
  */

  
  
//message.channel.send("Estou sendo iniciado pfv aguarde ...")
/*if(message.author.id === "407859300527243275") {
    cmd.run(client, message, args)
 } else {
   let tempo = 5 + " Horas"
   message.channel.send("Olá meu amigo<3, estou em manutenção... Tempo restante: " + tempo/*, {file: "https://media.tenor.com/images/3eb39fb698fada2b160bdb7df1bbdc81/tenor.gif"})}*/
    /*.catch(err => {
    message.channel.send(`Não foi possível executar comando: ${err}`)
  });*/
  



  
};