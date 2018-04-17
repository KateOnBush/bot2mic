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
    else if (message.content === commandPrefix + "avatar")
    {
        var channel = message.channel;
        channel.send("**Rayven Bot Commands :**");
        channel.send("");
        channel.send("Command Prefix set in server *" + message.channel.guild.name + "* : " + commandPrefix);
        channel.send("");
        channel.send("**" + commandPrefix + "help:** Show help about bot's commands.");
    }   
});
client.on('message', message => {
    if (message.toString().startsWith(commandPrefix + "setcommandprefix")) {
        if (message.toString().length < 19)
        {
    	    message.channel.send("**Usage :**);
            message.channel.send(commandPrefix + "setcommandprefix <letter/symbol> : *Sets the bot's command prefix in this server.");
        }
        else
        {
            commandPrefix = message.toString().charAt(19);
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
