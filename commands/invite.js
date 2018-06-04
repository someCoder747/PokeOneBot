const settings = require('../settings.json');
const discord = require("discord.js");

exports.run = (client, message, params) => {

const embed = new discord.RichEmbed()
  .setTitle("Unofficial PokéOne Bot Links")
  .addField("Links", `**Discord:** [Server Link](https://discord.gg/t8WqrCx)\n**Bot Invite:** [Invite Link](https://discordapp.com/oauth2/authorize?client_id=426317582417788928&scope=bot)\n**Github:** [Repository Link](https://github.com/AussieGamer1994/UnofficialPokeOne)`, true)


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
  name: 'invite',
  description: 'Provides links for the Unofficial PokeOne Bot',
  usage: 'invite'
};