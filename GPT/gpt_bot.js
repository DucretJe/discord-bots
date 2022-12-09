const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
  console.log(msg.content);
  if (msg.content.startsWith('!ai')) {
    // Remove the command from the message
    message = msg.content.replace('!ai', '');
    console.log(message);
    // Use the OpenAI API to generate a response to the message
    completion = openai.createCompletion(
      {
        prompt: message,
        model: 'text-davinci-003',
        max_tokens: 2048
      });
    console.log('completion is thinking...');
    msg.reply('🧠 Thinking...');
    completion.then((response) => {
      console.log(response.data.choices[0].text);
      // Split the response into multiple messages of 3000 characters or less
      // This is to avoid the 4000 character limit on Discord messages
      var response = response.data.choices[0].text;
      var responseArray = [];
      while (response.length > 3000) {
        var split = response.lastIndexOf('.', 3000);
        responseArray.push(response.substring(0, split + 1));
        response = response.substring(split + 1);
      }
      responseArray.push(response);
      // Send the response to the channel
      for (var i = 0; i < responseArray.length; i++) {
        msg.reply(responseArray[i]);
      }
    });
  }
});

client.login('MTA1MDgzNDY5MTQyMDMyNzk3Ng.GwiK62.HNo9-hPzsU6TA1DeNtHA0euUuQVlVe1bj7OMIM');
