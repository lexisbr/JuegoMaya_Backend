const router = require('express').Router();
const bcrypt = require('bcrypt');
const connection = require('../config/connection');

//Method to aunthenticate user
router.post('/authentication', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        let search_query = 'SELECT * FROM users WHERE username = ?';

        connection.query(search_query, [username],
            async (err, rows, fields) => {
                if (err) throw err;

                if (rows.length > 0) {
                    const hashedPassword = rows[0].password;
                    if(await bcrypt.compare(password, hashedPassword)){
                        res.json({ loggedIn: true })
                    }else{
                        res.json({ loggedIn: false })
                    }
                } else {
                    res.json({ loggedIn: false })
                }
                res.end();
            });
    } else {
        res.json({ loggedIn: false })
    }
});

module.exports = router;