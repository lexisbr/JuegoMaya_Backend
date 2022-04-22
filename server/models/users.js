const connection = require('../config/connection');
const bcrypt = require('bcrypt');

const getRank = (username) => {
    const sqlQuery = 'SELECT * FROM user_ranking WHERE username = ?'
    return new Promise((resolve, reject) => {
        let finalResult;
        connection.query(sqlQuery, [username], (err, result) => {
            if (err) return reject(err);
            else {
                result.forEach(row => {
                    const sqlQueryAux = 'SELECT * FROM user_ranking WHERE username != ? and ranking = ?';
                    connection.query(sqlQueryAux, [row.username, row.ranking], (err, resultAux) => {
                        if (err) return reject(err);
                        else {
                            finalResult = {
                                rank_user: result[0],
                                drawWith: resultAux
                            }
                            return resolve(finalResult);
                        }
                    })
                })
            }
        });
    });
};

const getUser = (username) => {
    const sqlQuery = 'SELECT * FROM users where username = ?';
    return new Promise((resolve, reject) => {
        connection.query(sqlQuery, [username], (err, result) => {
            if (err) throw reject(err);

            if (result.length > 0) {
                return resolve({ exists: true, data: result[0] });
            } else {
                return resolve({ exists: false });
            }
        });
    });
};

const createUser = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const search_query = 'SELECT * FROM users WHERE username = ?';
    const insert_query = 'INSERT INTO users VALUES (?,?,?,?,?,?,?,?)';
    const date = new Date();
    let actualDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();

    return new Promise((resolve, reject) => {
        connection.query(search_query, user.username, async (err, result) => {
            if (err) throw reject(err);

            if (result.length > 0) {
                return resolve({isCreated: false, message: 'The username already exists'});
            }
            else {
                connection.query(insert_query, [
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
                    return resolve({ isCreated: true });
                })
            }
        })
    })
};


module.exports = {
    getRank,
    getUser,
    createUser
};