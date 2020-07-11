const Discord = require("discord.js");
 var imgur = require("imgur")
   imgur.setAPIUrl('https://api.imgur.com/3/');
   imgur.getAPIUrl();

exports.run = ( message, args) => {

     if(message.attachments.size < 1) {
   
const db = require("../database.js")
db.Guilds.findOne({"_id": message.guild.id }, function(erra, sysop) {


const Discord = require("discord.js")
const embed = new Discord.MessageEmbed()
.setTitle(`Imgur | Modo de uso:`)
.setAuthor(message.author.username+'#'+message.author.discriminator)
.setDescription(`Com o imgur você pode hospedar imagens do seu pc através do BOT.\ns!imgur <imagem>`)
.setImage('https://cdn.discordapp.com/attachments/485376421271961600/495775614490509323/unknown.png')
.setThumbnail(message.author.avatarURL)
.setFooter(message.guild.name)
.setColor('#15ffaf');

message.channel.send({embed}) 
})
      } else {

      //

       if(message.attachments.first().url.endsWith('png') || message.attachments.first().url.endsWith('jpg') || message.attachments.first().url.endsWith('gif')) {
         imgur.uploadUrl(message.attachments.first().url).then(function (json) {
          		 var rpts = ['https://i.imgur.com/OxHKeTw.gif'];
             var link = rpts[Math.floor(Math.random() * rpts.length)];
		  const embed = new Discord.MessageEmbed() 

          .setTitle("Imagem Upada!")
          .setThumbnail(link)
          .setDescription(`<:upload:413149547737513985> Aqui está sua imagem \n` + json.data.link)
          .setImage(json.data.link)
          .setColor('#15ffaf');

          message.channel.send({embed});
         }).catch(function (err) {

          //
          
           message.channel.send('Falha ao tentar enviar...')
         })
       } else {

//
         message.channel.send('Só Suporto arquivos png, jpg e gif...')
       }
     }
		
    };