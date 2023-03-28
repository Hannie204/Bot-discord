module.exports = {
    name: 'join',
    category: 'voice',
    description: 'thì để join bot và để troll :)?',
    async execute(message, args) {
      if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        const receiver = connection.receiver;
  
        connection.on('speaking', (user, speaking) => {
          if (speaking) {
            const audioStream = receiver.createStream(user, { mode: 'pcm' });
            const opusStream = new OpusEncoder({ rate: 48000, channels: 2, frameSize: 960 });
            audioStream.pipe(opusStream).on('data', (chunk) => {

            });
          }
        });
      } else {
        message.reply('Thành công');
      }
    },
    run: async (client, message, args) => {

      await module.exports.execute(message, args);
    },
  };
  