const { RichEmbed } = require("discord.js");
const snekfetch = require("snekfetch");
const settings = require('../settings.json');

exports.run = async (client, message, args) => {
    if (!args[0]) {
        message.channel.send(`Please input an ability - use **${settings.prefix}help ability** for more info!`);
        return;
    }

    const search = args.splice(0, args.length).join(" ").toLowerCase()

    const api = settings.api.url
    const route = "/ability/"
    const token = settings.api.token

    let apifull = api + route + search + token
    
    snekfetch.get(apifull).then(r => {
        let body = r.body

        if (body.status == "404") {
            return message.channel.send(`Ability: ${search} not found. Please double check spelling!`);;
        }
            
            const embed = new RichEmbed()
            .setTitle(`__${body.info.name}__`)
            .addField(`Ability Description:`, `${body.info.description}`, false)
            .addField(`Effect:`, `\u200B${body.info.effect}`, false)
            
            
        message.channel.send("", {
            embed: embed
        }).catch(console.error)

    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["a"],
    permLevel: 0
};

exports.help = {
    name: "ability",
    description: "Gives information on given ability",
    usage: "ability [ability name]"
};