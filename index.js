import { Client, GatewayIntentBits } from 'discord.js'; // Importing the necessary Discord.js modules
import { createClient } from '@supabase/supabase-js'; // Importing the Supabase client
import { createServer } from 'node:http'; // Importing the HTTP server

// Set up the Supabase client
const supabaseUrl = 'https://rhgjtcwmzrnohilguoot.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoZ2p0Y3dtenJub2hpbGd1b290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDc3MzMsImV4cCI6MjA1MjY4MzczM30.Hi-1v7zNBfb7P9-iM4XI2Ak0xQWrVqKdKyM1gIMp3Nw';
const supabase = createClient(supabaseUrl, supabaseKey);

// Set up the Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log('Bot is online!');
});

// Command to fetch user stats from Supabase
client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!stats')) {
    const userId = message.author.id; // Get the user ID from Discord

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('username')
      .eq('id', userId)
      .single();

    if (userError) {
      message.reply('An error occurred while fetching your data.');
    } else {
      message.reply(`Your username is: ${userData.username}`);
    }
  }
});

// Log in with your Discord bot token
client.login('7a13cc3bcf984b4e6ece6350a3c0af1f24fc7d749671b884fb79d8cb8a5b533b');

// Set up the HTTP server to serve a simple response
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// Start the HTTP server on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// Run this bot with `node index.js`
