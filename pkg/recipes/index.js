const mongoose = require('mongoose');

const Recipe = mongoose.model(
    'recipe',
    {
        user_id: String,
        title: String,
        course: String,
        ingredients: [String],
        process: String,
        total_time: Array,
        published_on: Date
    },
    'recipes'
);

const getAll = async () => {
    return Recipe.find({});
};

const getOne = async (id) => {
    return Recipe.findOne({_id: id});
};

const create = async (data) => {
    const r = new Recipe(data);
    return r.save();
};

const update = async (id, uid, data) => {
    return Recipe.updateOne({_id: id, user_id: uid}, data);
};

const remove = async (id, uid) => {
    return Recipe.deleteOne({_id: id, user_id: uid});
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};
