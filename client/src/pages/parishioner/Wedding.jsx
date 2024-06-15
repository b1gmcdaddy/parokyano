import NavParishioner from "../../components/NavParishioner"
import Header from "../../components/Header"
import imageHeader from '../../assets/imageHeader.jpg'
import Footer from "../../components/Footer"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons"
import { MenuItem, Select, Grid, Box, TextField, Button, FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { React, useState } from "react"
import CashPaymentModal from "../../components/CashPaymentModal"

const Wedding = () => {

    const [open, setOpen] = useState(false)

    const dummyData = [{
        fee: null,
        requirements: [
            'Clear copy of the Certificate of Live Birth or Birth Certificate (either NSO or Local Birth)', 
            'Baptismal Certificate - Marriage Purposes (issued within last 3 months)', 
            'Confirmation Certificate - Marriage Purposes (issued within last 3 months)'
        ],
        message: 'Please wait for the parish to verify if the requested date and time is possible.We will communicate with you once the request has been approved and for other purposes.'
    }]

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("not open modal")
        setOpen(true)
        console.log("open modal")
    }

    return(
        <>
            <NavParishioner />
            <Header 
                backgroundImage={imageHeader}
                title="Gethsemane Parish Patsoral Center"
            />

            <Link to='/'  className="max-w-[1440px] mx-auto mt-8 md:mb-6 md:flex items-center">
                <FontAwesomeIcon icon={faArrowLeftLong} className="ml-8 md:mr-2" />
                <p className="xs:hidden md:flex">Return to Home</p>
            </Link>

            <h1 align='center'>Please Input the Following</h1>

            <CashPaymentModal open={open} data={dummyData[0]} />

            <Grid container justifyContent={"center"} alignItems={"center"} sx={{marginTop:"50px", marginBottom:"20px"}}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '40ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
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
                            label="Spouse's First Name"
                            placeholder="spouse's first name"
                        />
                        <TextField
                            required
                            label="Spouse's Middle Name"
                            placeholder="spouse's middle name"
                        />
                        <TextField
                            required
                            label="Spouse's Last Name"
                            placeholder="spouse's last name"
                        />
                    </div>

                    <div>
                        <Grid container alignItems={"center"}>
                        <TextField
                            required
                            label="Contact Number"
                            placeholder="+63"
                        />
                        <Select sx={{marginLeft: 2, width: 300}}>
                            <MenuItem>None</MenuItem>
                            <MenuItem>Civilly Married</MenuItem>
                            <MenuItem>Live-in for under 4 years</MenuItem>
                            <MenuItem>Live-in for more than 4 years</MenuItem>
                            <MenuItem>Widow</MenuItem>
                        </Select>
                        </Grid>
                    </div>

                    <div>
                        <Grid container spacing={2} alignItems="center" sx={{margin:'5px', padding:'2.0'}}>
                            <Grid item sx={{marginRight:"20px"}}>
                                <label>Are you both Catholic?</label>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        sx={{
                                            '& .MuiRadio-root': { padding: 1.0 } // Adjusts the padding of the radio button itself
                                        }}
                                    >
                                        <FormControlLabel labelPlacement="end" value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel labelPlacement="end" value="No" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}  alignItems="center" sx={{margin:'5px', padding:'2.0'}}>
                            <Grid item  sx={{marginRight:"20px"}}>
                                <label>Are you both of your Parishioners?</label>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        sx={{
                                            '& .MuiRadio-root': { padding: 1.0 } // Adjusts the padding of the radio button itself
                                        }}
                                    >
                                        <FormControlLabel labelPlacement="end" value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel labelPlacement="end" value="No" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>

                    <div>
                        <h1>Sponsor</h1>
                        <Grid container justifyContent={"center"} alignItems={"center"} sx={{bgcolor:'#E8E8E8'}}>
                            <Grid item>
                                <TextField
                                    required
                                    label="Full Name"
                                    placeholder="sponsor name"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    required
                                    label="Age"
                                    placeholder="sponsor age"
                                />
                            </Grid>
                            <Grid item>
                                <Select sx={{width:200}}>
                                    <MenuItem>Not Married</MenuItem>
                                    <MenuItem>Married</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <label>Catholic?</label>
                                    <RadioGroup 
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        sx={{
                                            '& .MuiRadio-root': { padding: 1.0 } // Adjusts the padding of the radio button itself
                                        }}
                                    >
                                        <FormControlLabel labelPlacement="end" value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel labelPlacement="end" value="No" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent={"center"} alignItems={"center"} sx={{bgcolor:'#E8E8E8'}}>
                            <Grid item>
                                <TextField
                                    required
                                    label="Full Name"
                                    placeholder="sponsor name"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    required
                                    label="Age"
                                    placeholder="sponsor age"
                                />
                            </Grid>
                            <Grid item>
                                <Select sx={{width:200}}>
                                    <MenuItem>Not Married</MenuItem>
                                    <MenuItem>Married</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <label>Catholic?</label>
                                    <RadioGroup 
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        sx={{
                                            '& .MuiRadio-root': { padding: 1.0 } // Adjusts the padding of the radio button itself
                                        }}
                                    >
                                        <FormControlLabel labelPlacement="end" value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel labelPlacement="end" value="No" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent={"center"} alignItems={"center"} sx={{bgcolor:'#E8E8E8'}}>
                            <Grid item>
                                <TextField
                                    required
                                    label="Full Name"
                                    placeholder="sponsor name"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    required
                                    label="Age"
                                    placeholder="sponsor age"
                                />
                            </Grid>
                            <Grid item>
                                <Select sx={{width:200}}>
                                    <MenuItem>Not Married</MenuItem>
                                    <MenuItem>Married</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <label>Catholic?</label>
                                    <RadioGroup 
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        sx={{
                                            '& .MuiRadio-root': { padding: 1.0 } // Adjusts the padding of the radio button itself
                                        }}
                                    >
                                        <FormControlLabel labelPlacement="end" value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel labelPlacement="end" value="No" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent={"center"} alignItems={"center"} sx={{bgcolor:'#E8E8E8'}}>
                            <Grid item>
                                <TextField
                                    required
                                    label="Full Name"
                                    placeholder="sponsor name"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    required
                                    label="Age"
                                    placeholder="sponsor age"
                                />
                            </Grid>
                            <Grid item>
                                <Select sx={{width:200}}>
                                    <MenuItem>Not Married</MenuItem>
                                    <MenuItem>Married</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <label>Catholic?</label>
                                    <RadioGroup 
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        sx={{
                                            '& .MuiRadio-root': { padding: 1.0 } // Adjusts the padding of the radio button itself
                                        }}
                                    >
                                        <FormControlLabel labelPlacement="end" value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel labelPlacement="end" value="No" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
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

export default Wedding