const Discord = require('discord.js')
exports.run = async (bot, message, args) => {
        const user = message.author.tag;
        const name = user;

        if(message.guild.channels.cache.find(ch => ch.name == name)){
            message.channel.send("Você já criou um ticket!")
        }else{
            message.guild.channels.create(name).then((chan)=>{
                chan.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false,
                    VIEW_CHANNEL: false
                })
                chan.updateOverwrite(user,{
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true
                })
                message.channel.send(`**${message.author.user.username}** Ticket criado!`);
                chan.send("Ticket foi criado, faça suas dúvidas!").then((m)=>{
                    m.pin()
                })
            })
        }
    }