const {RichEmbed} = require("discord.js");
const snekfetch = require("snekfetch");
const settings = require('../settings.json');

exports.run = async (client, message, args) => {
    
    if (!args[0]) {
       return message.channel.send(`Please input a location - use **${settings.prefix}help spawn** for more info!`);
    }
    const search = args.splice(0, args.length).join(" ").toLowerCase()
    
    const api = settings.api.url
    const route = "/spawns/"
    const token = settings.api.token

    let apifull = api+route+search+token

snekfetch.get(apifull).then(r => {
    let body = r.body

    if (body.status == "404") {
       return message.channel.send(`Location: ${search} not found. Please double check spelling!`);
    }

        const locSearch = new RichEmbed()
        .setTitle(`${body.data.area} || ${body.data.region}`)
        .setColor("RANDOM")
        .addField("Day", `**Grass:**\n${body.data.day.grass.join("\n")}\n**Surf:**\n${body.data.day.surf.join("\n")}\n**Fishing:**\n${body.data.day.fishing.join("\n")}`, true)
        .addField("Night", `**Grass:**\n${body.data.night.grass.join("\n")}\n**Surf:**\n${body.data.night.surf.join("\n")}\n**Fishing:**\n${body.data.night.fishing.join("\n")}`, true)
        .setFooter(`Information by: ${client.users.get('202114942931828746').username}`, client.users.get('202114942931828746').avatarURL)

        
      
          message.channel.send("", {
              embed: locSearch
        }).catch(console.error);


});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["spawns"],
    permLevel: 0
};

exports.help = {
    name: "spawn",
    description: "Gives information on given location on spawns",
    usage: "spawns [location]"
};