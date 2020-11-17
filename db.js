const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/tonpaimsg', {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Server connected to database server.');
});

module.exports = mongoose;
