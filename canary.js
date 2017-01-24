var ping = require('ping');
var cron = require('node-cron');
var Slack = require('slack-node');
var config = require('./config.json');

var slack = new Slack(config.apiToken);

var options = {
   timeout: config.timeout,
   min_reply: config.numberOfRequests,
   extra: ["-i 2"]
};

cron.schedule(config.cron, function(){
   probe(config.host);
});

function probe(host) {
   ping.promise.probe(host, options).then(function (res) {
     console.log('probe');
      var message = '';

      if (parseFloat(res.avg) >= config.warningPing) {
         message += 'Warning: Last ' + config.numberOfRequests +
          ' requests exceeded an average response time: ' +
          config.warningPing + ' m/s\n';
      }

      if (config.stdDevPing && (parseFloat(res.stddev) >= config.stdDevPing)) {
         message += 'Warning: Last ' + config.numberOfRequests +
          ' requests exceeded stdDevPing: ' + config.stdDevPing + ' m/s\n';
      }

      if (message.length) {
         message +=
            "\navg: " + res.avg + ' m/s' +
            "\nmax: " + res.max + ' m/s' +
            "\nmin: " + res.min + ' m/s' +
            "\nstddev: " + res.stddev + ' m/s';


         slack.api('chat.postMessage', {
            text: message,
            channel: config.channel
         }, function(err, response) {
            if (err) console.log(err);
            console.log(response);
         });
      }

      console.log(res);
   }).done();
}
