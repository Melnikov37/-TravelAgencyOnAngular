import { TouristDestinations } from '../../models/tourist_destinations';
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get('/touristDestinations/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('touristDestinations').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });
    app.delete('/tourist_destinations/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('touristDestinations').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('touristDestinations ' + id + ' deleted!');
            }
        });
    });
    app.post('/tourist_destinations', (req, res) => {
        const touristDestinations = new TouristDestinations(req.body.hotelName, req.body.numberStars, req.body.placeDestinations);
        db.collection('touristDestinations').insert(touristDestinations, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.put('/tourist_destinations/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const touristDestinations = new TouristDestinations(req.body.hotelName, req.body.numberStars, req.body.placeDestinations);
        db.collection('touristDestinations').update(details, touristDestinations, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(touristDestinations);
            }
        });
    });
    app.get('/all_tourist_destinations/', (req, res) => {
        db.collection('touristDestinations').find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(JSON.stringify(result));
            }
        });
    });
};