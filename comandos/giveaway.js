const {MessageEmbed} = require('discord.js')
const ms = require('ms');
module.exports={
    nome: 'giveaway',
    descrição: 'Cria um Sorteio!',
    ultilização: '<tempo> <canal> <prêmio>',
    categoria: 'diversão',
    run: async(bot,message,args)=>{
      if (!message.member.permissions.has("ADMINISTRATOR"))
    return message.reply(
      "Você precisa de permissão de Admininstrador para ultilizar este comando"
    );
        if(!args[0]) return message.channel.send(`Você não especificou uma duração!`)
        if(!args[0].endsWith("d")&&!args[0].endsWith("h")&&!args[0].endsWith("m")) return message.channel.send(`Você não usou a formatação correta para o tempo!`)
        if(isNaN(args[0][0])) return message.channel.send(`Isso não é um número!`)
        let channel = message.mentions.channels.first()
        if(!channel) return message.channel.send(`Especifique um canal no Servidor!`)
        let prize = args.slice(2).join(" ")
        if(!prize) return message.channel.send(`Nenhum prêmio especificado!`)
        message.channel.send(`*Giveaway criado no: ${channel}*`)
        let Embed = new MessageEmbed()
        .setTitle(`🎉 Giveaway 🎉`)
        .setDescription(`\n\n**Prêmio:** ${prize}\n**Host:** ${message.author}\n`)
        .setTimestamp(Date.now()+ms(args[0]))
        .setColor(`RANDOM`)
        let m = await channel.send(Embed)
        m.react("🎉")
        setTimeout(() => {
            if(m.reactions.cache.get("🎉").count<=1){
                message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`)
                return message.channel.send(`Ninguem Reagiu pra Haver um Vencedor!`)
            }
            
            let winner = m.reactions.cache.get("🎉").users.cache.filter(u=>!u.bot).random()
            channel.send(`O vencedor do Premio: **${prize}** é... ${winner}`)
        }, ms(args[0]));
    }
}