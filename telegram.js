var TelegramBot = require('node-telegram-bot-api');
const TOKENDO = '*';
var DigitalOceanLib = require('do-wrapper');
var digitalOcean = new DigitalOceanLib(TOKENDO, 10);

const TOKENBOT = '*'; //

var server1 = require('seneca')()
  .client({ type: 'tcp', port: 8080, pin: 'role:server' });


// Setup polling way
var bot = new TelegramBot(TOKENBOT, { polling: true });
//console.log(bot.getMe());
// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
  console.log('echo');
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

// Get server load
bot.onText(/load/, function (msg, match) {
  var fromId = msg.from.id;
  server1
    .act('role:server,cmd:fetch', function (err, msg) {
      console.log(err, msg);
      if (err) {
        //   bot.sendMessage(fromId, 'Error:' + err);
      } else {
        bot.sendMessage(fromId, msg.join());
      }
    })
});

// Get servers list
bot.onText(/servers/, function (msg, match) {
  var fromId = msg.from.id;
  digitalOcean.dropletsGetAll({}).then((data) => {

    var servers = data.body.droplets;
    servers.forEach(function (s) {
      var msg = s.name + " - "
        + s.disk + " Gb "
        + " RAM:" + s.memory + " Mb "
        + " CPUs:" + s.vcpus + " "
        + s.region.name ;
      console.log(msg);  
      bot.sendMessage(fromId, msg);
    });

    
  })
});
// Any kind of message
bot.on('message', function (msg) {
  console.log(msg);

});

console.log("Bot online!");
