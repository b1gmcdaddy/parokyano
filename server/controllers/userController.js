



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


module.exports = {
    retrieveAllUsers
}