import express from 'express'
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/db');
const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'front_end')));
MongoClient.connect(db.url, (err, client) => {
  if (err) return console.log(err);
  var database = client.db('testname');
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});
