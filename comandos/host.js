message.channel.send(`**${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%**`)
message.channel.send(`**${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB de 500MB**`)