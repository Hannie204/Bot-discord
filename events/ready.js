module.exports = (client) => {
  const colors = require('colors');
  console.log(colors.blue('Bot is ready!'));
    
    const activities = [
      { name: 'Ân dev', type: 'PLAYING' },
      { name: 'HAHA', type: 'LISTENING' },
      { name: 'Chào mấy tình yêu', type: 'WATCHING' }
    ];
  
    setInterval(() => {
      const activity = activities[Math.floor(Math.random() * activities.length)];
      client.user.setActivity(activity.name, { type: activity.type });
    }, 1000);
  };