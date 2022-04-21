const router = require('express').Router();
const bcrypt = require('bcrypt');
const connection = require('../config/connection');

//-------------------------------------------

//Get user information
router.get('/:username', (req, res) => {
    const { username } = req.params;
    let sql = 'SELECT * FROM users where username = ?';
    connection.query(sql, [username], (err, rows, fields) => {
        if (err) throw err;

        if (rows.length > 0) {
            res.json({ exists: true, data: rows });
        } else {
            res.json({ exists: false })
        }
    })
});

//Add new user
router.post('/newUser', async (req, res) => {
    const user = req.body;

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const search_query = 'SELECT * FROM users WHERE username = ?';
    const insert_query = 'INSERT INTO users VALUES (?,?,?,?,?,?,?,?)';

    const date = new Date();
    let actualDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();

    await connection.query(search_query, user.username, async (err, rows, fields) => {
        if (err) throw err;

        if (rows.length > 0) {
            res.sendStatus(409);
        }
        else {
            await connection.query(insert_query, [
                user.username,
                hashedPassword,
                user.firstname,
                user.lastname,
                user.email,
                user.birth_date,
                actualDate,
                0
            ], (err, result) => {
                if (err) throw err;
                res.sendStatus(201);
            })
        }
    })
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
            }else{
                res.json({ success: false });
            }
        }
    })
})

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
            }else{
                res.json({ success: false });
            }
        }
    })
})

//-------------------------------------------

module.exports = router;