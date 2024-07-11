import { React, useEffect, useState } from "react";
import NavParishioner from "../../../components/NavParishioner";
import imageHeader from "../../../assets/imageHeader.jpg"
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { TextField, Container, Grid, FormControlLabel, Radio, RadioGroup, Button } from "@mui/material";
import Header from "../../../components/Header";
import axios from "axios";
import config from "../../../config";
import generateHash from "../../../components/GenerateHash";
import all from '../../../components/PaymentModal'

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

const CertificateBaptism = () => {

    const id = 3
    const dateToday = new Date().toJSON().slice(0,10)
    const hash = dateToday + generateHash().slice(0,20)
    const[ serviceInfo, setServiceInfo] = useState({})
    const [open, setOpen] = useState(false)
    const [modalData, setModalData] = useState({})

    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        birth_date: '',
        address: '',
        contact_no: '',
        father_name: '',
        mother_name: '',
        spouse_name: null,
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

    useEffect(()=> {
        const fetchServiceInfo = async (e) => {
            try {
                const response = await axios.get(`${config.API}/service/retrieveByparams`, {
                    params: {
                        id: id
                    }
                })
                setServiceInfo(response.data)
            } catch (err) {
                console.error('error retrieving data from server', err)
            }
        }
        fetchServiceInfo()
    }, [])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleArchive = (e) => {
        setFormData(prevState => ({...prevState, archive_info: {...formData.archive_info, [e.target.name]: e.target.value}}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
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
            console.error('error submitting to server', err)
        }
    }

    return(
        <>
            <NavParishioner />
            <Header
                backgroundImage = {imageHeader}
                title = 'Baptismal Certificate'
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
                            <TextField fullWidth 
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
                            <label><span className="text-red-600 font-bold">*</span>Date of Birth:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="birth_date" 
                                onChange={handleChange} 
                                type="date" 
                                required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>Place of Birth:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying} 
                                name="address" 
                                onChange={handleChange} 
                                required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>Contact Number:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="contact_no" 
                                onChange={handleChange} 
                                required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>Father's Complete Name:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="father_name" 
                                onChange={handleChange} 
                                required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>Mother's Complete Maiden Name:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="mother_name" 
                                onChange={handleChange} 
                                required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label>Date of Baptism:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="preferred_date" 
                                onChange={handleChange}
                                type="date" />
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={4} sx={{ marginTop: '8px', marginBottom: '60px' }}>
                        <Grid item xs={12}>
                            <label><span className="text-red-600 font-bold">*</span>Purpose:</label>
                            <RadioGroup 
                                row 
                                name="purpose" 
                                value={formData.purpose} 
                                onChange={handleChange}
                            >
                                <FormControlLabel value="marriage" control={<Radio size="small" />} label="Marriage" sx={{marginRight: '2em'}} />
                                <FormControlLabel value="passport" control={<Radio size="small" />} label="Passport" sx={{marginRight: '2em'}} />
                                <FormControlLabel value="school" control={<Radio size="small" />} label="School" sx={{marginRight: '2em'}} />
                                <FormControlLabel value="late registration" control={<Radio size="small" />} label="Late Registration" sx={{marginRight: '2em'}} />
                                <FormControlLabel value="sss" control={<Radio size="small" />} label="SSS" sx={{marginRight: '2em'}} />
                                <FormControlLabel value="others" control={<Radio size="small" />} label="Others" />
                            {formData.purpose === 'others' && (
                                <TextField label="Please Specify" fullWidth sx={inputstlying} />
                            )}
                            </RadioGroup>
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

export default CertificateBaptism