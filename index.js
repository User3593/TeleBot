const got = require('got');
const baseUrl = 'https://api.telegram.org/bot343581946:AAENXqqX354avRrDK4NYll5zOVL2XJjz8bQ/';
const upd = 'getUpdates';
var updId;
var chatId;

function lastUpdId(response) {
    var data;
    try {
        data = JSON.parse(response.body);
    } catch (error) {
        console.log('не JSON');
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
    var mess;
    for (var i = 0; i < data.result.length; i++) {
        mess = data.result[i];
        if (mess.update_id > updId && mess.message) {
                console.log(mess.message.from.first_name + ": " + mess.message.text);
                chatId = data.result[i].message.chat.id;
                var lastMessage = mess.message.text;
                p2(lastMessage);
                updId = mess.update_id;
        }
    }    
}

function p2(lastMessage) {
    var send = 'sendMessage?chat_id=' + chatId + '&text=' + lastMessage;
    got(baseUrl + send);
}

got(baseUrl + upd)
    .then(lastUpdId);

function main() {
    got(baseUrl + upd)
        .then(resultP1);
}

var timer = setInterval(main, 300);









