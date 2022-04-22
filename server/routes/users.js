const router = require('express').Router();
const bcrypt = require('bcrypt');
const connection = require('../config/connection');
const userModel = require("../models/users");

//-------------------------------------------

//Get user information
router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const result = await userModel.getUser(username);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

//Get user rank
router.get('/getRank/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const result = await userModel.getRank(username);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

//Add new user
router.post('/newUser', async (req, res) => {
    try {
        const user = req.body;
        const result = await userModel.createUser(user);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    
});

router.put('/updateUser', async (req, res) => {
    const user = req.body;
    const update_query = 'UPDATE users SET firstname = ?, lastname = ? , email = ?, birth_date = ? WHERE username = ?';

    await connection.query(update_query, [
        user.firstname,
        user.lastname,
        user.email,
        user.birth_date,
        user.username,
    ], (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(400)
        } else {
            if (result.affectedRows > 0) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        }
    })
});

router.put('/addScore', async (req, res) => {
    const username = req.body.username;
    const addedScore = req.body.score;

    const update_query = ` UPDATE users SET 
                            total_score = (SELECT total_score FROM (SELECT * FROM users WHERE username = ?) as score) + ?
                            WHERE username = ?`;


    await connection.query(update_query, [
        username,
        addedScore,
        username,
    ], (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(400)
        } else {
            if (result.affectedRows > 0) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        }
    })
});



//-------------------------------------------

module.exports = router;