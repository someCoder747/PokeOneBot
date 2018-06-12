const settings = require('../settings.json');
const discord = require("discord.js");

exports.run = (client, message, params) => {

const embed = new discord.RichEmbed()
  .setTitle("Unofficial PokéOne Bot Links")
  .addField("Links", `**Discord:** [Server Link](https://discord.gg/fU9c4k7)\n**Bot Invite:** [Invite Link](https://discordapp.com/api/oauth2/authorize?client_id=452994315560681495&permissions=0&scope=bot)\n**Github:** [Repository Link](https://github.com/SwanGooseHongFei/PokeOneBot`, true)


  message.channel.send("", {
    embed: embed
}).catch(console.error)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['link'],
  permLevel: 0
};

exports.help = {
  name: 'links',
  description: 'Provides links for the Unofficial PokeOne Bot',
  usage: 'links'
};