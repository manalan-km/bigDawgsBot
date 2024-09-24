import { AudioPlayerStatus, createAudioPlayer, createAudioResource, getVoiceConnection, joinVoiceChannel } from "@discordjs/voice";
import { Client,GatewayIntentBits,Events } from "discord.js";
import dotenv from 'dotenv'
import { OOTGOAT_GUILD_ID, OOTGOAT_VC_ID } from "./constants.js";

dotenv.config()

const token = process.env.DISCORD_TOKEN

const client = new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildVoiceStates]})

const player = createAudioPlayer()

const playDawgs = () => {
    const bigDawgs = createAudioResource('./assets/big-dawgs.mp3')
    player.play(bigDawgs)
}

const play = (connection) => {
    playDawgs()
    connection.subscribe(player)
}

player.on('error',error=>{
    console.log('ERROR!!:',error)
})


client.once('ready',()=>{
    console.log('Big Dawg is ready dawg')
})

client.on(Events.InteractionCreate,(interaction)=> { 
    if(!interaction.isChatInputCommand()) return;
    
    if(interaction.commandName === 'bigdawgs') {
        console.log('Joining voice channel')
        const connection = joinVoiceChannel({
            channelId: OOTGOAT_VC_ID,
            guildId: OOTGOAT_GUILD_ID,
            adapterCreator: interaction.guild.voiceAdapterCreator
        })
        interaction.reply({content : 'Big Steppa in the house!', ephemeral: true})
        play(connection)
    }
})

client.on(Events.InteractionCreate,(interaction)=> { 
    if(!interaction.isChatInputCommand()) return;
    
    if(interaction.commandName === 'disconnect') {
        if(interaction.member.user.tag === 'manalan'){
            const connection = getVoiceConnection(OOTGOAT_GUILD_ID)
            player.stop()
            connection.destroy()
            console.log('disconnected the connection')
            interaction.reply({content : 'Disconnected Big Steppa', ephemeral: true})
        }
    }
})

player.on(AudioPlayerStatus.Idle,()=> {
    console.log('Audio finished. Starting the song again')
    setTimeout(playDawgs,3000)
    
})

client.login(token)