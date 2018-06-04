const settings = require('../settings.json');
exports.run = (client, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    var commandList = new Array();
    commandNames.forEach(command => {
      var cmd = client.commands.get(command);
      if (client.elevation(message) >= cmd.conf.permLevel) {
        //filters through all commands, not displaying those the author cannot use
        commandList.push(client.commands.get(command));
      }
    });

    message.channel.send(`= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n\n${commandList.map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.conf.enabled ? `${c.help.description}` : "Disabled"}`).join('\n')}`, { code: 'asciidoc' });
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      
      //if author cannot use the command, do not show the help for it
      if (client.elevation(message) < command.conf.permLevel) {
        return message.channel.send(`You do not have access to this command!`);
      }

      var aliases = new Array();
      if (!command.conf.aliases[0]) {
        aliases = "None";
      } else {
        aliases = command.conf.aliases.join(", ");
      }
      message.channel.send(`= Command: ${command.help.name} = \n${command.help.description}\nUsage: ` + settings.prefix + `${command.help.usage}` + '\nAlternatives: ' + aliases, { code: 'asciidoc' });
    } else {
      message.channel.send(`Command: ${params[0]} not found. Please double check spelling!`);
    }
  }



};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'commands'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Displays all the available commands and more info on single commands',
  usage: 'help [command]'
};