const settings = require('../settings.json');
const discord = require("discord.js");
const snekfetch = require("snekfetch");

exports.run = (client, message, args) => {
    if(!args[0]){  
    return message.channel.send(`Please input a Pokemon - use **${settings.prefix}help eggmove** for more info!`);
    }
    var search = args.splice(0, args.length);
	var isShiny = false;
	if(search[0].toLowerCase() == "shiny"){
		search.splice(0, 1);
		isShiny = true;
	}
	search.join(" ").toLowerCase();

    const api = settings.api.url
    const route = "/pokemon/"
    const token = settings.api.token

    let apifull = api + route + search + token

    snekfetch.get(apifull).then(r => {
        let body = r.body

        if (body.status == "404") {
            
            return message.channel.send(`Pokemon: ${search} not found. Please double check spelling!`);
        }

        var array = new Array();

		for (let index = 0; index < body.info.move_learnsets[1].regular_learnset.length; index++) {
            if (body.info.move_learnsets[1].regular_learnset[index].egg_move != null) {
                array[index] = body.info.move_learnsets[1].regular_learnset[index].move;
            }
        }
        if (array.length == 0) {
            var array = `${body.info.names.en} cannot learn any egg moves!`
        }

        const embed = new discord.RichEmbed()
            .setTitle(`#${body.info.national_id} || ${body.info.name} || ${body.info.types.join('/')}`)
            .setColor(0x0000C8)
            .addField("Egg Move List", array, true)
			if(isShiny){
				embed.setThumbnail(settings.shinyImages + `${(body.info.name).toLowerCase().replace(/\W/g, '')}.gif`);
			} else {
				embed.setThumbnail(settings.images + `${(body.info.name).toLowerCase().replace(/\W/g, '')}.gif`);
			}
        message.channel.send("", {
            embed: embed
        }).catch(console.error)

    });
}
exports.conf =
    {
        enabled: true,
        guildOnly: false,
        aliases: ['egg', 'em'],
        permLevel: 0
    };

exports.help = {
    name: 'eggmove',
    description: `Lists moves that can be learnt by given Pokemon by level`,
    usage: 'eggmove [pokemon name]'

};