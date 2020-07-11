const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client,message,args) => {
  fetch('http://aws.random.cat//meow')
  .then(res => res.json())
  .then(json => message.channel.send({"embed": {
    "description": `Gatinhos do Reddit! `,
    "url": "https://discordapp.com",
    "color": 11733342,
    "footer": {
      "text": "🐱 s!cat"
    },
    "image": {
      "url": json.file
    }
   
  }}));
}

module.exports.help = {
    name: "cat",
    aliases: ['kitty']
}