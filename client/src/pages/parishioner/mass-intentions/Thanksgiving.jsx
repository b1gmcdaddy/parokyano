import React, { useState } from 'react'
import NavParishioner from "../../../components/NavParishioner";
import imageHeader from '../../../assets/imageHeader.jpg';
import Header from '../../../components/Header';
import { Container, Grid, TextField, MenuItem, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"
import Footer from "../../../components/Footer";

const inputstlying = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      boxShadow: '0 3px 2px rgba(0,0,0,0.1)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#355173',
      borderWidth: '0.5px'
    },
  },
};

const Thanksgiving = () => {
  const [captchaValue, setCaptchaValue] = useState(null);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value)
    }

    const isCaptchaChecked = captchaValue !== null;


  return (
    <>
      <NavParishioner />
            <Header  
                backgroundImage={imageHeader}
                title="MASS INTENTION - THANKSGIVING"
            />
            <Link to='/mass-intention-select' className="max-w-[1440px] mx-auto mt-8 md:mb-6 md:flex items-center">
                <FontAwesomeIcon icon={faArrowLeftLong}  className="ml-8 md:mr-2"/>
                <span className="xs:hidden md:flex">Return to Selection</span>
            </Link>
            <h1 align='center' className="font-bold text-md font-[Arial] mb-8">Please input the following</h1>

            <Container maxWidth="lg" sx={{ marginBottom: '50px' }}>
                <form>
                    <Grid container spacing={4}>

                        <Grid item xs={6} sm={12}>
                            <RadioGroup row sx={{marginTop: '-6px', display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }}}>
                                <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                            </RadioGroup>
                        </Grid>
                        
                            to be implemented...



                    </Grid>
                    <div className="mt-[4rem] flex justify-center">
                        <ReCAPTCHA
                            sitekey="6LeCEPMpAAAAANAqLQ48wTuNOGmTPaHcMxJh4xaJ"
                            onChange={handleCaptchaChange}
                        />
                    </div>
                    <div className="mt-[1rem] flex justify-center">
                        <button className={`text-white py-3 px-3 font-medium shadow-sm rounded-md ${isCaptchaChecked ? 'bg-[#355173]' : 'bg-[#868686]'}`} disabled={!isCaptchaChecked} type="submit">
                         SUBMIT REQUEST
                        </button>
                    </div>
                </form>
            </Container>
            <Footer />
    </>
  )
}

export default Thanksgiving