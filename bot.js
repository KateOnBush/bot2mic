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
	new SlashCommandBuilder().setName('groupe').setDescription('Choisi ton groupe 2MIC!'),

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


///Chat Input Interaction
async function processChatInteraction(interaction){

	if (interaction.commandName === 'groupe') {
		const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('grp_mica')
					.setLabel('MIC A')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('grp_micb')
					.setLabel('MIC B')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('grp_micc')
					.setLabel('MIC C')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('grp_micd')
					.setLabel('MIC D')
					.setStyle(ButtonStyle.Secondary),
				new ButtonBuilder()
					.setCustomId('grp_fasnum')
					.setLabel('Fas. Num.')
					.setStyle(ButtonStyle.Danger)
			);

		await interaction.reply({ content: 'Choisi ton groupe mon poto!', components: [row] });
	}

}


async function processButtonInteraction(interaction){

	await interaction.reply({content: "Bah oui :)", ephemeral: true});

	if(interaction.id.startsWith("grp_")){

		await interaction.reply({content: "Bah oui :)", ephemeral: true});

	}

}



///Register all interactions :)
client.on('interactionCreate', async interaction => {

	if (interaction.isChatInputCommand()) await processChatInteraction(interaction);

	if (interaction.isButton()) await processButtonInteraction(interaction);

	return;


  });

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);


