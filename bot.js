const {

	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	REST,
	SlashCommandBuilder,
	Client,
	Routes,
	GatewayIntentBits

} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds]});

const commands = [
	new SlashCommandBuilder().setName('groupe').setDescription('Choisi ton groupe 2MIC!')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async ()=>{

	try {
		
		await rest.put(Routes.applicationGuildCommands("1027321324714070106", "1027322663061966868"), { body: commands });
		
		console.log("OK!");
		
		
	} catch(err){
	
		console.log("Erreur de sa mere " + err);
		
	}

})();



client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'groupe') {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('MIC A!')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('MIC B!')
					.setStyle(ButtonStyle.Secondary)
			);


		await interaction.reply({ content: 'Choisi ton groupe mon poto!', components: [row] });
	}
  });

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);


