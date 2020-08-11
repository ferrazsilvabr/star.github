const Discord = require("discord.js");
const {
    get
} = require("superagent");
module.exports.run = async (bot, message, args) => {
    try {
        if (!args[0]) return message.channel.send("Ultilize: s!wallpaper <Wallpaper>");
        let type;
        if (args[0] == "random") {
            type = "https://source.unsplash.com/random/"
        } else if (args[0] == "b&w") {
            type = "https://source.unsplash.com/featured/?b&w/"
        } else if (args[0] && args[0] != "b&w" && args[0] != "random") {
            let wants = args[0];
            type = `https://source.unsplash.com/featured/?${args[0]}/`
        }
        let size;
        if (args[1]) {
            size = args[1]
        } else if (!args[1]) {
            size = "1920x1080"
        };
        let link = type + size
        get(link).then(res => {
            let img = new Discord.MessageAttachment(res.body);
            message.channel.send(img)
        });
    } catch (err) {
        let errchannel = bot.channels.get('735117159696433232')
        errchannel.send(err)
        console.log(err)
    }
}