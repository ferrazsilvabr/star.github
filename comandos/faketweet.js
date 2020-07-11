const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args, texts, prefix) => { // eslint-disable-line no-unused-vars
  
     let xdemb = new Discord.MessageEmbed()
  .setColor("#00ff00")
  .setTitle(`Fake tweet`)
  .addField("Descrição:", "Faça um fake tweet!", true)
  .addField("Use:", "s!faketweet [username] [text]", true)
  .addField("Examplo:", "s!faketweet 4DG_OFC Asas")

     
      let user = args[0];
      let text = args.slice(1).join(" ") || undefined;
      if (!user) return message.channel.send(xdemb);
      if (user.startsWith("@")) user = args[0].slice(1);

      const type = user.toLowerCase() === "realdonaldtrump" ? "trumptweet" : "tweet";
      const u = user.startsWith("@") ? user.slice(1) : user;

      if (!text) {
        text = await this.client.awaitReply(message, "Escreva a Mensagem", 30000);
        if (text.toLowerCase() === "cancel") return message.channel.send("Cancelled.");
      }

      message.channel.startTyping();

      fetch(`https://nekobot.xyz/api/imagegen?type=${type}&username=${u}&text=${encodeURIComponent(text)}`)
        .then(res => res.json())
        .then(data => message.channel.send({ file: data.message }))
        .catch(error => {
          this.client.logger.error(error);
          message.channel.stopTyping(true);
          return message.channel.send(texts.general.error.replace(/{{err}}/g, error.message));
        });

        message.channel.stopTyping(true);
    };

module.exports.help = {
    name: "faketweet",
    aliases: ['fake', 'tweet', 'ft']
}