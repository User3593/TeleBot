const got = require('got');
const config = require('./config.json');
const baseUrl = 'https://api.telegram.org/bot' + config.token + '/';

function resultP1(response) {
    var data;
    try {
        data = JSON.parse(response.body);
    } catch (error) {
        console.log('не JSON');
        clearInterval(timer);
        return;
    }

    var mess = data.result[0];
    if (mess === undefined){
        return;
    }

    var lastUpdId = data.result[data.result.length - 1].update_id;
    var firstUpdId = data.result[0].update_id;

    if (firstUpdId <= lastUpdId && mess.message) {
        console.log(mess.message.from.first_name + ": " + mess.message.text);
        var chatId = mess.message.chat.id;
        var lastMessage = mess.message.text;
        sendMessage(chatId, lastMessage);
        clear(firstUpdId);
    }
}

function sendMessage(chatId, lastMessage) {
    lastMessage = encodeURI(lastMessage);
    var send = 'sendMessage?chat_id=' + chatId + '&text=' + lastMessage;
    got(baseUrl + send);
}

function clear(firstUpdId) {
    firstUpdId = firstUpdId + 1;
    got(baseUrl + 'getUpdates?offset=' + firstUpdId);
}

function main() {
    got(baseUrl + 'getUpdates')
        .then(resultP1);
}

var timer = setInterval(main, 2000);









