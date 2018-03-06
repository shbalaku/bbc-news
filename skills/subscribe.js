//
// Subscribe functionality
//
var request = require('request');
var methods = require('./../methods.js');
var client = methods.createClient();
var NEWS_API_KEY = process.env.NEWS_API_KEY;

module.exports = function (controller) {

    controller.hears('subscribe', 'direct_mention, direct_message', function (bot, message) {
        var email = message.raw_message.data.personEmail;

        client.connect(function(err) {
          if (err) throw err;
          // execute query
          client.query('INSERT INTO subscribers VALUES $1;', [email], function(err) {
            if (err) throw err;
            // end connection
            client.end(function(err) {
              if (err) throw err;
              var text = "Successfully subscribed to BBC News Headlines every morning at 9AM.";
              bot.reply(message, text);
            });
          });
        });
    });
}
