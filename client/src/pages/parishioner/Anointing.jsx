import React, { useState, useEffect } from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from "../../assets/imageHeader.jpg";
import Header from "../../components/Header";
import {
  Container,
  Grid,
  RadioGroup,
  TextField,
  FormControlLabel,
  Radio,
  MenuItem,
  FormHelperText,
  Box,
} from "@mui/material";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import generateHash from "../../utils/GenerateHash";
import axios from "axios";
import config from "../../config";
import NoPaymentModal from "../../components/NoPaymentModal";
import {
  DatePicker,
  LocalizationProvider,
  TimeField,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ValidateForm from "../../utils/Validators";

const inputstlying = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      boxShadow: "0 3px 2px rgba(0,0,0,0.1)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#355173",
      borderWidth: "0.5px",
    },
    height: "40px",
  },
};

const Anointing = () => {
  const id = 12;
  const [captchaValue, setCaptchaValue] = useState(null);
  const [open, setOpen] = useState(false);
  const dateToday = new Date().toJSON().slice(0, 10);
  const [priestList, setPriestList] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    age: "",
    contact_no: "",
    requested_by: "",
    address: "",
    relationship: "",
    patient_status: "",
    preferred_date: "",
    preferred_time: "",
    preferred_priest: "",
    isParishioner: "",
    transaction_no: "",
    service_id: id,
  });

  const createTransactionNo = async () => {
    try {
      const hash = await generateHash();
      setFormData({
        ...formData,
        transaction_no: `${dateToday}-${id}-${hash}`,
      });
    } catch (err) {
      console.error("error creating transaction no", err);
    }
  };

  useEffect(() => {
    const fetchPriest = async () => {
      try {
        const response = await axios.get(`${config.API}/priest/retrieve`, {
          params: {
            col: "status",
            val: "active",
          },
        });
        setPriestList(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPriest();
    createTransactionNo();
  }, []);

  const modalData = {
    message:
      "Please wait for the parish to verify if the requested date and time is possible. We will communicate with you once the request has been approved. Please copy the transaction code above to track the status of your request.",
    req: null,
    transaction_no: formData.transaction_no,
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const validate = ValidateForm(formData);
    setErrors(validate);
    if (Object.keys(validate) == 0 && validate.constructor == Object) {
      try {
        axios.post(`${config.API}/request/create-anointing`, formData);
        setOpen(true);
        console.log("success!");
      } catch (err) {
        console.log("error submitting to server", err);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date.format("YYYY-MM-DD") });
    console.log(formData.preferred_date);
  };

  const handleTimeChange = (name, time) => {
    setFormData({ ...formData, [name]: time.format("HH:mm:ss") });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const isCaptchaChecked = captchaValue !== null;

  return (
    <>
      <NavParishioner />
      <Header backgroundImage={imageHeader} title="ANNOINTING OF THE SICK" />
      <div className="max-w-[1440px] mt-6">
        <Link to="/" className="mt-8 md:mb-10 items-center">
          <FontAwesomeIcon icon={faArrowLeftLong} className="ml-8 md:mr-2" />
          <p className="hidden md:inline">Return to Home</p>
        </Link>
      </div>

      <h1 align="center" className="font-bold text-md font-[Arial] mb-8">
        Please input the following
      </h1>

      <NoPaymentModal open={open} data={modalData} />

      <Container maxWidth="lg" sx={{ marginBottom: "50px" }}>
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <span style={{ color: "red" }}>*</span>
              <label>Name: (of the person to be annointed)</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={inputstlying}
                name="first_name"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={3} sm={1}>
              <span style={{ color: "red" }}>*</span>
              <label>Age:</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                type="number"
                sx={inputstlying}
                name="age"
                onChange={handleChange}
                required
              />
              {errors.age != null && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.age}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={9} sm={3}>
              <span style={{ color: "red" }}>*</span>
              <label>Contact Number:</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={inputstlying}
                name="contact_no"
                inputProps={{ maxLength: 11 }}
                onChange={handleChange}
                required
              />
              {errors.contact_no != null && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.contact_no}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <span style={{ color: "red" }}>*</span>
              <label>Requested By:</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={inputstlying}
                name="requested_by"
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <span style={{ color: "red" }}>*</span>
              <label>Address:</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={inputstlying}
                name="address"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <span style={{ color: "red" }}>*</span>
              <label>Relationship:</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={inputstlying}
                name="relationship"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <span style={{ color: "red" }}>*</span>
              <label>Patient Status:</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={inputstlying}
                name="patient_status"
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <span style={{ color: "red" }}>*</span>
              <label>Preferred Date:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  slotProps={{ textField: { fullWidth: true } }}
                  variant="outlined"
                  size="small"
                  sx={inputstlying}
                  name="preferred_date"
                  disablePast
                  onChange={(date) => handleDateChange("preferred_date", date)}
                  renderInput={(params) => <TextField {...params} required />}
                  required
                />
                {/* {errors.preferred_date != null && ( */}
                <FormHelperText sx={{ color: "red" }}>
                  Date must be atleast 2 days from today to allow for processing
                  time
                </FormHelperText>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <span style={{ color: "red" }}>*</span>
              <label>Preferred Time:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  slotProps={{ textField: { fullWidth: true } }}
                  variant="outlined"
                  size="small"
                  sx={inputstlying}
                  name="preferred_time"
                  onChange={(time) => handleTimeChange("preferred_time", time)}
                  renderInput={(params) => <TextField {...params} required />}
                  timeSteps={{ hours: 30, minutes: 30 }} // if mabuang, delete hours
                  minTime={dayjs().set("hour", 5)}
                  maxTime={dayjs().set("hour", 18)}
                  required
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
              <span style={{ color: "red" }}>*</span>
              <label>Preferred Priest:</label>
              <TextField
                fullWidth
                select
                variant="outlined"
                size="small"
                sx={inputstlying}
                name="preferred_priest"
                onChange={handleChange}
                required
              >
                {priestList.map((priest, index) => (
                  <MenuItem key={index} value={priest.priestID}>
                    {"Fr. " + priest.first_name + " " + priest.last_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid
              item
              xs={6}
              sm={2}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-start" },
              }}
            >
              <label>Are you a Parishioner?</label>
            </Grid>
            <Grid item xs={6} sm={3}>
              <RadioGroup
                row
                sx={{
                  marginTop: "-6px",
                  display: "flex",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
                name="isParishioner"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio size="small" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="0"
                  control={<Radio size="small" />}
                  label="No"
                />
              </RadioGroup>
            </Grid>
            <Grid
              item
              xs={12}
              sm={7}
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-end" },
              }}
            >
              <p>
                <p style={{ fontWeight: "bold", display: "inline" }}>Note: </p>
                Please pick up the priest
              </p>
            </Grid>
          </Grid>
          <div className="mt-[3rem] flex justify-center">
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
              onClick={handlesubmit}
              type="button"
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

export default Anointing;
