import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from '../../assets/imageHeader.jpg';
import Footer from '../../components/Footer';
import { Typography } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha"
import { Link } from "react-router-dom";
import axios from 'axios'
import config from '../../config'

const containerStyle = {
  backgroundImage: `url(${imageHeader})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  position: 'relative'
};

const overlayStyle = {
  backgroundColor: 'rgba(255, 255, 245, 0.75)'
};

const TrackStatus = () => {

    const [captchaValue, setCaptchaValue] = useState(null);
    const handleCaptchaChange = (value) => {
        setCaptchaValue(value)
    }
    const isCaptchaChecked = captchaValue !== null;
    const [input, setInput] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
      setInput({...input, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try{
        const response =  await axios.get(`${config.API}/request/retrieve`, {
          params: {
            col: 'transaction_no',
            val: input.transaction_no,
          }
        })
        if (response.data != null) {
          navigate('/track-request', {state: {requestData: response.data}})
        } else {
          alert(input.transaction_no + ' is not found!')
        }
      } catch (err) {
        console.error('error submitting to server: ', err)
      }
    }

  return (
    <>
    <NavParishioner />
        <div style={containerStyle}>
            <div style={overlayStyle} className="absolute top-56 w-full p-14 text-center z-0 ">
                <div className="z-10 mx-auto">
                   <h1 className="md:text-4xl font-bold mb-5">Track Status of Request</h1>
                   <p>Enter your transaction code below to see the status of your request</p>
                   <form onSubmit={handleSubmit}>
                        <input 
                          name="transaction_no"
                          type="text"
                          onChange={handleChange}
                          className="border-slate-700 rounded-md mt-10 shadow-md shadow-slate-600 md:py-3 md:px-48 text-center focus:outline-none" 
                          style={{borderWidth: '0.1px'}}
                          placeholder="e.g. 040124<hash>" 
                        />
                        <div className="mt-10 flex justify-center">
                        <ReCAPTCHA
                            sitekey="6LeCEPMpAAAAANAqLQ48wTuNOGmTPaHcMxJh4xaJ"
                            onChange={handleCaptchaChange}
                        />
                        </div>
                        <div className="mt-5 flex justify-center">
                              <button className={`text-white py-2 px-6 font-medium shadow-sm rounded-md ${isCaptchaChecked ? 'bg-[#355173]' : 'bg-[#868686]'}`} disabled={!isCaptchaChecked} type="submit">
                                Confirm
                              </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    <Footer />
    </>
  );
}

export default TrackStatus;
