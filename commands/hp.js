const settings = require('../settings.json');
const discord = require("discord.js");
exports.run = (client, message, args) => {

  var HPIV = message.content.split(' ').slice(1).shift();
  var AttackIV = message.content.split(' ').slice(2).shift();
  var DefenseIV = message.content.split(' ').slice(3).shift();
  var SpAtkIV = message.content.split(' ').slice(4).shift();
  var SpDefIV = message.content.split(' ').slice(5).shift();
  var SpeedIV = message.content.split(' ').slice(6).shift();

  if (!args[5] || args.length > 6) {
    return message.channel.send(`Please input exactly 6 valid IVs. Input your Pokemon's IVs separated by a space: **${settings.prefix}hp 23 19 16 7 16 20** - use **${settings.prefix}help hp** for more info!`);
  }


  if(HPIV > 31 || AttackIV > 31 || DefenseIV > 31 || SpeedIV > 31 || SpAtkIV > 31 || SpDefIV > 31) {
    return message.channel.send(`One or more of the given IVs is higher then 31. Please check your IVs and try again - use **${settings.prefix}help hp** for more info!!`)
  }

  if (isNaN(HPIV)||isNaN(AttackIV)||isNaN(DefenseIV)||isNaN(SpeedIV)||isNaN(SpAtkIV)||isNaN(SpDefIV)) {
    return message.channel.send("One or more of the given IVs is not a number!")
  }

  /*if (isNaN(HPIV)) {
    return message.channel.send("Your HP IV must be a number!")
  }
  if (isNaN(AttackIV)) {
    return message.channel.send("Your Attack IV must be a number!")
  }
  if (isNaN(DefenseIV)) {
    return message.channel.send("Your Defense IV must be a number!")
  }
  if (isNaN(SpeedIV)) {
    return message.channel.send("Your Speed IV must be a number!")
  }
  if (isNaN(SpAtkIV)) {
    return message.channel.send("Your Special Attack IV must be a number!")
  }
  if (isNaN(SpDefIV)) {
    return message.channel.send("Your Special Defense IV must be a number!")
  }*/


  

  //Checks if IVs are even numbers for HP
  if (HPIV % 2 == 0) {
    var HPIV = 0
  } else {
    var HPIV = 1
  }
  if (AttackIV % 2 == 0) {
    var AttackIV = 0
  } else {
    var AttackIV = 1
  }
  if (DefenseIV % 2 == 0) {
    var DefenseIV = 0
  } else {
    var DefenseIV = 1
  }
  if (SpeedIV % 2 == 0) {
    var SpeedIV = 0
  } else {
    var SpeedIV = 1
  }
  if (SpAtkIV % 2 == 0) {
    var SpAtkIV = 0
  } else {
    var SpAtkIV = 1
  }
  if (SpDefIV % 2 == 0) {
    var SpDefIV = 0
  } else {
    var SpDefIV = 1
  }

  var tota = Math.floor(((HPIV + (2 * AttackIV) + (4 * DefenseIV) + (8 * SpeedIV) + (16 * SpAtkIV) + (32 * SpDefIV)) * 15) / 63)


  if (tota == "0") {
    const fightingtype = new discord.RichEmbed()
      .setTitle('Hidden Power')
      .setColor(0xDC7633)
      .setDescription(`Type: Fighting`)

    message.channel.send("", {
      embed: fightingtype
    }).catch(console.error);
  }
  if (tota == "1") {
    const flyingtype = new discord.RichEmbed()
      .setTitle('Hidden Power')
      .setColor(0x9696FF)
      .setDescription(`Type: Flying`)

    message.channel.send("", {
      embed: flyingtype
    }).catch(console.error);
  }
  if (tota == "2") {
    const poisontype = new discord.RichEmbed()
      .setTitle('Hidden Power')
      .setColor(0xC814FF)
      .setDescription(`Type: Poison`)

    message.channel.send("", {
      embed: poisontype
    }).catch(console.error);
  }
  if (tota == "3") {
    const groundtype = new discord.RichEmbed()
      .setTitle('Hidden Power')
      .setColor(0xC89B00)
      .setDescription(`Type: Ground`)

    message.channel.send("", {
      embed: groundtype
    }).catch(console.error);
  }
  if (tota == "4") {
    const rocktype = new discord.RichEmbed()
      .setTitle('Hidden Power')
      .setColor(0xE59866)
      .setDescription(`Type: Rock`)

    message.channel.send("", {
      embed: rocktype
    }).catch(console.error);
  }
  if (tota == "5") {
    const bugtype = new discord.RichEmbed()
      .setTitle('Hidden Power')
      .setColor(0x007D00)
      .setDescription(`Type: Bug`)

    message.channel.send("", {
      embed: bugtype
    }).catch(console.error);
  }
  if (tota == "6") {
    const ghosttype = new discord.RichEmbed()
      .setTitle('Hidden Power')
      .setColor(0x640096)
      .setDescription(`Type: Ghost`)

    message.channel.send("", {
      embed: ghosttype
    }).catch(console.error);
  }
  if (tota == "7") {
    const steeltype = new discord.RichEmbed()
      .setTitle('Hidden Power')
      .setColor(0x646464)
      .setDescription(`Type: Steel`)

    message.channel.send("", {
      embed: steeltype
    }).catch(console.error);
  }
  if (tota == "8") {
    const firetype = new discord.RichEmbed()
      .setTitle('Hidden Power')
      .setColor(0xFF9600)
      .setDescription(`Type: Fire`)

    message.channel.send("", {
      embed: firetype
    }).catch(console.error);
  }
  if (tota == "9") {
    const watertype = new discord.RichEmbed()
      .setTitle('Hidden Power')
      .setColor(0x0000C8)
      .setDescription(`Type: Water`)

    message.channel.send("", {
      embed: watertype
    }).catch(console.error);
  }
  if (tota == "10") {
    const grasstype = new discord.RichEmbed()
      .setTitle('Hidden Power')
      .setColor(0x00C800)
      .setDescription(`Type: Grass`)

    message.channel.send("", {
      embed: grasstype
    }).catch(console.error);
  }
  if (tota == "11") {
    const electrictype = new discord.RichEmbed()
      .setTitle('Hidden Power')
      .setColor(0xE7C332)
      .setDescription(`Type: Electric`)

    message.channel.send("", {
      embed: electrictype
    }).catch(console.error);
  }
  if (tota == "12") {
    const psychictype = new discord.RichEmbed()
      .setTitle('Hidden Power')
      .setColor(0xF032E1)
      .setDescription(`Type: Psychic`)

    message.channel.send("", {
      embed: psychictype
    }).catch(console.error);
  }
  if (tota == "13") {
    const icetype = new discord.RichEmbed()
      .setTitle('Hidden Power')
      .setColor(0x32E7E4)
      .setDescription(`Type: Ice`)

    message.channel.send("", {
      embed: icetype
    }).catch(console.error);
  }
  if (tota == "14") {
    const dragontype = new discord.RichEmbed()
      .setTitle('Hidden Power')
      .setColor(0x9B32E7)
      .setDescription(`Type: Dragon`)

    message.channel.send("", {
      embed: dragontype
    }).catch(console.error);
  }
  if (tota == "15") {
    const darktype = new discord.RichEmbed()
      .setTitle('Hidden Power')
      .setColor(0x5A4326)
      .setDescription(`Type: Dark`)

    message.channel.send("", {
      embed: darktype
    }).catch(console.error);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'hp',
  description: 'Gives Hidden Power type based on IVs that are given. IVs must be between 0 and 31.',
  usage: 'hp [HP IV] [ATK IV] [DEF IV] [SPATK IV] [SPDEF IV] [SPEED IV]'
};