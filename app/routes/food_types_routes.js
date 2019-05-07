import { FoodTypes } from '../../models/food_types';
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get('/foodTypes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('foodTypes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });
    app.delete('/foodTypes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('foodTypes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Place Destinations ' + id + ' deleted!');
            }
        });
    });
    app.post('/foodTypes', (req, res) => {
        const placeDestination = new FoodTypes(req.body.city, req.body.country);
        db.collection('foodTypes').insert(placeDestination, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.put('/foodTypes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const placeDestination = new FoodTypes(req.body.city, req.body.country);
        db.collection('foodTypes').update(details, placeDestination, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(placeDestination);
            }
        });
    });
    app.get('/all_food_types/', (req, res) => {
        db.collection('foodTypes').find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    });
};