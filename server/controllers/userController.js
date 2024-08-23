
require('dotenv').config();

const db = require('./db')


const retrieveAllUsers = (req, res) => {
    db.query('Select * FROM user', (err, result) => {
        if(err){
            console.error('error retrieving users from db', err)
            return res.status(500).json({
                error: 'server error',
                status: '500'
            })
        }
        return res.status(200).send(result)
    })
}

const dateToday = new Date().toJSON().slice(0,10)

const createUser = (req, res) => {
    const data = req.body;

    db.query('INSERT INTO user (first_name, last_name, user_type, date_started, contact_no, email, username, password, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [data.first_name, data.last_name, data.user_type, dateToday, data.contact_no, data.email, data.username, data.password, data.status], 
        (err, result) => {
            if (err) {
                console.error('error submitting to db', err)
                return res.status(500)
            }
            return res.status(200).json({ message: 'User created successfully' });
        }
    )
}

const editUser = (req, res) => {
    const data = req.body
    const userID = req.params.id

    db.query('UPDATE user SET first_name=?, last_name=?, email=?, contact_no=?, username=?, status=? WHERE userID=?',
        [data.first_name, data.last_name, data.email, data.contact_no, data.username, data.status, userID], (err, result) => {
            if (err) {
                console.error('error updating user', err);
                return res.status(500)
            }
            return res.status(200).json({ message: 'User updated successfully' });
        }
    ) 
}


module.exports = {
    retrieveAllUsers,
    createUser,
    editUser,
}