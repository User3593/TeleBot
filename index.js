const got = require('got');
const baseUrl = 'https://api.telegram.org/bot343581946:AAENXqqX354avRrDK4NYll5zOVL2XJjz8bQ/';
const upd = 'getUpdates';
var updId;

function lastUpdId(response) {
    var data;
    try {
        data = JSON.parse(response.body);
    } catch (error) {
        console.log('не JSON');
        console.log(error);
        clearInterval(timer);
        return;
    }
    updId = data.result[data.result.length - 1].update_id;
}

function resultP1(response) {
    var data;
    try {
        data = JSON.parse(response.body);
    } catch (error) {
        console.log('не JSON');
        clearInterval(timer);
        return;
    }
   
    var mess = data.result[data.result.length - 1];
    if (mess.update_id > updId && mess.message) {
        console.log(mess.message.from.first_name + ": " + mess.message.text);
        var chatId = data.result[data.result.length - 1].message.chat.id;
        var lastMessage = mess.message.text;
        p2(chatId, lastMessage);
        updId = mess.update_id;
        clear(updId);
    }
}

function p2(chatId, lastMessage) {
    lastMessage = encodeURI(lastMessage);
    var send = 'sendMessage?chat_id=' + chatId + '&text=' + lastMessage;
    got(baseUrl + send);
}

function clear(updId) {
    updId = updId - 10;
    got(baseUrl + upd + '?offset=' + updId);
}

got(baseUrl + upd)
    .then(lastUpdId);

function main() {
    got(baseUrl + upd)
        .then(resultP1);
}

var timer = setInterval(main, 300);









