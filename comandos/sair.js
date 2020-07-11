exports.run = (client, message, args) => {
    if(message.author.id !== "717766639260532826") return message.channel.send(`Apenas desenvolvedores do bot podem utilizar este comando!`);
    let id = args[0];
    if (!id) id = message.guild.id;
    client.guilds.get(id).leave()
    .then(g => console.log(`Sai ${g}`))
    }