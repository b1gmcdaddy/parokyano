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
    const [schedule, setSchedule] = useState([])

    // refers to the FORM's data which will be sent to REQUEST table
    const [data, setData] = useState({
        intention_details: '',
        offered_by: '',
        mass_date: '',
        mass_time: '',
        payment_method: '',
        donation_amount: '',
        service_id: '1',  // 1 = for all mass intentions
    })

    // upon picking date
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/service/retrieve-schedule`, {
                    params: {
                        id: '1',
                        date: data.mass_date
                    }
                });
                setSchedule(response.data);
                console.log(schedule)
            } catch (error) {
                console.error('error fetching schedule', error)
            }
        }
        fetchSchedule();
    }, [data.mass_date])

    // change value of data with whatever user is typing
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
 
    // change value of DATE and retrieve all TIME SLOTS
    const handleDate = (e) => {
        setData({...date, [e.target.name]: e.target.value})
    }

    // need some work atm
    const handleSubmit = (e) => {
        e.preventDefault()
        // axios.post(`http://localhost:5000/request/create-intention`, data)
        // .then(function(response){
        //     console.log(response)
        //     alert(data)
        // })
        // .catch(function(error){
        //     console.log(error)
        // })
    }

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
                                multiline maxRows={Infinity} />
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                            <label>Offered by:</label>
                            <TextField name="offered_by"
                                onChange={handleChange}
                                fullWidth 
                                variant="outlined" 
                                size="small" 
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
                                sx={inputstlying} />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <label>Time Slot:</label>
                            <TextField name="mass_time"
                                onChange={handleChange} 
                                value={data.mass_time}
                                fullWidth 
                                select 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying} >
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
                                value={data.payment_method}
                                onChange={handleChange} 
                                fullWidth 
                                select 
                                variant="outlined" 
                                size="small" 
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