import React, { useState, useEffect } from "react";
import NavParishioner from "../../../components/NavParishioner";
import imageHeader from "../../../assets/imageHeader.jpg";
import Header from "../../../components/Header";
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
  IconButton,
  FormHelperText
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "../../../components/Footer";
import config from "../../../config";
import axios from "axios";
import generateHash from "../../../utils/GenerateHash";
import all from "../../../components/PaymentModal";
import ValidateForm from "../../../utils/Validators";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const inputstlying = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      boxShadow: "0 3px 2px rgba(0,0,0,0.1)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#355173",
      borderWidth: "0.5px",
    },
  },
};

const Souls = () => {
  const id = 1;
  const [schedule, setSchedule] = useState({ slots: ["00:00:00"] });
  const dateToday = new Date().toJSON().slice(0, 10);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [modalData, setModalData] = useState({});
  const [openCash, setOpenCash] = useState(false);
  const [openGCash, setOpenGCash] = useState(false);
  const hash = dateToday + generateHash().slice(0,20);
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    intention_details: [''],
    offered_by: "",
    preferred_date: null,   // DO NOT alter or delete!
    mass_date: "",
    mass_time: "",
    payment_method: "",
    donation_amount: "",
    contact_no: "",
    type: "Souls",
    transaction_no: hash,
    service_id: id,
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          `${config.API}/service/retrieve-schedule`,
          {
            params: {
              id: id,
              date: formData.mass_date,
            },
          }
        );
        setSchedule(response.data);
      } catch (err) {
        console.error("error retrieving schedules", err);
      }
    };
    fetchSchedule();
  }, [formData.mass_date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validate = ValidateForm(formData)
    setErrors(validate)
    if(Object.keys(validate).length === 0 && validate.constructor === Object){
      try {
        console.log('success')
        await axios.post(`${config.API}/request/create-intention`, formData);
        const paymentInfo = {
          transaction_no: formData.transaction_no,
          fee: formData.donation_amount,
          requirements: null,
          message:
            "Note: Please go to the parish office during office hours to give your donation. Thank you and God bless!",
        };
        setModalData(paymentInfo);
        if (formData.payment_method === "cash") {
          setOpenCash(true);
        } else {
          setOpenGCash(true);
        }
      } catch (err) {
        console.error("error submitting data", err);
      }
    }
  };

  const handleSouls = (index, e) => {
    const temp = formData.intention_details.map((name, i) => {
      if (i === index) {
        return e.target.value;
      }
      return name;
    });
    setFormData(prevState => ({ ...prevState, intention_details: temp }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, date) => {
    setFormData({...formData, [name]: date});
  };

  const addMoreSouls = () => {
    setFormData(prevState => ({
      ...prevState,
      intention_details: [...prevState.intention_details, ''],
    }));
  };

   const removeSoul = (index) => {
    const temp = formData.intention_details.filter((_, i) => i !== index);
    setFormData({ ...formData, intention_details: temp });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const isCaptchaChecked = captchaValue !== null;

  return (
    <>
      <NavParishioner />
      <Header backgroundImage={imageHeader} title="MASS INTENTION - SOULS" />
      <Link
        to="/mass-intention-select"
        className="max-w-[1440px] mx-auto mt-8 md:mb-6 md:flex items-center"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} className="ml-8 md:mr-2" />
        <span className="xs:hidden md:flex">Return to Selection</span>
      </Link>
      <h1 align="center" className="font-bold text-md font-[Arial] mb-8">
        Please input the following
      </h1>

      <all.CashPaymentModal open={openCash} data={modalData} />
      <all.GCashPaymentModal open={openGCash} data={modalData} />

      <Container maxWidth="md" sx={{ marginBottom: "50px" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <label>For the souls of:</label>
              {formData.intention_details.map((name, index) => (
                <TextField
                  key={index}
                  type="text"
                  fullWidth
                  sx={inputstlying}
                  variant="outlined"
                  size="small"
                  value={name}
                  onChange={(e) => handleSouls(index, e)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          color="secondary"
                          onClick={() => removeSoul(index)}
                        >
                          <FontAwesomeIcon icon={faMinus} className="text-sm text-red-700"/>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  style={{ marginBottom: "1rem" }}
                />
              ))}
              <Button type="button" onClick={addMoreSouls} variant="outlined" sx={{float: "right",}}> Add Soul</Button>
            </Grid>

            <Grid item xs={12} sm={4}>
              <label>Offered by:</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={inputstlying}
                name="offered_by"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <label>Mass Date:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    fullWidth
                    variant="outlined"
                    disablePast
                    size="small"
                    sx={inputstlying}
                    name="mass_date"
                    onChange={(date) => handleDateChange('mass_date', date)}
                    renderInput={(params) => <TextField {...params} required />}
                    required
                  />
              </LocalizationProvider>
              {errors.mass_date != null && (
                  <FormHelperText sx={{color: 'red'}}>{errors.mass_date}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <label>Time Slot:</label>
              <TextField
                fullWidth
                select
                variant="outlined"
                size="small"
                sx={inputstlying}
                name="mass_time"
                onChange={handleChange}
                value={formData.mass_time}
                required
              >
                {schedule.slots.map((time, index) => (
                  <MenuItem value={time} key={index}>
                    {time}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <label>Contact Number:</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={inputstlying}
                name="contact_no"
                onChange={handleChange}
                inputProps={{maxLength: 11}}
                required
              />
              {errors.contact_no != null && (
                <FormHelperText sx={{color: 'red'}}>{errors.contact_no}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <label>Payment Method:</label>
              <TextField
                fullWidth
                select
                variant="outlined"
                size="small"
                sx={inputstlying}
                name="payment_method"
                onChange={handleChange}
                value={formData.payment_method}
                required
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="gcash">GCash</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <label>Donation Amount:</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={inputstlying}
                name="donation_amount"
                onChange={handleChange}
                required
              />
              {errors.amount != null && (
                <FormHelperText sx={{color: 'red'}}>{errors.amount}</FormHelperText>
              )}
            </Grid>
          </Grid>
          <div className="mt-[4rem] flex justify-center">
            <ReCAPTCHA
              sitekey="6LeCEPMpAAAAANAqLQ48wTuNOGmTPaHcMxJh4xaJ"
              onChange={handleCaptchaChange}
            />
          </div>
          <div className="mt-[1rem] flex justify-center">
            <button
              className={`text-white py-3 px-3 font-medium shadow-sm rounded-md ${
                isCaptchaChecked ? "bg-[#355173]" : "bg-[#868686]"
              }`}
              disabled={!isCaptchaChecked}
              type="submit"
            >
              SUBMIT REQUEST
            </button>
          </div>
        </form>
      </Container>
      <Footer />
    </>
  );
};

export default Souls;
