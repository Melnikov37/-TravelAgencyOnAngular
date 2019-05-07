import { Users } from '../../models/users';
var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    app.get('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
            }
        });
    });
    app.delete('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('users ' + id + ' deleted!');
            }
        });
    });
    app.post('/users', (req, res) => {
        const users = new Users(req.body.name, req.body.address, req.body.age, req.body.mail, req.body.role);
        db.collection('users').insert(users, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.put('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const users = new Users(req.body.name, req.body.address, req.body.age, req.body.mail, req.body.role);
        db.collection('users').update(details, users, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(users);
            }
        });
    });
    app.get('/all_users/', (req, res) => {
        db.collection('users').find({}).toArray(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(JSON.stringify(result));
            }
        });
    });
};