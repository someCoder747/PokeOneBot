const { RichEmbed } = require("discord.js");
const snekfetch = require("snekfetch");
const settings = require('../settings.json');

exports.run = async (client, message, args) => {
    if (!args[0]) {
        message.channel.send(`Please input a guild name - use **${settings.prefix}help ability** for more info!`);
        return;
    }

    const search = args.splice(0, args.length).join(" ").toLowerCase()

    const api = settings.api.url
    const route = "/guilds/"
    const token = settings.api.token

    let apifull = api + route + search + token
    
    snekfetch.get(apifull).then(r => {
        let body = r.body
        let glink;
        let checkOwners;
        let guildpic;

        if (body.status == "404") {
            message.channel.send(`Guild: ${search} not found. Please double check spelling!`);
            return;
        }
        
        if (body.data.link == null) {
             glink = "https://discord.gg/bNYRTFn"
        } else {
             glink = body.data.link
        }


        if (body.data.owner.length < 2) {
            checkOwners = "Guild Owner"
        } else {
            checkOwners = "Guild Owners"
        }

        if(body.data.img == null) {
            guildpic = "http://api.gamernationnetwork.xyz/pokemon/guildlogos/nologo.png"
        } else {
            guildpic = body.data.img
        }

        const embed = new RichEmbed()
            .setTitle(`${body.data.name} (${body.data.nick})`)
            .setDescription(`**${checkOwners}:** ${body.data.owner.join(", ")}\n**Motto:** ${body.data.motto}`)
            .setColor(`${body.data.colour}`)
            .setURL(`${glink}`)
            .setThumbnail(`${guildpic}`)

        message.channel.send("", {
            embed: embed
        }).catch(console.error)

    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["guilds", "g"],
    permLevel: 0
};

exports.help = {
    name: "guild",
    description: "Gives information on given guild",
    usage: "guild [guild name]"
};