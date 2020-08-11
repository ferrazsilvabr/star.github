const express = require('express');
const app = express();
const talkedRecently = new Set();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
 
app.listen(process.env.PORT); // Recebe solicitações que o deixa online
const mongoose = require("mongoose");
require("snekfetch")
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
const config = require("./config.json");
const { prefix } = require("./config.json") //Pegando o prefixo do bot para respostas de comandos
const ytdl = require('ytdl-core');
const db = require('quick.db')
const { ShardingManager } = require('discord.js');
const chokidar = require("chokidar");
const {basename} = require("path");
const fs = require("fs");

client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix)) return;
      if (
     message.content.startsWith(`<@!${client.user.id}>`) ||
     message.content.startsWith(`<@${client.user.id}>`)
  ) {
    return message
      .reply("Olá, caso precise de ajuda meu prefixo é `s!`")
      ;
  }

client.on('message', message => {
	if (message.content === '@everyone') {
		const emoji = client.emojis.cache.get(config.emojiID);
	message.react(emoji);
	}
});

client.on('message', message => {
	if (message.content === 'Star') {
		const emoji = client.emojis.cache.get(config.emojiID);
	message.react(emoji);
	}
});

client.on('message', message => {
    if (message.content === 'bocume') {
        message.delete()
    }
});

client.on('message', message => {
	if (message.content === '@here') {
		const emoji = client.emojis.cache.get(config.emojiID);
	message.react(emoji);
	}
});

const servidor = new Discord.WebhookClient('737304623865528322', 'NT1CJDb1qkV4Ed2P5ycCRLapJEftKM_ali5hHKv3m8lVtVkx05qdrhlOirv20nYBjRHU')
client.on('guildCreate', guild => {
   client.on('message', message => {
   if (message.author.bot) return;
   if (message.channel.type == 'dm') return;
    let embeddiretor = new Discord.MessageEmbed()
                //Titulo dela
                .setAuthor("🔔 • Log de servidor!")
                //Aqui seria o icone do servidor que usaram o comando
                .setColor("RANDOM")
                .setThumbnail(message.guild.iconURL)
                //Você pode mudar a descrição e a Field!
                .setDescription(`**🔍 • Dados do servidor!**\n \n **Nome:** ${message.guild.name} \n **ID:** ${message.guild.id} \n **Posse:** ${message.guild.owner.user.username}#${message.guild.owner.user.discriminator} \n **Owner ID:** ${message.guild.owner.user.id} \n**Membros:** ${message.guild.memberCount} \n **Canais:** ${message.guild.channels.cache.size}`)
                //Aqui você coloca o seu id, ou o de outra pessoa
                client.channels.cache.get(`735117159696433232`)
                servidor.send(embeddiretor);
            });
});

if (talkedRecently.has(message.author.id))
  return;
// Adds the user to the set so that they can't talk for 2.5 seconds
talkedRecently.add(message.author.id);
setTimeout(() => {
  // Removes the user from the set after 2.5 seconds
  talkedRecently.delete(message.author.id);
}, 2500);

    const args = message.content
        .trim().slice(prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

                bldb.findOne({_id:message.author.id}, (err, bl) => {
    if(bl) {
      const detectado = new Discord.MessageEmbed()
      .setTitle("Você foi adicionado na BlackList")
      .setColor("RED")
      .setDescription("Sistema de blacklist")
      return message.channel.send(detectado)
    } else {
      try {
        const commandFile = require(`./comandos/${command}`)
        commandFile.run(client, message, args);
            } catch (err) {
      return;
  }
                }
                })
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
      .setTitle(`Bem-vindo(a)`)
      .setImage("https://i.imgur.com/pqlOncV.gif")
      .setDescription(`**${member.user}**, bem-vindo(a) ao servidor **${guild.name}**! Atualmente estamos com **${member.guild.memberCount} membros**, divirta-se conosco! :heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Bem Vindo!")
      .setTimestamp();
      member.roles.add("721859719576158279");

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
      .setTitle(`Adeus!`)
      .setImage("https://i.imgur.com/pqlOncV.gif")
      .setDescription(`**${member.user.username}**, saiu do servidor! :broken_heart:`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setFooter("Até Logo!")
      .setTimestamp();

    channel.send(embed);
  }
});


const comando = new Discord.WebhookClient('737304623865528322', 'NT1CJDb1qkV4Ed2P5ycCRLapJEftKM_ali5hHKv3m8lVtVkx05qdrhlOirv20nYBjRHU')
 client.on('message', message => {
   if (!message.content.toLowerCase().startsWith(config.prefix)) return;
   if (message.author.bot) return;
   if (message.channel.type == 'dm') return;
   if(message.guild.id == "718260055891247195") return;
            //Aqui ele pega o servidor
            var guild = message.guild.get;
            //Usuarios do server
            //Aqui ele vai criar a embed
            let embeddiretor = new Discord.MessageEmbed()
                //Titulo dela
                .setAuthor("🔔 • Log de comandos!")
                //Aqui seria o icone do servidor que usaram o comando
                .setColor("RANDOM")
                .setThumbnail(message.guild.iconURL)
                //Você pode mudar a descrição e a Field!
                .setDescription(`**Usuário:** ${message.author.username}#${message.author.discriminator} \n **ID:** ${message.author.id} \n **Comando:** ${message.content} \n\n **🔍 • Dados do servidor!**\n \n **Nome:** ${message.guild.name} \n **ID:** ${message.guild.id} \n **Posse:** ${message.guild.owner.user.username}#${message.guild.owner.user.discriminator} \n **Owner ID:** ${message.guild.owner.user.id} \n**Membros:** ${message.guild.memberCount} \n **Canais:** ${message.guild.channels.cache.size}`)
                //Aqui você coloca o seu id, ou o de outra pessoa
                client.channels.cache.get(`735117159696433232`)
                comando.send(embeddiretor);
            });

  client.on("guildMemberAdd", (member) => {
  let chx = db.get(`welchannel_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }

  let wembed = new Discord.MessageEmbed()
  .setAuthor(member.user.username, member.user.avatarURL())
  .setTitle(`Bem-vindo(a)`)
  .setColor("#ff2050")
  .setThumbnail(member.user.avatarURL())
  .setDescription(`Seja Bem Vindo ao nosso servidor, espero que se diverta conosco! :heart:`)
  .setImage("https://i.pinimg.com/originals/b8/a7/cf/b8a7cfdf05a6114c20a1c313b8b637cc.gif")
  
  client.channels.cache.get(chx).send(wembed)
})

client.on("guildMemberRemove", (member) => {
  let chx = db.get(`byechannel_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }

function xp(message) {
    if (!client.cooldown.has(`${message.author.id}`) || !(Date.now() - client.cooldown.get(`${message.author.id}`) > client.config.cooldown)) {
        let xp = client.db.add(`xp_${message.author.id}`, 1);
        let level = Math.floor(0.3 * Math.sqrt(xp));
        let lvl = client.db.get(`level_${message.author.id}`) || client.db.set(`level_${message.author.id}`,1);;
        if (level > lvl) {
            let newLevel = client.db.set(`level_${message.author.id}`,level);
            message.channel.send(`:tada: ${message.author.toString()}, você avançou para o nível ${newLevel}!`);
        }
        client.cooldown.set(`${message.author.id}`, Date.now());
    }
}

  let wembed = new Discord.MessageEmbed()
  .setAuthor(member.user.username, member.user.avatarURL())
  .setTitle("Até Logo")
  .setColor("#ff2050")
  .setImage("https://media0.giphy.com/media/3o7btQsLqXMJAPu6Na/giphy-preview.gif")
  .setThumbnail(member.user.avatarURL())
  .setDescription(`Adeus **${member.user.username}** espero que volte logo! :broken_heart:`);
  
  client.channels.cache.get(chx).send(wembed)
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