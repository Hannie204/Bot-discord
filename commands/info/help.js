const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help', 
    category: 'fun',
    aliases: ['avt'],
    run: (client, message, args) => {
        const serverName = message.guild.name;
        const guild = client.guilds.cache.first();
        const embed = new MessageEmbed()
        .setTitle(`Server: ${serverName}`)
        .setDescription('Danh sách mục hướng dẫn')
        .addField('')
        .setThumbnail(message.author.displayAvatarURL())
        .setColor('#0099ff'); 
        message.channel.send({ embeds: [embed] });
    }
}