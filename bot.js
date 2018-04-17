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
    else if (message.content === commandPrefix + "help")
    {
        message.channel.send("**Rayven Bot Commands :**");
        message.channel.send("");
        message.channel.send("Command Prefix set in server *" + message.channel.guild.name + "* : " + commandPrefix);
        message.channel.send("");
        message.channel.send("**" + commandPrefix + "help:** Show help about bot's commands.");
    }   
});
client.on('message', message => {
    if (message.content.startsWith(commandPrefix + "setcommandprefix")) {
        if (message.content.length < 19)
        {
    	    message.channel.send("**Usage :**");
            message.channel.send(commandPrefix + "setcommandprefix <letter/symbol> : *Sets the bot's command prefix in this server.");
        }
        if (message.content.length >= 19)
        {
            commandPrefix = message.content.charAt(19);
            message.channel.send(":white_check_mark: Command Prefix Successfully set to : " + commandPrefix);
        }
  	}
});
client.on('message', message => {
    if (message.content === commandPrefix + 'ping') {
    	message.reply(':ping_pong: Pong ! :ping_pong: ');
  	}
});

client.on('message', message => {
    if (message.content.startsWith(commandPrefix + 'say') and (message.content !=== commandPrefix + "say" or message.content !=== commandPrefix + "say ")) {
    	message.channel.send(message.content.replace(commandPrefix + "say"));
  	} else {
        message.channel.send("**LOL!** Want me to send an empty message? You stupid.");
    }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
