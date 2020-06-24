const Discord = require('discord.js');

exports.run = async (client, message, args) => {

var list = [
  'https://pa1.narvii.com/6493/47674a361d776b3a49de929df6065fb74bb18b9f_hq.gif',
  'https://pa1.narvii.com/6473/e3a357655e38125bd969a0ffb3938309194d4517_hq.gif',
  'https://78.media.tumblr.com/f4c3901c7a09007eac0e289d2ab0a662/tumblr_of5nda6NpC1ujwg5zo1_500.gif',
  'https://media1.tenor.com/images/b6d8a83eb652a30b95e87cf96a21e007/tenor.gif?itemid=10426943',
  'https://i.pinimg.com/originals/96/8c/b1/968cb1f9eaa12dde1d6fdf2f6ee296ed.gif',
  'https://media.giphy.com/media/Zau0yrl17uzdK/giphy.gif',
  'https://media.giphy.com/media/m6etefcEsTANa/giphy.gif',
  'https://media1.tenor.com/images/3fd96f4dcba48de453f2ab3acd657b53/tenor.gif?itemid=14358509',
  'https://i.pinimg.com/originals/b9/74/54/b97454d61d518852bef17e40703bb3fe.gif',
  'https://media.giphy.com/media/rCftUAVPLExZC/giphy.gif',
  'https://i.pinimg.com/originals/38/a7/62/38a762afa340978fe2aa43e28e23f8df.gif',
  'https://media1.tenor.com/images/33e43088f3f164e8b00518ef667f9168/tenor.gif?itemid=13934829',
  'https://media1.tenor.com/images/49de17c6f21172b3abfaf5972fddf6d6/tenor.gif?itemid=10206784'
];

var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
message.channel.startTyping();
return message.reply('lembre-se de mencionar um usuário válido para bater!');
}
/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
  let avatar = message.author.displayAvatarURL({format: "png"});
  const embed = new Discord.MessageEmbed()
        .setTitle('Tapa')
        .setColor('#000000')
        .setDescription(`${message.author} acaba de bater em: ${user}`)
        .setImage(rand)
        .setTimestamp()
        .setFooter('Se Vingue! Digite l!slap @pessoa')
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}