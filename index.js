const express = require('express');
const { expressjwt : jwt } = require('express-jwt');
const recipes = require('./handlers/recipes');
const users = require('./handlers/users');
const db = require('./pkg/db');
const config = require('./pkg/config');

db.init();

const api = express();

api.use(express.json());
api.use(jwt({
    algorithms: ['HS256'],
    secret: config.get('service').jwt_secret
}).unless({
    path: [
        '/login',
        '/create-account',
    ]
}));

api.get('/recipes', recipes.getAll);
api.get('/recipes/:id', recipes.getOne);

api.post('/login', users.login);
api.post('/create-account', users.create);
api.post('/recipes', recipes.create);

api.put('/recipes/:id', recipes.update);
api.delete('/recipes/:id', recipes.remove);

api.use(function (err, req, res, next) {
    if(err.name === "UnauthorizedError") {
        res.status(401).send("Invalid token...");
    } else {
        next(err);
    };
});

api.listen(config.get('service').port, err => {
    if(err) {
        return console.log(err);
    }
    console.log(`Service authentication successfully started on port ${config.get('service').port}`);
});
