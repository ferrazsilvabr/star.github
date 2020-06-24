const Discord = require('discord.js')
var Jimp = require("jimp")

exports.run = async (bot, message, args) => {

    if (message.content.split(' ').slice(1).join(' ').length < 1) {
        message.channel.send('Você não escreveu nada.')
    } else {
        if (message.content.split(' ').slice(1).join(' ').length > 18) {
            message.channel.send('Você ultrapassou o limite de 18 caracteres. Você não quer uma edição feia ne?')
        } else {
            if (message.member.hasPermission('ATTACH_FILES')) {
                var authorMessage = message
                message.channel.send('🔍 | Processando...').then(message => {
                    Jimp.read(`https://images-ext-2.discordapp.net/external/xY4qob26WaETQryGZHUTdiN29ZUYDzcB_wqfYNENk6M/https/i.imgur.com/fCNtAvC.jpg`, function (err, image) {
                        if (err) message.channel.send('Ocorreu um erro ao criar a imagem.')
                        Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(function (font) {
                            image.print(font, 11, 13, authorMessage.content.split(' ').slice(1).join(' '),)
                            var aguardeMessage = message
                            image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                                const attachment = new Discord.MessageAttachment(buffer, 'Laranjeira_Gorda.png')
                                message.channel.send(attachment).then(message => {
                                    aguardeMessage.delete()
                                })
                            })
                        })
                    })
                })
            } else {
                message.channel.send('Eu não tenho a permissão necessária para fazer isso. `ATTACH_FILES`')
            }
        }
    }
}

exports.help = {
    name: "primeiraspalavras",
    aliases: ['firstword']
}