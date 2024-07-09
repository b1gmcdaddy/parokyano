//api here when frontend is done
require('dotenv').config();
const express = require('express')
const db = require('./db')

const dateToday = new Date().toJSON().slice(0,10)

const createRequestIntention = (req, res) => {
    const data = req.body
    const intention = JSON.stringify(data.intention_details)

    // CORRESPONDING FIELDS IN DB
    // requested_by = offered_by
    // preferred_date = mass_date
    // preferred_time = mass_time
    db.query('INSERT INTO request (details, type, requested_by, contact_no, preferred_date, preferred_time, payment_method, donation, service_id, date_requested, transaction_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [intention, data.type, data.offered_by, data.contact_no, data.mass_date, data.mass_time, data.payment_method, data.donation_amount, data.service_id, dateToday, data.transaction_no],
        (err, result) => {
            if(err){
                return res.status(500).json({status: 500, success: false})
            }
            return res.status(200).json({ success: true})
        }
    )
}

const createRequestCertificate = (req, res) => {
    const request = req.body
    const archive = JSON.stringify(request.archive_info)

    // did not include payment method in query since it is cash by default && all certificates are to be paid in cash
    db.query('INSERT INTO request (first_name, middle_name, last_name, birth_date, address, contact_no, father_name, mother_name, confirmation_date, details, service_id, transaction_no, date_requested) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [request.first_name, request.middle_name, request.last_name, request.birth_date, request.address, request.contact_no, request.father_name, request.mother_name, request.confirmation_date, archive, request.service_id, request.transaction_no, dateToday],
        (err, result) => {
            if(err){
                console.error('error submitting to db', err)
            }
            return res.status(200)
        }
    )
}

module.exports = {
    createRequestIntention,
    createRequestCertificate
}