const express = require('express');
const app = express();
const talkedRecently = new Set();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCSeconds()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});

app.listen(process.env.PORT);
const mongoose = require("mongoose");
require("snekfetch")
mongoose.connect(process.env.MONGO, { 
  
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then (function () {
  console.log("\x1b[32m[ BANCO DE DADOS ] \x1b[0mBanco de dados foi ligado")
}).catch (function () {
  console.log("\x1b[31m[ BANCO DE DADOS ] \x1b[0mBanco de dados desligado por erro")
});

require("./blacklist.js");
const bldb = require("./blacklist.js");
const Discord = require("discord.js");
const client = new Discord.Client({ disableMentions: 'everyone'});
const config = require("./config.json");
const { prefix } = require("./config.json")
const ytdl = require('ytdl-core');
const db = require('quick.db')
const DBL = require("dblapi.js");
const Money = require("./money.js");
const autorole = require('./autorole.js');
const votosZuraaa = require('./votosZuraaa.js');
const logChannel = require('./messagelog.js');
const fs = require('fs');
const AFK = require('./afk.js');
const emoji = require('./emojis.json');
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxOTUyNDExNDUzNjMzMzM0MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk1NTk2ODMxfQ.izb6Ux2AnD1ISIHX8k5DpP6vWeUfIDir4cO_zwc2F98', client);
// Optional events
dbl.on('posted', () => {
  console.log('Server count posted!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})


client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;

      let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: config.prefix
        };
    }
     let prefix = prefixes[message.guild.id].prefixes;
     
      if (message.mentions.has(client.user)) { 
        const mencionada = new Discord.MessageEmbed() .setDescription(`<:catblush:738179935692390462> » Olá, ${message.author}, Ultilize \`${prefix}ajuda\` para ver meus comandos`)
        .setColor('PURPLE')
      message.channel.send(mencionada);
      }

     if (!message.content.toLowerCase().startsWith(prefix)) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

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

client.on('message', message => {
    votosZuraaa.verificaVotos(message, function(user){
        const obrigado = new Discord.MessageEmbed()
        .setTitle('🎉 Obrigado pelo seu Voto!')
        .setDescription('Obrigada por votar em mim, cada voto me ajuda a crescer! Continue votando e sendo uma pessoa incrível!')
        .setColor('BLUE')
        user.send(obrigado);
        const voted = new Discord.MessageEmbed()
        .setTitle('🥳 Obrigado pelo seu Voto!')
        .setDescription(`\`${user.tag}\` votou em mim! Vote você também e seja uma pessoa incrível!\nhttps://zuraaa.com/bots/719524114536333342/votar`)
        .setColor('BLUE')
        client.channels.cache.get(`752295111718862948`).send(voted)
        });
    });

const adicionada = new Discord.WebhookClient('752297039924297819', 'GJTDu8zgmY0VFIjQfYFMgEkkV7JoOHI_z_CySH0f8xvF46q0VHkAPr5av8vJP_LW8EnP')
client.on("guildCreate", guild => {
  let embed = new Discord.MessageEmbed()
  .setTitle(`Fui adicionada em um servidor!`)
  .setDescription(`Membros: ${guild.memberCount} membros\nDono: ${guild.owner}\nID: ${guild.owner.id}\nServidor: ${guild.name}`)
  .setThumbnail(guild.displayAvatarURL)
  .setTimestamp()
  .setColor('RANDOM')
  adicionada.send(embed);
  client.channels.cache.get("753286566113312878").edit({name: `📝・${client.guilds.cache.size} Servidores`});
  client.channels.cache.get("753302264424431767").edit({name: `👥・${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Usuários`});
  guild.owner.send(`Olá, ${guild.owner}\n\nNão sei se foi você ou outra pessoa que me adicionou no servidor **${guild.name}**, mas já que você é o dono eu acho que seria uma boa ideia falar um pouco sobre mim.\n\nEu me chamo **Star:tm:** e sou apenas um simples bot para o Discord! Meu objetivo é deixar o seu servidor mais divertido 🥳\n\nSe precisar de ajuda ou tenha alguma duvida, entre no meu servidor de suporte: https://discord.gg/Gq2kssT`)
})

const removida = new Discord.WebhookClient('752297039924297819', 'GJTDu8zgmY0VFIjQfYFMgEkkV7JoOHI_z_CySH0f8xvF46q0VHkAPr5av8vJP_LW8EnP')
client.on("guildDelete", guild => {
  let embed = new Discord.MessageEmbed()
  .setTitle(`Fui removida de um servidor!`)
  .setDescription(`Membros: ${guild.memberCount} membros\nDono: ${guild.owner}\nID: ${guild.owner.id}\nServidor: ${guild.name}`)
  .setThumbnail(guild.displayAvatarURL)
  .setTimestamp()
  .setColor('RANDOM')
  removida.send(embed);
  client.channels.cache.get("753286566113312878").edit({name: `📝・${client.guilds.cache.size} Servidores`});
  client.channels.cache.get("753302264424431767").edit({name: `👥・${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Usuários`});
});

client.on('messageDelete', async (message) => {
  logChannel.findOne({ GuildID: message.guild.id }, async (err, data12) => {
  if(!data12) return;
  if(message.author.bot) return;
  let messageChannel = client.channels.cache.get(data12.MessageLogChannel)
  let messageDeleteEmbed = new Discord.MessageEmbed()
  .setAuthor('Mensagem Deletada')
  .setDescription(`**Usuário**\: <@${message.author.id}>
  **Canal**\: <#${message.channel.id}>
  ${message.content}`)
  .setColor('RED')
  .setFooter(`ID da mensagem\: ${message.id}`)
  .setTimestamp()
  messageChannel.send(messageDeleteEmbed)
  });
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
  logChannel.findOne({ GuildID: oldMessage.guild.id }, async (err, data53) => {
  if(!data53) return;
  if(newMessage.author.bot) return;
  let messageChannel2 = client.channels.cache.get(data53.MessageLogChannel)
  let messageUpdateEmbed = new Discord.MessageEmbed()
  .setAuthor('Mensagem Editada')
  .setDescription(`**Usuário**\: <@${oldMessage.author.id}>
  **Canal**\: <#${oldMessage.channel.id}>`)
  .addField('Antes\:', `${oldMessage.content}`)
  .addField('Depois\:', `${newMessage.content}`)
  .setColor('YELLOW')
  .setFooter(`ID da mensagem\: ${newMessage.id}`)
  .setTimestamp(newMessage.editedTimestamp)
  messageChannel2.send(messageUpdateEmbed)
  });
});

client.on('guildMemberAdd', async member => {
  autorole.findOne({ GuildID: member.guild.id }, async (err, data432) => {
    if(!data432) return;
    let autorolerole = member.guild.roles.cache.get(data432.RoleID)
    member.roles.add(autorolerole)
  })
})

client.on("message", msg => {
    if(msg.channel.id == '754691920625926228'){
        msg.react("a:sim:753735844812161034");
        msg.react("a:nao:753735889783357560");
    }
});

client.on("message", msg => {
    if(msg.channel.id == '754838235842084934'){
        msg.react(":dorime_doge:753736909045497958")
    }
});

client.on("message", msg => {
    if(msg.channel.id == '754838581507391548'){
        msg.react(":dorime_doge:753736909045497958")
    }
});

// Carinha lá
client.on("guildMemberAdd", async (member) => { 

  let guild = await client.guilds.cache.get("714930300924461057");
  let channel = await client.channels.cache.get("755277456969302057");
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
      member.roles.add("752651499133337731");

    channel.send(`<a:welcome:755429019230404618>  Olá ${member.user} Bem-Vindo(a) a **${guild.name}** Passa em <#755277453408337981> para obter tags <a:hypegato:755445409157218484>`).then(msg=> {
    msg.delete({ timeout: 30000 });
    })
  }
});

// Star Dreams
client.on("guildMemberAdd", async (member) => { 

  let guild = await client.guilds.cache.get("749990091174445078");
  let channel = await client.channels.cache.get("752651133184639089");
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
      member.roles.add("752651499133337731");

    channel.send(embed);
  }
});

client.on("guildMemberRemove", async (member) => { 

  let guild = await client.guilds.cache.get("749990091174445078");
  let channel = await client.channels.cache.get("752651151240986696");
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

const comando = new Discord.WebhookClient('752297039924297819', 'GJTDu8zgmY0VFIjQfYFMgEkkV7JoOHI_z_CySH0f8xvF46q0VHkAPr5av8vJP_LW8EnP')
 client.on('message', message => {
   if (!message.content.toLowerCase().startsWith(prefix)) return;
   if (message.author.bot) return;
   if (message.channel.type == 'dm') return;
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
  client.channels.cache.get("753302264424431767").edit({name: `👥・${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Usuários`});
  console.log('Canal Atualizado')
})

client.on("guildMemberRemove", (member) => {
  client.channels.cache.get("753302264424431767").edit({name: `👥・${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Usuários`});
  console.log('Canal Atualizado')
})

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
      `Conheço: ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} pessoinhas diferentes! ^^`,
      `Amor para todo o mundo ❤️!`,
      `Alegria para todos os meus usuários`,
      `Ultilize ${config.prefix}upvote para votar em mim!`,
      `Entre em meu servidor de suporte! https://discord.gg/2pFH6Yy`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
     type: "STREAMING", url: "https://www.twitch.tv/adg_ofc"
      }), 10000);  // WATCHING, LISTENING, PLAYING, STREAMING

  client.user
      .setStatus("online") // idle, dnd, online, invisible
      .catch(console.error);
client.channels.cache.get('753289576910553098').send('<:online:556678187786960897> Estou Online e funcionando corretamente! <:online:556678187786960897>')
console.log('Estou Online!')
});

client.login(process.env.TOKEN); //Ligando o Bot caso ele consiga acessar o token 