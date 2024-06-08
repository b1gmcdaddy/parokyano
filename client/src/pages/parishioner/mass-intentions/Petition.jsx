import React, { useState } from "react";
import NavParishioner from "../../../components/NavParishioner";
import imageHeader from '../../../assets/imageHeader.jpg';
import Header from '../../../components/Header';
import { Container, Grid, TextField, MenuItem } from '@mui/material';
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

const Petition = () => {

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
                title="MASS INTENTION - PETITION"
            />
            <Link to='/mass-intention-select' className="max-w-[1440px] mx-auto mt-8 md:mb-6 md:flex items-center">
                <FontAwesomeIcon icon={faArrowLeftLong}  className="ml-8 md:mr-2"/>
                <span className="xs:hidden md:flex">Return to Selection</span>
            </Link>
            <h1 align='center' className="font-bold text-md font-[Arial] mb-8">Please input the following</h1>

            <Container maxWidth="md" sx={{ marginBottom: '50px' }}>
                <form>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={12}>
                            <label>Write Petition here:</label>
                            <TextField fullWidth variant="outlined" size="medium" sx={inputstlying} multiline maxRows={Infinity} required />
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                            <label>Offered by:</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying} required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label>Mass Date:</label>
                            <TextField fullWidth variant="outlined" type="date" size="small" sx={inputstlying} required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label>Time Slot:</label>
                            <TextField fullWidth select variant="outlined" size="small" sx={inputstlying} required >
                            <MenuItem value="time slot 1">time slot 1</MenuItem>
                            <MenuItem value="sdf">time slot 2</MenuItem>
                            </TextField>
                        </Grid>
                    
                        
                        <Grid item xs={12} sm={4}>
                            <label>Payment Method:</label>
                            <TextField fullWidth select variant="outlined" size="small" sx={inputstlying} required>
                            <MenuItem value="cash">Cash</MenuItem>
                            <MenuItem value="gcash">GCash</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label>Donation Amount:</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying} required />
                        </Grid>



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

export default Petition