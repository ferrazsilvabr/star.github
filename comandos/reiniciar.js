const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  
  
const owner = "717766639260532826";
    if (message.author.id === owner) {
        message.channel.send(`<a:sim:753735844812161034>| Ok, ${message.author}, Vou reiniciar....`);
        message.channel.send(`
<:pasta:755102272807108729> | A fechar pastas...`)
        setTimeout(() => {
            process.exit(0);
        }, 5000); 
    } else {
        return message.channel.send("<a:nao:753735889783357560> | Você não tem permissão para reiniciar o bot.");
        console.log('Fui Reiniciada com sucesso')
        }
    }
    exports.help = {
    name: 'reiniciar',
    aliases: ['religar']
}