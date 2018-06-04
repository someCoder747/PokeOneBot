const { RichEmbed } = require("discord.js");
const snekfetch = require("snekfetch");
const settings = require('../settings.json')

exports.run = async (client, message, args) => {
    if (!args[0]) {
        return message.channel.send(`Please input a nature - use **${settings.prefix}help nature** for more info!`);
    }
    const search = args.splice(0, args.length).join(" ").toLowerCase()

    const api = settings.api.url
    const route = "/nature/"
    const token = settings.api.token

    let apifull = api + route + search + token

    snekfetch.get(apifull).then(r => {
        let body = r.body

        if (body.status == "404") {
            return message.channel.send(`Nature: ${search} not found. Please double check spelling!`);
        }

          const embed = new RichEmbed()
            .setTitle(`${body.data.name}`)
            .addField(`__Increases:__`,`${body.data.increase}`, true)
            .addField(`__Decreases:__`, ` ${body.data.decrease}`, true)
            .addField(`\u200b`,`Pokémon with the ${body.data.name} Nature Like: ${body.data.likes} and Dislike: ${body.data.dislikes}`,false)


        message.channel.send("", {
            embed: embed
        }).catch(console.error)

    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["n"],
    permLevel: 0
};

exports.help = {
    name: "nature",
    description: "Gives information on given nature",
    usage: "nature [nature]"
};