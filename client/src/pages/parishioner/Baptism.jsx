import React, { useState } from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from '../../assets/imageHeader.jpg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faXmark  } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { TextField, MenuItem, Grid, Container, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import zIndex from "@mui/material/styles/zIndex";

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

  const [moreGodparents, setMoreGodparents] = useState(false);
  const [churchMarried, setChurchMarried] = useState('');
  const [civilMarried, setCivilMarried] = useState('');
  const [liveIn, setLiveIn] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value)
  }
  const isCaptchaChecked = captchaValue !== null;

  const handleChurchMarriedChange = (event) => {
    setChurchMarried(event.target.value);
  };

  const handleCivilMarriedChange = (event) => {
    setCivilMarried(event.target.value);
  };

  const handleLiveInChange = (event) => {
    setLiveIn(event.target.value);
  };

  const addMoreGodparents = () => {
      setMoreGodparents(true);
    }

  const handleClose = () => {
    setMoreGodparents(false);
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
        <form>
          <Grid container spacing={2}>
    
            <Grid item xs={12} sm={4}>
              <label>Child's First Name:</label>
              <TextField fullWidth variant="outlined" size="small" sx={inputstlying} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <label>Child's Middle Name:</label>
              <TextField fullWidth variant="outlined" size="small" sx={inputstlying} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <label>Child's Last Name:</label>
              <TextField fullWidth variant="outlined" size="small" sx={inputstlying} required />
            </Grid>
           
            <Grid item xs={12} sm={3}>
              <label>Date of Birth:</label>
              <TextField fullWidth type="date" size="small" variant="outlined" sx={inputstlying} InputLabelProps={{ shrink: true }} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Place of Birth:</label>
              <TextField fullWidth size="small" variant="outlined" sx={inputstlying} required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <label>Gender:</label>
              <TextField fullWidth select size="small" variant="outlined" sx={inputstlying} required>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={9}>
              <label>Father's Complete Name:</label>
              <TextField fullWidth variant="outlined" size="small" sx={inputstlying} required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <label>Father's Age:</label>
              <TextField fullWidth type="number" variant="outlined" sx={inputstlying} size="small" required />
            </Grid>
            <Grid item xs={12} sm={9}>
              <label>Mother's Complete Maiden Name:</label>
              <TextField fullWidth variant="outlined" size="small" sx={inputstlying} required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <label>Mother's Age:</label>
              <TextField fullWidth type="number" variant="outlined" sx={inputstlying} size="small" required />
            </Grid>
            <Grid item xs={12} sm={9}>
              <label>Present Address:</label>
              <TextField fullWidth variant="outlined" size="small" sx={inputstlying} required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <label>Contact Number:</label>
              <TextField fullWidth type="tel" variant="outlined" sx={inputstlying} size="small" required />
            </Grid>
            </Grid>

            {/*-------------church married, etc? section---------------- */}
            <Grid container sx={{marginTop:'20px', marginBottom:'20px', bgcolor:'#E8E8E8', padding:'20px'}}>
            <Grid item xs={4} sm={2}>
              <FormControl component="fieldset">
                <label>Church Married?</label>
                <RadioGroup row value={churchMarried} onChange={handleChurchMarriedChange}>
                  <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
                {churchMarried == 'yes' && (
                  <>
                    <Grid item xs={12} sm={5}>
                      <label>When?</label>
                      <TextField fullWidth variant="outlined" size="small" sx={inputstlying} />
                    </Grid>
                    <Grid item xs={12} sm={5} sx={{marginBottom:'14px'}}>
                      <label>Where?</label>
                      <TextField fullWidth variant="outlined" size="small" sx={inputstlying} />
                    </Grid>
                  </>
                )}
                {churchMarried == 'no' && (
                  <>
                    <Grid item xs={4} sm={2}>
                      <FormControl component="fieldset">
                        <label>Civilly Married?</label>
                        <RadioGroup row value={civilMarried} onChange={handleCivilMarriedChange}>
                          <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                          <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                        {civilMarried == 'no' && (
                          <Grid item xs={4} sm={2}>
                            <FormControl component="fieldset">
                              <label>Live-in?</label>
                              <RadioGroup row value={liveIn} onChange={handleLiveInChange}>
                                <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                              </RadioGroup>
                            </FormControl>
                          </Grid>
                        )}
                            {liveIn == 'yes' && (
                              <Grid item xs={12} sm={6} sx={{marginBottom:''}}>
                                <label>How many years?</label>
                                <TextField fullWidth variant="outlined" size="small" sx={inputstlying} />
                              </Grid>
                            )}
                  </>
                )}
            </Grid>


                {/*------------preferrrd sht----------*/}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <label>Preferred Date:</label>
                <TextField fullWidth type="date" select variant="outlined" sx={inputstlying} size="small" required />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Preferred Time:</label>
                <TextField fullWidth type="time" select variant="outlined" sx={inputstlying} size="small" required />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Preferred Priest:</label>
                <TextField fullWidth variant="outlined" select size="small" sx={inputstlying} required />
              </Grid>
              <Grid item xs={12}>
                <label>Payment Method:</label>
                <TextField fullWidth select variant="outlined" size="small" sx={inputstlying} required>
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="gcash">GCash</MenuItem>
                </TextField>
              </Grid>

            {/*-------------godparents sectioon ---------------*/}
              <Grid item xs={12} sm={4}>
                <label>Godparent 1:</label>
                <TextField fullWidth variant="outlined" size="small" sx={inputstlying} required />
              </Grid>
              <Grid item xs={12} sm={2} >
                <FormControl component="fieldset">
                <label>Catholic?</label>
                    <RadioGroup row>
                      <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Godparent 2:</label>
                <TextField fullWidth variant="outlined" size="small" sx={inputstlying} required />
              </Grid>
              <Grid item xs={12} sm={2} >
                <FormControl component="fieldset">
                <label>Catholic?</label>
                    <RadioGroup row>
                      <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Godparent 3:</label>
                <TextField fullWidth variant="outlined" size="small" sx={inputstlying} required />
              </Grid>
              <Grid item xs={12} sm={2} >
                <FormControl component="fieldset">
                <label>Catholic?</label>
                    <RadioGroup row>
                      <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Godparent 4:</label>
                <TextField fullWidth variant="outlined" size="small" sx={inputstlying} />
              </Grid>
              <Grid item xs={12} sm={2} >
                <FormControl component="fieldset">
                <label>Catholic?</label>
                    <RadioGroup row>
                      <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    </RadioGroup>
                </FormControl>
              </Grid>

              {
                moreGodparents ?
                <>
                <Grid item xs={12} sm={4}>
                <label>Godparent 5:</label>
                <TextField fullWidth variant="outlined" size="small" sx={inputstlying} required />
              </Grid>
              <Grid item xs={12} sm={2} >
                <FormControl component="fieldset">
                <label>Catholic?</label>
                    <RadioGroup row>
                      <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Godparent 6:</label>
                <TextField fullWidth variant="outlined" size="small" sx={inputstlying} required />
              </Grid>
              <Grid item xs={12} sm={2} >
                <FormControl component="fieldset">
                <label>Catholic?</label>
                    <RadioGroup row>
                      <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Godparent 7:</label>
                <TextField fullWidth variant="outlined" size="small" sx={inputstlying} required />
              </Grid>
              <Grid item xs={12} sm={2} >
                <FormControl component="fieldset">
                <label>Catholic?</label>
                    <RadioGroup row>
                      <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Godparent 8:</label>
                <TextField fullWidth variant="outlined" size="small" sx={inputstlying} required />
              </Grid>
              <Grid item xs={12} sm={2} >
                <FormControl component="fieldset">
                <label>Catholic?</label>
                    <RadioGroup row>
                      <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                    </RadioGroup>
                </FormControl>
              </Grid>
              </>
              :
              null
              }
          </Grid>
            
          <div className="mt-[1rem] flex">
            <h1 className="text-[#355173] font-medium underline cursor-pointer mr-6" onClick={addMoreGodparents}>ADD GODPARENTS</h1>
            {
              moreGodparents ?
              <h1 className="text-red-700 font-medium cursor-pointer" onClick={handleClose}>
                <FontAwesomeIcon icon={faXmark}/> CLOSE</h1>
              :
              null
            }
          </div>

          <div className="mt-[3rem] flex justify-center">
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
}

export default Baptism;
