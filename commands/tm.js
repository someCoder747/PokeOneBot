const settings = require('../settings.json');
const discord = require("discord.js");
const snekfetch = require("snekfetch");

exports.run = (client, message, args) => {
    if (!args[0]) {
        return message.channel.send(`Please input a Pokemon - use **${settings.prefix}help tm** for more info!`);
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

        var tmList = new Array();

        const hms = new Array();
        hms[0] = "HM08 - Rock Climb";
        hms[1] = "HM09 - Flash";
        hms[2] = "HM10 - Defog";
        hms[3] = "HM11 - Whirlpool";

        const hmList = new Array();

        for (let index = 0; index < body.info.move_learnsets[0].tm_learnset.length; index++) {
            if (body.info.move_learnsets[0].tm_learnset[index].tm != null) {
                var skip = false;
                hms.forEach(element => {
                    if (element.substring(7) == body.info.move_learnsets[0].tm_learnset[index].move) {
                        //skips this iteration, but add it to an hm's list
                        hmList.push(element);
                        skip = true;
                    }
                });
                //if it's an hm from 1-7 take it out anyways for sorting
                if(body.info.move_learnsets[0].tm_learnset[index].tm.charAt(0) == "H"){
                    hmList.push(body.info.move_learnsets[0].tm_learnset[index].tm + " - " + body.info.move_learnsets[0].tm_learnset[index].move);
                    skip = true;
                }
                if (!skip) {
                    tmList.push(body.info.move_learnsets[0].tm_learnset[index].tm + " - " + body.info.move_learnsets[0].tm_learnset[index].move);
                }
            }
        }

        hmList.sort();
        hmList.reverse();

        hmList.forEach(element => {
            tmList.unshift(element);
        });

        if (tmList.length == 0) {
            var tmList = `${body.info.names} cannot learn any TMs nor HMs!`;
        }

        //able to split into two columns with 2 lines of code rather than like 20
        var tmListTwo = new Array();

        tmListTwo = tmList.splice((tmList.length + (tmList.length % 2)) / 2, tmList.length - (tmList.length - (tmList.length % 2)) / 2);

        const embed = new discord.RichEmbed()
            .setTitle(`#${body.info.national_id} || ${body.info.name} || ${body.info.types.join('/')}`)
            .setColor(0x0000C8)
            .addField("TM/HM List", tmList, true)
            .addField("\u200b", tmListTwo, true)
            .setThumbnail(images)

        message.channel.send("Gen 7 Pokemon may have wrong TM's HM's ATM!", {
            embed: embed
        }).catch(console.error)

    });
}
exports.conf =
    {
        enabled: true,
        guildOnly: false,
        aliases: ['hm'],
        permLevel: 0
    };

exports.help = {
    name: 'tm',
    description: `Lists the available TMs and HMs that can be learnt by given Pokemon`,
    usage: 'tm [pokemon name]'

};