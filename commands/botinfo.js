const settings = require('../settings.json');
const discord = require("discord.js");
const pm2 = require('pm2')
const moment = require('moment')
require("moment-duration-format");
exports.run = (client, message, params) => {

  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
const embed = new discord.RichEmbed()
  .setTitle("Unofficial PokéOne Bot Stats")
  .setURL("https://discord.gg/t8WqrCx")
  .addField("Versions", `**Bot:** 1.1.1\n**Discord.js:** ${discord.version}\n**Nodejs:** ${process.version}`, true)
  .addField("Stats", `**Uptime:** ${duration}\n**Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\n**Users:** ${client.users.size.toLocaleString()}\n**Servers:** ${client.guilds.size.toLocaleString()}`, true)
  .addField("Bot Devs", `[AussieGamer1994#2751](https://twitter.com/aussiegamer1994)\n[SwanGoose#8299](https://www.hbw.com/sites/default/files/styles/ibc_1k/public/ibc/p/Swan-Goose-2.jpg?itok=l3eFgA9B)`)

  message.channel.send("", {
    embed: embed
}).catch(console.error)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'botinfo',
  description: 'Displays Bots Stats and Information',
  usage: 'botinfo'
};