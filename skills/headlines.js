//
// Headlines functionality
//
var request = require('request');
var NEWS_API_KEY = process.env.NEWS_API_KEY;

module.exports = function (controller) {

    controller.hears('headlines', 'direct_mention, direct_message', function (bot, message) {

        var api_uri = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey='+NEWS_API_KEY;
        request(api_uri, function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          var obj = body.parse(body);
          bot.reply(message, obj.status);
        });
    });
}
