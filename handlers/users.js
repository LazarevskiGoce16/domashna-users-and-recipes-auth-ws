const user = require('../pkg/users');
const config = require('../pkg/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const create = async (req, res) => {
    try {
        if(
            req.body.password.trim().length === 0 ||
            req.body.password !== req.body.password2
        ) {
            return res.status(400).send("Bad request!");
        };
        let u = await user.getUserByEmail(req.body.email);
        if(u) {
            return res.status(409).send("Bad request, user already exists!");
        };
        req.body.password = bcrypt.hashSync(req.body.password);
        let usr = user.create(req.body);
        console.log(req.body);
        return res.status(201).send(usr);
    } catch (err) {
        console.log(err);
        return res.status(500).send("ISE!");
    };
};

const login = async (req, res) => {
    try {
        let u = await user.getUserByEmail(req.body.email);
        if(!u) {
            return res.status(400).send("Bad request: Bad login credentials!");
        };
        if(!bcrypt.compareSync(req.body.password, u.password)) {
            return res.status(400).send("Bad request: Bad login credentials!");
        };
        let payload = {
            uid: u._id,
            email: u.email,
            full_name: u.full_name
        };
        let token = jwt.sign(payload, config.get('service').jwt_secret);
        return res.status(200).send({token});
    } catch (err) {
        console.log(err);
        return res.status(500).send("ISE!");
    };
};

module.exports = {
    create,
    login
};
