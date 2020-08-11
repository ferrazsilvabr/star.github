const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    message.delete({timeout: 7000})
    let userban = message.mentions.members.first() || client.users.cache.get(args[0])
    try{
        let Discord = require("discord.js")
let serverzumans = "505070509528973313"
let splitarg = args.slice(1).join(' ').toLowerCase();
if(message.guild.id !== serverzumans) {
    return;
}
let helpban = new Discord.MessageEmbed()
.setAuthor("Método de uso", 'https://i.imgur.com/GfiMOak.png')
.setFooter("Ban" + " usage", 'https://i.imgur.com/YiL4lUd.png')
.setTimestamp()
.setDescription("O comando consiste em banir um usuário desejado.\n\nUsage: **ban <@User> <Motivo>**")
.addField("Permissões necessárias", "Banir usuários", false)
if(!args[0]) {
    message.channel.send(message.author, helpban)
    return;
}
if(!message.member.hasPermission("BAN_MEMBERS")) {
    message.reply("Você não possui permissão para usar esse comando!")
    return;
}
if(!userban) {
    message.channel.send("Eu não encontrei um usuário válido para banir!")
    return;
}
if(message.author.id === userban) {
    message.reply("Você não pode banir si mesmo!")
}
if(!args[1]) {
    message.reply("Você precisa inserir um motivo para banir o usuário!").then(m => m.delete({timeout: 7000}))
    return;
}
let autoreasons = {
    "spam": "Floodar/spammar (Enviar várias mensagens repetidas, enviar uma mensagem com caracteres aletórios, adicionar reações aleatórias, etc) nos canais de texto.",
    "div": "Não é permitido divulgar conteúdos em canais de texto sem que a equipe permita.",
    "divdm": "Enviar conteúdo (não solicitado!) via mensagem direta, fazer spam (ou seja, mandar conteúdo indesejado para outras pessoas) é contra as regras do servidor Estúdio Raiz e dos termos de uso do Discord e, caso continuar, você poderá ser suspenso do Discord e irá perder a sua conta!",
    "nsfw": "É proibido compartilhar conteúdo NSFW (coisas obscenas como pornografia, gore e coisas relacionadas), conteúdo sugestivo, jumpscares, conteúdo de ódio, racismo, assédio, links com conteúdo ilegal e links falsos. Será punido até se passar via mensagem direta, até mesmo se a outra pessoa pedir.",
    "toxic": "Ser tóxico (irritar e desrespeitar) com outros membros do servidor. Aprenda a respeitar e conviver com outras pessoas!",
    "mp": "Mencionar vários usuários ao mesmo tempo. (Spam/MassPing)",
    "tos": "Violar os termos de uso do Discord. (https://discordapp.com/terms)",
    "eb": "Evasão de ban. (Criar contas falsas para entrar no servidor após ser banido)",
    "oreia":"Se passar pelo Zumans nesse ou em outros servidores, é proibido. Seu banimento possui revisão. Caso queira se redimir, procure o responsável pelo banimento.",
    "roubo":"Roubar é uma atidude ridiculamente feia. Esperamos que reveja suas ações como ser humano! Se coloque no lugar da vítima, tenha empatia.",

}
let motivo = "motivo"
if(!autoreasons[splitarg]) {
    motivo = splitarg
} else {
    motivo = autoreasons[splitarg]
}
let banidoauto = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
.setTitle("🚫| Banido!")
.setDescription(`Você foi banido do servidor **${message.guild.name}**`)
.addField(":police_officer: Punido por:", `${message.author.username}#${message.author.discriminator}`)
.addField(":pencil: Motivo", `${motivo}`, false)
.setTimestamp()
.setColor("RED")
.setThumbnail(message.guild.iconURL())
.setFooter("Achou injusto? Contate-nos!", 'https://i.imgur.com/KQG4tao.png')
await message.channel.send(`${message.author}` + `, o usuário ${userban} foi banido com sucesso! Motivo: \`${motivo}\``)
userban.send(banidoauto)

let cargo = "692423549708927027"
setTimeout(() => {
userban.roles.remove(cargo, "fakeban")
}, 1000)
setTimeout(() => {
    userban.roles.add(cargo, "fakeban")
}, 9000)
return;

    } catch(err) {
        let Discord = require("discord.js")
        let error = new Discord.MessageEmbed()
        .setTitle("Erro!")
        .setColor("RED")
        .setDescription("```js\n" + err + "```")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
        console.log(err)
        return message.reply(error)
    }
}