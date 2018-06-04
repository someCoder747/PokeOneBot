const settings = require('../settings.json');
const discord = require("discord.js");
const snekfetch = require("snekfetch");

exports.run = (client, message, args) => {
    if (!args[0]) {
        return message.channel.send(`Please input a Pokemon - use **${settings.prefix}help learnset** for more info!`);
    }
    const search = args.splice(0, args.length).join(" ").toLowerCase()

    const api = settings.api.url
    const route = "/pokemon/"
    const token = settings.api.token

    let apifull = api + route + search + token

    snekfetch.get(apifull).then(r => {
        let body = r.body

        if (body.status == "404") {
            return message.channel.send(`Pokemon: ${search} not found. Please double check spelling!`);
        }

        var image;
        if (body.info.custom_image) {
            image = body.info.custom_image;
        } else {
            if (body.info.national_id < 10) {
                image = `http://api.gamernationnetwork.xyz/pokemon/poke/00${body.info.national_id}.gif`;
            }
            if (body.info.national_id >= 10 & body.info.national_id < 100) {
                image = `http://api.gamernationnetwork.xyz/pokemon/poke/0${body.info.national_id}.gif`;
            } else 
            if (body.info.national_id >= 100 & body.info.national_id <= 721){
                image = `http://api.gamernationnetwork.xyz/pokemon/poke/${body.info.national_id}.gif`;
            } else
            if (body.info.national_id >= 722) {
                image = `http://api.gamernationnetwork.xyz/pokemon/poke/${body.info.national_id}.png`;
            }
        }

        let number = 0;

        for (let index = 0; index < 16; index++) {
            if (body.info.move_learnsets[index].games[0] == "Sun") {
                number = index;
                break;
            }
        }

        var array = new Array();
        for (let index = 0; index < body.info.move_learnsets[number].learnset.length; index++) {
            if (body.info.move_learnsets[number].learnset[index].level != null) {
                array[index] = "Lvl." + body.info.move_learnsets[number].learnset[index].level + " - " + body.info.move_learnsets[number].learnset[index].move;
            }
        }
        if (array.length == 0) {
            var array = "API error"
        }

        const embed = new discord.RichEmbed()
            .setTitle(`#${body.info.national_id} || ${body.info.name} || ${body.info.types.join('/')}`)
            .setColor(0x0000C8)
            .addField("Levelling Learnset List", array, true)
            .setThumbnail(image)

        message.channel.send("", {
            embed: embed
        }).catch(console.error)

    });
}
exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ['level', 'learn', 'set'],
        permLevel: 0
    };

exports.help = {
    name: 'learnset',
    description: `Lists moves that can be learnt by given Pokemon by level`,
    usage: 'learnset [pokemon name]'

};