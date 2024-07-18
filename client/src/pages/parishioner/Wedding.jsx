import NavParishioner from "../../components/NavParishioner"
import Header from "../../components/Header"
import imageHeader from '../../assets/imageHeader.jpg'
import Footer from "../../components/Footer"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons"
import { MenuItem, Grid, TextField, Button, FormControl, RadioGroup, FormControlLabel, Radio, Container } from "@mui/material"
import { React, useEffect, useState } from "react"
import generateHash from "../../components/GenerateHash"
import config from "../../config"
import axios from "axios"

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

const Wedding = () => {

    const [open, setOpen] = useState(false)
    const dateToday = new Date().toJSON().slice(0,10)
    const hash = dateToday + generateHash().slice(0,20)
    const id = 7        // sa database, sunday wedding ang gi list ra, since there is no way of securing a
                        // date ahead of time without consulting the priest, default lang sah siya na sunday wedding(1000PHP). 
                        // change lang ang amount when date is changed to a non sunday date on admin side.

    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        spouse_name: {
            firstName: '',
            middleName: '',
            lastName: ''
        },
        contact_no: '',
        relationship: '',               // marital status ni
        isCatholic: null,
        isChurchMarried: null,
        sponsor_details: [{                     // will be sent to db field: 'details'
            sponsor_name: '',
            sponsor_age: '',
            isMarrried: null,
            catholic: null
        }],
        transaction_no: hash,
        service_id: id
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post(`${config.API}/request/create-wedding`, formData)
        } catch (err) {
            console.log(err)
        }
        console.log(formData)
    }

    const handleSponsor = (e, index, field) => {
        const temp = [...formData.sponsor_details]
        temp[index][field] = e.target.value
        setFormData(prevState => ({...prevState, sponsor_details: temp}))
    }

    const addSponsor = (e) => {
        setFormData(prevState => ({...prevState, sponsor_details: [...formData.sponsor_details, {'sponsor_name': '', 'sponsor_age': '', 'isMarrried': '', 'catholic': ''}]}))
    }

    const handleSpouse = (e) => {
        setFormData(prevState => ({...prevState, spouse_name: {...formData.spouse_name, [e.target.name]: e.target.value}}))
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return(
        <>
            <NavParishioner />
            <Header 
                backgroundImage={imageHeader}
                title="Wedding"
            />

            <div className="max-w-[1440px] mt-6 mx-auto">
                <Link to='/' className="mt-8 md:mb-10 items-center">
                    <FontAwesomeIcon icon={faArrowLeftLong} className="ml-8 md:mr-2" />
                    <p className="hidden md:inline">Return to Home</p>
                </Link>
            </div>

            <h1 align='center' className="font-bold text-md font-[Arial] mb-8">Please Input the Following</h1>

            {/* <CashPaymentModal open={open} data={dummyData[0]} /> */}

            <Container maxWidth="md" sx={{marginBottom: '4em'}}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={4} className="mb-10">
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
                                onChange={handleChange}
                             />
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
                            <label><span className="text-red-600 font-bold">*</span>Partner's First Name:</label>
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
                            <label><span className="text-red-600 font-bold"></span>Partner's Middle Name:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying} 
                                name="middleName" 
                                onChange={handleSpouse}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <label><span className="text-red-600 font-bold">*</span>Partner's Last Name:</label>
                            <TextField 
                                fullWidth 
                                variant="outlined" 
                                size="small" 
                                sx={inputstlying}
                                name="lastName" 
                                onChange={handleSpouse}
                                required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
                            <label><span className="text-red-600 font-bold">*</span>Status:</label>
                            <TextField 
                                fullWidth 
                                select 
                                size="small" 
                                variant="outlined" 
                                sx={inputstlying} 
                                name="relationship"
                                onChange={handleChange}
                                value={formData.relationship}
                                required>
                                    <MenuItem value="None">None</MenuItem>
                                    <MenuItem value="Civilly Married">Civilly Married</MenuItem>
                                    <MenuItem value="Live-in for under 4 years">Live-in for under 4 years</MenuItem>
                                    <MenuItem value="Live-in for more than 4 years">Live-in for more than 4 years</MenuItem>
                                    <MenuItem value="Widow">Widow</MenuItem>
                            </TextField>
                        </Grid>
                    

                        <Grid item xs={7} md={3}>
                            <FormControl component="fieldset">
                                <label>Are both of you Catholic?</label>
                                <RadioGroup 
                                    row 
                                    name="isCatholic"
                                    onChange={handleChange}>
                                <FormControlLabel value="1" control={<Radio size="small" />} label="Yes" />
                                <FormControlLabel value="0" control={<Radio size="small" />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={5} md={3}>
                            <FormControl component="fieldset">
                                <label>Church Married?</label>
                                <RadioGroup 
                                    row 
                                    name="isChurchMarried"
                                    onChange={handleChange}>
                                <FormControlLabel value="1" control={<Radio size="small" />} label="Yes" />
                                <FormControlLabel value="0" control={<Radio size="small" />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>

                        
                    <Container maxWidth="md" className="bg-neutral-100 md:p-8 rounded-lg mb-5">
                        <Grid container spacing={3}>
                            {formData.sponsor_details.map((s, index) => (
                                <>
                                    <Grid item key={index} xs={9} md={4}>
                                        <label>Sponsor's Full Name:</label>
                                        <TextField 
                                            fullWidth 
                                            variant="outlined" 
                                            size="small" 
                                            sx={inputstlying}
                                            name="sponsor_name" 
                                            value={formData.sponsor_details.sponsor_name}
                                            onChange={(e) => handleSponsor(e,index,'sponsor_name')}
                                            className="bg-white" />
                                    </Grid> 
                                    <Grid item xs={3} md={2}>
                                        <label>Age:</label>
                                        <TextField 
                                            fullWidth 
                                            variant="outlined" 
                                            size="small" 
                                            sx={inputstlying}
                                            name="sponsor_age" 
                                            value={formData.sponsor_details.sponsor_age}
                                            onChange={(e) => handleSponsor(e,index,'sponsor_age')}
                                            className="bg-white" />
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                        <label>Marital Status:</label>
                                        <TextField 
                                            fullWidth 
                                            select 
                                            size="small" 
                                            variant="outlined" 
                                            sx={inputstlying} 
                                            className="bg-white" 
                                            name="isMarrried"
                                            value={formData.sponsor_details.isMarrried}
                                            onChange={(e) => handleSponsor(e,index,'isMarrried')}>
                                                <MenuItem value="1">Married</MenuItem>
                                                <MenuItem value="0">Not Married</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={6} md={3}>
                                        <FormControl component="fieldset">
                                            <label className="ml-2">Catholic?</label>
                                            <RadioGroup 
                                                row 
                                                className="ml-2"
                                                name="catholic"
                                                value={formData.sponsor_details.catholic}
                                                onChange={(e) => handleSponsor(e,index,'catholic')}>
                                            <FormControlLabel value="1" control={<Radio size="small" />} label="Yes" />
                                            <FormControlLabel value="0" control={<Radio size="small" />} label="No" />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <hr className="border-neutral-300 border-[0.1px]"/>
                                    </Grid>
                                </>
                            ))}

                            


                            {/* <Grid item xs={9} md={4}>
                                <label>Sponsor's Full Name:</label>
                                <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                                name="sponsor2_name" autoComplete="off" className="bg-white" />
                            </Grid> 
                            <Grid item xs={3} md={2}>
                                <label>Age:</label>
                                <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                                name="sponsor2_age" autoComplete="off" className="bg-white" />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <label>Marital Status:</label>
                                <TextField fullWidth select size="small" variant="outlined" sx={inputstlying} className="bg-white" >
                                    <MenuItem value="Married">Married</MenuItem>
                                    <MenuItem value="Not Married">Not Married</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <FormControl component="fieldset">
                                    <label className="ml-2">Catholic?</label>
                                    <RadioGroup row className="ml-2">
                                    <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <hr className="border-neutral-300 border-[0.1px]"/>
                            </Grid>
                            <Grid item xs={9} md={4}>
                                <label>Sponsor's Full Name:</label>
                                <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                                name="sponsor3_name" autoComplete="off" className="bg-white" />
                            </Grid> 
                            <Grid item xs={3} md={2}>
                                <label>Age:</label>
                                <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                                name="sponsor3_age" autoComplete="off" className="bg-white" />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <label>Marital Status:</label>
                                <TextField fullWidth select size="small" variant="outlined" sx={inputstlying} className="bg-white" >
                                    <MenuItem value="Married">Married</MenuItem>
                                    <MenuItem value="Not Married">Not Married</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <FormControl component="fieldset">
                                    <label className="ml-2">Catholic?</label>
                                    <RadioGroup row className="ml-2">
                                    <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <hr className="border-neutral-300 border-[0.1px]"/>
                            </Grid>
                            <Grid item xs={9} md={4}>
                                <label>Sponsor's Full Name:</label>
                                <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                                name="sponsor4_name" autoComplete="off" className="bg-white" />
                            </Grid> 
                            <Grid item xs={3} md={2}>
                                <label>Age:</label>
                                <TextField fullWidth variant="outlined" size="small" sx={inputstlying}
                                name="sponsor4_age" autoComplete="off" className="bg-white" />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <label>Marital Status:</label>
                                <TextField fullWidth select size="small" variant="outlined" sx={inputstlying} className="bg-white" >
                                    <MenuItem value="Married">Married</MenuItem>
                                    <MenuItem value="Not Married">Not Married</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <FormControl component="fieldset">
                                    <label className="ml-2">Catholic?</label>
                                    <RadioGroup row className="ml-2">
                                    <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid> */}
                        </Grid>
                    </Container>

                    <Button 
                        type="button" 
                        onClick={addSponsor} 
                        variant="contained" 
                        sx={{color: "#355173", 
                            padding: 0.8,
                            backgroundColor: "white", 
                            float: "right",
                            "&:hover": {
                                backgroundColor: "white", 
                                color: "#355173"
                    }}}>Add Sponsor</Button>

                    <Grid item sx={{ display: 'flex', justifyContent: 'center', marginTop: "5em"}}>
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

export default Wedding