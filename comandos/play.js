const discord = require("discord.js")
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("api do yt");


exports.run = async (client, message, args, ops) => {
    let Canalvoz = message.member.voiceChannel;
    if(!message.member.voiceChannel) return message.channel.send('Por favor, conecte-se a um canal de voz.');
    if(message.guild.me.voiceChannel) return message.channel.send('Desculpe, o bot já está conectado à guilda.');
    if(!args[0]) return message.channel.send('Desculpe, por favor insira uma url seguindo o comando.');
    let validate = ytdl.validateURL(args[0]);
  
    if (!validate) return message.channel.send("Desculpe, por favor insira um URL de validação seguindo o comando");
    let info = await ytdl.getInfo(args[0]);
    Canalvoz.join()
    .then(connection => {
        const url = ytdl(args.join(' '), { filter : 'audioonly' });
        const dispatcher = connection.playStream(url);
    
    
        
    }).catch(console.error);
    message.channel.send(`Entrei no canal e já estou tocando a música ;)`);
  
}
module.exports.help = {
    name: "play"
  };