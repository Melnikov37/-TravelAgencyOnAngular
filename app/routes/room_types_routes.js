import { RoomTypes } from '../../models/room_types';
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get('/roomTypes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('roomTypes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });
    app.delete('/roomTypes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('roomTypes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Place Destinations ' + id + ' deleted!');
            }
        });
    });
    app.post('/roomTypes', (req, res) => {
        const placeDestination = new RoomTypes(req.body.city, req.body.country);
        db.collection('roomTypes').insert(placeDestination, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.put('/roomTypes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const placeDestination = new RoomTypes(req.body.city, req.body.country);
        db.collection('roomTypes').update(details, placeDestination, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(placeDestination);
            }
        });
    });
    app.get('/all_room_types/', (req, res) => {
        db.collection('roomTypes').find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    });
};