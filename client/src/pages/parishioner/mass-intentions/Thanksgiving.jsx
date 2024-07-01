import React, { useEffect, useState } from 'react';
import NavParishioner from "../../../components/NavParishioner";
import imageHeader from '../../../assets/imageHeader.jpg';
import Header from '../../../components/Header';
import { Container, Grid, TextField, MenuItem, FormControlLabel, FormGroup, Checkbox } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "../../../components/Footer";
import config from '../../../config';

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

  const [captchaValue, setCaptchaValue] = useState(true);
  const [isChecked, setIsChecked] = useState({ honorOfSaints: false, weddingAnniversary: false, successOf: false, birthdayOf: false, others: false,});
  const id = 1
  const dateToday = new Date().toJSON().slice(0,10)
  const [schedule, setSchedule] = useState({slots: ['00:00:00']})

  // form data
  const [formData, setFormData] = useState({
    intention: {
      saint: '',
      wedding: '',
      sucess: '',
      birthday: '',
      others: ''
    },
    mass_date: '',
    mass_time: '',
    offered_by: '',
    payment_method: '',
    donation_amount: ''
  })

  useEffect(() => {
    const fetchSchedule = async () => {
      try{
        const response = await axios.get(`${config.API}/service/retrieve-schedule`, {
          params: {
            id: id,
            date: formData.mass_date
          }
        })
        setSchedule(response)
        console.log(schedule)
      } catch (err) {
        console.error('error fetching schedule', err)
      }
      fetchSchedule();
    }
  }, [formData.mass_date])

  
  // event handlers for data values
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleIntention = (e) => {
    setFormData({...formData.intention,[e.target.name]: e.target.value})
  }

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const isCaptchaChecked = captchaValue !== null;

  const allowInput = (e) => {
    setIsChecked({...isChecked, [e.target.name]: e.target.checked,});
  };

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

      <Container maxWidth="md" sx={{ marginBottom: '50px' }}>
        <form>
          <Grid container spacing={4}>
            
                <Grid item xs={12} sm={6}>
                    <FormControlLabel control={<Checkbox checked={isChecked.honorOfSaints} onChange={allowInput} name="honorOfSaints" />} label="In Honor of Saints" />
                    <TextField 
                      variant="outlined" 
                      size="small" 
                      sx={inputstlying} 
                      label="Please input the details" 
                      fullWidth 
                      disabled={!isChecked.honorOfSaints}
                      name='saint'
                      onChange={handleIntention} />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControlLabel control={<Checkbox checked={isChecked.weddingAnniversary} onChange={allowInput} name="weddingAnniversary" />} label="Wedding Anniversary of" />
                    <TextField variant="outlined" 
                      size="small" 
                      sx={inputstlying} 
                      label="Please input the details" 
                      fullWidth 
                      disabled={!isChecked.weddingAnniversary}
                      name='wedding'
                      onChange={handleIntention} />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControlLabel control={<Checkbox checked={isChecked.successOf} onChange={allowInput} name="successOf" />} label="For the success of" />
                    <TextField variant="outlined" 
                      size="small" 
                      sx={inputstlying} 
                      label="Please input the details" 
                      fullWidth 
                      disabled={!isChecked.successOf}
                      name='success'
                      onChange={handleIntention} />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControlLabel control={<Checkbox checked={isChecked.birthdayOf} onChange={allowInput} name="birthdayOf" />} label="For the birthday of" />
                    <TextField variant="outlined" 
                      size="small" 
                      sx={inputstlying} 
                      label="Please input the details" 
                      fullWidth 
                      disabled={!isChecked.birthdayOf}
                      name='birthday'
                      onChange={handleIntention} />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControlLabel control={<Checkbox checked={isChecked.others} onChange={allowInput} name="others" />} label="Others" />
                    <TextField variant="outlined" 
                      size="small" 
                      sx={inputstlying} 
                      label="Please input the details" 
                      fullWidth 
                      disabled={!isChecked.others}
                      name='others'
                      onChange={handleIntention} />
                </Grid>

                <Grid item xs={12} sm={3} sx={{marginTop: {md: '18px'}}}>
                    <label>Mass Date:</label>
                    <TextField fullWidth 
                      variant="outlined" 
                      type="date" 
                      size="small" 
                      sx={inputstlying} 
                      name='mass_date'
                      onChange={handleChange}
                      required />           
                </Grid>

                <Grid item xs={12} sm={3} sx={{marginTop: {md: '18px'}}}>
                    <label>Time Slot:</label>
                    <TextField fullWidth 
                      select variant="outlined" 
                      size="small" 
                      sx={inputstlying} 
                      name='mass_time'
                      onChange={handleChange}
                      required >
                        <MenuItem value="time slot 1">time slot 1</MenuItem>
                        <MenuItem value="sdf">time slot 2</MenuItem>
                    </TextField>
                </Grid> 

                <Grid item xs={12} sm={6}>
                    <label>Offered by:</label>
                    <TextField fullWidth 
                      variant="outlined" 
                      size="small" 
                      sx={inputstlying} 
                      name='offered_by'
                      onChange={handleChange}
                      required />
                </Grid>  

                <Grid item xs={12} sm={3}>
                    <label>Payment Method:</label>
                    <TextField fullWidth select 
                      variant="outlined" 
                      size="small" 
                      sx={inputstlying}
                      name='payment_method'
                      onChange={handleChange} 
                      required>
                        <MenuItem value="cash">Cash</MenuItem>
                        <MenuItem value="gcash">GCash</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={3}>
                    <label>Donation Amount:</label>
                    <TextField fullWidth 
                      variant="outlined" 
                      size="small" 
                      sx={inputstlying} 
                      name='donation_amount'
                      onChange={handleChange}
                      required />
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
  );
};

export default Thanksgiving;
