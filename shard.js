const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./index.js', { totalShards: 2});

manager.spawn();

manager.on('shardCreate', shard => console.log(`Shard ${shard.id} iniciada`));
manager.on('message', (shard, message) => {
    console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
});