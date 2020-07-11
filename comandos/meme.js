const randomPuppy = require("random-puppy");
const snekfetch = require("snekfetch");

module.exports = {
    config: {
        name: "meme",
        aliases: ["memes", "mem"],
        usage: "s!meme",
        description: "Get a meme from the dankmemes subreddit",
        permissions: "none"
    },
    run: async (client, message, args) => {
        let reddit = [
            "brasil"
        ]
        // let subreddit = reddit[Math.floor(Math.random() * reddit.length - 1)];
        let subreddit = reddit[0];
        let msg = await

        randomPuppy(subreddit).then(url => { //url = image
            snekfetch.get(url).then(async res => { //get that url, res = image
                await message.channel.send({ //send the image
                    files: [{
                        attachment: res.body,
                        name: 'memetop.png'
                    }]
                }).then(() => message.delete())//delete ...generating... message after sent meme
            });
        });
    }
}