import React, { useState } from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from '../../assets/imageHeader.jpg';
import Footer from '../../components/Footer';
import { Typography } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha"
import { Link } from "react-router-dom";

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

  return (
    <>
    <NavParishioner />
        <div style={containerStyle}>
            <div style={overlayStyle} className="absolute top-56 w-full p-14 text-center z-0 ">
                <div className="z-10 mx-auto">
                   <h1 className="md:text-4xl font-bold mb-5">Track Status of Request</h1>
                   <p>Enter your transaction code below to see the status of your request</p>
                   <form>
                        <input type="text" className="border-slate-700 rounded-md mt-10
                        shadow-md shadow-slate-600 md:py-3 md:px-48 text-center focus:outline-none" style={{borderWidth: '0.1px'}}
                        placeholder="e.g. 040124<hash>" />
                        <div className="mt-10 flex justify-center">
                        <ReCAPTCHA
                            sitekey="6LeCEPMpAAAAANAqLQ48wTuNOGmTPaHcMxJh4xaJ"
                            onChange={handleCaptchaChange}
                        />
                    </div>
                    <div className="mt-5 flex justify-center">
                      <Link to="/track-request">
                        <button className={`text-white py-2 px-6 font-medium shadow-sm rounded-md ${isCaptchaChecked ? 'bg-[#355173]' : 'bg-[#868686]'}`} disabled={!isCaptchaChecked} type="button">
                         Confirm
                        </button>
                        </Link>
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
