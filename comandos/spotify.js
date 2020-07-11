const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
 
exports.run = (client, message, args, level) => { 
 
  let user = message.mentions.users.first() || message.author;
 
 
  if (user.presence.activity !== null && user.presence.activity.type === 'LISTENING' && user.presence.activity.name === 'Spotify' && user.presence.activity.assets !== null) { 
   
    let trackIMG = `https://i.scdn.co/image/${user.presence.activity.assets.largeImage.slice(8)}`;
    let trackURL = `https://open.spotify.com/track/${user.presence.activity.syncID}`; 
    let trackName = user.presence.activity.details;
    let trackAuthor = user.presence.activity.state;
    let trackAlbum = user.presence.activity.assets.largeText; 
   
    const embed = new MessageEmbed()
      .setAuthor('Spotify!', 'https://cdn.discordapp.com/emojis/408668371039682560.png') 
      .setColor(0x1ED760)
      .setThumbnail(trackIMG)
      .addField('Música', trackName, true)
      .addField('Autor', trackAuthor, false) 
      .addField('Ouvindo em:', `[\`${trackURL}\`](trackURL)`, false); 
   

    message.channel.send(embed); 
   

   
  } else { 
   
    message.channel.send('**Esse usuario não está ouvindo Spotify!**');
   
  }
 
 
};

exports.conf = {
  aliases: [],
  permLevel: 0
};
    
exports.help = {
  name: 'spotify',
  category: "Info",
  description: 'See if someone is listing to spotify',
  usage: 'spotify <user>'
};