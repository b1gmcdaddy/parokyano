import { React, useState } from "react";
import NavParishioner from "../../../components/NavParishioner";
import imageHeader from "../../../assets/imageHeader.jpg"
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { TextField, Box, Grid, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Button } from "@mui/material";
import Header from "../../../components/Header";

const CertificateConfirmation = () => {

    return(
        <>
            <NavParishioner />
            <Header 
                backgroundImage={imageHeader}
                title="Gethsemane Parish Pastoral Center"
            />

            <Link to='/' className="max-w-[1440px] mx-auto mt-8 md:mb-6 md:flex items-center">
                <FontAwesomeIcon icon={faArrowLeftLong} className="ml-8 md:mr-2" />
                <p className="xs:hidden md:flex">Return to Home</p>
            </Link>

            <h1 align='center'>Please Input the Following</h1>

            <Grid container justifyContent={"center"} sx={{marginTop:"50px", marginBottom:"20px"}}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '40ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >

                    <div>
                        <TextField
                            required
                            label="First Name"
                            placeholder="first name"
                        />
                        <TextField
                            required
                            label="Middle Name"
                            placeholder="middle name"
                        />
                        <TextField
                            required
                            label="Last Name"
                            placeholder="last name"
                        />
                    </div>
                    
                    <div>
                        <TextField
                            required
                            name="date"
                            label="Date of Birth"
                            type="date"
                            defaultValue='2000-01-01'
                        />
                        <TextField
                            required
                            label="Place of Birth"
                            placeholder="place"
                        />
                        <TextField
                            required
                            label="Contact Number"
                            placeholder="+63"
                        />
                    </div>

                    <div>
                        <TextField
                            required
                            label="Father's Complete Name"
                            placeholder="father"
                        />
                        <TextField
                            required
                            label="Mother's Complete Maiden Name"
                            placeholder="mother"
                        />
                        <TextField
                            label="Date of Confirmation"
                            type="date"
                            defaultValue='2000-01-01'
                        />
                    </div>

                    <div>
                        <Grid container justifyContent={"center"}>
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Purpose</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        sx={{ 
                                            '& .MuiRadio-root': { padding: 1.0 } // Adjusts the padding of the radio button itself
                                        }}
                                    >
                                        <Grid item xs={12} sm={4}>
                                            <FormControlLabel labelPlacement="end" value="marriage" control={<Radio />} label="Marriage" />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControlLabel labelPlacement="end" value="school" control={<Radio />} label="School" />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControlLabel labelPlacement="end" value="sss" control={<Radio />} label="SSS" />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControlLabel labelPlacement="end" value="passport" control={<Radio />} label="Passport" />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControlLabel labelPlacement="end" value="late registration" control={<Radio />} label="Late Registration" />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControlLabel labelPlacement="end" value="others" control={<Radio />} label="Others" />
                                            <TextField
                                                label="Please specify"
                                                placeholder="Specify other purpose"
                                            />
                                        </Grid>
                                    </RadioGroup>
                            </FormControl>
                        </Grid>
                    </div>
                    <hr/>
                    <div>
                        <TextField
                            label="Book Number"
                            placeholder="book #"
                        />
                        <TextField
                            label="Page Number"
                            placeholder="page #"
                        />
                        <TextField
                            label="Line Number"
                            placeholder="line #"
                        />
                    </div>

                    <Grid sx={{ display: 'flex', justifyContent: 'center', margin: 5 }}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit Request
                        </Button>
                    </Grid>

                </Box>
            </Grid>

            <Footer />
        </>
    )

}

export default CertificateConfirmation