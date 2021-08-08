const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/getUsers', async (req, res) => {
    return res.status(200).send(await User.find())
});

router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        if( await User.findOne({ email }))
            return res.status(400).send({ error: 'User alredy exists' })
        const user = await User.create(req.body);
        return res.send(user);
    } catch(err) {
        return res.status(400).send({ error: `Registration failed ${err}` })
    }
});

module.exports = app => app.use('/auth', router);