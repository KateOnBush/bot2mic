const Discord = require('discord.js');
const client = new Discord.Client();
var commandPrefix = "_";
const config = require("./config.json");
client.on('ready', () => {
    console.log('I am ready!');
    console.log('Bot got ready , join now discord!')
});
client.on('message', message => {
    if (message.channel.type !== "dm")
    {
    if (message.guild.commandPrefix == null) {message.guild.commandPrefix = "_"};
    if ((message.content.startsWith(message.guild.commandPrefix)) && (message.channel.type !== "dm"))
    {
    const args = message.content.slice(message.guild.commandPrefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(command === "ping") {
    message.channel.send(":ping_pong: Pong! :ping_pong:")
    message.channel.send(":ping_pong: Bot Ping is about **" + client.ping + " ms** , hehe :ping_pong:")
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
    } else if(command === "help")
    {
        message.delete();
        message.channel.send("Check your DM , <@" + message.author.id + ">");
        message.author.createDM();
        message.author.sendMessage("Hi there!");
    } else if(command === "contact") {
        if(args[0] != undefined)
        {
            client.guilds.find("name","NightFallerLegendsCommunity").owner.send("**" + message.author.tag + " told you : **" + message.content.replace(message.guild.commandPrefix + "contact ",""));
            message.channel.send("Successfully sent message to my developper.");
        } else {
            message.channel.send("**Sorry** but your message is empty.")
        }
    }else {
        message.channel.send("Unknown command, try '" + message.guild.commandPrefix + "help' for a list of commands.")
    }
}} else {
    if (message.author.id == client.guilds.find("name","NightFallerLegendsCommunity").owner.id)
    {
        const args = message.content.slice(message.guild.commandPrefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        if(command === "reply")
        {
            if((args[0] != null) || (args[1] != null))
            {
                for(k = 0;client.guilds.array()[k] != null; k += 1)
                {
                    const user = client.guilds.array()[k].members.find("tag",args[0]);
                }
                if (user)
                {
                    user.lastMessage.channel.send("**My Dev. replied to you, <@" + user.id + "> :** " message.content.replace(message.content.charAt(0) + "reply " + args[0]));
                } 
                else
                {
                    message.channel.send("Couldn't find that user, sir.")
                }
            } else {
                message.channel.send("You left one of the arguments empty , sir.")
            }
        } else {
            message.channel.send("I can't understand this command , sir.")
        }
    }
}});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
