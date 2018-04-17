const Discord = require('discord.js');
const client = new Discord.Client();
var commandPrefix = "_";
const config = require("./config.json");
client.on('ready', () => {
    console.log('I am ready!');
    console.log('Bot got ready , join now discord!')
    
});
client.on('message', message => {
    if (message.guild.commandPrefix == null) {message.guild.commandPrefix = "_"};
    if (message.content.startsWith(message.guild.commandPrefix))
    {
    const args = message.content.slice(message.guild.commandPrefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(command === "ping") {
    message.channel.send(":ping_pong: Pong! :ping_pong:")
} else if(command === "setprefix"){
    if (args[0] != undefined)
    {
        if (args[0].length == 1)
        {
            message.guild.commandPrefix = args[0];
            message.channel.send("**Server Prefix** has been set to : " + args[0]);
        }
        else
        {
            message.channel.send(":x: Prefix should contain only one letter/symbol.")
        }
    } else {
        message.channel.send(":x: **Please precise a symbol**")
    }
} else if(command === "say")
    {
        if(args[0] != undefined)
        {
            message.channel.send(message.content.replace(message.guild.commandPrefix + "say ",""));
        } else {
            message.channel.send("**LOL!** You want me to send an empty message?! You such a stupid.")
        }
    } else if(command === "avatar")
    {
        if(args[0] == undefined)
        {
            message.reply("Here's your avatar : " + message.author.avatarURL);
        } else {
            if(message.guild.members.exists("tag",args[0].replace("@","")) == true)
            {
                message.channel.send("Avatar of @" + message.guild.members.find("tag",args[0].replace("@","")).user.tag + " : " + message.guild.members.find("tag",args[0].replace("@","")).user.avatarURL);
                
            } else {
                message.channel.send("**Error :** Cannot find that user.");
                message.channel.send(message.guild.members.exists("tag",args[0].replace("@","")));
                message.channel.send(args[0].replace("@",""));
                message.channel.send(message.author.id);
            }
        }
    }else {
        message.channel.send("Unknown command, try '" + message.guild.commandPrefix + "help' for a list of commands.")
    }
}});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
