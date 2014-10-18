var random_value_device = require('./lib/device');
var util = require('util');
var stream = require('stream');
var config_handlers = require('./lib/config-handlers');

util.inherits(random_value_driver,stream);

function random_value_driver(opts,app) {
    var self = this;

    app.on('client::up',function(){
        if (!opts.is_init) {
            opts.frequency = 1;
            opts.min = 0;
            opts.max = 100;
            opts.is_init = true;
            self.save();
        }

        self.emit('register', new random_value_device(opts));
    });
};

random_value_driver.prototype.config = function(rpc, call_back) {
    if (!rpc) {
        return config_handlers.menu.call(this, this.opts, call_back);
    } else if (typeof config_handlers[rpc.method] === "function") {
        return config_handlers[rpc.method].call(this, this.opts, rpc.params, call_back);
    } else {
        return call_back(true);
    }
};

module.exports = random_value_driver;
