const recipes = require('../pkg/recipes');

const getAll = async (req, res) => {
    try {
        let rs = await recipes.getAll();
        res.status(200).send(rs);
    } catch (err) {
        console.log(err);
        return res.status(500).send("ISE!");
    };
};

const getOne = async (req, res) => {
    try {
        let rs = await recipes.getOne(req.params.id);
        res.status(200).send(rs);
    } catch (err) {
        console.log(err);
        return res.status(500).send("ISE!");
    };
};

const create = async (req, res) => {
    try {
        console.log(req.auth);
        let payload = {
            ...req.body,
            user_id: req.auth.uid,
            published_on: new Date()
        };
        let c = await recipes.create(payload);
        return res.status(201).send(c);
    } catch (err) {
        console.log(err);
        return res.status(500).send("ISE!");  
    };
};

const update = async (req, res) => {
    try {
        let payload = {
            ...req.body,
            user_id: req.auth.uid,
            published_on: new Date()
        };
        await recipes.update(req.params.id, req.auth.uid, payload);
        return res.status(204).send('');
    } catch (err) {
        console.log(err);
        return res.status(500).send("ISE!");
    };
};

const remove = async (req, res) => {
    try {
        await recipes.remove(req.params.id, req.auth.uid);
        return res.status(204).send('');
    } catch (err) {
        console.log(err);
        return res.status(500).send("ISE!");  
    };
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};
