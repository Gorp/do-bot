
var express = require("express");
var bodyParser = require('body-parser');
var server1 = require('seneca')()
            .client({type: 'tcp', port: 8080, pin:'role:server'});

function api(options) {
    var seneca = this;

    seneca.add({ area: "api", action: "getLoad" }, function (args,
        done) {
        console.log('Ok' + args.server);
        var data = [];
        var err = true;
        server1
            .act('role:server,cmd:fetch',function(err, msg){
               // done(null, {data: msg, server:args.server})
               console.log(err, msg);
               data = msg;
               err = false;
               done(null, { err: err, data: data });
            })
        
    });

    this.add("init:api", function (msg, respond) {
        seneca.act('role:web', {
            use: {
                prefix: '/api',
                pin: 'area:api,action:*',
                map: {
                    getLoad: { GET: true, POST:  true }
                }
            }
        }, respond)
    });
}
module.exports = api;
var seneca = require("seneca").use(api);
var app = require("express")();
app.use(require("body-parser").json());
app.use(seneca.export("web"));
app.listen(3000);