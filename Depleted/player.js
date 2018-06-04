const {RichEmbed} = require("discord.js");
const settings = require('../settings.json');
const sql = require("sqlite");
exports.run = (client, message, args) => {

    if (!args[0]) return message.channel.send(`Use **${settings.prefix}help player** for more info on how to use this command!`);

    if (args[0].toLowerCase() == "add" || args[0].toLowerCase() == "update") {
        if (args[0].toLowerCase() == "add") {
            if(!args[1]) return message.channel.send("Please redo the command with your PlayerName and Guild [Optional]")
            if (!args[2]) {
                guild = "None"
            } else {
                guild = args[2]
            }

            sql.get(`SELECT * FROM players WHERE userID ="${message.author.id}"`).then(row => {
                if (!row) {
        
                    const embed = new RichEmbed()
                    .setTitle(`${args[1]} || ${guild}`)
                    .setDescription("more data coming soon!")
        
                    sql.run('INSERT INTO players (userID, gamename, guild) VALUES (?, ?, ?)', [message.author.id, args[1], guild]).then(
                        message.channel.send("this is in Development!\nAdded to Database", {
                        embed: embed
                    }).catch(console.error)
                )
                } else {
        
        
                    message.channel.send("this is in Development!\nYou have aleady added your data to the Database!").catch(console.error)
                    }
        
                })
        } else
        if (args[0].toLowerCase() == "update") {
            message.channel.send("This feature is not ready yet!")
        }
    } else 
    if (args[0].toLowerCase() !== "add" || args[0].toLowerCase() !== "update") {

    sql.get(`SELECT * FROM players WHERE gamename ="${args[0]}"`).then(row => {
        if (!row) {
            message.channel.send("That User is currently not in my Database\nIf this is you, you can add yourself to the database with the !addplayer command")
        } else {
            const embed = new RichEmbed()
            .setTitle(`${row.gamename} || ${row.guild}`)
            .setDescription("more data coming soon!")

            message.channel.send("this is in Development!", {
                embed: embed
            }).catch(console.error)
            }

        })
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'player',
  description: `Displays a player's information`,
  usage: `player [player's name]`
};