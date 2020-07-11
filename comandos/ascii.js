const figlet = require('figlet');

exports.run = async (client, message, args, tools) => {
  
  if(args.join(' ').length > 14) return message.channel.send('Você colocou mais de 14 caracteres') 
  if (!args.join(' ')) return message.channel.send('Digite o texto!').then(msg => msg.delete({timeout: 10000})); 
    figlet(args.join(' '), (err, data) => {
      message.channel.send('```' + data + '```')
    })
};
exports.conf = {
    aliases: [],
    permLevel: 0
};
      
exports.help = {
    name: 'ascii',
    category: "Fun",
    description: 'ascii',
    usage: 'ascii <text>'
};