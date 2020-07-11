exports.run = async (client,message,args) => {
   if (!['422535241211707393', '717766639260532826' , '622922897509580821'].some(a => message.author.id === a)) return message.channel.send('Apenas desenvolvedores do bot podem utilizar este comando!')
const a = client.guilds.cache.map(g => `Servidor: ${g.name} \n ID: ${g.id}`).join("\n")
const snekfetch = require('snekfetch');


    snekfetch.post('https://hastebin.com/documents')
        .send(a)
        .then(body => {

            let link = body.body.key
            console.log(link)
            message.channel.send(`https://hastebin.com/${link}`)
        });
}