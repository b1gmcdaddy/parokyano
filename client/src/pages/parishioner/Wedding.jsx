import NavParishioner from "../../components/NavParishioner";
import Header from "../../components/Header";
import imageHeader from "../../assets/imageHeader.jpg";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import {
  MenuItem,
  Grid,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
  FormHelperText,
  Box,
  Tabs,
  Tab,
  Divider,
  Typography,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import generateHash from "../../utils/GenerateHash";
import config from "../../config";
import axios from "axios";
import NoPaymentModal from "../../components/NoPaymentModal";
import ValidateForm from "../../utils/Validators";

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

const Wedding = () => {
  const [open, setOpen] = useState(false);
  const dateToday = new Date().toJSON().slice(0, 10);
  const [errors, setErrors] = useState({});
  const id = 7;
  const [tabValue, setTabValue] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    wedding_details: {
      firstName: "",
      middleName: "",
      lastName: "",
      isCatholic: null,
    },
    // EXTRA INFO NEEDED FOR MARRAIGE CERT
    groomDetails: {
      groomAddress: "",
      groomBirthDate: "",
      groomBirthPlace: "",
      groomBaptismDate: "",
      groomBaptismPlace: "",
      groomFather: "",
      groomMother: "",
    },
    brideDetails: {
      brideAddress: "",
      brideBirthDate: "",
      brideBirthPlace: "",
      brideBaptismDate: "",
      brideBaptismPlace: "",
      brideFather: "",
      brideMother: "",
    },
    contact_no: "",
    relationship: "", // MARITAL STATUS
    sponsors: [{}, {}, {}, {}],
    transaction_no: "",
    service_id: id,
    donation: 0,
    isParishioner: "",
  });

  const isFormValid = () => {
    const isGroomValid = Object.values(formData.groomDetails).every(
      (value) => value.trim() !== ""
    );
    const isBrideValid = Object.values(formData.brideDetails).every(
      (value) => value.trim() !== ""
    );
    return isGroomValid && isBrideValid;
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMarriageInfo = (e, isGroom) => {
    const { name, value } = e.target;

    if (isGroom) {
      setFormData((prevState) => ({
        ...prevState,
        groomDetails: {
          ...prevState.groomDetails,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        brideDetails: {
          ...prevState.brideDetails,
          [name]: value,
        },
      }));
    }
  };

  useEffect(() => {
    const createTransactionNo = async () => {
      try {
        const hash = await generateHash();
        setFormData({
          ...formData,
          transaction_no: dateToday + id + hash,
        });
      } catch (err) {
        console.error("error creating transaction no", err);
      }
    };
    createTransactionNo();
  }, []);

  var requirements = [];
  if (formData.relationship == "Civilly Married") {
    requirements = [
      "Copy of Birth Certificate",
      "Baptismal Certificate - Marriage Purposes (issued within last 3 months)",
      "Confirmation Certificate - Marriage Purposes (issued within last 3 months)",
      "Photocopy of the Civil Marriage Contract",
    ];
  } else if (formData.relationship == "Live-in for under 4 years") {
    requirements = [
      "Copy of Birth Certificate",
      "Baptismal Certificate - Marriage Purposes (issued within last 3 months)",
      "Confirmation Certificate - Marriage Purposes (issued within last 3 months)",
      "Marriage License",
      "CENOMAR",
      "CEDULA",
    ];
  } else if (formData.relationship == "Live-in for more than 4 years") {
    requirements = [
      "Copy of Birth Certificate",
      "Baptismal Certificate - Marriage Purposes (issued within last 3 months)",
      "Confirmation Certificate - Marriage Purposes (issued within last 3 months)",
      "CENOMAR",
      "CEDULA",
      "Joint Affidavit of Marital Cohabitation",
    ];
  } else if (formData.relationship == "Widow") {
    requirements = [
      "Copy of Birth Certificate",
      "Baptismal Certificate - Marriage Purposes (issued within last 3 months)",
      "Confirmation Certificate - Marriage Purposes (issued within last 3 months)",
      "Marriage License",
      "CENOMAR",
      "CEDULA",
      "Death Certificate of Partner",
    ];
  }

  const modalData = {
    message:
      "Please wait for the parish to communicate for further instructions. You may call us at (032) 346-9560 / +63969-021-7771 to follow-up after 2 days",
    req: requirements,
    transaction_no: formData.transaction_no,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = ValidateForm(formData);
    setErrors(validate);
    if (Object.keys(validate) == 0 && validate.constructor == Object) {
      try {
        await axios.post(`${config.API}/request/create-wedding`, formData);
        setOpen(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSponsor = (e, index, field) => {
    const temp = [...formData.sponsors];
    temp[index][field] = e.target.value;
    setFormData((prevState) => ({ ...prevState, sponsors: temp }));
  };

  const addSponsor = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      sponsors: [
        ...formData.sponsors,
        { name: null, age: null, isMarried: null, isCatholic: null },
      ],
    }));
  };

  const handleWeddingDetails = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      wedding_details: {
        ...formData.wedding_details,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={containerStyle}>
      <NavParishioner />
      <Header backgroundImage={imageHeader} title="Wedding" />
      <div className="max-w-[1440px] mt-6">
        <Link to="/" className="mt-8 md:mb-10 items-center">
          <FontAwesomeIcon icon={faArrowLeftLong} className="ml-8 md:mr-2" />
          <p className="hidden md:inline">Return to Home</p>
        </Link>
      </div>
      <Typography
        sx={{
          fontWeight: "bold",
          marginBottom: "0.5rem",
          textAlign: "center",
        }}
      >
        Kindly Input the Following:
      </Typography>
      <Typography
        sx={{
          fontStyle: "italic",
          fontSize: "12px",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        Note: Make sure to fill up the forms for BOTH GROOM AND BRIDE.
      </Typography>

      <NoPaymentModal open={open} data={modalData} />
      <Container maxWidth="md" sx={{ marginBottom: "4em" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} className="mb-10">
            <Grid item xs={12} sx={{ marginBottom: "1em" }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab
                  value={1}
                  icon={<MaleIcon />}
                  iconPosition="start"
                  label="Groom"
                />
                <Tab
                  value={2}
                  icon={<FemaleIcon />}
                  iconPosition="start"
                  label="Bride"
                />
              </Tabs>
            </Grid>

            {tabValue == 1 && (
              <>
                <Grid item xs={12} sm={4}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>
                    Groom's First Name:
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <label>Groom's Middle Name:</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    value={formData.middle_name}
                    name="middle_name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>
                    Groom's Last Name:
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    value={formData.last_name}
                    name="last_name"
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>Contact
                    Number:
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="contact_no"
                    value={formData.contact_no}
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
                <Grid item xs={12} sm={8}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>
                    Address:
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="groomAddress"
                    value={formData.groomDetails.groomAddress}
                    onChange={(e) => handleMarriageInfo(e, true)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>
                    Date of Birth:
                  </label>
                  <TextField
                    type="date"
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="groomBirthDate"
                    value={formData.groomDetails.groomBirthDate}
                    onChange={(e) => handleMarriageInfo(e, true)}
                    required
                    inputProps={{
                      max: new Date().toISOString().split("T")[0],
                    }}
                  />
                  {errors.groomBirthDate != null && (
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.groomBirthDate}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={8}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>
                    Place of Birth:
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    value={formData.groomDetails.groomBirthPlace}
                    name="groomBirthPlace"
                    onChange={(e) => handleMarriageInfo(e, true)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>
                    Date of Baptism:
                  </label>
                  <TextField
                    fullWidth
                    type="date"
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    value={formData.groomDetails.groomBaptismDate}
                    name="groomBaptismDate"
                    onChange={(e) => handleMarriageInfo(e, true)}
                    required
                    inputProps={{
                      max: new Date().toISOString().split("T")[0],
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>
                    Place of Baptism:
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="groomBaptismPlace"
                    value={formData.groomDetails.groomBaptismPlace}
                    onChange={(e) => handleMarriageInfo(e, true)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>
                    Father's Name:
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="groomFather"
                    value={formData.groomDetails.groomFather}
                    onChange={(e) => handleMarriageInfo(e, true)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>
                    Mother's Name:
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    value={formData.groomDetails.groomMother}
                    name="groomMother"
                    onChange={(e) => handleMarriageInfo(e, true)}
                    required
                  />
                </Grid>
              </>
            )}

            {tabValue == 2 && (
              <>
                <Grid item xs={12} sm={4}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>Bride's
                    First Name:
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="firstName"
                    value={formData.wedding_details.firstName}
                    onChange={handleWeddingDetails}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <label>
                    <span className="text-red-600 font-bold"></span>Bride's
                    Middle Name:
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="middleName"
                    value={formData.wedding_details.middleName}
                    onChange={handleWeddingDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>Bride's
                    Last Name:
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="lastName"
                    value={formData.wedding_details.lastName}
                    onChange={handleWeddingDetails}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>
                    Address:
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="brideAddress"
                    value={formData.brideDetails.brideAddress}
                    onChange={(e) => handleMarriageInfo(e, false)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>
                    Date of Birth:
                  </label>
                  <TextField
                    type="date"
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="brideBirthDate"
                    value={formData.brideDetails.brideBirthDate}
                    onChange={(e) => handleMarriageInfo(e, false)}
                    required
                    inputProps={{
                      max: new Date().toISOString().split("T")[0],
                    }}
                  />
                  {errors.brideBirthDate != null && (
                    <FormHelperText sx={{ color: "red" }}>
                      {errors.brideBirthDate}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={8}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>
                    Place of Birth:
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="brideBirthPlace"
                    value={formData.brideDetails.brideBirthPlace}
                    onChange={(e) => handleMarriageInfo(e, false)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>
                    Date of Baptism:
                  </label>
                  <TextField
                    type="date"
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="brideBaptismDate"
                    value={formData.brideDetails.brideBaptismDate}
                    onChange={(e) => handleMarriageInfo(e, false)}
                    required
                    inputProps={{
                      max: new Date().toISOString().split("T")[0],
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>
                    Place of Baptism:
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="brideBaptismPlace"
                    value={formData.brideDetails.brideBaptismPlace}
                    onChange={(e) => handleMarriageInfo(e, false)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>
                    Father's Name:
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="brideFather"
                    value={formData.brideDetails.brideFather}
                    onChange={(e) => handleMarriageInfo(e, false)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <label>
                    <span className="text-red-600 font-bold">*</span>
                    Mother's Name:
                  </label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={inputstlying}
                    name="brideMother"
                    value={formData.brideDetails.brideMother}
                    onChange={(e) => handleMarriageInfo(e, false)}
                    required
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={4}>
              <label>
                <span className="text-red-600 font-bold">*</span>
                Status:
              </label>
              <TextField
                fullWidth
                select
                size="small"
                variant="outlined"
                sx={inputstlying}
                name="relationship"
                onChange={handleChange}
                value={formData.relationship}
                required
              >
                <MenuItem value="Civilly Married">Civilly Married</MenuItem>
                <MenuItem value="Live-in for under 4 years">
                  Live-in for under 4 years
                </MenuItem>
                <MenuItem value="Live-in for more than 4 years">
                  Live-in for more than 4 years
                </MenuItem>
                <MenuItem value="Widow">Widow</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={12} sx={{ margin: "2" }}>
              <Divider sx={{ padding: 2 }} />
            </Grid>

            <Grid item xs={7} md={3} sx={{ marginTop: 1 }}>
              <FormControl component="fieldset">
                <label>Both Catholic?</label>
                <RadioGroup
                  row
                  name="isCatholic"
                  onChange={handleWeddingDetails}
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
            <Grid item xs={6} md={3} sx={{ marginTop: 1 }}>
              <FormControl component="fieldset">
                <label className="ml-2">Both Parishioners?</label>
                <RadioGroup
                  row
                  className="ml-2"
                  name="isParishioner"
                  value={formData.isParishioner}
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
              </FormControl>
            </Grid>
          </Grid>

          <Container
            maxWidth="md"
            className="bg-neutral-100 md:p-8 rounded-lg mb-5"
          >
            <Grid container spacing={3}>
              {formData.sponsors.map((s, index) => (
                <>
                  <Grid item key={index} xs={9} md={4}>
                    <span style={{ color: "red" }}>*</span>
                    <label>Sponsor's Full Name:</label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={inputstlying}
                      name="name"
                      value={formData.sponsors.name}
                      onChange={(e) => handleSponsor(e, index, "name")}
                      className="bg-white"
                      required
                    />
                  </Grid>
                  <Grid item xs={3} md={2}>
                    <span style={{ color: "red" }}>*</span>
                    <label>Age:</label>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      type="number"
                      sx={inputstlying}
                      name="age"
                      value={formData.sponsors[index]?.age}
                      onChange={(e) => handleSponsor(e, index, "age")}
                      className="bg-white"
                      required
                    />
                    {errors[`sponsor_${index}_age`] && (
                      <FormHelperText sx={{ color: "red" }}>
                        {errors[`sponsor_${index}_age`]}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <span style={{ color: "red" }}>*</span>
                    <label>Marital Status:</label>
                    <TextField
                      fullWidth
                      select
                      size="small"
                      variant="outlined"
                      sx={inputstlying}
                      className="bg-white"
                      name="isMarried"
                      value={formData.sponsors.isMarried}
                      onChange={(e) => handleSponsor(e, index, "isMarried")}
                      required
                    >
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
                        name="isCatholic"
                        value={formData.sponsors.isCatholic}
                        onChange={(e) => handleSponsor(e, index, "isCatholic")}
                        required
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

                  <Grid item xs={12}>
                    <hr className="border-neutral-300 border-[0.1px]" />
                  </Grid>
                </>
              ))}
            </Grid>
          </Container>

          {/* <Button
            type="button"
            onClick={addSponsor}
            variant="contained"
            sx={{
              color: "#355173",
              padding: 0.8,
              backgroundColor: "white",
              float: "right",
              "&:hover": {
                backgroundColor: "white",
                color: "#355173",
              },
            }}>
            Add Sponsor
          </Button> */}

          <Grid
            item
            sx={{ display: "flex", justifyContent: "center", marginTop: "5em" }}
          >
            <Button
              disabled={!isFormValid()}
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

export default Wedding;
