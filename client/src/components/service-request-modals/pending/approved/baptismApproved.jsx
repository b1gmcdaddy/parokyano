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
  Paper,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import ConfirmationDialog from "../../../ConfirmationModal";
import axios from "axios";
import config from "../../../../config";
import dayjs from "dayjs";
import util from "../../../../utils/DateTimeFormatter";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "md",
  bgcolor: "white",
  borderRadius: "10px",
  boxShadow: 3,
  px: 4,
  py: 2,
  maxHeight: "97vh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

const modalContentStyle = {
  overflowY: "auto",
  flexGrow: 1,
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

const TextFieldStyle = {
  "& .MuiInputBase-root": { height: "30px" },
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

const BaptismApproved = ({ open, data, handleClose }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service, setService] = useState({});
  const [sponsors, setSponsors] = useState([]);
  const [approver, setApprover] = useState({});
  const [available, setAvailable] = useState("");
  const [details, setDetails] = useState({});
  const [priests, setPriests] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    birth_date: "",
    birth_place: "",
    father_name: "",
    mother_name: "",
    payment_method: "",
    preferred_date: "",
    preferred_time: "",
    priest_id: "",
    payment_status: "",
    transaction_no: "",
  });

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

  useEffect(() => {
    if (open && data) {
      setFormData({
        first_name: data.first_name || "",
        middle_name: data.middle_name || "",
        last_name: data.last_name || "",
        birth_date: dayjs(data.birth_date).format("YYYY-MM-DD"),
        birth_place: data.birth_place || "",
        father_name: data.father_name || "",
        mother_name: data.mother_name || "",
        payment_method: data.payment_method || "",
        preferred_date: dayjs(data.preferred_date).format("YYYY-MM-DD"),
        preferred_time: data.preferred_time || "",
        priest_id: data.priest_id || "",
        payment_status: data.payment_status || "",
        transaction_no: data.transaction_no || "",
      });
    }
  }, [open, data]);

  const fetchSponsors = async (id) => {
    try {
      const response = await axios.get(`${config.API}/sponsor/retrieve`, {
        params: {
          reqID: id,
        },
      });
      setSponsors(response.data.result);
      console.log(response.data.result);
      return;
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
      setDetails({
        birthCert: response.data.result[0].birthCert,
        parent_marriageCert: response.data.result[0].parent_marriageCert,
        gender: response.data.result[0].gender,
        father_age: response.data.result[0].father_age,
        mother_age: response.data.result[0].mother_age,
      });

      return;
    } catch (err) {
      console.error("error retrieving sponsors", err);
    }
  };

  const fetchUser = async (id, setApprover) => {
    try {
      const response = await axios.get(`${config.API}/user/retrieve`, {
        params: {
          id: id,
        },
      });
      console.log(response.data[0]);
      if (response.status === 200) {
        setApprover(response.data[0]);
      }
    } catch (err) {
      console.log(err);
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
    fetchUser(data.user_id, setApprover);
  }, [open, data]);

  const fetchAvailability = async (date, start, end) => {
    const avail = await axios.get(
      `${config.API}/priest/retrieve-schedule-venue`,
      {
        params: {
          date: date,
          start: start,
          end: end,
        },
      }
    );
    console.log(avail.data.message);
    setAvailable(avail.data.message);
  };

  useEffect(() => {
    fetchAvailability(
      formData.preferred_date,
      formData.preferred_time,
      endTime(formData.preferred_time, service.duration)
    );
  }, [
    formData.preferred_date,
    formData.preferred_time,
    formData.priest_id,
    open,
  ]);

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
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
    setFormData({ ...formData, [name]: time.format("HH:mm:ss") });
  };

  const handleDetailsChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleConfirm = async (action) => {
    switch (action) {
      case "update": ////// UPDATE DETAILS
        try {
          const res = await axios.put(`${config.API}/request/update-bulk`, {
            formData,
            id: data.requestID,
          });

          if (res.status !== 200) {
            setError({
              message: res.data.message,
              details: res.data?.details,
            });
          } else {
            console.log("request updated!");
            await axios.post(`${config.API}/logs/create`, {
              activity: `Updated Baptism Request - Transaction number: ${data.transaction_no}`,
              user_id: 1,
              request_id: data.requestID,
            });
            window.location.reload();
          }
        } catch (err) {
          console.error("Error updating request", err);
        }
        break;

      case "cancel": ////// CANCEL
        try {
          await axios.put(`${config.API}/request/update`, null, {
            params: {
              col: "status",
              val: "cancelled",
              id: data.requestID,
            },
          });

          console.log("request cancelled!");

          await Promise.all([
            axios.delete(`${config.API}/priest/deleteSched`, {
              params: {
                col: "request_id",
                val: data.requestID,
              },
            }),
            axios.post(`${config.API}/logs/create`, {
              activity: `Cancelled Baptism Request - Transaction number: ${data.transaction_no}`,
              user_id: 1,
              request_id: data.requestID,
            }),
          ]);
        } catch (err) {
          console.error("Error cancelling request", err);
        }
        break;

      case "reschedule": ////// RESCHEDULE
        try {
          const response = await axios.get(
            `${config.API}/priest/retrieve-schedule-by-params`,
            {
              params: {
                priest: formData.priest_id,
                date: formData.preferred_date,
                start: formData.preferred_time,
                end: endTime(formData.preferred_time, service.duration),
              },
            }
          );

          if (Object.keys(response.data).length > 0 || response.data !== "") {
            setError({
              message: response.data.message,
              details: response.data?.details,
            });
            return;
          }

          const reschedule = {
            preferred_date: formData.preferred_date,
            preferred_time: formData.preferred_time,
            priest_id: formData.priest_id,
          };

          await axios.put(`${config.API}/request/update-bulk`, {
            formData: reschedule,
            id: data.requestID,
          });

          await Promise.all([
            axios.put(`${config.API}/priest/reschedule`, {
              date: formData.preferred_date,
              activity: `Baptism for ${formData.first_name} ${formData.last_name}`,
              start_time: formData.preferred_time,
              end_time: endTime(formData.preferred_time, service.duration),
              priest_id: formData.priest_id,
              request_id: data.requestID,
            }),
            axios.post(`${config.API}/logs/create`, {
              activity: `Rescheduled Baptism for ${formData.first_name} ${formData.last_name}`,
              user_id: 1,
              request_id: data.requestID,
            }),
            // sendSMS(data.service_id, formData, "reschedule"),
            //  window.location.reload(),
          ]);
        } catch (err) {
          console.error("Error rescheduling request", err);
        }
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        {formData && sponsors && priests && details && formData ? (
          <Box sx={modalStyle}>
            <Box sx={{ position: "sticky", paddingBottom: "10px" }}>
              <Grid container justifyContent={"flex-end"}>
                <Grid item>
                  <IconButton onClick={handleClose} size="small">
                    <FontAwesomeIcon icon={faXmark} />
                  </IconButton>
                </Grid>
                <Grid item sm={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Baptism Request Information
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box sx={modalContentStyle}>
              <Grid container justifyContent={"center"} spacing={0.8}>
                <Grid item sm={4}>
                  <label>First name of child:</label>
                  <TextField
                    fullWidth
                    sx={TextFieldStyle}
                    value={formData.first_name}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Middle name of child:</label>
                  <TextField
                    fullWidth
                    sx={TextFieldStyle}
                    value={formData.middle_name}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Last name of child:</label>
                  <TextField
                    fullWidth
                    sx={TextFieldStyle}
                    value={formData.last_name}
                  />
                </Grid>

                <Grid item sm={4}>
                  <label>Date of birth:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name="birth_date"
                      fullWidth
                      sx={TextFieldStyle}
                      value={
                        formData.birth_date ? dayjs(formData.birth_date) : null
                      }
                      onChange={(birth_date) =>
                        handleDateChange("birth_date", birth_date)
                      }
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item sm={4}>
                  <label>Place of brith:</label>
                  <TextField
                    fullWidth
                    sx={TextFieldStyle}
                    name="birth_place"
                    value={formData.birth_place}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Gender:</label>
                  <TextField
                    value={details?.gender}
                    fullWidth
                    name="gender"
                    select
                    onChange={handleDetailsChange}
                    sx={TextFieldStyle}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                </Grid>

                <Grid item sm={9}>
                  <label>Father's complete name:</label>
                  <TextField
                    fullWidth
                    sx={TextFieldStyle}
                    name="father_name"
                    value={formData.father_name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item sm={3}>
                  <label>Age:</label>
                  <TextField
                    fullWidth
                    sx={TextFieldStyle}
                    name="father_age"
                    value={details.father_age}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item sm={9}>
                  <label>Mother's complete name:</label>
                  <TextField
                    fullWidth
                    sx={TextFieldStyle}
                    name="mother_name"
                    value={formData.mother_name}
                    onChange={handleDetailsChange}
                  />
                </Grid>
                <Grid item sm={3}>
                  <label>Age:</label>
                  <TextField
                    fullWidth
                    sx={TextFieldStyle}
                    name="mother_age"
                    value={details.mother_age}
                    onChange={handleDetailsChange}
                  />
                </Grid>

                <Grid item sm={12}>
                  <Grid container spacing={2}>
                    <Grid item sm={8}>
                      <Grid container>
                        <Grid item sm={8}>
                          <Typography variant="subtitle1">
                            Godparents:
                          </Typography>
                        </Grid>
                        <Grid item sm={4}>
                          <Typography variant="subtitle1">Catholic?</Typography>
                        </Grid>
                      </Grid>
                      <Box
                        fullWidth
                        sx={{ height: "150px", overflowY: "auto" }}
                      >
                        {" "}
                        {/* Ninong */}
                        <Grid container>
                          {sponsors.map((godparent, index) => (
                            <Grid container spacing={2} key={index}>
                              <Grid item sm={0.7}>
                                <p>{index + 1}.</p>
                              </Grid>
                              <Grid item sm={6.3}>
                                <TextField
                                  fullWidth
                                  value={godparent.name}
                                  sx={TextFieldStyle}
                                />
                              </Grid>
                              <Grid item sm={5}>
                                <RadioGroup
                                  row
                                  defaultValue={godparent.isCatholic}
                                  value={godparent.isCatholic}
                                  sx={{ marginTop: "-7px" }}
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
                      <Box fullWidth sx={{ height: "40px" }}>
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
                              value={"cash"}
                              sx={TextFieldStyle}
                            />
                          </Grid>
                          <Grid item sm={6}>
                            <TextField fullWidth select sx={TextFieldStyle}>
                              <MenuItem
                                value={"Unpaid"}
                                sx={{ fontWeight: "bold", color: "#950000" }}
                              >
                                Unpaid
                              </MenuItem>
                              <MenuItem
                                value={"Paid"}
                                sx={{ fontWeight: "bold", color: "#247E38" }}
                              >
                                Paid
                              </MenuItem>
                            </TextField>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <hr className="my-3" />
                </Grid>

                <Grid item xs={12} sm={2.8}>
                  <label>Selected Priest:</label>
                  <TextField
                    value={formData.priest_id}
                    size="small"
                    name="priest_id"
                    sx={TextFieldStyle}
                    onChange={handleChange}
                    select
                    fullWidth
                  >
                    {priests.map((priest) => (
                      <MenuItem key={priest.priestID} value={priest.priestID}>
                        {priest.first_name + " " + priest.last_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={2.3}>
                  <label>Selected Date:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                      fullWidth
                      sx={TextFieldStyle}
                      value={
                        formData.preferred_date
                          ? dayjs(formData.preferred_date)
                          : null
                      }
                      onChange={(date) =>
                        handleDateChange("preferred_date", date)
                      }
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={2.3}>
                  <label>Selected Time:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      fullWidth
                      sx={TextFieldStyle}
                      value={
                        data.preferred_time
                          ? dayjs(data.preferred_time, "HH:mm:ss")
                          : null
                      }
                      onChange={(time) =>
                        handleTimeChange("preferred_time", time)
                      }
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={2.2}>
                  <label>Church:</label>
                  <TextField
                    value={available}
                    sx={TextFieldStyle}
                    size="small"
                    name="priest_id"
                  />
                </Grid>
                <Grid item xs={12} sm={2} sx={{ margin: "auto" }}>
                  <Button
                    onClick={() => handleOpenDialog("reschedule")}
                    sx={{
                      bgcolor: "#247E38",
                      marginTop: "24px",
                      height: "30px",
                      fontWeight: "bold",
                      color: "white",
                      "&:hover": { bgcolor: "#578A62" },
                    }}
                  >
                    Reschedule
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <label>Venue:</label>
                  <TextField
                    fullWidth
                    size="small"
                    sx={TextFieldStyle}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <label>Transaction Number:</label>
                  <Paper
                    elevation={1}
                    sx={{
                      height: "30px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "#d1d1d1",
                      fontWeight: "bold",
                    }}
                  >
                    {data.transaction_no}
                  </Paper>
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
            </Box>
            <ConfirmationDialog
              open={dialogOpen}
              onClose={handleCloseDialog}
              action={currentAction}
              onConfirm={handleConfirm}
              service={"Baptism"}
            />
          </Box>
        ) : (
          // Skeleton loading effect for the entire form
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Skeleton variant="text" width="80%" height={30} />
            </Grid>
            {[...Array(9)].map((_, index) => (
              <Grid item sm={4} key={index}>
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Grid>
            ))}
            <Grid item sm={12} sx={{ mt: 2 }}>
              <Skeleton variant="rectangular" width="30%" height={40} />
            </Grid>
            <Grid item sm={12} sx={{ mt: 1 }}>
              <Skeleton variant="text" width="50%" height={30} />
              <Skeleton variant="rectangular" width="100%" height={150} />
            </Grid>
            <Grid item sm={12} sx={{ mt: 2 }}>
              <Skeleton variant="rectangular" width="30%" height={40} />
              <Skeleton
                variant="rectangular"
                width="30%"
                height={40}
                sx={{ ml: 2 }}
              />
            </Grid>
          </Grid>
        )}
      </Modal>
    </>
  );
};

export default BaptismApproved;
