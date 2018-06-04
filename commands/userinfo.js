const settings = require('../settings.json');
const discord = require("discord.js");
// const {parseUser} = require('../util/parseUser.js');
exports.run = (client, message, params) => {

  const user = message.mentions.users.first();
  // parseUser(message, user);
  
  var searchUser;
  var searchMember;

  if (user < 1 || !user) {
    searchUser = message.author
    searchMember = message.member
  } else {
    searchUser = user
    searchMember = message.guild.member(user)
  }

const embed = new discord.RichEmbed()
  .setTitle(`${searchUser.tag} Information`)
  .setThumbnail(`${searchUser.displayAvatarURL}`)
  .setDescription(`**Created:** ${searchUser.createdAt}\n**Joined:** ${searchMember.joinedAt}`)
  .addField(`User Stats`, `**Status:**\n${searchUser.presence.status}\n\n**ID:**\n${searchUser.id}\n\n**Bot:**\n${searchUser.bot}`, true)
  .addField(`Member Stats`, `**Top Role:**\n${searchMember.highestRole}\n\n**Display Name:**\n${searchMember.displayName}\n\n**Roles:**\n${searchMember.roles.map(r => r.name).join("\n")}`, true)

  message.channel.send("", {
    embed: embed
}).catch(console.error)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['uinfo'],
  permLevel: 0
};

exports.help = {
  name: 'userinfo',
  description: 'Displays information on your Discord Account',
  usage: 'userinfo'
};