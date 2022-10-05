const Discord = require('discord.js');
const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds]});

const commands = [
	new Discord.SlashCommandBuilder().setName('salut').setDescription('Bonsoir!')
]
	.map(command => command.toJSON());

const rest = new Disocrd.REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async ()=>{

	try {
		
	await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
		
	} catch(err){
	
		console.log("Erreur de sa mere " + error);
		
	}

})();


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);


