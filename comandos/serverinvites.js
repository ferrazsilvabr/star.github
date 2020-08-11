const Discord = require("discord.js");
const dev_ids = ["717766639260532826"]; // an array of IDs of the bot's developers - only these people will be able to execute this command


// Note: this snippet requires the variables "client" and "message" to work, these need to be provided by your script



var allowedToUse = false;
for(let i = 0; i < dev_ids.length; i++) if(message.author.id == dev_ids[i]) allowedToUse = true;
});

if(allowedToUse) {
    let invites = ["ignore me"], ct = 0;
    client.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[invites.length + 1] = (g + " - `Invites: " + guildInvites.array().join(", ") + "`");
            ct++;

            if(ct >= client.guilds.size) {
                invites.forEach((invite, i) => {
                    if(invite == undefined)
                        invites.splice(i, 1);
                }); 

                invites.shift();
                invites.forEach((invite, i) => invites[i] = "- " + invite);
                invites = invites.join("\n\n");

                let embed = new Discord.MessageEmbed()
                .setTitle("Convites:")
                .setDescription(invites);

                message.channel.send(embed);
            }
        }).catch(err => {
            ct++;
        });
    });
}
else {
    message.reply("this command can only be used by a developer.");
}