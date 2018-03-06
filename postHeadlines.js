var request = require('request');
var CiscoSpark = require('node-ciscospark');
var spark = new CiscoSpark(process.env.SPARK_TOKEN);
//var methods = require('./methods.js');

// global variables
var NEWS_API_KEY = process.env.NEWS_API_KEY;
var d = methods.encodeToday();
var date = methods.formatDate(d);

var api_uri = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey='+NEWS_API_KEY;
request(api_uri, function (error, response, body) {
  var obj = JSON.parse(body);
  var headlines = obj.articles;
  var response = '';

  for (var i = 0; i < headlines.length; i++) {
    article = headlines[i];
    response = response + '* ' + '**' + article.title + '**' + '\n' + '    * ' + article.description + '\n    * _' + article.url +'_\n';
  }
  var email = "shbalaku@cisco.com";
  spark.messages.create({
    toPersonEmail: email,
    text: response
  }, function (err, result) {
    if (err) console.error(err);
    console.log(result);
  });
});
