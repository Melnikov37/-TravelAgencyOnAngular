import { Tours } from '../../models/tours';
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get('/tours/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('tours').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });
    app.delete('/tours/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('tours').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('tours ' + id + ' deleted!');
            }
        });
    });
    app.post('/tours', (req, res) => {
        const tours = new Tours(req.body.tourArrivalDate, req.body.tourDepartureDate, req.body.tourCost, req.body.tourNumberTransactions, req.body.touristDestinationId, req.body.tourOperatorId, req.body.transportId, req.body.tourNumberPersons, req.body.foodTypeId, req.body.roomTypeId, req.body.pointDeparture);
        db.collection('tours').insert(tours, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.put('/tours/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const tours = new Tours(req.body.tourArrivalDate, req.body.tourDepartureDate, req.body.tourCost, req.body.tourNumberTransactions, req.body.touristDestinationId, req.body.tourOperatorId, req.body.transportId, req.body.tourNumberPersons, req.body.foodTypeId, req.body.roomTypeId, req.body.pointDeparture);
        db.collection('tours').update(details, tours, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(tours);
            }
        });
    });
    app.get('/all_tours/', (req, res) => {
        db.collection('tours').find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(JSON.stringify(result));
            }
        });
    });
};