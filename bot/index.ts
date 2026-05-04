import { Client, GatewayIntentBits, Collection, Events } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { db } from '../lib/firebase'; // We'll set this up

dotenv.config();

// Extend the client to include commands collection
declare module 'discord.js' {
  interface Client {
    commands: Collection<string, any>;
  }
}

export async function startBot() {
  if (!process.env.DISCORD_BOT_TOKEN) {
    console.warn("DISCORD_BOT_TOKEN is not set. Discord bot will not start.");
    console.warn("Set the token in your .env or Render environment variables.");
    return;
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildVoiceStates,
    ],
  });

  client.commands = new Collection();

  // Load commands (simple placeholder for now)
  const commandsPath = path.join(__dirname, 'commands');
  if (fs.existsSync(commandsPath)) {
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = await import(filePath);
      if ('name' in command && 'execute' in command) {
        client.commands.set(command.name, command);
      }
    }
  }

  client.once(Events.ClientReady, c => {
    console.log(`[Discord Bot] Ready! Logged in as ${c.user.tag}`);
    // Register basic commands or status
    c.user.setActivity('over Dank Memer', { type: 3 }); // Watching Dank Memer
  });

  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    // VERY basic command handling
    // Real bot has 300+ commands, here we demonstrate a few and AI capabilities
    const prefix = process.env.COMMAND_PREFIX || '.';
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (error) {
      console.error(`Error executing ${commandName}:`, error);
      await message.reply({ content: '<:crozz:1488082460138012823> There was an error executing that command!' });
    }
  });

  await client.login(process.env.DISCORD_BOT_TOKEN);
}
