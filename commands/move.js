const { RichEmbed } = require("discord.js");
const snekfetch = require("snekfetch");
const settings = require('../settings.json');

exports.run = async (client, message, args) => {

    if (!args[0]) {
        return message.channel.send(`Please input a move - use **${settings.prefix}help move** for more info!`);
    }

    const search = args.splice(0, args.length).join("_").toLowerCase()
    
    const api = settings.api.url
    const route = "/moves/"
    const token = settings.api.token

    let apifull = api + route + search + token

    snekfetch.get(apifull).then(r => {
        let body = r.body

        if (body.status == "404") {
            return message.channel.send(`Move: ${search} not found. Please double check spelling!`);
        }
        
        var category = body.info.category.charAt(0).toUpperCase() + body.info.category.slice(1);
        var power = body.info.power;
        var acc = body.info.accuracy;
        var crit = body.info.critical_hit;

        if (category == "Status") {
            power = acc = crit = "−";
        }
        const embed = new RichEmbed()
            .setTitle(body.info.names.en)
            .setDescription(`${body.info.descriptions.en}`)
            .addField("Move Stats", `**Base Power:** ${power}\n**Accuracy:** ${acc}%` + "\n**Critical:** " + crit, true)
            .addField("\u200b", `**PP:** ${body.info.pp} (MAX: ${body.info.max_pp})\n**Type: **` + body.info.type + `\n**Category:** ` + body.info.category.charAt(0).toUpperCase() + body.info.category.slice(1), true)

        message.channel.send("", {
            embed: embed
        }).catch(console.error)

    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["m"],
    permLevel: 0
};

exports.help = {
    name: "move",
    description: "Gives information on given move",
    usage: "move [move name]"
};