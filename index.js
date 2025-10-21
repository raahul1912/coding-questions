var EventEmitter = require('events');

var crazy = new EventEmitter();

crazy.on('event1', function () {
  console.log('event1 fired!'); // This will print first
  process.nextTick(function () {
    crazy.emit('event2');
  });
});

crazy.on('event2', function () {
  console.log('event2 fired!'); // This will print second
  process.nextTick(function () {
    crazy.emit('event3');
  });

});

crazy.on('event3', function () {
  console.log('event3 fired!');  // This will print third
  process.nextTick(function () {
    crazy.emit('event1');
  });
});

crazy.emit('event1');