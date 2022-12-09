const Discord = require('discord.js');
const openai = require('openai.js');

// Set your OpenAI API key
// You can get one here: https://beta.openai.com/account/api-keys

// how to give the bot a key from env variable
const apiKey = process.env.OPENAI_API_KEY;
openai.apiKey = apiKey;

// Create a new Discord client
const client = new Discord.Client({intents: 2048});

// Set the token for the bot
const token = process.env.DISCORD_TOKEN;

// When the bot is ready, log a message to the console
client.on('ready', () => {
  console.log('Bot is ready!');
});

// When a message is sent in the Discord server, check if it starts with the /ai command
client.on('message', message => {
  if (message.content.startsWith('/ai')) {
    // Use the OpenAI API to generate a response to the message
    openai.completions.create(
      {
        prompt: message.content,
        model: 'text-davinci-002',
        max_tokens: 2048,
        temperature: 0.5
      },
      (error, response) => {
        if (error) {
          console.error(error);
        } else {
          message.channel.send(response.choices[0].text);
        }
      }
    );
  }
});

// Log the bot in using the token
client.login(token);
