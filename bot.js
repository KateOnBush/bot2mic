const Discord = require('discord.js');
const client = new Discord.Client();
const YoutubeDL = require('youtube-dl');
const ytdl = require('ytdl-core');
const prefix = "rayven "
function globalVar()
{
    this.__enabled = true;    
}
var global = new globalVar();
  var play = function(msg, suffix) {
    var voiceChannel = msg.member.voiceChannel;
    msg.channel.send('```Searching...```').then(response => {
      var searchstring = suffix;

      if (!suffix.toLowerCase().startsWith('http')) {
        searchstring = 'gvsearch1:' + suffix;
      }

      YoutubeDL.getInfo(searchstring, ['-q', '--no-warnings', '--force-ipv4'], (err, info) => {
        if (err || info.format_id === undefined || info.format_id.startsWith('0')) {
          return response.edit('Invalid video!');
        }

        response.edit('```Queued: ' + info.title + "```").then(() => {
	  if (msg.guild.queue == null){msg.guild.queue = [];}
          msg.guild.queue.push({
            'name': info.title,
            'url': info.webpage_url,
            'requested_by': msg.author.id,
          });
          if (msg.guild.queue.length === 1) playQueue(msg, suffix);
        }).catch(console.log);
      });
    }).catch(console.log);
  };

  var skipCurrentSong = function(msg){
	if (msg.guild.queue == null){msg.guild.queue = [];}
	if (msg.guild.queue.length !== 0)
	{
		if (msg.guild.joinedChannel != null)
		{
			msg.channel.send("```Skipped : " + msg.guild.queue.shift().name + "```")
			playQueue(msg,"");
		} else {
			msg.channel.send("**I'm not in a voice channel**")
		}
	} else {
		msg.channel.send("**Queue is already empty.**")
	}
  }
  var stopQueue = function(msg){
  if (msg.guild.joinedChannel !== null)
  {
	  msg.guild.queue = [];
	  msg.guild.joinedChannel.leave();
	  msg.guild.joinedChannel = null;
	  msg.channel.send("**Cleared queue and left all voice channels**")
  } else {
	  msg.channel.send("I'm not currently in a voice channel");
  }
  }
  var showQueue = function(msg) {
	  var queues = "```Queue list :\n";
	  if (msg.guild.queue == null){msg.guild.queue = [];}
		if(msg.guild.queue.length == 0){msg.channel.send("```Queue is empty.```"); return;}
	  for(i = 0;msg.guild.queue[i] != null;i++)
	  {
			if(msg.guild.queue[i+1] != null){
		  queues += (i+1) + " - " + msg.guild.queue[i].name + "\n";
			} else {
			queues += (i+1) + " - " + msg.guild.queue[i].name;
			}
	  }
		queues += "```";
		msg.channel.send(queues)
  }
  var joinChannel = function(msg){
    if(msg.member.voiceChannel != null)
    {
	msg.member.voiceChannel.join()
	msg.channel.send("**Joined : " + msg.member.voiceChannel.name + "**")
	    if(msg.guild.queue.length != 0)
			{
				playQueue(msg,"");
			}
    } else {
	msg.channel.send("You're not currently on a voice channel.")    
    }
  }
  var playQueue = function(msg, suffix, voiceChannel = msg.member.voiceChannel) {
    msg.guild.joinedChannel = voiceChannel;
    voiceChannel.join()
      .then(connection => {
        var stream = ytdl(msg.guild.queue[0].url, {
          audioonly: true,
          quality: 'highestaudio'
        });
        return connection.playStream(stream, {
          seek: 0,
          volume: 1
        });
      })
      .then(dispatcher => {
        dispatcher.on('error', error => {
          msg.guild.queue.shift();

          if (msg.guild.queue.length === 0) {
            voiceChannel.leave();
		msg.guild.joinedChannel = null;
            return;
          }

          playQueue(msg, suffix);

          console.error;
        });

        dispatcher.on("end", end => {
          msg.guild.queue.shift();

          if (msg.guild.queue.length === 0) {
            voiceChannel.leave();
		  msg.guild.joinedChannel = null;
            return;
          }

          playQueue(msg, suffix);
        });
      })
      .catch(console.error);
      
      return module;
  };


client.on('ready', () => {
    console.log('Rayven is ready , connected to '+client.guilds.size+' guilds !');
});
client.on('message', message => {
	var command = message.content.replace(prefix,"").split(" ")[0].toLowerCase();
	var args = message.content.replace(prefix + command + " ","").split(" ");
	if(command === "ping"){
		var embed = new Discord.RichEmbed()
		.setColor("00A2FF")
		.setTitle("Pong!")
		.setFooter("Rayven Bot by Aouab | NightFallerLegendsCommunity").addField("Pinged : **"+client.ping+"**")
		.addField("My ping is currently **" + (client.ping|0) + "** ms.")
	   	message.channel.send(embed);
	} else if(command === "debug"){
		try{
			message.channel.send("**Input:**\n```js\n"+args.join(" ")+"\n```\n**Output:**\n```js\n"+eval(args.join(" "))+"\n```");	
		} catch(err){
			message.channel.send("**Input:**\n```js\n"+args.join(" ")+"\n```\n**Caught error:**\n```js\n'"+eval(args.join(" "))+"'\n```");
		}
	}
	   
});
// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);


