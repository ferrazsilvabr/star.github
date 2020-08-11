const Discord = require("discord.js");
const { get } = require("superagent");
module.exports.run = async (bot, message, args) => {
    try {
        if(!args[0]){
message.channel.send('Digite algo...')
return;
}
        let url = `https://nekobot.xyz/api/imagegen?type=kannagen&text=${args.join(" ")}`
        get(url).then(res => {
            const embed = new Discord.MessageEmbed()
            .setColor("fea5ff")
            .setAuthor("Kanna disse..")
            .setImage(res.body.message)
            setTimeout(() => {
                return message.channel.send(embed);
            }, 100);
        });
    } catch(err) {
        let errchannel = bot.channels.get('735117159696433232')
        errchannel.send(err)
        console.log(err)    
    }
}