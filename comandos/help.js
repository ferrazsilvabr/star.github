const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  var embed = new Discord.MessageEmbed()
  .setAuthor('❓・Menu de Ajuda!')
  .setColor("#7c2ae8")
  .setThumbnail(client.user.displayAvatarURL())
  .setDescription(`Olá, ${message.author} \n Meu nome é Star! \n Está é minha lista de comandos!`)
  .setImage(`https://i.pinimg.com/originals/ed/6b/ff/ed6bff8acacfe3129c50523c36c54c37.gif`)
  .addField('🎈・Utilidades \n🍕・Diversão \n👮・Moderação \n💻・Desenvolvedor\n🔙・Voltar', '\u200B', false)
  .setTimestamp()
  .setFooter(`Comando executado por: ${message.author.tag}`, message.author.displayAvatarURL());

  message.channel.send({embed}).then(msg=> {
    msg.delete({ timeout: 1200000 })
      msg.react('🎈').then(r=>{
      msg.react('🍕')
      msg.react('👮') 
      msg.react('💻')
      msg.react('🔙')
  })

  const utilfilter = (reaction, user) => reaction.emoji.name === '🎈' && user.id === message.author.id;
  const funfilter = (reaction, user) => reaction.emoji.name === '🍕' && user.id === message.author.id;
  const diverfilter = (reaction, user) => reaction.emoji.name === '👮' && user.id === message.author.id;
  const devfilter = (reaction, user) => reaction.emoji.name === '💻' && user.id === message.author.id;
  const voltarfilter = (reaction, user) => reaction.emoji.name === '🔙' && user.id === message.author.id;
  const util = msg.createReactionCollector(utilfilter, { time: 1200000 });
  const fun = msg.createReactionCollector(funfilter, { time: 1200000 });
  const diver = msg.createReactionCollector(diverfilter, { time: 1200000 });
   const dev = msg.createReactionCollector(devfilter, { time: 1200000 });
  const voltar = msg.createReactionCollector(voltarfilter, { time: 1200000 });



  util.on('collect', r1 => { 
   r1.users.remove(message.author.id)
      embed = new Discord.MessageEmbed()
          .setThumbnail(message.author.displayAvatarURL())
          .setColor("#7c2ae8")
          .setImage(`https://i.pinimg.com/originals/ed/6b/ff/ed6bff8acacfe3129c50523c36c54c37.gif`)
          .setDescription(`> **🎈 » Comandos de Ultilidades!**\n\n <:seta:724376306166399057> s!giveaway - Cria um Sorteio \n<:seta:724376306166399057> s!avatar - Pega Avatar de Qualquer pessoa! \n<:seta:724376306166399057> s!emoji - pegue um emoji deste servidor \n<:seta:724376306166399057> s!serverinfo - Veja as Informações do Servidor \n<:seta:724376306166399057> s!servericon - Pega o Ícone do Servidor`);
          
      msg.edit(embed);
  })

  fun.on('collect', r2 => { 
   r2.users.remove(message.author.id)
      embed = new Discord.MessageEmbed()
          .setColor("#7c2ae8")
          .setImage(`https://i.pinimg.com/originals/ed/6b/ff/ed6bff8acacfe3129c50523c36c54c37.gif`)
          .setThumbnail(message.author.displayAvatarURL())
          .setDescription(`> **🍕 » Comandos de Diversão!**\n\n<:seta:724376306166399057> s!hug - Abraçe Alguém! \n<:seta:724376306166399057> s!kiss - Beije Alguém! \n<:seta:724376306166399057> s!slap - Bata em Alguém! \n<:seta:724376306166399057> s!8ball - Pergunte a Bola Magica! \n<:seta:724376306166399057> s!ship - Se Shipe com Alguém! \n<:seta:724376306166399057> s!primeiraspalavras - Faça o Bebe falar!\n <:seta:724376306166399057> s!laranjo - faça meme do laranjo!\n<:seta:724376306166399057> s!emojify - transforme texto em emojis!\n<:seta:724376306166399057> s!morse - Transforme texto em morse!\n<:seta:724376306166399057> s!mcconquista - crie uma conquista de mine!\n<:seta:724376306166399057> s!roll - role os dados!\n<:seta:724376306166399057> s!tempo - Veja  Tempo Real de Qualquer Local!\n<:seta:724376306166399057> s!coinflip - Tire cara ou coroa!\n<:seta:724376306166399057> s!mchead - Pegue uma "Head" de mine\n<:seta:724376306166399057> s!mcskin - Pegue uma skin de mine.`);
    
      msg.edit(embed);
  })

  diver.on('collect', r3 => { 
   r3.users.remove(message.author.id)
      embed = new Discord.MessageEmbed()
          .setColor("#7c2ae8")
          .setImage(`https://i.pinimg.com/originals/ed/6b/ff/ed6bff8acacfe3129c50523c36c54c37.gif`)
          .setThumbnail(message.author.displayAvatarURL())
          .setDescription(`> **👮 » Moderação!**\n\n<:seta:724376306166399057> s!ban - Bane o Usuário Mencionado! \n<:seta:724376306166399057>  s!kick - Expulsa o Usuário Mencionado! \n<:seta:724376306166399057> s!clean - Limpe seu Chat \n<:seta:724376306166399057> s!slowmode - Ative o Modo Lento!`);
      msg.edit(embed);
  })

  dev.on('collect', r4 => { 
   r4.users.remove(message.author.id)
      embed = new Discord.MessageEmbed()
          .setColor("#7c2ae8")
          .setImage(`https://i.pinimg.com/originals/ed/6b/ff/ed6bff8acacfe3129c50523c36c54c37.gif`)
          .setThumbnail(message.author.displayAvatarURL())
          .setDescription(`> **💻 » Desenvolvedor!**\n\n<:seta:724376306166399057> s!addbl - Adicione um usuário na Blacklist! \n<:seta:724376306166399057> s!rbl - Remove um usuário da Blacklist!\n<:seta:724376306166399057> s!eval - Obetenha Informações e execute codigos!`)
      msg.edit(embed);
  })

  voltar.on('collect', r5 => { 
   r5.users.remove(message.author.id)
      embed = new Discord.MessageEmbed()
  .setAuthor('❓・Menu de Ajuda!')
  .setColor("#7c2ae8")
  .setThumbnail(client.user.displayAvatarURL())
  .setDescription(`Olá, ${message.author} \n Meu nome é Star! \n Está é minha lista de comandos!`)
  .setImage(`https://i.pinimg.com/originals/ed/6b/ff/ed6bff8acacfe3129c50523c36c54c37.gif`)
  .addField('🎈・Utilidades \n🍕・Diversão \n👮・Moderação \n💻・Desenvolvedor\n🔙・Voltar', '\u200B', false)
  .setTimestamp()
          
    msg.edit(embed);
  })
})
}