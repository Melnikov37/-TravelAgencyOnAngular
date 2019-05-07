import { Transports } from '../../models/transports';
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get('/transports/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('transports').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });
    app.delete('/transports/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('transports').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Transports ' + id + ' deleted!');
            }
        });
    });
    app.post('/transports', (req, res) => {
        const transports = new Transports(req.body.name);
        db.collection('transports').insert(transports, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.put('/transports/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const transports = new Transports(req.body.name);
        db.collection('transports').update(details, transports, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(transports);
            }
        });
    });
    app.get('/all_transports/', (req, res) => {
        db.collection('transports').find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(JSON.stringify(result));
            }
        });
    });
};