const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { OpusEncoder } = require('@discordjs/opus');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = {
  token: 'OTUxODAzOTI5OTI5MzQ3MDky.G8feNW.0Ol22Jkg_--QBQRcuNTozubAwlJMXgm6chvkq8',
  prefix: '>',
};

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
  if (message.content === `${config.prefix}join`) {
    if (message.member?.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const receiver = connection.receiver;

      connection.on('speaking', (user, speaking) => {
        if (speaking) {
          const audioStream = receiver.createStream(user, { mode: 'pcm' });
          const opusStream = new OpusEncoder({ rate: 48000, channels: 2, frameSize: 960 });
          audioStream.pipe(opusStream).on('data', (chunk) => {
            // Do something with the audio data here
          });
        }
      });
    } else {
      message.reply('Chx vô voice,dùng đc cc');
    }
  }
});

client.login(config.token);

