const settings = require('../settings.json');
const discord = require("discord.js");
const snekfetch = require('snekfetch');

exports.run = (client, message, args) => {

    if (!args[0]) {
        message.channel.send(`Please input a valid type - use **${settings.prefix}help type** for more info!`);
        return;
    }

    if (!args[1]) {
        const search = args.splice(0, args.length).join(" ").toLowerCase()

        const api = settings.api.url
        const route = "/types/"
        const token = settings.api.token

        let apifull = api + route + search + token


        snekfetch.get(apifull).then(r => {
            let body = r.body

            if (body.status == "404") {
                return message.channel.send(`Type: ${search} not found. Please double check spelling!`);;
            }
            const deals = new Array();
            const takes = new Array();
            for (let index = 0; index < 18; index++) {
                var temp = body.info.attacking[index];
                var array = temp.split(" ");
                temp = array[1] + "x to " + array[0];
                deals.push(temp);
            }
            for (let index = 0; index < 18; index++) {
                var temp = body.info.defending[index];
                var array = temp.split(" ");
                temp = array[1] + "x from " + array[0];
                takes.push(temp);
            }
            const embed = new discord.RichEmbed()
                .setTitle(`${body.info.name}`)
                .setColor(parseInt(body.info.colour, 16))
                .addField(`__Deals:__`, deals, true)
                .addField(`__Takes:__`, takes, true)


            message.channel.send("", {
                embed: embed
            }).catch(console.error)

        });
        return;
    }

    const searchOne = args[0].toLowerCase();
    const searchTwo = args[1].toLowerCase();

    const api = settings.api.url;
    const route = "/types/";
    const token = settings.api.token;

    let apiOne = api + route + searchOne + token;
    let apiTwo = api + route + searchTwo + token;

    const dealsOne = new Array();
    const dealsTwo = new Array();
    const takesOne = new Array();
    const takesTogether = new Array();

    
    var name = "";

    snekfetch.get(apiOne).then(r => {
        let body = r.body

        if (body.status == "404") {
            return message.channel.send(`Type: ${searchOne} not found. Please double check spelling!`);;
        }

        for (let index = 0; index < 18; index++) {
            var temp = body.info.attacking[index];
            var array = temp.split(" ");
            temp = array[1] + "x to " + array[0];
            dealsOne.push(temp);
        }
        for (let index = 0; index < 18; index++) {
            var temp = body.info.defending[index].split(" ")[1];
            takesOne.push(temp);
        }
        name = body.info.name;
        const colour = body.info.colour;

        snekfetch.get(apiTwo).then(r => {
            let body = r.body

            if (body.status == "404") {
                return message.channel.send(`Type: ${searchTwo} not found. Please double check spelling!`);;
            }

            for (let index = 0; index < 18; index++) {
                var temp = body.info.attacking[index];
                var array = temp.split(" ");
                temp = array[1] + "x to " + array[0];
                dealsTwo.push(temp);
            }

            for (let index = 0; index < 18; index++) {
                var firstTypeMultiplier = takesOne[index];
                var secondTypeMultiplier = body.info.defending[index].split(" ")[1];

                var finalMultiplier = parseFloat(firstTypeMultiplier) * parseFloat(secondTypeMultiplier);

                var temp = finalMultiplier + "x from " + body.info.defending[index].split(" ")[0];
                takesTogether.push(temp);
            }

            tempName = name;
            name = tempName + "/" + body.info.name

            const embed = new discord.RichEmbed()
                .setTitle(name)
                .setColor(parseInt(colour, 16))
                .addField(`__${name.split("/")[0]} Deals:__`, dealsOne, true)
                .addField(`__${name.split("/")[1]} Deals:__`, dealsTwo, true)
                .addField(`__Together Takes:__`, takesTogether, true)
            message.channel.send("", {
                embed: embed
            }).catch(console.error)
        });
    });
};





exports.conf =
    {
        enabled: true,
        guildOnly: false,
        aliases: ['chart', "typ", "typechart"],
        permLevel: 0
    };

exports.help = {
    name: 'type',
    description: `Lists type advantages and disadvantages for given type`,
    usage: 'type [type]'

};