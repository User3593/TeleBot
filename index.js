const got = require('got');

const printResult = function (response) {
    console.log(response.body);
};

const printErr = function (error) {
    console.log(error.response.body)
};


got('https://api.telegram.org/bot343581946:AAENXqqX354avRrDK4NYll5zOVL2XJjz8bQ/getMe')
    .then(printResult)
    .catch(printErr);

