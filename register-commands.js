import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
import { CLIENT_ID, OOTGOAT_GUILD_ID } from './constants.js';


dotenv.config();

const token = process.env.DISCORD_TOKEN;
const clientID = CLIENT_ID;
const guildIDs =  OOTGOAT_GUILD_ID 

const data = new SlashCommandBuilder().setName('bigdawgs').setDescription('big dawgs')
const disconnectCommand = new SlashCommandBuilder().setName('disconnect').setDescription('disconnect big dawgs')

const commandsArr = [data.toJSON(),disconnectCommand.toJSON()];


const restClient = new REST().setToken(token);

(async () => {
  console.log(`Started refreshing ${commandsArr.length} application (/) commands.`);

  try {
    console.log(`Registering commands for the Server`);
    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await restClient.put(Routes.applicationGuildCommands(clientID, guildIDs), { body: commandsArr });

    console.log(`Successfully reloaded ${data.length} application (/) commands for the server.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
  
})();
