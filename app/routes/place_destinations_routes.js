import { PlaceDestinations } from '../../models/place_destinations';
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
  app.get('/placeDestinations/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('placeDestinations').findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  });
  app.delete('/placeDestinations/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('placeDestinations').remove(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send('Place Destinations ' + id + ' deleted!');
      }
    });
  });
  app.post('/placeDestinations', (req, res) => {
    const placeDestination = new PlaceDestinations(req.body.city, req.body.country);
    db.collection('placeDestinations').insert(placeDestination, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  app.put('/placeDestinations/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const placeDestination = new PlaceDestinations(req.body.city, req.body.country);
    db.collection('placeDestinations').update(details, placeDestination, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(placeDestination);
      }
    });
  });
  app.get('/all_place_destinations/', (req, res) => {
    db.collection('placeDestinations').find({}).toArray(function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });
};