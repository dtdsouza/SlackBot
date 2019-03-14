const slackbot = require('slackbots');
const messageHandler = require('./src/message.js');

const bot = new slackbot({
    token: process.env.SLACK_TOKEN,
    name: 'Bot'
})

//Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    }

    bot.postMessageToChannel('everyone', 'Hello!!!', params);
})

//Error Handler
bot.on('error', (err) =>{
    console.log(err);
})

//Message Handler
bot.on('message', (data) =>{
    if(data.type !== 'message'){
        return;
    }

    messageHandler.handleMessage(data.text);
})
