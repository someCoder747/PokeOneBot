const settings = require('../settings.json');
const discord = require("discord.js");
exports.run = (client, message, params) => {
  
    const embed = new discord.RichEmbed()
    .setTitle(`Download Links`)
    .setColor('RANDOM')
    .setDescription(`
**Google Drive**
📂 x86 No Download
📂 x64 No Download
📂 Mac: ¯\\_(ツ)_/¯
📂 Linux: TBC
📂 Android: TBC
    `)
/*
    message.channel.send("", {
        embed: embed
    }).catch(console.error)
*/

message.channel.send(`you should <#366714491582283778>`)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['dl'],
  permLevel: 0
};

exports.help = {
  name: 'download',
  description: 'Displays all the available download links for P1',
  usage: 'download'
};