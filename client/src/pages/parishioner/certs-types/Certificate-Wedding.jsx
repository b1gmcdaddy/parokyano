import { React, useEffect, useState } from "react";
import NavParishioner from "../../../components/NavParishioner";
import imageHeader from "../../../assets/imageHeader.jpg"
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { TextField, Grid, Container, FormControlLabel, Radio, RadioGroup, Button, FormHelperText } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Header from "../../../components/Header";
import generateHash from "../../../utils/GenerateHash";
import axios from "axios";
import config from "../../../config";
import all from '../../../components/PaymentModal'
import ValidateForm from "../../../utils/Validators";
import { validateDate } from "@mui/x-date-pickers/internals";

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

const CertificateWedding = () => {

    const id = 4
    const dateToday = new Date().toJSON().slice(0,10)
    const hash = dateToday + generateHash().slice(0,20)
    const [serviceInfo, setServiceInfo] = useState({})
    const [modalData, setModalData] = useState({})
    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '', 
        birth_date: null,
        birth_place: null, 
        contact_no: '',
        father_name: null,
        mother_name: null,
        spouse_name: {
            firstName: '',
            middleName: '',
            lastName: ''
        },
        preferred_date: null,
        archive_info: {
            book_no: '',
            page_no: '',
            line_no: '',
        },   
        service_id: id,
        transaction_no: hash,
        date_requested: dateToday,
        purpose: ''
    })
    
    useEffect(() => {
        const fetchServiceInfo = async (e) => {
            try {
                const response = await axios.get(`${config.API}/service/retrieveByParams`, {
                    params: {
                        id: id
                    }
                })
                setServiceInfo(response.data)
            } catch (err) {
                console.error('error retrieving from server', err)
            }
        }
        fetchServiceInfo()
    }, [])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSpouse = (e) => {
        setFormData(prevState => ({...prevState, spouse_name: {...formData.spouse_name, [e.target.name]: e.target.value}}))
    }

    const handleArchive = (e) => {
        setFormData(prevState => ({...prevState, archive_info: {...formData.archive_info, [e.target.name]: e.target.value}}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const validate = ValidateForm(formData)
        setErrors(validate)
        if(Object.keys(validate).length === 0 && validate.constructor === Object){
            try{
                axios.post(`${config.API}/request/create-certificate`, formData)
                const paymentInfo = {
                    fee: serviceInfo.fee,
                    transaction_no: formData.transaction_no,
                    requirements: serviceInfo.requirements,
                    message: 'Note: Kindly wait for our confirmation message to claim your certificate. Please claim it on time during our office hours. Disclaimer: Your requested document may not be available. Since it is possible that the sacrament was not received in our parish.'
                }
                setModalData(paymentInfo)
                setOpen(true)
            } catch (err) {
                console.error('error submitting data to server', err)
            }
        }
    }

    return(
        <>
            <NavParishioner />
            <Header
                backgroundImage = {imageHeader}
                title = 'Certificate of Marriage'
            />

            <Link to='/certificates' className="max-w-[1440px] mx-auto mt-8 md:mb-6 md:flex items-center">
                <FontAwesomeIcon icon={faArrowLeftLong} className="ml-8 md:mr-2" />
                <p className="xs:hidden md:flex">Return to Selection</p>
            </Link>

            <h1 align='center' className="mb-8 font-bold">Please Input the Following</h1>

            <all.CashPaymentModal open={open} data={modalData} />

            <Container maxWidth="lg" sx={{marginBottom: '60px'}}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>First Name:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="first_name" 
                                onChange={handleChange} 
                                required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label>Middle Name:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="middle_name" 
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>Last Name:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="last_name" 
                                onChange={handleChange} 
                                required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>Spouse's First Name:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="firstName" 
                                onChange={handleSpouse} 
                                required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold"></span>Spouse's Middle Name:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying} 
                                name="middleName" 
                                onChange={handleSpouse} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>Spouse's Last Name:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="lastName" 
                                onChange={handleSpouse}
                                required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>Date of Marriage:</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    fullWidth 
                                    variant="outlined" 
                                    size="small" 
                                    disableFuture
                                    sx={inputstlying}
                                    name="preferred_date" 
                                    onChange={handleChange} 
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>Contact Number:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                inputProps={{maxLength: 11}}
                                name="contact_no" 
                                onChange={handleChange} 
                                required />
                                {errors.contact_no != null &&(
                                    <FormHelperText sx={{color: 'red'}}>{errors.contact_no}</FormHelperText>
                                )}
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={4} sx={{ marginTop: '8px', marginBottom: '60px' }}>
                        <Grid item xs={12}>
                            <label><span className="text-red-600 font-bold">*</span>Purpose:</label>
                            <RadioGroup 
                                row 
                                name="purpose" 
                                className="" 
                                onChange={handleChange}
                                required
                            >
                                <FormControlLabel value="passport" control={<Radio size="small" />} label="Passport" sx={{marginRight: '2em'}} />
                                <FormControlLabel value="school" control={<Radio size="small" />} label="School" sx={{marginRight: '2em'}} />
                                <FormControlLabel value="sss" control={<Radio size="small" />} label="SSS" sx={{marginRight: '2em'}} />
                                <FormControlLabel value="others" control={<Radio size="small" />} label="Others" />
                            {formData.purpose === 'others' && (
                                <TextField label="Please Specify" fullWidth sx={inputstlying} />
                            )}
                            </RadioGroup>
                            {formData.purpose === "" && (
                                <FormHelperText sx={{color: "red"}}>Pleas choose a purpose</FormHelperText>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <label>Book No.</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="book_no" 
                                onChange={handleArchive} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label>Page No.</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="page_no" 
                                onChange={handleArchive} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label>Line No.</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="line_no" 
                                onChange={handleArchive} />
                        </Grid>
                    </Grid>  

                    <Grid item sx={{ display: 'flex', justifyContent: 'center', marginTop: "10px"}}>
                        <Button variant="contained" type="submit" sx={{backgroundColor:"#355173"}}>
                            Submit Request
                        </Button>
                    </Grid>
                    
                </form>
            </Container>
            
            <Footer />
        </>
    )

}

export default CertificateWedding