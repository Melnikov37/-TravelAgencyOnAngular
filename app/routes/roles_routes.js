import { Roles } from '../../models/roles';
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get('/roles/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('roles').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });
    app.delete('/roles/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('roles').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('roles ' + id + ' deleted!');
            }
        });
    });
    app.post('/roles', (req, res) => {
        const roles = new Roles(req.body.name);
        db.collection('roles').insert(roles, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.put('/roles/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const roles = new Roles(req.body.name);
        db.collection('roles').update(details, roles, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(roles);
            }
        });
    });
    app.get('/all_roles/', (req, res) => {
        db.collection('roles').find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    });
};