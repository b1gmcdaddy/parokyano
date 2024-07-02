import { React, useState } from "react";
import NavParishioner from "../../../components/NavParishioner";
import imageHeader from "../../../assets/imageHeader.jpg"
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { TextField, Grid, Container, FormControlLabel, Radio, RadioGroup, Button } from "@mui/material";
import Header from "../../../components/Header";

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
  
const CertificateConfirmation = () => {

    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return(
        <>
            <NavParishioner />
            <Header 
                backgroundImage={imageHeader}
                title="Certificate of Confirmation"
            />

            <Link to='/certificates' className="max-w-[1440px] mx-auto mt-8 md:mb-6 md:flex items-center">
                <FontAwesomeIcon icon={faArrowLeftLong} className="ml-8 md:mr-2" />
                <p className="xs:hidden md:flex">Return to Selection</p>
            </Link>

            <h1 align='center' className="mb-8 font-bold">Please Input the Following</h1>

            <Container maxWidth="lg" sx={{marginBottom: '60px'}}>
                <form>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>First Name:</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                            name="first_name" onChange={handleChange} autoComplete="off" required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label>Middle Name:</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                            name="middle_name" onChange={handleChange} autoComplete="off" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>Last Name:</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                            name="last_name" onChange={handleChange} autoComplete="off" required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>Date of Birth:</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                            name="birthDate" onChange={handleChange} autoComplete="off" type="date" required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>Place of Birth:</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying} 
                            name="address" onChange={handleChange} autoComplete="off" required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>Contact Number:</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                            name="contact_no" onChange={handleChange} autoComplete="off" required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>Father's Complete Name:</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                            name="father_name" onChange={handleChange} autoComplete="off" required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>Mother's Complete Maiden Name:</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                            name="mother_name" onChange={handleChange} autoComplete="off" required />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label>Date of Confirmation:</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                            name="confirmationDate" onChange={handleChange} autoComplete="off" type="date" />
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={4} sx={{ marginTop: '8px', marginBottom: '60px' }}>
                        <Grid item xs={12}>
                            <label><span className="text-red-600 font-bold">*</span>Purpose:</label>
                            <RadioGroup row name="purpose" className="" onChange={handleChange}>
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
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                            name="contact_no" onChange={handleChange} autoComplete="off"  />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label>Page No.</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                            name="father_name" onChange={handleChange} autoComplete="off"  />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label>Line No.</label>
                            <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                            name="mother_name" onChange={handleChange} autoComplete="off"  />
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

export default CertificateConfirmation