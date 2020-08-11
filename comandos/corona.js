const axios = require('axios');
const { MessageEmbed } = require('discord.js')

module.exports = {
    run: async (client, message, args) => {
        const baseUrl = "https://corona.lmao.ninja/v2";

        let url, response, corona;

        try {
            url = args[0] ? `${baseUrl}/countries/${args[0]}`:`${baseUrl}/all`
            response = await axios.get(url)
            corona = response.data
        } catch (error) {
            return message.channel.send(`***${args[0]}*** Não Existe!`)
        }

        const embed = new MessageEmbed()
            .setTitle(args[0] ? `Informações Sobre o Corona no ${args[0].toUpperCase()}` : 'Informações Sobre o Corona Globalmente')
            .setColor('#ff0000')
            .setThumbnail(args[0] ? corona.countryInfo.flag : 'https://i.giphy.com/YPbrUhP9Ryhgi2psz3.gif')
            .addFields(
                {
                    name: 'Total De Casos:',
                    value: corona.cases.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Total De Mortes:',
                    value: corona.deaths.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Total De Recuperados:',
                    value: corona.recovered.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Casos Ativos:',
                    value: corona.active.toLocaleString(),
                    inline: true
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: true
                },
                {
                    name: 'Casos Críticos:',
                    value: corona.critical.toLocaleString(),
                    inline: true
                },
                {
                    name: 'Recuperados De Hoje:',
                    value: corona.todayRecovered.toLocaleString().replace("-", ""),
                    inline: true
                },
                {
                    name: 'Mortes De Hoje:',
                    value: corona.todayDeaths.toLocaleString(),
                    inline: true
                })

        await message.channel.send(embed)
    }
};