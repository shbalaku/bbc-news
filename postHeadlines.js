var request = require('request');
var CiscoSpark = require('node-ciscospark');
var spark = new CiscoSpark(process.env.SPARK_TOKEN);
var methods = require('./methods.js');

// global variables
var NEWS_API_KEY = process.env.NEWS_API_KEY;
var d = methods.encodeToday();
var date = methods.formatDate(d);
var client = methods.createClient();
var subscribers = [];
var subscriber_no;
var api_uri = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey='+NEWS_API_KEY;

// headlines request
request(api_uri, function (error, response, body) {
  var obj = JSON.parse(body);
  var headlines = obj.articles;
  var response = '';
  for (var i = 0; i < headlines.length; i++) {
    article = headlines[i];
    response = response + '* ' + '**' + article.title + '**' + '\n' + '    * ' + article.description + '\n    * _' + article.url +'_\n';
  }

  // establish client connection
  client.connect(function(err) {
    if (err) throw err;
    // execute query
    client.query('SELECT * FROM subscribers;', function(err, res) {
      subscriber_no = res.rows.length;
      for (var i = 0; i < subscriber_no; i++) {
        subscribers[i] = res.rows[i].email;
      }
      client.end(function(err) {
        if (err) throw err;
        // send headlines to subscribers through spark
        for (var i = 0; i < subscriber_no; i++) {
          var email = subscribers[i];
          spark.messages.create({
            toPersonEmail: email,
            markdown: response
          }, function (err, result) {
            if (err) console.error(err);
            //console.log(result);
          });
        }
      });
    });
  });
});
