const Discord = require("discord.js"); //Conexão com a livraria discord.js

exports.run = async (client, message, args) => { //estrutura básica de criação de um comando

  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  // Armazena em uma variável o membro por Menção OU pelo seu Id OU se nada foi fornecido, o user é o próprio Autor

  let avatar = user.avatarURL({ dynamic: true, format: 'png', size: 1024 });
  // Armazena o link do avatar do usuário em outra variável. A propriedade Dynamic converte automatimente a extensão da imagem para um gif se ela for animada.


  let embed = new Discord.MessageEmbed() // Declarando a criação do Embed
    .setColor("RANDOM") // Cor Aleatória
    .setAuthor(`🖼️ ${user.username}#${user.discriminator}`) // Título do embed 
    .setDescription(`[Clique Aqui](${avatar}) para baixar a imagem!`)
    .setImage(avatar) // Aqui mostramos seu rostinho lindo
 await message.channel.send(embed); //Enviando o embed no chat

}; // cabou!