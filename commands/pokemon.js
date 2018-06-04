const {
    RichEmbed
} = require("discord.js");
const snekfetch = require("snekfetch");
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
    if (!args[0]) {
        return message.channel.send(`Please input a Pokemon - use **${settings.prefix}help pokemon** for more info!`);
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

        const abilities = new Array();
        var evolutions = new Array();
        var prevolution = new Array();

        if (body.info.evolutions == null) {
            evolutions = `N/A`;
        } else {
            for (let index = 0; index < body.info.evolutions.length; index++) {

                //Temporary holder for the evolution and method
                var evo = "";

                //Who is it evolving to?
                const name = body.info.evolutions[index].to;
                evo = evo + `**${name}**`;

                //Does it require trading?
                const trading = body.info.evolutions[index].trade;
                if (trading != null) {
                    evo = evo + " by trading";
                }

                //Does it need an item to be used on it?
                const item = body.info.evolutions[index].item;
                if (item != null) {
                    if (/[aeiouAEIOU]/.test(item.charAt(0))) {
                        evo = evo + " using an " + item;
                    } else {
                        evo = evo + " using a " + item;
                    }
                }

                //Does it need to hold an item?
                const holdItem = body.info.evolutions[index].hold_item;
                if (holdItem != null) {
                    if (/[aeiouAEIOU]/.test(holdItem.charAt(0))) {
                        evo = evo + " whilst holding an " + holdItem;
                    } else {
                        evo = evo + " whilst holding a " + holdItem;
                    }
                }

                //What minimum level does it need?
                const level = body.info.evolutions[index].level;
                if (level != null) {
                    evo = evo + " starting at level " + level;
                }

                //Does it require a level up to trigger?
                const levelUp = body.info.evolutions[index].level_up;
                if (levelUp != null) {
                    evo = evo + " after a level up";
                }

                //Does it need happiness?
                const happy = body.info.evolutions[index].happiness;
                if (happy != null) {
                    evo = evo + " with at least 220 friendship";
                }

                //Does it need a specific move?
                const move = body.info.evolutions[index].move_learned;
                if (move != null) {
                    evo = evo + " knowing the move " + move;
                }

                //Does it need to satisfy certain conditions?
                const conditions = new Array();
                if (body.info.evolutions[index].conditions != null) {
                    for (let i = 0; i < body.info.evolutions[index].conditions.length; i++) {
                        conditions[i] = body.info.evolutions[index].conditions[i];
                    }

                    if (conditions != null) {
                        if (conditions.length > 1) {
                            evo = evo + " " + conditions.join(', ');
                        } else {
                            evo = evo + " " + conditions;
                        }
                    }
                }

                //After writing, add to list of evolutions
                evolutions[index] = evo;

            }
        }

        if (body.info.evolution_from == null) {
            prevolution = `N/A`;
        } else {
            prevolution = body.info.evolution_from;
        }

        for (let index = 0; index < body.info.abilities.length; index++) {
            if (body.info.abilities[index].hidden == true) {
                abilities[index] = body.info.abilities[index].name + " [Hidden]";
            } else {
                abilities[index] = body.info.abilities[index].name;
            }

        }

        const stats = new Array();

        stats[0] = `HP: ` + body.info.base_stats.hp;
        stats[1] = `ATK: ` + body.info.base_stats.atk;
        stats[2] = `DEF: ` + body.info.base_stats.def;
        stats[3] = `SPATK: ` + body.info.base_stats.sp_atk;
        stats[4] = `SPDEF: ` + body.info.base_stats.sp_def;
        stats[5] = `SPEED: ` + body.info.base_stats.speed;

        const evTemp = new Array();
        evTemp[0] = `HP: ` + body.info.ev_yield.hp;
        evTemp[1] = `ATK: ` + body.info.ev_yield.atk;
        evTemp[2] = `DEF: ` + body.info.ev_yield.def;
        evTemp[3] = `SPATK: ` + body.info.ev_yield.sp_atk;
        evTemp[4] = `SPDEF: ` + body.info.ev_yield.sp_def;
        evTemp[5] = `SPEED: ` + body.info.ev_yield.speed;

        var id = "" + body.info.national_id;

        for (let index = id.length; index < 3; index++) {
            id = "0" + id;
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

        var eggGroup = body.info.egg_groups;
        var genderRatios = new Array();

        if (body.info.gender_ratios == null) {
            genderRatios = "Genderless";
        } else {
            genderRatios.push("Male: " + body.info.gender_ratios.male + "%");
            genderRatios.push("Female: " + body.info.gender_ratios.female + "%");
        }
        const embed = new RichEmbed()
        if (body.info.isGlitch) {
            embed.setTitle(`#${body.info.national_id} || ${body.info.name} || ${body.info.types.join('/')}`)
            embed.setColor(0x0000C8)
            embed.addField(`__${body.info.encoder[0]}:__`, stats.join(", "), true)
            embed.addField(`__${body.info.encoder[1]}:__`, evTemp.join(", "), true)
            embed.addField(`__${body.info.encoder[2]}:__`, abilities, false)
            embed.addField(`__${body.info.encoder[3]}:__`, prevolution, false)
            embed.addField(`__${body.info.encoder[4]}:__`, evolutions, true)
            embed.setThumbnail(image);
        } else {
            embed.setTitle(`#${body.info.national_id} || ${body.info.name} || ${body.info.types.join('/')}`)
            embed.setColor(0x0000C8)
            embed.addField(`__Base Stats:__`, stats, true)
            embed.addField("__EV Yield:__", evTemp, true)
            embed.addField(`__Weight and Height:__`, body.info.height_us + "\n" + body.info.height_eu + "\n" + body.info.weight_us + "\n" + body.info.weight_eu, true)
            embed.addField(`__Abilities:__`, abilities, true)
            embed.addField("__Gender Ratio:__", genderRatios, true)
            embed.addField(`__Egg Group:__`, eggGroup, true)
            embed.addField("__Evolves From:__", prevolution, true)
            embed.addField("__Evolves Into:__", evolutions, false)
            embed.setThumbnail(image);
        }
        message.channel.send("", {
            embed: embed
        }).catch(console.error)
    })
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["poke", "p"],
    permLevel: 0
};

exports.help = {
    name: "pokemon",
    description: "Gives information on given pokemon",
    usage: "pokemon [pokemon name]"
};