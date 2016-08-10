var plugin = function (options) {
    const os = require('os');
    var seneca = this;
    /**
     * Fetch the list of all the products.
     */
    seneca.add({role: "server", cmd: "fetch"}, function (args,
                                                             done) {
        console.log('Fetching ... ');
        // console.log();
        done(null, os.loadavg());
    });
    /**
     * Fetch the list of products by category.
     */
    seneca.add({
        area: "product", action: "fetch", criteria: "byCategory"
    }, function (args, done) {
        console.log('Fetch the list of products by category.');
    });
    /**
     * Fetch a product by id.
     */
    seneca.add({area: "product", action: "fetch", criteria: "byId"},
        function (args, done) {
            console.log('Fetch a product by id' + args.id);
        });
    /**
     * Adds a product.
     */
    seneca.add({area: "product", action: "add"}, function (args,
                                                           done) {
        console.log("Adding product ...");
    });
    /**
     * Removes a product by id.
     */
    seneca.add({area: "product", action: "remove"}, function (args,
                                                              done) {
        console.log('Removes a product by id.');
    });
    /**
     * Edits a product fetching it by id first.
     */
    seneca.add({area: "product", action: "edit"}, function (args,
                                                            done) {
        console.log('Edits a product fetching it by id first.');

    });
}

const PORT = 8080;
module.exports = plugin;
require("seneca")()
    .use(plugin)
  // listen for role:math messages
  // IMPORTANT: must match client
  
  .listen({ type: 'tcp', pin: 'role:server', port:PORT });
 
// seneca.ready(function (err) {
//     seneca.act('role:web', {
//         use: {
//             prefix: '/',
//             pin: {area: 'server', action: '*'},
//             map: {
//                 fetch: {GET: true, POST:true},
//                 edit: {GET: false, POST: true},
//                 add: {GET: false, POST: true},
//                 delete: {GET: false, DELETE: true}
//             }
//         }
//     });
//     var express = require('express');
//     var app = express();
//     app.use(require("body-parser").json());
//     // This is how you integrate Seneca with Express
//     app.use(seneca.export('web'));
//     app.listen(PORT);
//     console.log('Running on http://localhost:' + PORT);

// });