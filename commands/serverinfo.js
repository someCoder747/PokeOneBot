const settings = require('../settings.json');
const discord = require("discord.js");
exports.run = (client, message, params) => {

let afkchan;

if (!message.guild.afkChannel) {
    afkchan = "None"
} else {
    afkchan = message.guild.afkChannel
}

const embed = new discord.RichEmbed()
  .setTitle(`${message.guild.name} Information`)
  .setThumbnail(`${message.guild.iconURL}`)
  .setDescription(`**Created:** ${message.guild.createdAt}`)
  .addField(`Stats`, `**Users:** ${message.guild.members.size}\n**Channels:** ${message.guild.channels.size}\n**AFK Channel:** ${afkchan}\n**AFK Timer:** ${(message.guild.afkTimeout / 60)} mins`, true)
  .addField(`Roles`, `${message.guild.roles.map(r => r.name).join("\n")}`, true)
  .setFooter(`Owner: ${message.guild.owner.user.tag}`, message.guild.owner.user.displayAvatarURL)
  message.channel.send("", {
    embed: embed
}).catch(console.error)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sinfo'],
  permLevel: 0
};

exports.help = {
  name: 'serverinfo',
  description: 'Displays information on the current Discord Server',
  usage: 'serverinfo'
};