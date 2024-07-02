require('dotenv').config();
const db = require('./db')


const retrieveAll = (req, res) => {
    db.query('Select * FROM announcement', (err, result) => {
        if(err){
            console.error('error retrieving from db', err)
            return res.status(500).json({
                error: 'server error',
                status: '500'
            })
        }
        return res.status(200).send(result)
    })
}

module.exports = {
    retrieveAll,
}