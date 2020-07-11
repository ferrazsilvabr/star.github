const Discord = require("discord.js");
const dev_ids = ['422535241211707393', '717766639260532826' , '622922897509580821'];


// Note: this snippet requires the variables "client" and "message" to work, these need to be provided by your script



var allowedToUse = false;
dev_ids.forEach(id => {
    if(message.author.id == id)
        allowedToUse = true;
});

if(allowedToUse) {
    let invites = ["ignore me"], ct = 0;
    client.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[invites.length + 1] = (g + " - `Invites: " + guildInvites.array().join(", ") + "`");
            ct++;

            if(ct >= client.guilds.cache.size) {
                invites.forEach((invite, i) => {
                    if(invite == undefined)
                        invites.splice(i, 1);
                }); 

                invites.shift();
                invites.forEach((invite, i) => invites[i] = "- " + invite);
                invites = invites.join("\n\n");

                let embed = new Discord.MessageEmbed()
                .setDescription(invites);

                message.channel.send(embed);
            }
        }).catch(err => {
            ct++;
        });
    });
}
else {
    message.reply("Apenas desenvolvedores do bot podem utilizar este comando!");
}