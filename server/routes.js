const router = require('express').Router();
const connection = require('./config/connection');

//-------------------------------------------

//Get user information
router.get('/:username',(req, res) => {
    const {username} = req.params;
    let sql = 'SELECT * FROM users where username = ?';
    connection.query(sql,[username],(err, rows, fields)=>{
        if(err) throw err;
        else {
            res.json(rows);
        }
    })
});

//Add new username
router.post('/', (req, res) => {
    const user = req.body;
    console.log(user);
    let sql = `INSERT INTO users VALUES (
        '${user.username}',
        '${user.password}',
        '${user.firstname}',
        '${user.lastname}',
        '${user.email}',
        '${user.birth_date}',
        '${user.creation_date}',
        ${user.total_score})`;
    
    connection.query(sql,(err, rows, fields) => {
        if(err){
            res.json({ ok: false, error: err });
        }
        else {
            res.json({ ok: true })
        }
    })
});
//-------------------------------------------

module.exports = router;