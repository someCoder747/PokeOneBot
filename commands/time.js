const {RichEmbed} = require("discord.js");
const snekfetch = require("snekfetch");
const settings = require('../settings.json');

exports.run = async (client, message, args) => {
    
    const api = settings.api.url
    const route = "/timeevents"
    const token = settings.api.token

    let apifull = api+route+token

snekfetch.get(apifull).then(r => {
    let body = r.body

    const embed = new RichEmbed()
    .setTitle(`Timed Events || ${body.day}`)
    .addField("Daily Reset", `${body.dailyReset}`, true)
    .addField("Contests", `**Bug Contest:** ${body.bug}`, true)
    .addField("S.S. Aqua", `**To Olivine:** ${body.olivine}\n**To Vermilion:** ${body.vermilion}`, true)
    .addField("Week Siblings", `**Monday:** ${body.mon}\n**Tuesday:** ${body.tue}\n**Wednesday:** ${body.wed}\n**Thursday:** ${body.thur}\n**Friday:** ${body.fri}\n**Saturday:** ${body.sat}\n**Sunday:** ${body.sun}`, true)
    .addField('Underground', `**Hairdresser 1:** ${body.hairdresser1}\n**Hairdresser 2:** ${body.hairdresser2}\n**Herb Shop:** ${body.herbshop}`, true)
    .addField("Maps", `**Union Cave BF2:** ${body.unioncaveb2f}\n**Lake of Rage:** ${body.rage}\n**MooMoo Farm:** ${body.moomoofarm}`, true)
    message.channel.send("", {
        embed: embed
    }).catch(console.error)

});
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "time",
    description: "Gives information on when timed events begin and end",
    usage: "time"
};