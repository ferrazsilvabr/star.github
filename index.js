const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://stardb:stardb2020@cluster0-avxy3.mongodb.net/<dbname>?retryWrites=true&w=majority', { 
  
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then (function () {
  console.log("\x1b[32m[ BANCO DE DADOS ] \x1b[0mBanco de dados foi ligado")
}).catch (function () {
  console.log("\x1b[31m[ BANCO DE DADOS ] \x1b[0mBanco de dados desligado por erro")
});

require("./blacklist.js");
const bldb = require("./blacklist.js");
const Discord = require("discord.js"); //Conexão com a livraria Discord.js
const client = new Discord.Client(); //Criação de um novo Client
const config = require("./config.json"); //Pegando o prefixo do bot para respostas de comandos

client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix)) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();


    try {
                bldb.findOne({_id:message.author.id}, (err, bl) => {
    if(bl) {
      const detectado = new Discord.MessageEmbed()
      .setTitle("Você foi adicionado na BlackList")
      .setColor("RED")
      .setDescription("Sistema de blacklist")
      return message.channel.send(detectado)
    } else {
  
        const commandFile = require(`./comandos/${command}`)
        commandFile.run(client, message, args);
                }
                })
    } catch (err) {
    console.error('Erro:' + err);
  }
});


// Star Dreams
client.on("guildMemberAdd", async (member) => { 

  let guild = await client.guilds.cache.get("721849277562749049");
  let channel = await client.channels.cache.get("722761762029699122");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "nomedoemoji");
  if (guild != member.guild) {
    return console.log("Sem boas-vindas pra você! Sai daqui saco pela.");
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`<a:2184_wumpus_color_gif:720298050916057159> Bem-vindo(a) <a:2184_wumpus_color_gif:720298050916057159>`)
      .setImage("https://i.imgur.com/pqlOncV.gif")
      .setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Bem Vindo!")
      .setTimestamp();
      member.roles.add("722875240509735072");

    channel.send(embed);
  }
});

client.on("guildMemberRemove", async (member) => { 

  let guild = await client.guilds.cache.get("721849277562749049");
  let channel = await client.channels.cache.get("722761794137096202");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "nomedoemoji");
  if (guild != member.guild) {
    return console.log("Algum saco pela saiu do servidor. Mas não é nesse, então tá tudo bem :)");
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`<a:2184_wumpus_color_gif:720298050916057159> Adeus! <a:2184_wumpus_color_gif:720298050916057159>`)
      .setImage("https://i.imgur.com/pqlOncV.gif")
      .setDescription(`**${member.user.username}**, saiu do servidor! :broken_heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Até Logo!")
      .setTimestamp();

    channel.send(embed);
  }
});
// Snoway
client.on("guildMemberAdd", async (member) => { 

  let guild = await client.guilds.cache.get("724030656677544007");
  let channel = await client.channels.cache.get("724031551435833444");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "nomedoemoji");
  if (guild != member.guild) {
    return console.log("Sem boas-vindas pra você! Sai daqui saco pela.");
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`<a:2184_wumpus_color_gif:720298050916057159> Bem-vindo(a) <a:2184_wumpus_color_gif:720298050916057159>`)
      .setImage("https://i.imgur.com/pqlOncV.gif")
      .setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Bem Vindo!")
      .setTimestamp();
      member.roles.add("724038922224795740");

    channel.send(embed);
  }
});

client.on("guildMemberRemove", async (member) => { 

  let guild = await client.guilds.cache.get("724030656677544007");
  let channel = await client.channels.cache.get("724031552182288484");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "nomedoemoji");
  if (guild != member.guild) {
    return console.log("Algum saco pela saiu do servidor. Mas não é nesse, então tá tudo bem :)");
   } else {
      let embed = await new Discord.MessageEmbed()
      .setColor("#7c2ae8")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setTitle(`<a:2184_wumpus_color_gif:720298050916057159> Adeus! <a:2184_wumpus_color_gif:720298050916057159>`)
      .setImage("https://i.imgur.com/pqlOncV.gif")
      .setDescription(`**${member.user.username}**, saiu do servidor! :broken_heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Até Logo!")
      .setTimestamp();

    channel.send(embed);
  }
});

// # Verificador-de-Votos

/* Verifica votos do Bots Para Discord, sem a necessidade de API
* Créditos: wiloficial#9287
* Modificado: Você?#1330
* Bot: https://botsparadiscord.com/bots/647956954358218752
* Servidor: https://discord.com/invite/y2gAPVA
* 
*  Caso tenha necessidade de modificar algo fique a vontade!
*/

 // crie um webhook no canal que deseja receber os últimos votos e configure essa primeira linha
  const voto = new Discord.WebhookClient('722064590845771846', 'eWyvg_h-M6SBthIi9IXew_WWYQcAuftGDNS5ZWIezp9e1cfMCRiT9CMonmYd3D_0WeKS'),

  // configuração (Já está com o necessário)
   bot_id = "719524114536333342", // BOT = Bots Para Discord
   channel_id = "722063350304866314" // Canal site_logs

client.on("message", async message => { // Se o seu for "bot.on" só modificar.
 
        // configuração (Já está com o necessário)
        const bot_id = "719524114536333342",//"550305758583980042" // BOT = Bots Para Discord
         channel_id = "722063350304866314" //"537433191393525760" // Canal site_logs

        try {
          // Verifica se a mensssagem enviada é no canal especificado acima, e reparte toda a menssagem (caso seja)
          if (message.author.id === bot_id && message.channel.id === channel_id) {
            let separador = message.content.split(' '),
              parte_1 = message.content.substr(message.content.indexOf("#")),
              parte_2 = parte_1.substr(7),
              parte_3 = parte_2.substr(parte_2.indexOf(")", "."))
            parte_2.replace(parte_3, "")

            let bot_name_1 = parte_3.replace(") votou no bot **`", ''),
              bot_name_2 = bot_name_1.replace("`**.", ''),
              bot_name_3 = bot_name_2.replace(`https://botsparadiscord.com/bots/${client.user.id}`, ''),
              bot_name_4 = bot_name_3.replace("<>", ''),
              bot_name_final = bot_name_4.replace(/(\r\n|\n|\r)/gm, "")

            // Aqui verifica se a menssagem repartida tem a tag do seu bot
            if (bot_name_final === client.user.tag) { // Defina a tag do seu bot ex: 'ZabbiX#7853' ou 'bot.user.tag' || 'client.user.tag'

            // Pra pegar o ID do usuário
              let sep = separador[2],
               sep1 = sep.replace("(", ''),
               userID = sep1.replace(")", '')

        /* ATRIBUIÇÃO DE PRÊMIOS
        * Aqui você pode atribuir prêmiação a quem votar no seu bot
        * Moedas, Vips, Outras coisas . . .
        * O ID do usuário "userID"
        */
              
              let userDiscord = await client.fetchUser(userID) // Pesquise o usuário pelo ID, e envie uma mensagem informando que ganhou algo, ou agradeça pelo voto
              userDiscord.send(`Você votou na Star!
(Vote de 8h em 8h) :partying_face:`) // Pode modificar e enviar uma embed
             
             // Configurção e Envio do WebHook //
             await voto.send(`:partying_face: \`` + separador[1] + `\` votou no ${client.user.tag}! :tada:
>>> \`Vote você também!\`
:link: https://botsparadiscord.com/bots/${client.user.id}/votar`, { // Recebeu 1 dia de \`VIP\`! :sunglasses:
                username: client.user.username, //Definição do nome do WebHook
                avatarURL: client.user.displayAvatarURL // Definição da imagem do WebHook
              }) 
            }
          }
        } catch (e) {
          console.log('Algo aconteceu :/\n' + e)
        }
})

client.on("ready", () => {
  let activities = [
      `Utilize ${config.prefix}help para ver meus comandos ^^`,
      `Estou em: ${client.guilds.cache.size} servidores lindos ❤️!`,
      `Monitorando: ${client.channels.cache.size} canais!`,
      `Conheço: ${client.users.cache.size} pessoinhas diferentes! ^^`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
     type: "STREAMING", url: "https://www.twitch.tv/adg_ofc"
      }), 1000 * 60);  // WATCHING, LISTENING, PLAYING, STREAMING

  client.user
      .setStatus("online") // idle, dnd, online, invisible
      .catch(console.error);
console.log("Estou Online!")
});

client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token