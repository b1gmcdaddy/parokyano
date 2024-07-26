require('dotenv').config()
const db = require('./db')


const retrieveByParams = (req, res) => {
    const {col, val} = req.query

    db.query(`SELECT * FROM priest where ?? = ?`, [col, val],
        (err, result) => {
            if (err) {
                console.error('error retrieving from db', err)
                return res.status(500)
            }

            // para dili na hasol add2 ug 'Fr.' na title sa frontend:
            for(const i in result){
                result[i].first_name = 'Fr. ' + result[i].first_name
            }
            return res.status(200).send(result)
        }
    )
}

module.exports = {
    retrieveByParams
}