const got = require('got');
const base_url = 'https://api.telegram.org/bot/';
const upd = 'getUpdates';
var send = 'sendMessage?chat_id=176982703&text=';

var resultP1 = function (response) {
    const data = JSON.parse(response.body);
    var mess;
    var lastMessage;
    for (var i = 0; i < data.result.length; i++) {
        mess = data.result[i];
        if ('message' in mess) {
            console.log(mess.message.from.first_name + ": " + mess.message.text);
            lastMessage = mess.message.text;
        }
    }
    return lastMessage;
};

const p2 = function(resultP1) {
    send = send + resultP1;
    got(base_url + send);
};

got(base_url + upd)
    .then(resultP1)
    .then(p2);

