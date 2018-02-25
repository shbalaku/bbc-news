//
// Headlines functionality
//
var request = require('request');
var NEWS_API_KEY = process.env.NEWS_API_KEY;

module.exports = function (controller) {

    controller.hears('headlines', 'direct_mention, direct_message', function (bot, message) {

        var api_uri = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey='+NEWS_API_KEY;
        request(api_uri, function (error, response, body) {
          var obj = JSON.parse(body)
          bot.reply(message, String(obj.status));
        });
    });
}
