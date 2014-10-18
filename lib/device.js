var stream = require('stream');
var util = require('util');

util.inherits(random_value_device,stream);

module.exports=random_value_device;

function random_value_device(opts) {
  var self = this;

  this.readable = true;
  this.writeable = false;

  this.G = "randomvalue1";
  this.V = 0;
  this.D = 9001;
  this.name = "Random value"

  var ticks = 0;

  process.nextTick(function() {
    setInterval(function(){
        if(ticks % opts.frequency == 0){
            value = Math.random() * (opts.max - opts.min) + opts.min;
            self.emit('data', value);
        }

        ++ticks;
    },1000);
  });
};
