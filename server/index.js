const mysql = require('mysql');
const bp = require('body-parser')
const app = require('./routes');

//will setup db in cloud first
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
});

connection.connect((err) => {
    if(err){
        console.log('error connecting to db', err.stack);
        return;
    }
    console.log('connected to db as ' + connection.threadId);
});


app.use(bp.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.json({
        status: 200,
        connection: 'successful'
    })
})

app.listen(process.env.PORT || 5000);