exports.run = (client, message, args) => {
  if (message.author.id !== '717766639260532826') return message.reply('Apenas desenvolvedores do bot podem utilizar este comando!');
  let command;
  if (client.commands.has(args[0])) {
    command = args[0];
  } else if (client.aliases.has(args[0])) {
    command = client.aliases.get(args[0]);
  }
  if (!command) {
    return message.channel.send(`Não achei o comando: ${args[0]}`);
  } else {
    message.channel.send(`Recarregando: ${command}`)
      .then(m => {
        client.reload(command)
          .then(() => {
            m.edit(`Comando: ${command} recarregado!`);
          })
          .catch(e => {
            m.edit(`Falha ao recarregar o comando: ${command}\n\`\`\`${e.stack}\`\`\``);
          });
      });
  }
};