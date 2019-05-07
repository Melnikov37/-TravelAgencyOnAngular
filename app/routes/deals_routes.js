import { Deals } from '../../models/deals';
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get('/deals/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('deals').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });
    app.delete('/deals/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('deals').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('deals ' + id + ' deleted!');
            }
        });
    });
    app.post('/deals', (req, res) => {
        const deals = new Deals(req.body.user, req.body.tour, req.body.conclDate, req.body.numberAdults, req.body.numberChildren, req.body.discountRate, req.body.condition);
        db.collection('deals').insert(deals, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.put('/deals/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const deals = new Deals(req.body.user, req.body.tour, req.body.conclDate, req.body.numberAdults, req.body.numberChildren, req.body.discountRate, req.body.condition);
        db.collection('deals').update(details, deals, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(deals);
            }
        });
    });
    app.get('/all_deals/', (req, res) => {
        db.collection('deals').find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(JSON.stringify(result));
            }
        });
    });
};