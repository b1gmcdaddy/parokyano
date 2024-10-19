require("dotenv").config();
const express = require("express");
const axios = require("axios");

const API_KEY = process.env.SEMAPHORE_API_KEY;

const sendSMS = (req, res) => {
  const {message, recipient} = req.body;

  if (!message || !recipient) {
    return res.status(400).json({
      error: "Message and recipient are required",
      status: "400",
    });
  }

  try {
    const response = axios.post("https://api.semaphore.co/api/v4/messages", {
      apikey: API_KEY,
      number: recipient,
      message: message,
      sendername: "Gethsemane",
    });
    return res.status(200).json({
      message: "SMS sent successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("Error sending SMS", error);
    return res.status(500);
  }
};

module.exports = {
  sendSMS,
};
