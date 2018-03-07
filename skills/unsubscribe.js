//
// Unsubscribe functionality
//
var request = require('request');
var methods = require('./../methods.js');
var client = methods.createClient();

module.exports = function (controller) {

    controller.hears(['unsubscribe'], 'direct_mention, direct_message', function (bot, message) {
        var email = message.raw_message.data.personEmail;
        client.connect(function(err) {
          if (err) throw err;
          // delete subscriber query
          client.query('DELETE FROM subscribers WHERE email = ($1);', [email], function(err) {
            if (err) throw err;
            // end connection
            client.end(function(err) {
              if (err) throw err;
              var text = "You have been unsubscribed from BBC News Headlines.";
              bot.reply(message, text);
            });
          });
        });
    });
}
