import React, { useEffect, useState } from "react";
import NavParishioner from "../../../components/NavParishioner";
import imageHeader from "../../../assets/imageHeader.jpg";
import Header from "../../../components/Header";
import {
  Container,
  Grid,
  RadioGroup,
  TextField,
  FormControlLabel,
  Radio,
  Menu,
  MenuItem,
  FormHelperText,
  Box,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Footer from "../../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import generateHash from "../../../utils/GenerateHash";
import config from "../../../config";
import NoPaymentModal from "../../../components/NoPaymentModal";
import axios from "axios";
import ValidateForm from "../../../utils/Validators";

const containerStyle = {
  margin: "0px",
  padding: "0px",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  minWidth: "100%",
};

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

const FuneralMass = () => {
  const id = 11;
  const dateToday = new Date().toJSON().slice(0, 10);
  const [open, setOpen] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [priestList, setPriestList] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: null, // in the case of outside mass, this is the field for the celebration/celebrator
    address: null,
    contact_no: null,
    requested_by: null, // this is the field for the contact person's name
    relationship: null,
    preferred_date: null,
    preferred_time: null,
    preferred_priest: null, // value is the  priest id
    isParishioner: null,
    transaction_no: "",
    service_id: id,
    type: null,
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
      "Please wait for the parish to verify if the requested date and time is approved. We will communicate with you once the request has been approved and for other purposes.",
    req: null,
    transaction_no: formData.transaction_no,
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const validate = ValidateForm(formData);
    setErrors(validate);
    if (Object.keys(validate) == 0 && validate.constructor == Object) {
      try {
        axios.post(`${config.API}/request/create-mass`, formData);
        setOpen(true);
      } catch (err) {
        console.error("error submitting to server", err);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date.format("YYYY-MM-DD") });
  };

  const handleTimeChange = (name, time) => {
    setFormData({ ...formData, [name]: time.format("HH:mm:ss") });
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const isCaptchaChecked = captchaValue !== null;

  return (
    <Box sx={containerStyle}>
      <NavParishioner />
      <Header backgroundImage={imageHeader} title="FUNERAL MASS" />
      <Link
        to="/mass-selection"
        className="max-w-[1440px] mt-8 md:mb-6 md:flex items-center"
      >
        <FontAwesomeIcon icon={faArrowLeftLong} className="ml-8 md:mr-2" />
        <p className="xs:hidden md:flex">Return to mass selection</p>
      </Link>
      <h1 align="center" className="font-bold text-md font-[Arial] mb-8">
        Please input the following
      </h1>

      <NoPaymentModal open={open} data={modalData} />

      <Container maxWidth="lg" sx={{ marginBottom: "50px" }}>
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <span style={{ color: "red" }}>*</span>
              <label>Name of the deceased:</label>
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
            <Grid item xs={12} sm={6}>
              <span style={{ color: "red" }}>*</span>
              <label>Contact Number:</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={inputstlying}
                inputProps={{ maxLength: 11 }}
                name="contact_no"
                onChange={handleChange}
                required
              />
              {errors.contact_no != null && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.contact_no}
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <span style={{ color: "red" }}>*</span>
              <label>Requested by:</label>
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
            <Grid item xs={12} sm={6}>
              <span style={{ color: "red" }}>*</span>
              <label>Relationship to the deceased:</label>
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

            <Grid item xs={12} sm={3}>
              <span style={{ color: "red" }}>*</span>
              <label>Preferred Date:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  slotProps={{ textField: { fullWidth: true } }}
                  variant="outlined"
                  size="small"
                  sx={inputstlying}
                  disablePast
                  name="preferred_date"
                  onChange={(date) => handleDateChange("preferred_date", date)}
                  renderInput={(params) => <TextField {...params} required />}
                  required
                />
              </LocalizationProvider>
              {/* {errors.preferred_date != null && ( */}
              <FormHelperText sx={{ color: "red" }}>
                Date must be atleast 2 days from today to allow for processing
                time
              </FormHelperText>
              {/* )} */}
            </Grid>
            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={6}>
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
                    {priest.first_name + " " + priest.last_name}
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
              <span style={{ color: "red" }}>*</span>
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
    </Box>
  );
};

export default FuneralMass;
