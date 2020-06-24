const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client,message,args) => {
    fetch("https://random.dog/woof.json")
    .then(res => res.json())
    .then(json => {message.channel.send({"embed": {
        "description": `Doguinhos do Reddit!`,
        "url": "https://discordapp.com",
        "color": 11733342,
        "footer": {
          "text": "l!dog"
        },
        "image": {
          "url": json.url
        }
       
      }})})
}

module.exports.help = {
    name: "doggo",
    aliases: ['dog']
}