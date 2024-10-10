import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Modal,
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Menu,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import Snackbar from "@mui/material/Snackbar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import ConfirmationDialog from "../../ConfirmationModal";
import axios from "axios";
import config from "../../../config";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "md",
  bgcolor: "white",
  borderRadius: "10px",
  boxShadow: 3,
  px: 4,
  py: 3,
  maxHeight: "97vh",
  overflowY: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

const TextFieldStyle = {
  "& .MuiInputBase-root": { height: "30px" },
};

const TextFieldStyleDis = {
  "& .MuiInputBase-root": { height: "30px" },
  bgcolor: "#D9D9D9",
};

const endTime = (timeString, hoursToAdd) => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  let newHours = hours + Math.floor(hoursToAdd);
  let newMinutes = minutes + (hoursToAdd % 1) * 60;

  newHours += Math.floor(newMinutes / 60);
  newMinutes = newMinutes % 60;

  return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

const BaptismPending = ({ open, data, handleClose }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service, setService] = useState({});
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [sponsors, setSponsors] = useState([]);
  const [details, setDetails] = useState({});
  const [priests, setPriests] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    birth_date: "",
    birth_place: "",
    gender: "",
    father_name: "",
    father_age: "",
    mother_name: "",
    mother_age: "",
    payment_method: "",
    preferred_date: "",
    preferred_time: "",
    preferred_priest: "",
    godparents: [],
    payment_status: "",
    transaction_no: "",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date.format("YYYY-MM-DD") });
    console.log(formData.preferred_date);
  };

  const handleTimeChange = (name, time) => {
    setFormData({ ...formData, [name]: time.format("HH-mm-ss") });
  };

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const fetchService = async () => {
    try {
      const response = await axios.get(
        `${config.API}/service/retrieveByParams`,
        {
          params: {
            id: data.service_id,
          },
        }
      );
      console.log(response.data);
      setService(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSponsors = async (id) => {
    try {
      const response = await axios.get(`${config.API}/sponsor/retrieve`, {
        params: {
          reqID: id,
        },
      });
      setSponsors(response.data.result);
      return response.data;
    } catch (err) {
      console.error("error retrieving sponsors", err);
    }
  };

  const fetchBaptismDetails = async (id) => {
    try {
      const response = await axios.get(`${config.API}/baptism/retrieve`, {
        params: {
          reqID: id,
        },
      });
      setDetails(response.data.result[0]);
      return response.data;
    } catch (err) {
      console.error("error retrieving sponsors", err);
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
        setPriests(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPriest();
    fetchService();
    fetchSponsors(data.requestID);
    fetchBaptismDetails(data.requestID);
  }, [open]);

  useEffect(() => {
    if (open && data) {
      setFormData({
        requestID: data.requestID,
        first_name: data.first_name || "",
        middle_name: data.middle_name || "",
        last_name: data.last_name || "",
        birth_date: formatDate(data.birth_date),
        birth_place: data.birth_place || "",
        gender: details.gender,
        father_name: data.father_name || "",
        father_age: details.father_age || "",
        mother_name: data.mother_name || "",
        mother_age: details.mother_age || "",
        payment_method: data.payment_method || "",
        preferred_date: formatDate(data.preferred_date),
        preferred_time: data.preferred_time || "",
        preferred_priest: data.priest_id || "",
        payment_status: data.payment_status || "",
        transaction_no: data.transaction_no || "",
        birthCert: details?.birthCert,
        parent_marriageCert: details?.parent_marriageCert,
      });
    }
  }, [open, data, details]);

  useEffect(() => {
    console.log(details);
  }, [details]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  {
    /** for sameple if success, ari butang backend**/
  }
  const handleConfirm = async (action) => {
    switch (action) {
      case "approve":
        console.log(formData);
        try {
          const response = await axios.get(
            `${config.API}/priest/retrieve-schedule-by-params`,
            {
              params: {
                priest: formData.preferred_priest,
                date: formData.preferred_date,
                start: formData.preferred_time,
                end: endTime(formData.preferred_time, service.duration),
              },
            }
          );
          console.log(response);
          if (Object.keys(response.data).length > 0 || response.data != "") {
            setError({
              message: response.data.message,
              details: response.data?.details,
            });
          } else {
            axios.put(`${config.API}/request/approve-service`, null, {
              params: {
                col: "status",
                val: "approved",
                col2: "payment_status",
                val2: "paid",
                col3: "preferred_date",
                val3: formData.preferred_date,
                col4: "priest_id",
                val4: formData.preferred_priest,
                col5: "requestID",
                val5: formData.requestID,
              },
            });
            console.log("request success!");
            axios.post(`${config.API}/priest/createPriestSched`, {
              date: formData.preferred_date,
              activity: `${formData.type} at ${formData.address}`,
              start_time: formData.preferred_time,
              end_time: endTime(formData.preferred_time, service.duration),
              priest_id: formData.preferred_priest,
            });
            console.log("priest sched success!");
            handleClose();
          }
        } catch (err) {
          console.log("error submitting to server", err);
        }
        break;
      case "update":
        alert("Update action confirmed.");
        break;
      case "cancel":
        alert("Cancel action confirmed.");
        break;
      default:
        break;
    }
  };

  return (
    <>
      {error && (
        <Snackbar
          open={true}
          autoHideDuration={5000}
          onClose={() => setError(null)}
          message={
            <>
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                {error.message}
              </span>
              <p>{error.details}</p>
            </>
          }
        />
      )}

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <IconButton onClick={handleClose} size="small">
                <FontAwesomeIcon icon={faXmark} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"} spacing={0.8}>
            <Grid item sm={12}>
              <Typography
                variant="subtitle1"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                Baptism Request Information
              </Typography>
            </Grid>
            <Grid item sm={4}>
              <label>First name of child:</label>
              <TextField
                value={formData.first_name}
                fullWidth
                name="first_name"
                onChange={handleChange}
                sx={TextFieldStyle}
              />
            </Grid>
            <Grid item sm={4}>
              <label>Middle name of child:</label>
              <TextField
                name="middle_name"
                onChange={handleChange}
                value={formData.middle_name}
                fullWidth
                sx={TextFieldStyle}
              />
            </Grid>
            <Grid item sm={4}>
              <label>Last name of child:</label>
              <TextField
                name="last_name"
                onChange={handleChange}
                value={formData.last_name}
                fullWidth
                sx={TextFieldStyle}
              />
            </Grid>

            <Grid item sm={4}>
              <label>Date of Birth:</label>
              <TextField
                name="birth_date"
                fullWidth
                type="date"
                sx={TextFieldStyle}
                value={
                  formData.preferred_date
                    ? dayjs(formData.preferred_date)
                    : null
                }
                onChange={(birth_date) =>
                  handleDateChange("birth_date", birth_date)
                }
                renderInput={(params) => <TextField {...params} required />}
              />
            </Grid>
            <Grid item sm={4}>
              <label>Place of brith:</label>
              <TextField
                name="birth_place"
                onChange={handleChange}
                value={formData.birth_place}
                fullWidth
                sx={TextFieldStyle}
              />
            </Grid>
            <Grid item sm={4}>
              <label>Gender:</label>
              <TextField
                value={formData.gender}
                fullWidth
                name="gender"
                select
                onChange={handleChange}
                sx={TextFieldStyle}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </Grid>

            <Grid item sm={9}>
              <label>Father's complete name:</label>
              <TextField
                name="father_name"
                onChange={handleChange}
                value={formData.father_name}
                fullWidth
                sx={TextFieldStyle}
              />
            </Grid>
            {/* <Grid item sm={3}>
              <label>Age:</label>
              <TextField
                value={formData.father_age}
                name="father_age"
                onChange={handleChange}
                type="number"
                fullWidth
                sx={TextFieldStyle}
              />
            </Grid> */}

            <Grid item sm={9}>
              <label>Mother's complete name:</label>
              <TextField
                value={formData.mother_name}
                name="mother_name"
                onChange={handleChange}
                fullWidth
                sx={TextFieldStyle}
              />
            </Grid>
            {/* <Grid item sm={3}>
              <label>Age:</label>
              <TextField
                value={formData.mother_age}
                name="mother_age"
                onChange={handleChange}
                type="number"
                fullWidth
                sx={TextFieldStyle}
              />
            </Grid> */}

            <Grid item sm={12}>
              <Grid container spacing={2}>
                <Grid item sm={8}>
                  <Grid container>
                    <Grid item sm={8}>
                      <Typography variant="subtitle1">Godparents:</Typography>
                    </Grid>
                    <Grid item sm={4}>
                      <Typography variant="subtitle1">Catholic?</Typography>
                    </Grid>
                  </Grid>
                  <Box fullWidth sx={{ height: "175px", overflowY: "auto" }}>
                    {" "}
                    {/* Ninong */}
                    <Grid container>
                      {sponsors &&
                        sponsors.map((godparent, index) => (
                          <Grid container spacing={2} key={index}>
                            <Grid item sm={0.7}>
                              <p>{index + 1}.</p>
                            </Grid>
                            <Grid item sm={6.3}>
                              <TextField
                                fullWidth
                                value={godparent.name}
                                sx={TextFieldStyle}
                                name="godparent"
                              />
                            </Grid>
                            <Grid item sm={5}>
                              <RadioGroup
                                row
                                defaultValue={godparent.isCatholic}
                                sx={{ marginTop: "-7px" }}
                                value={godparent.isCatholic}
                              >
                                <FormControlLabel
                                  value="1"
                                  control={<Radio />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value="0"
                                  control={<Radio />}
                                  label="No"
                                />
                              </RadioGroup>
                            </Grid>
                          </Grid>
                        ))}
                    </Grid>
                  </Box>
                </Grid>
                <Grid item sm={4}>
                  <Box fullWidth sx={{ height: "175px" }}>
                    <Grid container>
                      <Grid item sm={12}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          Requirements:
                        </Typography>
                      </Grid>
                      <Grid item sm={12}>
                        <FormControlLabel
                          control={<Checkbox />}
                          label={
                            <Typography sx={{ fontSize: "13px" }}>
                              Photocopy of Birth Certificate
                            </Typography>
                          }
                        />
                      </Grid>
                      <Grid item sm={12}>
                        <FormControlLabel
                          control={<Checkbox />}
                          label={
                            <Typography sx={{ fontSize: "13px" }}>
                              Photocopy of Parent - Marriage Certificate
                            </Typography>
                          }
                        />
                      </Grid>
                      <Grid item sm={12}>
                        <Typography
                          variant="subtitle1"
                          sx={{ display: "inline-block" }}
                        >
                          Payment:
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "bold",
                            display: "inline-block",
                            marginLeft: "10px",
                          }}
                        >
                          800
                        </Typography>
                      </Grid>
                      <Grid item sm={6}>
                        <TextField
                          fullWidth
                          name="payment_method"
                          onChange={handleChange}
                          value={formData.payment_method}
                          sx={TextFieldStyle}
                          select
                        >
                          <MenuItem value="cash">Cash</MenuItem>
                          <MenuItem value="gcash">Gcash</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item sm={6}>
                        <TextField
                          value={formData.payment_status}
                          name="payment_status"
                          onChange={handleChange}
                          fullWidth
                          select
                          sx={TextFieldStyle}
                        >
                          <MenuItem value="unpaid">Unpaid</MenuItem>
                          <MenuItem value="paid">Paid</MenuItem>
                        </TextField>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item sm={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ flex: 0.1, height: "1px", backgroundColor: "black" }}
                />
                <div>
                  <p
                    style={{
                      width: "80px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Preferred
                  </p>
                </div>
                <div
                  style={{ flex: 1, height: "1px", backgroundColor: "black" }}
                />
              </div>
            </Grid>

            <Grid item sm={2.5}>
              <label>Priest:</label>
              <TextField
                value={formData.preferred_priest}
                fullWidth
                name="preferred_priest"
                select
                onChange={handleChange}
                sx={TextFieldStyle}
              >
                {priests.map((priest) => (
                  <MenuItem key={priest.priestID} value={priest.priestID}>
                    {priest.first_name + " " + priest.last_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item sm={3}>
              <label>Date:</label>
              <TextField
                type="date"
                fullWidth
                name="preferred_date"
                value={
                  formData.preferred_date
                    ? dayjs(formData.preferred_date)
                    : null
                }
                onChange={(date) => handleDateChange("preferred_date", date)}
                renderInput={(params) => <TextField {...params} required />}
                sx={TextFieldStyle}
              />
            </Grid>
            <Grid item sm={2.7}>
              <label>Time:</label>
              <TextField
                type="time"
                fullWidth
                name="preferred_time"
                value={
                  formData.preferred_time
                    ? dayjs(formData.preferred_time, "HH:mm:ss")
                    : null
                }
                onChange={(time) => handleTimeChange("preferred_time", time)}
                renderInput={(params) => <TextField {...params} required />}
                sx={TextFieldStyle}
              />
            </Grid>
            <Grid item sm={1.8}>
              <label>Venue:</label>
              <TextField disabled fullWidth sx={TextFieldStyle} />
            </Grid>
            <Grid item sm={2}>
              <Button
                onClick={() => handleOpenDialog("approve")}
                fullWidth
                sx={{
                  backgroundColor: "#355173",
                  marginTop: "24px",
                  height: "30px",
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": { bgcolor: "#4C74A5" },
                }}
              >
                Assign
              </Button>
            </Grid>

            <Grid item sm={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ flex: 0.1, height: "1px", backgroundColor: "black" }}
                />
                <div>
                  <p
                    style={{
                      width: "80px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Assigned
                  </p>
                </div>
                <div
                  style={{ flex: 1, height: "1px", backgroundColor: "black" }}
                />
              </div>
            </Grid>

            <Grid item sm={2.5}>
              <label>Priest:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis} />
            </Grid>
            <Grid item sm={3}>
              <label>Date:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis} />
            </Grid>
            <Grid item sm={2.7}>
              <label>Time:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis} />
            </Grid>
            <Grid item sm={1.8}>
              <label>Venue:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis} />
            </Grid>
            <Grid item sm={2}>
              <Button
                fullWidth
                sx={{
                  bgcolor: "#BBB6B6",
                  marginTop: "24px",
                  height: "30px",
                  fontWeight: "bold",
                  color: "#355173",
                  "&:hover": { bgcolor: "#D3CECE" },
                }}
              >
                CLEAR
              </Button>
            </Grid>

            <Grid
              item
              sm={12}
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Typography variant="body2" sx={{ marginRight: "5px" }}>
                Transaction Code:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {formData.transaction_no}
              </Typography>
            </Grid>

            <Grid
              item
              sm={12}
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => handleOpenDialog("update")}
                sx={{
                  bgcolor: "#CDAB52",
                  marginTop: "14px",
                  height: "35px",
                  width: "90px",
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": { bgcolor: "#F0CA67" },
                }}
              >
                UPDATE
              </Button>
              <Button
                onClick={() => handleOpenDialog("cancel")}
                sx={{
                  bgcolor: "#C34444",
                  margin: "14px 0px 0px 5px",
                  height: "35px",
                  width: "90px",
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": { bgcolor: "#F05A5A" },
                }}
              >
                CANCEL
              </Button>
            </Grid>
          </Grid>
          <ConfirmationDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            action={currentAction}
            onConfirm={handleConfirm}
            service={"baptism"}
          />
        </Box>
      </Modal>
    </>
  );
};

export default BaptismPending;
