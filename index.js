﻿const got = require('got');
//got('https://api.telegram.org/bot343581946:AAENXqqX354avRrDK4NYll5zOVL2XJjz8bQ/getMe')
//    .then(function(r) {console.log(r.body)});

got('https://api.telegram.org/bot343581946:AAENXqqX354avRrDK4NYll5zOVL2XJjz8bQ/getUpdates')
    .then(function(r) {
        const data = JSON.parse(r.body);
        console.log(data.result[0])
    });

//test
