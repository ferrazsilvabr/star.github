exports.run = (client, message, args) => {

message.channel.send(`Estou Consumindo: **${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%** de CPU`)
message.channel.send(`Estou Consumindo **${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB de 500MB** de Memória RAM`)
}