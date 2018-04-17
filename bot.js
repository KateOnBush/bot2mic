const Discord = require('discord.js');
const client = new Discord.Client();
var commandPrefix = "_";

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === commandPrefix + "avatar") {
    	message.reply("Here's your avatar ! " + message.author.avatarURL);
  	}
});
client.on('message', message => {
    if (message.toString().startsWith(commandPrefix + "setcommandprefix")) {
        if (message.toString().replace(commandPrefix + "setcommandprefix ").length !== 1)
        {
    	    message.channel.send(":x: Error while trying to set the command prefix. Please try again.");
        }
        else
        {
            commandPrefix = message.toString().replace(commandPrefix + "setcommandprefix ");
            message.channel.send(":white_check_mark: Command Prefix Successfully set to : " + commandPrefix)
        }
  	}
});
client.on('message', message => {
    if (message.content === commandPrefix + 'bing') {
    	message.reply('BONG!');
  	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
