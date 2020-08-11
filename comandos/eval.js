const { MessageEmbed }= require('discord.js')

exports.run = async (client, message, args) => {
  if (!['422535241211707393', '717766639260532826' , '622922897509580821'].some(a => message.author.id === a)) return message.channel.send('Apenas desenvolvedores do bot podem utilizar este comando!')
  if (!args[0])
    return message.channel.send(
      `Insira um valor para executar o eval.`
    );
  let m = await message.channel.send('Executando...')
  try {
    let beforeRunning = Date.now()
    let result = eval(args.join(' '))

    if (result instanceof Promise) {
      m.edit('O código retornou uma promise - aguardando ela ser resolvida...')
      await result
    }
    if (typeof result !== 'string') result = require('util').inspect(result)
    let end = (Date.now() - beforeRunning)
    let embed = new MessageEmbed(message.author).setTimestamp()
      .setAuthor('✔️ • Sucesso!')
      .setDescription('```' + result.slice(0, 2000) + '```')
      .addField('Tempo de execução', (end / 60).toFixed(5) + 's').setColor("00ff0b")
    m.edit('Sucesso!', { embed: embed })
  } catch (e) {
    let embed = new MessageEmbed(message.author).setTimestamp()
      .setAuthor('❌ • Erro!')
      .setDescription('```' + e.stack.slice(0, 2000) + '```')
      .setColor("ff0000")
    m.edit('Falha...', { embed: embed })
  }
}
