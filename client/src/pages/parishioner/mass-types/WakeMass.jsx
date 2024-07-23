import React, { useState } from "react";
import NavParishioner from "../../../components/NavParishioner";
import imageHeader from '../../../assets/imageHeader.jpg';
import Header from '../../../components/Header';
import { Container, Grid, RadioGroup, TextField, FormControlLabel, Radio } from '@mui/material';
import Footer from '../../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"
import generateHash from "../../../components/GenerateHash";
import NoPaymentModal from "../../../components/NoPaymentModal";
import config from "../../../config";
import axios from "axios";

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

const WakeMass = () => {
    const id = 9
    const [open, setOpen] = useState(false);
    const [captchaValue, setCaptchaValue] = useState(null);
    const dateToday = new Date().toJSON().slice(0,10)
    const hash = dateToday + generateHash().slice(0,20)

    const [formData, setFormData] = useState({
        first_name: '',            // full name ni sa deceased
        address: null,   
        contact_no: '',
        requested_by: '',
        relationship: '',
        preferred_date: '',
        preferred_time: '',
        preferred_priest: null,
        isParishioner: '',
        transaction_no: hash,
        service_id: id,
        type: null
    })

    const modalData = {
        message: 'Please wait for the parish to verify if the requested date and time is approved. We will communicate with you once the request has been approved and for other purposes.',
        req: null,
        transaction_no: formData.transaction_no
    }

    const handlesubmit = (e) =>{
        e.preventDefault()
        try {
            axios.post(`${config.API}/request/create-mass`, formData)
            setOpen(true)
        }
        catch (err) {
            console.error('error submitting to server', err)
        }
        console.log(formData);
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value)
    }

    const isCaptchaChecked = captchaValue !== null;
    
    return(
        <>
            <NavParishioner />
            <Header  
                backgroundImage={imageHeader}
                title="WAKE MASS"
            />
            <Link to='/mass-selection' className="max-w-[1440px] mx-auto mt-8 md:mb-6 md:flex items-center">
                <FontAwesomeIcon icon={faArrowLeftLong}  className="ml-8 md:mr-2"/>
                <p className="xs:hidden md:flex">Return to mass selection</p>
            </Link>

            <h1 align='center' className="font-bold text-md font-[Arial] mb-8">Please input the following</h1>

            <NoPaymentModal open={open} data={modalData} />

            <Container maxWidth="lg" sx={{ marginBottom: '50px' }}>
                <form>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}>
                            <label>Name of the deceased:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying} 
                                name="first_name"
                                onChange={handleChange}
                                required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label>Contact Number:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="contact_no" 
                                onChange={handleChange}
                                required />
                        </Grid> 

                        <Grid item xs={12} sm={6}>
                            <label>Requested by:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying} 
                                name="requested_by" 
                                onChange={handleChange}
                                required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label>Relationship to the deceased:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying} 
                                name="relationship" 
                                onChange={handleChange}
                                required />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <label>Preferred Date:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying} 
                                name="preferred_date" 
                                onChange={handleChange}
                                type='date'
                                required />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <label>Preferred Time:</label>
                            <TextField 
                                fullWidth 
                                select 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying} 
                                name="preferred_time"
                                onChange={handleChange}
                                required />
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <label>Preferred Priest:</label>
                            <TextField 
                                fullWidth 
                                select 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying} 
                                name="preferred_priest"
                                onChange={handleChange}
                                required />
                        </Grid> */}

                        <Grid item xs={6} sm={2} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                            <label>Are you a Parishioner?</label>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <RadioGroup 
                                row 
                                sx={{marginTop: '-6px', display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }}}
                                name="isParishioner"
                                onChange={handleChange}
                                required>
                                <FormControlLabel value="1" control={<Radio size="small" />} label="Yes" />
                                <FormControlLabel value="0" control={<Radio size="small" />} label="No" />
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
                        <button className={`text-white py-3 px-3 font-medium shadow-sm rounded-md ${isCaptchaChecked ? 'bg-[#355173]' : 'bg-[#868686]'}`} disabled={!isCaptchaChecked} onClick={handlesubmit} type="button">
                         SUBMIT REQUEST
                        </button>
                    </div>
                </form>
            </Container>
            <Footer />
        </>
    )
}

export default WakeMass