const { Client, Intents, Collection } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const colors = require('colors');

require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
client.aliases = new Collection();
client.categories = new Collection();

['command', 'event'].forEach(handler => require(`./handlers/${handler}`)(client));

client.on('message', async message => {
  // phân biệt người và bot 
  if (message.author.bot || !message.guild) return;

  const serverId = '1065811701439680672'; // chỗ id kết nối
  const webhookUrl = process.env.WEBHOOK_URL;

  try {
    // kết nối máy chủ
    const guild = await client.guilds.fetch(serverId);

    // kiểm tra sv id
    if (message.guild.id !== serverId) return;

    // Lưu tin nhắn
    console.log(colors.red(`${message.author.username}:`) + colors.green(` ${message.content}`));

    // Tạo ảnh ava và tên qua webhook
    const payload = {
      username: message.author.username,
      avatar_url: message.author.avatarURL(),
      content: message.content
    };

    // Lưu hình ảnh và video
    const attachments = [];
    message.attachments.forEach(attachment => {
      const { name, url } = attachment;
      attachments.push({ name, url });
    });

    // nếu có hình ảnh hoặc video, thêm vào payload
    if (attachments.length > 0) {
      payload.files = attachments;
    }

    // gửi mess qua sv khác
    await axios.post(webhookUrl, payload);

    // lưu tin nhắn ở txt
    const textLog = `${message.author.username}: ${message.content}\n`;
    fs.appendFileSync('message_log.txt', textLog);

    // Lưu ở json
    const jsonLog = {
      author: message.author.username,
      content: message.content,
      attachments: message.attachments.map(a => ({ name: a.name, url: a.url })),
      timestamp: message.createdTimestamp
    };
    fs.appendFileSync('message_log.json', JSON.stringify(jsonLog) + '\n');

  } catch (error) {
    console.error(`Failed to fetch guild ${serverId}`, error);
  }
});

client.on('message', msg => { 
    if (msg.content.includes('ân')) {
      msg.reply('Kêu cc');
    }
  });

client.login(process.env.TOKEN);


