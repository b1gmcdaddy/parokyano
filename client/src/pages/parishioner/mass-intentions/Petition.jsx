import React, { useState, useEffect } from "react";
import axios from 'axios';
import NavParishioner from "../../../components/NavParishioner";
import imageHeader from '../../../assets/imageHeader.jpg';
import Header from '../../../components/Header';
import { Container, Grid, TextField, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"
import Footer from "../../../components/Footer";
import CashPaymentModal from "../../../components/CashPaymentModal";
import config from "../../../config"


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

    const [open, setOpen] = useState(false)
    const [captchaValue, setCaptchaValue] = useState(null);
    const [schedule, setSchedule] = useState({slots: ['00:00:00']})
    console.log(schedule)
    const id = 1  
    var dateToday = new Date().toJSON().slice(0,10);
    
    // form data
    const [formData, setFormData] = useState({
        intention_details: '',
        type: 'Petition',
        offered_by: '', //in db, this is 'requested_by'
        mass_date: '',
        mass_time: '',
        payment_method: '',
        donation_amount: '',
        contact_no: '',
        service_id: id, 
        date_requested: dateToday
    })

    // modal data
    const [modalData, setModalData] = useState({})

    // getters
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await axios.get(`${config.API}/service/retrieve-schedule`, {
                    params: {
                        id: id,
                        date: formData.mass_date
                    }
                });
                setSchedule(response.data);
            } catch (error) {
                console.error('error fetching schedule', error)
            }
        }
        fetchSchedule();
    }, [formData.mass_date])

    // event handlers
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    // change message depending on which service
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post(`${config.API}/request/create-intention`, formData);
            const paymentInfo = {
                transaction_no: 'example123',   //needs work
                fee: formData.donation_amount,
                requirements: null,
                message: 'Note: Please go to the parish office during office hours to give your donation. Thank you and God bless!',
            }
            setModalData(paymentInfo);
            setOpen(true)
            // console.log(paymentInfo)
        } catch(err) {
            console.error('error submitting the form', err)
        }
    }

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value)
    }

    // validators
    const isCaptchaChecked = captchaValue !== null;
    const isDateSelected = formData.mass_date !== '';

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

            <CashPaymentModal open={open} data={modalData} />

            <Container maxWidth="md" sx={{ marginBottom: '50px' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>

                        <Grid item xs={12} sm={12}>
                            <label>Write Petition here:</label>
                            <TextField name="intention_details" 
                                onChange={handleChange} 
                                fullWidth 
                                variant="outlined" 
                                size="medium" 
                                sx={inputstlying} 
                                required
                                multiline maxRows={Infinity} />
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                            <label>Offered by:</label>
                            <TextField name="offered_by"
                                onChange={handleChange}
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                required
                                sx={inputstlying} />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <label>Mass Date:</label>
                            <TextField name="mass_date"
                                onChange={handleChange} 
                                fullWidth 
                                variant="outlined" 
                                type="date" 
                                size="small" 
                                required
                                sx={inputstlying} />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <label>Time Slot:</label>
                            <TextField name="mass_time"
                                onChange={handleChange} 
                                value={formData.mass_time}
                                fullWidth 
                                select 
                                variant="outlined" 
                                size="small" 
                                required
                                sx={inputstlying} 
                                disabled={!isDateSelected}>
                            {schedule.slots.map((time, index) => {
                                return(
                                    <MenuItem key={index} value={time}>{time}</MenuItem>
                                )
                            })}
                            </TextField>
                        </Grid>
                    
                        
                        <Grid item xs={12} sm={4}>
                            <label>Payment Method:</label>
                            <TextField name="payment_method" 
                                value={formData.payment_method}
                                onChange={handleChange} 
                                fullWidth 
                                select 
                                variant="outlined" 
                                size="small" 
                                required
                                sx={inputstlying} >
                            <MenuItem value="cash">Cash</MenuItem>
                            <MenuItem value="gcash">GCash</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <label>Donation Amount:</label>
                            <TextField name="donation_amount"
                                onChange={handleChange} 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                required
                                sx={inputstlying} />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <label>Contact Number:</label>
                            <TextField name="contact_no"
                                onChange={handleChange} 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                required
                                sx={inputstlying} />
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