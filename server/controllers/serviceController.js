// this controller handles all service and service schedules behavior

const express = require('express');
const db = require('./db');


const retrieveAll = (req, res) => {
    db.query('SELECT * FROM service', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
}

// only retrieves schedules to avoid redundancy of the service data
const retrieveSchedule = (req, res) => {
    const service_id = parseInt(req.query.id)
    const mass_date = req.query.date
    console.log(service_id)

    db.query(`SELECT * FROM serviceschedule WHERE service_id = ? AND day = WEEKDAY(?) + 1`, 
        [service_id, mass_date], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            //separate all time only from schedules
            const timeArray = [];
            for(const i of result){
                const slot = i.time;
                timeArray.push(slot)
            }

            console.log(result);
            console.log(timeArray);

            res.status(200).json({
                schedules: result,
                slots: timeArray
            })        
        }
    })
}


module.exports = {
    retrieveAll,
    retrieveSchedule
}