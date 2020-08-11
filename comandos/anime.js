const { get } = require("request-promise-native");
const { MessageEmbed } = require("discord.js")

module.exports = {
name: "anime",
  category: "info",
  aliases: ["kitsu"],
  description: "Get anime information",
  usage: "anime <anime_name>",
  run: (client, message, args) => {
    
    
    
    if(!args.length) {
      return message.channel.send("Diga o ")
    }
    //DEFINE OPTIONS
    
    let option = {
      url: `https://kitsu.io/api/edge/anime?filter[text]=${args.join(" ")}`,
      method: `GET`,
      headers: {
        'Content-Type': "application/vnd.api+json",
        'Accept': "application/vnd.api+json"

      },
      json: true
    }
    
    
    message.channel.send("Pegando informações da api...").then(msg => {
      get(option).then(body => {
       try {
        let embed = new MessageEmbed()
        .setTitle(body.data[0].attributes.titles.en)
        .setColor("RED")
        .setDescription(body.data[0].attributes.synopsis)
        .setThumbnail(body.data[0].attributes.posterImage.original)
        .addField("Estrelas", body.data[0].attributes.averageRating)
        .addField("Episodios", body.data[0].attributes.episodeCount)
        .setImage(body.data[0].attributes.coverImage.large)
        //try it
        
        
        message.channel.send(embed)
        
       } catch (err) {
        msg.delete();
         return message.channel.send("Não achei esse anime.");
       }
        
        
        
      }                 
                       
    )})
    
  }

}