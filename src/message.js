const Axios = require('axios');
const slackbot = require('slackbots');
const weather = require('./weather');
var answer = '';

const bot = new slackbot({
    token: process.env.SLACK_TOKEN,
    name: 'Bot'
})

function sendCharada() {
    Axios.get('https://us-central1-kivson.cloudfunctions.net/charada-aleatoria')
        .then(res => {

            answer = res.data.resposta;

            const params = {
                icon_emoji: ':thinking_face:'
            }

            bot.postMessageToChannel(
                'everyone',
                res.data.pergunta,
                params);
        })
}

function sendAnswer() {
    bot.postMessageToChannel(
        'everyone',
        answer
    );
}

function sendWeather() {
    //Manipulo od dados recebidos
    const params = {
        icon_emoji: ':thinking_face:'
    }

    let url = 'http://apiadvisor.climatempo.com.br/api/v1/weather/locale/5326/current?token=' + process.env.CLIMA_TEMPO_TOKEN;
    //Faço o request
    Axios.get(url)
        .then(res =>{
            weather.weatherReport(res.data)
            .then( message =>{
                bot.postMessageToChannel(
                    'everyone',
                    message,
                    params
                )
            })            
        })
}

module.exports = {
    handleMessage: (message) => {
        if (message.includes(' charada')) {
            sendCharada();
        } else if (message.includes(' resposta')) {
            sendAnswer();
        } else if (message.includes(' clima')){
            sendWeather();
        }
    }
}