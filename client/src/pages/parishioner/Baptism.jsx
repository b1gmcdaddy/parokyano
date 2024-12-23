import React, { useState, useEffect } from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from "../../assets/imageHeader.jpg";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  TextField,
  MenuItem,
  Grid,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  FormHelperText,
  Box,
} from "@mui/material";
import axios from "axios";
import config from "../../config";
import generateHash from "../../utils/GenerateHash";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ValidateForm from "../../utils/Validators";
import all from "../../components/PaymentModal";
import GCashQR from "../../components/GCashQR";

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

const Baptism = () => {
  const dateToday = new Date().toJSON().slice(0, 10);
  // const [captchaValue, setCaptchaValue] = useState(null);
  const [modalData, setModalData] = useState({});
  const [openCash, setOpenCash] = useState(false);
  const [openGCash, setOpenGCash] = useState(false);
  const [priests, setPriests] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    birth_date: "",
    birth_place: "",
    father_name: "",
    mother_name: "",
    details: {
      gender: "",
      father_age: "",
      mother_age: "",
      isChurchMarried: 3,
      isCivilMarried: 0,
      isLiveIn: 0,
      marriage_date: null,
      marriage_place: "",
      liveIn_years: "",
      birthCert: 0,
      parent_marriageCert: 0,
    },
    address: "",
    contact_no: "",
    preferred_date: "",
    preferred_time: "",
    priest_id: "",
    payment_method: "",
    gcashRefNo: "",
    transaction_no: "",
    service_id: 5,
    sponsors: [
      {
        name: "",
        isCatholic: "",
      },
    ],
    donation: 1600.0,
  });

  useEffect(() => {
    if (
      dayjs(formData.preferred_date).get("day") == 0 &&
      dayjs(formData.preferred_time, "HH:mm:ss").hour() == 6
    ) {
      setFormData((prevState) => ({
        ...prevState,
        donation: 800.0,
      }));
      setFormData((prevState) => ({
        ...prevState,
        service_id: 6,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        donation: 1600.0,
      }));
      setFormData((prevState) => ({
        ...prevState,
        service_id: 5,
      }));
    }
  }, [formData.preferred_date, formData.preferred_time]);

  const getPriests = async () => {
    try {
      const listPriest = await axios.get(`${config.API}/priest/retrieve`, {
        params: { col: "status", val: "active" },
      });
      setPriests(listPriest.data);
    } catch (error) {
      console.error("Error fetching priests:", error);
    }
  };

  const createTransactionNo = async () => {
    try {
      const hash = await generateHash();
      setFormData({
        ...formData,
        transaction_no: `${dateToday}-5-${hash}`,
      });
    } catch (err) {
      console.error("error creating transaction no", err);
    }
  };

  useEffect(() => {
    getPriests();
    createTransactionNo();
  }, []);

  const openQR = () => {
    setOpenGCash(true);
  };

  // const handleCaptchaChange = (value) => {
  //   setCaptchaValue(value);
  // };
  // const isCaptchaChecked = captchaValue !== null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date.format("YYYY-MM-DD") });
  };

  const handleTimeChange = (name, time) => {
    setFormData({ ...formData, [name]: time.format("HH:mm:ss") });
  };

  const handleDetails = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      details: { ...prevState.details, [e.target.name]: e.target.value },
    }));
  };

  const handleGodparentChange = (index, e) => {
    const updatedGodparents = formData.sponsors.map((godparent, i) =>
      i === index
        ? { ...godparent, [e.target.name]: e.target.value }
        : godparent
    );
    setFormData((prevState) => ({
      ...prevState,
      sponsors: updatedGodparents,
    }));
  };

  const handleAddGodparent = () => {
    if (formData.sponsors?.length < 8) {
      setFormData((prevState) => ({
        ...prevState,
        sponsors: [...prevState.sponsors, { name: "", isCatholic: "" }],
      }));
    }
  };

  const cashModalInfo = {
    transaction_no: formData.transaction_no,
    fee: formData.donation,
    requirements: [
      "Photocopy of Birth Certificate",
      "Photocopy of Parent - Marriage Certificate",
    ],
    message:
      formData.payment_method === "cash"
        ? "Note: Kindly go to the parish office during office hours to pay. Please submit the requirements and pay within 2 days to avoid cancellation."
        : "Your request for baptism has been received. Make sure to provide all the requirements to the parish. You will receive a text once your payment has been verified! Thank you and God bless!",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ok!");
    const validate = ValidateForm(formData);
    setErrors(validate);
    console.log(validate);
    if (Object.keys(validate).length == 0 && validate.constructor == Object) {
      try {
        axios.post(`${config.API}/request/create-baptism`, formData);

        setModalData(cashModalInfo);
        setOpenCash(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box sx={containerStyle}>
      <NavParishioner />
      <Header backgroundImage={imageHeader} title="Request for Baptism" />
      <div className="max-w-[1440px] mt-6">
        <Link to="/" className="mt-8 md:mb-10 items-center">
          <FontAwesomeIcon icon={faArrowLeftLong} className="ml-8 md:mr-2" />
          <p className="hidden md:inline">Return to Home</p>
        </Link>
      </div>
      <h1 align="center" className="font-bold text-md font-[Arial] mb-8">
        Please Input the Following:
      </h1>

      <all.CashPaymentModal open={openCash} data={modalData} />
      <GCashQR
        open={openGCash}
        close={() => setOpenGCash(false)}
        service={"baptism"}
      />

      <Container maxWidth="md" sx={{ marginBottom: "50px" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
            <Grid item xs={12} sm={4}>
              <span style={{ color: "red" }}>*</span>
              <label>Child's First Name:</label>
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
            <Grid item xs={12} sm={4}>
              <label>Child's Middle Name:</label>
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
              <span style={{ color: "red" }}>*</span>
              <label>Child's Last Name:</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={inputstlying}
                name="last_name"
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <span style={{ color: "red" }}>*</span>
              <label>Date of Birth:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  fullWidth
                  size="small"
                  variant="outlined"
                  name="birth_date"
                  onChange={(date) => handleDateChange("birth_date", date)}
                  renderInput={(params) => <TextField {...params} required />}
                  sx={inputstlying}
                  disableFuture
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <span style={{ color: "red" }}>*</span>
              <label>Place of Birth:</label>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                sx={inputstlying}
                name="birth_place"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <span style={{ color: "red" }}>*</span>
              <label>Gender:</label>
              <TextField
                fullWidth
                select
                size="small"
                variant="outlined"
                sx={inputstlying}
                name="gender"
                onChange={handleDetails}
                value={formData.details.gender}
                required
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={9}>
              <span style={{ color: "red" }}>*</span>
              <label>Father's Complete Name:</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={inputstlying}
                name="father_name"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <label>Father's Age:</label>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                sx={inputstlying}
                name="father_age"
                onChange={handleDetails}
                size="small"
                required
              />
              {errors.father_age != "" && errors.father_age != null && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.father_age}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={9}>
              <span style={{ color: "red" }}>*</span>
              <label>Mother's Complete Maiden Name:</label>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                sx={inputstlying}
                name="mother_name"
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <label>Mother's Age:</label>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                sx={inputstlying}
                name="mother_age"
                onChange={handleDetails}
                size="small"
                required
              />
              {errors.mother_age != "" && errors.mother_age != null && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.mother_age}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <span style={{ color: "red" }}>*</span>
              <label>Present Address:</label>
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
            <Grid item xs={12} sm={3}>
              <span style={{ color: "red" }}>*</span>
              <label>Contact Number:</label>
              <TextField
                fullWidth
                type="tel"
                variant="outlined"
                sx={inputstlying}
                name="contact_no"
                onChange={handleChange}
                inputProps={{ maxLength: 11 }}
                size="small"
                required
              />
              {errors.contact_no != null && (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.contact_no}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={3}>
              <span style={{ color: "red" }}>*</span>
              <label>Payment Method:</label>
              <TextField
                fullWidth
                select
                variant="outlined"
                size="small"
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                sx={inputstlying}
                required
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="gcash">GCash</MenuItem>
              </TextField>
            </Grid>

            {formData.payment_method == "gcash" ? (
              <Grid item xs={12} sm={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <label>GCash Ref No:</label>
                  <span
                    onClick={openQR}
                    className="cursor-pointer text-sm italic text-blue-800 hover:text-blue-400 hover:scale-105 duration-300"
                  >
                    View QR Code
                  </span>
                </div>
                <TextField
                  name="gcashRefNo"
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={inputstlying}
                  inputProps={{ maxLength: 13 }}
                />
                {errors.gcashRefNo != null && (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.gcashRefNo}
                  </FormHelperText>
                )}
              </Grid>
            ) : null}

            {/*-------------church married, etc? section---------------- */}
            <Grid item xs={5} sm={3}>
              <FormControl component="fieldset">
                <label>Church Married?</label>
                <RadioGroup
                  row
                  name="isChurchMarried"
                  value={formData.details.isChurchMarried}
                  onChange={handleDetails}
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
              </FormControl>
            </Grid>
            {formData.details.isChurchMarried === "1" && (
              <>
                <Grid item xs={12} sm={3} sx={{ marginRight: { md: "15px" } }}>
                  <span style={{ color: "red" }}>*</span>
                  <label>When?</label>
                  <TextField
                    fullWidth
                    type="date"
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="marriage_date"
                    value={formData.details.marriage_date}
                    onChange={handleDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={3} sx={{ marginBottom: "14px" }}>
                  <span style={{ color: "red" }}>*</span>
                  <label>Where?</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="marriage_place"
                    value={formData.details.marriage_place}
                    onChange={handleDetails}
                  />
                </Grid>
              </>
            )}
            {formData.details.isChurchMarried === "0" && (
              <>
                <Grid item xs={5} sm={3}>
                  <FormControl component="fieldset">
                    <label>Civilly Married?</label>
                    <RadioGroup
                      row
                      name="isCivilMarried"
                      value={formData.details.isCivilMarried}
                      onChange={handleDetails}
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
                  </FormControl>
                </Grid>
                {formData.details.isCivilMarried === "0" && (
                  <Grid item xs={5} sm={3}>
                    <FormControl component="fieldset">
                      {/* <span style={{color: "red"}}>*</span> */}
                      <label>Live-in?</label>
                      <RadioGroup
                        row
                        name="isLiveIn"
                        value={formData.details.isLiveIn}
                        onChange={handleDetails}
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
                    </FormControl>
                  </Grid>
                )}
                {formData.details.isLiveIn === "1" && (
                  <Grid item xs={12} sm={3}>
                    <span style={{ color: "red" }}>*</span>
                    <label>How many years?</label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={inputstlying}
                      name="liveIn_years"
                      value={formData.details.liveIn_years}
                      onChange={handleDetails}
                    />
                  </Grid>
                )}
              </>
            )}
          </Grid>

          {/*------------preferrrd sched and priest----------*/}
          <Grid container spacing={2} sx={{ marginBottom: "1.5em" }}>
            <Grid item xs={12} sm={4}>
              <span style={{ color: "red" }}>*</span>
              <label>Preferred Date:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  slotProps={{ textField: { fullWidth: true } }}
                  type="date"
                  variant="outlined"
                  sx={inputstlying}
                  size="small"
                  name="preferred_date"
                  disablePast
                  onChange={(date) => handleDateChange("preferred_date", date)}
                  renderInput={(params) => <TextField {...params} required />}
                  required
                />
                {/* {errors.preferred_date != "" && ( */}
                <FormHelperText sx={{ color: "red" }}>
                  Date must be atleast 2 days from now to allow for processing
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
                  sx={inputstlying}
                  size="small"
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
                size="small"
                variant="outlined"
                sx={inputstlying}
                name="priest_id"
                onChange={handleChange}
                value={formData.priest_id}
                required
              >
                {priests.map((priest) => (
                  <MenuItem key={priest.priestID} value={priest.priestID}>
                    {priest.first_name} {priest.last_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/*---------------------godParents sectiom--------------------------------*/}
          {formData.sponsors.map((godparent, index) => (
            <Grid
              container
              spacing={2}
              key={index}
              sx={{ marginBottom: "6px" }}
            >
              <Grid item xs={12} sm={9}>
                <span style={{ color: "red" }}>*</span>
                <label>{`Godparent ${index + 1}:`}</label>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={inputstlying}
                  name="name"
                  value={godparent.name}
                  onChange={(e) => handleGodparentChange(index, e)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <span style={{ color: "red" }}>*</span>
                <label>Catholic?</label>
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  size="small"
                  sx={inputstlying}
                  name="isCatholic"
                  value={godparent.isCatholic}
                  onChange={(e) => handleGodparentChange(index, e)}
                >
                  <MenuItem value="1">Yes</MenuItem>
                  <MenuItem value="0">No</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          ))}
          {formData.sponsors.length < 8 && (
            <Button
              variant="outlined"
              onClick={handleAddGodparent}
              sx={{ marginBottom: "2em", marginTop: "16px" }}
            >
              {" "}
              Add Godparent
            </Button>
          )}

          <Grid
            item
            sx={{ display: "flex", justifyContent: "center", marginTop: "3em" }}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: "#355173" }}
            >
              Submit Request
            </Button>
          </Grid>
        </form>
      </Container>

      <Footer />
    </Box>
  );
};

export default Baptism;
