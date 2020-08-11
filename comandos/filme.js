const discord = require("discord.js");
const imdb = require("imdb-api");

module.exports = {
name: "imdb",
  description: "Get the information about series and movie",
  category: "info",
  usage: "imdb <name>",
  run: async (client, message, args, color) => {
    
    if(!args.length) {
      return message.channel.send("Diga o nome do filme / série")
    }
    
    const imob = new imdb.Client({apiKey: "5e36f0db"}) //You need to paste you imdb api
    
    let movie = await imob.get({'name': args.join(" ")})
    
    let embed = new discord.MessageEmbed()
    .setTitle(movie.title)
    .setColor("#ff2050")
    .setThumbnail(movie.poster)
    .setDescription(movie.plot)
    .setFooter(`Estrelas: ${movie.rating}`)
    .addField("País:", movie.country, true)
    .addField("Línguas:", movie.languages, true)
    .addField("Tipo:", movie.type, true);
    
    
    message.channel.send(embed)
    
    
    
  }

}