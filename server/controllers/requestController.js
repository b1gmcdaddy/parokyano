//api here when frontend is done
require('dotenv').config();
const express = require('express')
const db = require('./db')

const createIntention = (req, res) => {
    const data = req.body
    const intention = JSON.stringify(data.intention_details)

    //requested_by = offered_by
    //preferred_date = mass_date
    //preferred_time = mass_time
    db.query('INSERT INTO request (intention_details, type, requested_by, contact_no, preferred_date, preferred_time, payment_method, donation, service_id, date_requested) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [intention, data.type, data.offered_by, data.contact_no, data.mass_date, data.mass_time, data.payment_method, data.donation_amount, data.service_id, data.date_requested],
        (err, result) => {
            if(err){
                return res.status(500).json({status: 500, success: false})
            }
            return res.status(200).json({ success: true})
        }
    )
}

module.exports = {
    createIntention
}