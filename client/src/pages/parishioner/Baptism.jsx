import React, { useState } from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from '../../assets/imageHeader.jpg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faXmark  } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { TextField, MenuItem, Grid, Container, FormControl, FormControlLabel, Radio, RadioGroup, Button } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import config from "../../config";
import all from "../../components/PaymentModal";
import generateHash from "../../components/GenerateHash";

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

const Baptism = () => {

  const id = 5; 
  const dateToday = new Date().toJSON().slice(0, 10);
  const hash = dateToday + generateHash().slice(0,20);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [modalData, setModalData] = useState({});
  const [openCash, setOpenCash] = useState(false);
  const [openGCash, setOpenGCash] = useState(false);

  const [formData, setFormData] = useState({
    type: 'Baptism',
    first_name: '',
    middle_name: '',
    last_name: '',
    birth_date: '',
    birth_place: '',
    gender: '',
    father_name: '',
    mother_name: '',
    details: {
      father_age: '',
      mother_age: '',
      marriage_date: '',
      liveIn_years: '',
      churchMarriedDate: '',
      churchMarriedPlace: '',
      godparents: [{      
        name: '',         
        isCatholic: ''
      }]           
    },                         
    address: '',
    contact_no: '',
    isChurchMarried: null,
    isCivilMarried: null,
    isLiveIn: null,
    preferred_date: '',
    preferred_time: '',
    priest_id: '',      
    payment_method: '',
    transaction_no: hash,
    date_requested: dateToday,
    service_id: id,   
  })

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value)
  }
  const isCaptchaChecked = captchaValue !== null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.API}/request/create-baptism`, formData)
    } catch (error) {
      console.log(error);
    }
    console.log("forn was succesfully submittedd..")
  }

  return (
    <>
      <NavParishioner />
      <Header
        backgroundImage={imageHeader}
        title="Request for Baptism"
      />
      <div className="max-w-[1440px] mt-6 mx-auto">
        <Link to='/' className="mt-8 md:mb-10 items-center">
          <FontAwesomeIcon icon={faArrowLeftLong} className="ml-8 md:mr-2" />
          <p className="hidden md:inline">Return to Home</p>
        </Link>
      </div>
      <h1 align='center' className="font-bold text-md font-[Arial] mb-8">Please Input the Following:</h1>

      <Container maxWidth="lg" sx={{ marginBottom: '50px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
    
            <Grid item xs={12} sm={4}>
              <label>Child's First Name:</label>
              <TextField fullWidth variant="outlined" size="small" sx={inputstlying} name="first_name" onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <label>Child's Middle Name:</label>
              <TextField fullWidth variant="outlined" size="small" sx={inputstlying} name="middle_name" onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <label>Child's Last Name:</label>
              <TextField fullWidth variant="outlined" size="small" sx={inputstlying} name="last_name" onChange={handleChange} required />
            </Grid>
           
            <Grid item xs={12} sm={3}>
              <label>Date of Birth:</label>
              <TextField fullWidth type="date" size="small" variant="outlined" name="birth_date" onChange={handleChange} sx={inputstlying} InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Place of Birth:</label>
              <TextField fullWidth size="small" variant="outlined" sx={inputstlying} name="birth_place" onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <label>Gender:</label>
              <TextField fullWidth select size="small" variant="outlined" sx={inputstlying} name="gender" onChange={handleChange} value={formData.gender} required>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={9}>
              <label>Father's Complete Name:</label>
              <TextField fullWidth variant="outlined" size="small" sx={inputstlying} name="father_name" onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <label>Father's Age:</label>
              <TextField fullWidth type="number" variant="outlined" sx={inputstlying} name="father_age" onChange={handleChange} size="small" required />
            </Grid>
            <Grid item xs={12} sm={9}>
              <label>Mother's Complete Maiden Name:</label>
              <TextField fullWidth variant="outlined" size="small" sx={inputstlying} name="mother_name" onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <label>Mother's Age:</label>
              <TextField fullWidth type="number" variant="outlined" sx={inputstlying} name="mother_age" onChange={handleChange} size="small" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Present Address:</label>
              <TextField fullWidth variant="outlined" size="small" sx={inputstlying} name="address" onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <label>Contact Number:</label>
              <TextField fullWidth type="tel" variant="outlined" sx={inputstlying} name="contact_no" onChange={handleChange} size="small" required />
            </Grid>
               <Grid item xs={12} sm={3}>
                <label>Payment Method:</label>
                <TextField fullWidth select variant="outlined" size="small" name="payment_method" value={formData.payment_method} onChange={handleChange} sx={inputstlying} required>
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="gcash">GCash</MenuItem>
                </TextField>
              </Grid>


                {/*------------preferrrd sched and priest----------*/}

              <Grid item xs={12} sm={4}>
                <label>Preferred Date:</label>
                <TextField fullWidth type="date" variant="outlined" sx={inputstlying} size="small" name="preferred_date" onChange={handleChange} InputLabelProps={{ shrink: true }} required />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Preferred Time:</label>
                <TextField fullWidth type="time" variant="outlined" sx={inputstlying} size="small" name="preferred_time" onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Preferred Priest:</label>
                <TextField fullWidth variant="outlined" size="small" sx={inputstlying} name="priest_id" onChange={handleChange} required />
              </Grid>
           
   

          {/*-------------church married, etc? section---------------- */}
            <Grid item xs={4} sm={2}>
              <FormControl component="fieldset">
                <label>Church Married?</label>
                <RadioGroup row name="isChurchMarried" value={formData.isChurchMarried} onChange={handleChange}>
                  <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {formData.isChurchMarried === 'yes' && (
              <>
                <Grid item xs={12} sm={4} sx={{ marginRight: '15px' }}>
                  <label>When?</label>
                  <TextField fullWidth variant="outlined" size="small" sx={inputstlying} name="churchMarriedDate" value={formData.churchMarriedDate} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ marginBottom: '14px' }}>
                  <label>Where?</label>
                  <TextField fullWidth variant="outlined" size="small" sx={inputstlying} name="churchMarriedPlace" value={formData.churchMarriedPlace} onChange={handleChange} />
                </Grid>
              </>
            )}
            {formData.isChurchMarried === 'no' && (
              <>
                <Grid item xs={4} sm={2}>
                  <FormControl component="fieldset">
                    <label>Civilly Married?</label>
                    <RadioGroup row name="isCivilMarried" value={formData.isCivilMarried} onChange={handleChange}>
                      <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {formData.isCivilMarried === 'no' && (
                  <Grid item xs={4} sm={2}>
                    <FormControl component="fieldset">
                      <label>Live-in?</label>
                      <RadioGroup row name="isLiveIn" value={formData.isLiveIn} onChange={handleChange}>
                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                )}
                {formData.isLiveIn === 'yes' && (
                  <Grid item xs={12} sm={6}>
                    <label>How many years?</label>
                    <TextField fullWidth variant="outlined" size="small" sx={inputstlying} name="liveIn_years" value={formData.liveIn_years} onChange={handleChange} />
                  </Grid>
                )}
              </>
            )}
          </Grid>
            

          <div className="mt-[3rem] flex justify-center">
                        <ReCAPTCHA
                            sitekey="6LeCEPMpAAAAANAqLQ48wTuNOGmTPaHcMxJh4xaJ"
                            onChange={handleCaptchaChange}
                        />
                    </div>
                    <Grid item sx={{ display: 'flex', justifyContent: 'center', marginTop: '1em' }}>
                        <Button variant="contained" type="submit" sx={{backgroundColor:"#355173"}}>
                            Submit Request
                        </Button>
                    </Grid>
        </form>
      </Container>

      <Footer />
    </>
  );
}

export default Baptism;
