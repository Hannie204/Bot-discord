const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
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
  if ((msg.content.toLowerCase() === 'ân' || msg.content.includes('ân ') || msg.content.includes(' ân')) && !msg.author.bot) {
    msg.reply('Kêu cc');
  }
});

  
client.login(process.env.TOKEN);
