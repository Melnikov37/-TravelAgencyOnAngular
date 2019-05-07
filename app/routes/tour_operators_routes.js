import { TourOperators } from '../../models/tour_operators';
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get('/tour_operators/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('tourOperators').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });
    app.delete('/tour_operators/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('tourOperators').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('tourOperators ' + id + ' deleted!');
            }
        });
    });
    app.post('/tour_operators', (req, res) => {
        const tourOperators = new TourOperators(req.body.name, req.body.commission);
        db.collection('tourOperators').insert(tourOperators, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.put('/tour_operators/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const tourOperators = new TourOperators(req.body.name, req.body.commission);
        db.collection('tourOperators').update(details, tourOperators, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(tourOperators);
            }
        });
    });
    app.get('/all_tour_operators/', (req, res) => {
        db.collection('tourOperators').find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    });
};