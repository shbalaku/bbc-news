var now = new Date();
//const { Client } = require('pg');
//var Botkit = require('botkit');

var methods = {
  formatDate: function (date){
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    suffix = ['st', 'nd', 'rd', 'th'];
    month = parseInt(date[0]+date[1]).toString();
    day = parseInt(date[3]+date[4]).toString();
    if (date[3] == '1'){
      suff = suffix[3];
    }
    else if (date[4] == '1'){
      suff = suffix[0]
    }
    else if (date[4] == '2'){
      suff = suffix[1];
    }
    else if (date[4] == '3'){
      suff = suffix[2];
    }
    else{
      suff = suffix[3];
    }

    month_str = months[month-1];
    return [month_str+" " + day + suff, day + suff + " " + month_str];
  },
  createClient: function () {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
    return client;
  },
  encodeToday: function() {
    var d;
    if (now.getMonth()+1<10)
        mon = '0'+(now.getMonth()+1).toString();
    else
        mon = (now.getMonth()+1).toString();
    if (now.getDate()<10)
        day = '0'+now.getDate().toString();
    else
        day = now.getDate().toString();
    d = mon + "/" + day;

    return d;
  }
};

module.exports = methods;
