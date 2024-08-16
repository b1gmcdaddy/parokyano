import React, { useState, useEffect } from "react";
import NavParishioner from "../../../components/NavParishioner";
import imageHeader from '../../../assets/imageHeader.jpg';
import Header from '../../../components/Header';
import { Container, Grid, RadioGroup, TextField, FormControlLabel, Radio, MenuItem, FormHelperText } from '@mui/material';
import Footer from '../../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"
import generateHash from "../../../utils/GenerateHash";
import axios from "axios";
import config from "../../../config";
import NoPaymentModal from "../../../components/NoPaymentModal";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ValidateForm from "../../../utils/Validators";
import dayjs from "dayjs";

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
    const id = 10
    const dateToday = new Date().toJSON().slice(0,10)
    const hash = dateToday + generateHash().slice(0,20)
    const [captchaValue, setCaptchaValue] = useState(null);
    const [radioValue, setRadioValue] = useState("");
    const [open, setOpen] = useState(false);
    const [priestList, setPriestList] = useState([])
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const fetchPriest = async () => {
            try{
                const response = await axios(`${config.API}/priest/retrieve`, {
                    params: {
                        col: 'status',
                        val: 'active'
                    }
                })    
                setPriestList(response.data)
            } catch(err) {
                console.error(err)
            }
        }
        fetchPriest()
    }, [])

    const [formData, setFormData] = useState({
        first_name: '',            // in the case of outside mass, this is the field for the celebration/celebrator
        address: '',  
        contact_no: '',
        requested_by: '',           // this is the field for the contact person's name
        relationship: null,
        preferred_date: '',
        preferred_time: '',
        preferred_priest: null,     // value is the  priest id
        isParishioner: '',
        transaction_no: hash,
        service_id: id,
        type: null,
        mass_date: null
    })

    const modalData = {
        message: 'Please wait for the parish to verify if the requested date and time is approved. We will communicate with you once the request has been approved and for other purposes.',
        req: null,
        transaction_no: formData.transaction_no
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleDateChange = (name, date) => {
        setFormData({...formData, [name]: date.format("YYYY-MM-DD")})
    }

    const handleTimeChange = (name, time) => {
        setFormData({...formData, [name]: time.format("HH:mm:ss")})
    }

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value)
    }

    const handlesubmit = (e) =>{
        e.preventDefault()
        const validate = ValidateForm(formData)
        setErrors(validate)
        if(Object.keys(validate) === 0 && validate.constructor === Object){
            try{
                axios.post(`${config.API}/request/create-mass`, formData)
                setOpen(true)
                console.log('success!')
            } catch (err) {
                console.error('error submitting to server', err)
            }
        }
    }

    const handleRadioChange = (e) => {
        setRadioValue(e.target.value);
        if (e.target.value !== "others") {
            setFormData({...formData, [e.target.name]: e.target.value})
        }
    }

    const handleOtherChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
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

            <NoPaymentModal open={open} data={modalData} />

            <Container maxWidth="lg" sx={{ marginBottom: '50px' }}>
                <form>
                    <Grid container spacing={4}>
                    <Grid item xs={12} sm={7}>
                            <RadioGroup 
                                row 
                                sx={{justifyContent: 'space-between'}} 
                                name="type"
                                value={radioValue} 
                                onChange={handleRadioChange}>
                                    <FormControlLabel value="chapel" control={<Radio size="small" />} label="Chapel" />
                                    <FormControlLabel value="company" control={<Radio size="small" />} label="Company" />
                                    <FormControlLabel value="others" control={<Radio size="small" />} label="Others:" />
                                    <Grid item xs={12} sm={5}>   
                                        <TextField 
                                            fullWidth 
                                            variant="outlined" 
                                            size="small" 
                                            sx={{'& .MuiOutlinedInput-root': {'& fieldset': {boxShadow: '0 3px 2px rgba(0,0,0,0.1)',},'&.Mui-focused fieldset': {borderColor: '#355173',borderWidth: '0.5px'},}, opacity: isOtherSelected ? 1 : 0.4}} 
                                            name="type"
                                            required 
                                            disabled={!isOtherSelected} 
                                            onChange={handleOtherChange}/>
                                    </Grid>
                                    {formData.type == null && (
                                        <FormHelperText sx={{color: 'red'}}><p>please choose a type</p></FormHelperText>
                                    )}
                            </RadioGroup>
                        </Grid>
                        
                        <Grid item xs={12} sm={12}>
                            <label>Celebration/Celebrator:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying} 
                                name="first_name"
                                onChange={handleChange}
                                required />
                        </Grid> 
                        <Grid item xs={12} sm={12}>
                            <label>Address:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="address"
                                onChange={handleChange} 
                                required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label>Contact Person:</label>
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
                            <label>Contact Number:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying} 
                                inputProps={{maxLength: 11}}
                                name="contact_no"
                                onChange={handleChange} 
                                required />
                            {errors.contact_no != null && (
                                <FormHelperText sx={{color: 'red'}}>{errors.contact_no}</FormHelperText>
                            )}
                        </Grid>
                        
                        <Grid item xs={12} sm={3}>
                            <label>Preferred Date:</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    fullWidth 
                                    variant="outlined" 
                                    size="small" 
                                    sx={inputstlying} 
                                    disablePast
                                    name="preferred_date" 
                                    onChange={(date) => handleDateChange('preferred_date', date)}
                                    renderInput={(params) => <TextField {...params} required />}
                                    required />
                                {errors.preferred_date != null && (
                                    <FormHelperText sx={{color: 'red'}}>{errors.preferred_date}</FormHelperText>
                                )}
                            </LocalizationProvider>
                            
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <label>Preferred Time:</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    fullWidth 
                                    variant="outlined" 
                                    size="small" 
                                    sx={inputstlying}
                                    timeSteps ={{hours:30, minutes: 30}}    // if mabuang, delete hours
                                    minTime={dayjs().set('hour', 7)}
                                    maxTime={dayjs().set('hour', 16)}
                                    name="preferred_time" 
                                    onChange={(time) => handleTimeChange('preferred_time', time)}
                                    renderInput={(params) => <TextField {...params} required />}
                                    required />
                                </LocalizationProvider>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <label>Preferred Priest:</label>
                            <TextField 
                                fullWidth 
                                select 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="preferred_priest" 
                                required>
                                    {priestList.map((priest, index) => (
                                        <MenuItem key={index} value={priest.priestID}>{priest.first_name + ' ' + priest.last_name}</MenuItem>
                                    ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={6} sm={2} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                            <label>Are you a Parishioner?</label>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <RadioGroup 
                                row 
                                sx={{marginTop: '-6px', display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }}}
                                name="isParishioner"
                                onChange={handleChange}
                                value={formData.isParishioner}>
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

export default OutsideMass