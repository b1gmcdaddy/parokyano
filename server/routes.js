const express = require('express');
const app = express();
const cors = require('cors');

//will define routes here


//not sure ani kay wa ko ka g sa CORS policies
app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use((req, res, next => {
    res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next()
}))

app.use(express.json());

//app.use('route', routefile)

module.exports = app