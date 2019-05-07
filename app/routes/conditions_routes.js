import { Conditions } from '../../models/conditions';
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get('/conditions/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('conditions').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });
    app.delete('/conditions/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('conditions').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('conditions ' + id + ' deleted!');
            }
        });
    });
    app.post('/conditions', (req, res) => {
        const conditions = new Conditions(req.body.name);
        db.collection('conditions').insert(conditions, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.put('/conditions/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const conditions = new Conditions(req.body.name);
        db.collection('conditions').update(details, conditions, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(conditions);
            }
        });
    });
    app.get('/all_conditions/', (req, res) => {
        db.collection('conditions').find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(JSON.stringify(result));
            }
        });
    });
};