import React, { useState } from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from '../../assets/imageHeader.jpg';
import Header from '../../components/Header';
import { Container, Grid, RadioGroup, TextField, FormControlLabel, Radio } from '@mui/material';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"

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

const OutsideMass = () => {
    const [captchaValue, setCaptchaValue] = useState(null);
    const [radioValue, setRadioValue] = useState("");
    const [otherValue, setOtherValue] = useState("");

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value)
    }

    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
        if (event.target.value !== "others") {
            setOtherValue("");
        }
    }

    const handleOtherChange = (event) => {
        setOtherValue(event.target.value);
    }

    const isCaptchaChecked = captchaValue !== null;
    const isOtherSelected = radioValue === "others";
    
    return(
        <>
            <NavParishioner />
            <Header  
                backgroundImage={imageHeader}
                title="OUTSIDE MASS"
            />
            <Link to='/mass-selection' className="max-w-[1440px] mx-auto mt-8 md:mb-6 md:flex items-center">
                <FontAwesomeIcon icon={faArrowLeftLong}  className="ml-8 md:mr-2"/>
                <p className="xs:hidden md:flex">Return to mass selection</p>
            </Link>
            <h1 align='center' className="font-bold text-md font-[Arial] mb-8">Please input the following</h1>

            <Container maxWidth="lg" sx={{ marginBottom: '50px' }}>
                <form>
                    <Grid container spacing={4}>
                    <Grid item xs={12} sm={7}>
                            <RadioGroup row sx={{justifyContent: 'space-between'}} value={radioValue} onChange={handleRadioChange}>
                                <FormControlLabel value="chapel" control={<Radio size="small" />} label="Chapel" />
                                <FormControlLabel value="company" control={<Radio size="small" />} label="Company" />
                                <FormControlLabel value="others" control={<Radio size="small" />} label="Others:" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12} sm={5}>   
                            <TextField fullWidth variant="outlined" size="small"  sx={{'& .MuiOutlinedInput-root': {'& fieldset': {boxShadow: '0 3px 2px rgba(0,0,0,0.1)',},'&.Mui-focused fieldset': {borderColor: '#355173',borderWidth: '0.5px'},}, opacity: isOtherSelected ? 1 : 0.4}} autoComplete="off" required disabled={!isOtherSelected} value={otherValue} onChange={handleOtherChange}/>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <label>Celebration/Celebrator:</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying} autoComplete="off" required />
                        </Grid> 
                        <Grid item xs={12} sm={12}>
                            <label>Address:</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying} autoComplete="off" required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label>Contact Person:</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying} autoComplete="off" required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label>Contact Number:</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying} autoComplete="off" required />
                        </Grid>
                        
                        <Grid item xs={12} sm={3}>
                            <label>Preferred Date:</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying} autoComplete="off" required />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <label>Preferred Time:</label>
                            <TextField fullWidth select variant="outlined" size="small" sx={inputstlying} autoComplete="off" required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label>Preferred Priest:</label>
                            <TextField fullWidth select variant="outlined" size="small" sx={inputstlying} autoComplete="off" required />
                        </Grid>

                        <Grid item xs={6} sm={2} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                            <label>Are you a Parishioner?</label>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <RadioGroup row sx={{marginTop: '-6px', display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }}}>
                                <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12} sm={7}  sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
                            <p><p style={{fontWeight: 'bold', display:'inline'}}>Note: </p>Please pick up the priest</p>
                        </Grid>
                    </Grid>
                    <div className="mt-[3rem] flex justify-center">
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

export default OutsideMass