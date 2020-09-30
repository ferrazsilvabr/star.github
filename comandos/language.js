const Discord = require("discord.js");
const mongoose = require('mongoose');
const Guild = require('../../models/guild');

module.exports.run = (client, message, args) => {
  
    const guild = await Guild.findOne({ 
        guildID: message.guild.id
      }, (err, guild) => {
        if(!guild){
           guild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: message.guild.id,
        guildName: message.guild.name,
          })}
      })
      if (!message.member.hasPermission("MANAGE_GUILD")){
          if(guild.lang=='pt'){
            return message.reply("Desculpa, não tens permissões suficientes para usar isto! \nVerifica se tens permissao de configurar o servidor.");
          }else{
            return message.reply("Sorry, you don't have permissions to use this! \nMake sure you have manage server permission.");
          }
      }
      switch(guild.lang){
          case 'pt':  
                guild.lang = "eng"
                guild.save().catch(err =>console.log(err));
                message.channel.send('Language changed.')
                break;
          case 'eng':
                guild.lang = "pt"
                guild.save().catch(err =>console.log(err));
                message.channel.send('Linguagem alterada.')
                break;
          default:
                guild.lang = "pt"
                guild.save().catch(err =>console.log(err));
                message.channel.send('Linguagem alterada.')
                break;
      }
  }
  exports.help = {
    name: 'language',
    aliases: ['linguagem']
}