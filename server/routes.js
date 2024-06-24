const express = require('express');
const app = express();
const cors = require('cors');

//will define routes here
const requestRoute = require('./routes/requestRoute');


//not sure ani kay wa ko ka g sa CORS policies
app.use(cors({
    origin: [process.env.CORS_ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// app.use((req, res, next => {
//     res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next()
// }))

app.use(express.json());

//there is a problem with this, will troubleshoot later
// app.use('/request', requestRoute);

module.exports = app