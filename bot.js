const Discord = require('discord.js');
const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds]});

const commands = [
	new Discord.SlashCommandBuilder().setName('groupe').setDescription('Choisi ton groupe 2MIC!')
]
	.map(command => command.toJSON());

const rest = new Discord.REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async ()=>{

	try {
		
	await rest.put(Discord.Routes.applicationGuildCommands("1027321324714070106", "1027322663061966868"), { body: commands });
		
		console.log("OK!")
		
	} catch(err){
	
		console.log("Erreur de sa mere " + err);
		
	}

})();

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
  
	if (interaction.commandName === 'groupe') {
	  await interaction.reply('Bonsoir!');
	}
  });

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);


