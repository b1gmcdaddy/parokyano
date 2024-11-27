import CloseIcon from "@mui/icons-material/Close";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
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
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import Snackbar from "@mui/material/Snackbar";
import { Skeleton } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import ConfirmationDialog from "../../ConfirmationModal";
import axios from "axios";
import config from "../../../config";
import dayjs from "dayjs";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import sendSMS from "../../../utils/smsService";
import util from "../../../utils/DateTimeFormatter";

const TextFieldStyle = {
  "& .MuiInputBase-root": { height: "30px" },
};

const endTime = (timeString, hoursToAdd) => {
  console.log(timeString, hoursToAdd);
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

const BaptismPending = ({ open, data, handleClose, refreshList }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [available, setAvailable] = useState("");
  const [sponsors, setSponsors] = useState([]);
  const [details, setDetails] = useState({});
  const [priests, setPriests] = useState([]);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [snackBarStyle, setSnackBarStyle] = useState(null);

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
      setService(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const [service2, setService2] = useState(null);
  const fetchService2 = async () => {
    try {
      const response = await axios.get(
        `${config.API}/service/retrieveByParams`,
        {
          params: {
            id: data.service_id == 5 ? 6 : 5,
          },
        }
      );
      setService2(response.data);
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
      return;
    } catch (err) {
      console.error("error retrieving sponsors", err);
    }
  };

  const closeInfoModal = (action) => {
    if (action == "approve") {
      setSuccess({
        message: "Approval Confirmed!",
        details: "The request has successfully been approved.",
      });
      setSnackBarStyle("success");
    } else if (action == "cancel") {
      setSuccess({
        message: "Cancellation Confirmed",
        details: "The request has been cancelled.",
      });
      setSnackBarStyle("info");
    } else {
      setSuccess({
        message: "Update Confirmed",
        details: "The request has been updated",
      });
      setSnackBarStyle("info");
    }
    handleClose();
    refreshList();
  };

  const fetchBaptismDetails = async (id) => {
    try {
      const response = await axios.get(`${config.API}/baptism/retrieve`, {
        params: {
          reqID: id,
        },
      });
      //console.log(response.data);
      setDetails({
        birthCert: response.data.result[0].birthCert,
        parent_marriageCert: response.data.result[0].parent_marriageCert,
        gender: response.data.result[0].gender,
        father_age: response.data.result[0].father_age,
        mother_age: response.data.result[0].mother_age,
        isChurchMarried: response.data.result[0].isChurchMarried,
        isCivilMarried: response.data.result[0].isCivilMarried,
        isLiveIn: response.data.result[0].isLiveIn,
        marriage_date: response.data.result[0].marriage_date?.slice(0, 10),
        marriage_place: response.data.result[0].marriage_place,
        liveIn_years: response.data.result[0].liveIn_years,
      });

      return;
    } catch (err) {
      console.error("error retrieving sponsors", err);
    }
  };

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

  useEffect(() => {
    setIsLoading(true);
    if (open && data) {
      new Promise((resolve) => {
        setFormData({
          // requestID: data.requestID,
          first_name: data.first_name || "",
          middle_name: data.middle_name || "",
          last_name: data.last_name || "",
          birth_date: dayjs(data.birth_date).format("YYYY-MM-DD"),
          contact_no: data.contact_no,
          birth_place: data.birth_place || "",
          // gender: details?.gender || "",
          father_name: data.father_name || "",
          // father_age: details?.father_age || "",
          mother_name: data.mother_name || "",
          // mother_age: details?.mother_age || "",
          payment_method: data.payment_method || "",
          preferred_date: dayjs(data.preferred_date).format("YYYY-MM-DD"),
          preferred_time: data.preferred_time || "",
          priest_id: data.priest_id || "",
          payment_status: data.payment_status || "",
          transaction_no: data.transaction_no || "",
          gcashRefNo: data.gcashRefNo || "",
          donation: data.donation || "",
          service_id: data.service_id || "",
        });
        fetchPriest();
        fetchService();
        fetchService2();
        fetchSponsors(data.requestID);
        fetchBaptismDetails(data.requestID);
        resolve();
      });
    }
    setTimeout(() => {
      setIsLoading(false);
    }, "500");
  }, [open, data]);

  const fetchAvailability = async (date, start, end) => {
    const avail = await axios.get(
      `${config.API}/priest/retrieve-schedule-venue`,
      {
        params: {
          date: date,
          start: start,
          end: end,
          request_id: data.requestID,
        },
      }
    );
    //  console.log(avail.data.message);
    setAvailable(avail.data.message);
  };

  useEffect(() => {
    console.log(details);
  }, [details]);

  useEffect(() => {
    if (formData && service)
      fetchAvailability(
        formData.preferred_date,
        formData.preferred_time,
        formData.end_time
      );
  }, [
    formData?.preferred_date,
    formData?.preferred_time,
    formData?.priest_id,
    service,
    open,
  ]);

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  {
    /** for sameple if success, ari butang backend**/
  }
  const handleConfirm = async (action) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    switch (action) {
      case "approve":
        console.log(formData);
        if (
          dayjs(formData.end_time, "HH:mm:ss").isBefore(
            dayjs(formData.preferred_time, "HH:mm:ss")
          )
        ) {
          setError({
            message: "Invalid Time Range",
            details: "End time cannot be earlier than or equal to start time.",
          });
          return;
        }
        if (formData.end_time === formData.preferred_time) {
          setError({
            message: "Invalid Time Range",
            details: "End time cannot be the same as start time.",
          });
          return;
        }
        try {
          const response = await axios.get(
            `${config.API}/priest/retrieve-schedule-by-params`,
            {
              params: {
                priest: formData.priest_id,
                date: formData.preferred_date,
                start: formData.preferred_time,
                end: formData.end_time,
              },
            }
          );
          console.log(response);
          if (Object.keys(response.data).length > 0 || response.data != "") {
            setError({
              message: response.data.message,
              details: response.data?.details,
            });
            return;
          }
          await Promise.all([
            axios.put(`${config.API}/request/update-bulk`, {
              formData,
              id: data.requestID,
            }),
            axios.put(`${config.API}/baptism/update-bulk`, {
              details,
              id: data.requestID,
            }),
            axios.put(`${config.API}/request/approve-service`, null, {
              params: {
                col: "status",
                val: "approved",
                col2: "payment_status",
                val2: "paid",
                col3: "user_id",
                val3: currentUser.id,
                col4: "priest_id",
                val4: formData.priest_id,
                col5: "requestID",
                val5: data.requestID,
              },
            }),
            console.log("request success!"),

            axios.post(`${config.API}/priest/createPriestSched`, {
              date: dayjs(formData.preferred_date).format("YYYY-MM-DD"),
              activity: `Baptism for ${formData.first_name} ${formData.last_name}`,
              start_time: formData.preferred_time,
              end_time: formData.end_time,
              priest_id: formData.priest_id,
              request_id: data.requestID,
            }),
            console.log("priest sched success!"),

            axios.post(`${config.API}/logs/create`, {
              activity: `Approved Baptism for ${formData.first_name} ${formData.last_name}`,
              user_id: currentUser.id,
              request_id: data.requestID,
            }),
            console.log("logs success!"),
            sendSMS(data.service_id, formData, "approve"),
            closeInfoModal("approve"),
            refreshList(),
          ]);
        } catch (err) {
          console.log("error submitting to server", err);
        } finally {
          refreshList();
        }
        break;
      case "update": /// UPDATE BAPTISM REQUEST/////
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
              activity: `Updated Pending Baptism Request`,
              user_id: currentUser.id,
              request_id: data.requestID,
            });
            closeInfoModal("update");
          }
        } catch (err) {
          console.error("Error updating request", err);
        }
        break;
      case "cancel": //////////// CANCEL BAPTISM REQUEST ////////
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
              activity: `Cancelled Pending Request for Baptism`,
              user_id: currentUser.id,
              request_id: data.requestID,
            }),
            sendSMS(data.service_id, formData, "cancel"),
            closeInfoModal("cancel"),
          ]);
        } catch (err) {
          console.error("error updating request", err);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log("service2", service2);
    console.log("service", service);
    if (
      dayjs(formData?.preferred_date).get("day") == 0 &&
      dayjs(formData?.preferred_time, "HH:mm:ss").hour() == 6
    ) {
      setFormData((prevState) => ({
        ...prevState,
        donation: service2?.serviceID == 6 ? service2?.fee : service?.fee,
      }));
      setFormData((prevState) => ({
        ...prevState,
        service_id: 6,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        donation: service2?.serviceID == 5 ? service2?.fee : service?.fee,
      }));
      setFormData((prevState) => ({
        ...prevState,
        service_id: 5,
      }));
    }
  }, [formData?.preferred_date, formData?.preferred_time]);

  return (
    <>
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          autoHideDuration={5000}
          onClose={() => setError(null)}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            <AlertTitle>{error.message}</AlertTitle>
            {error.details}
          </Alert>
        </Snackbar>
      )}

      {success && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          autoHideDuration={5000}
          onClose={() => setSuccess(null)}
        >
          <Alert severity={snackBarStyle} sx={{ width: "100%" }}>
            <AlertTitle>{success.message}</AlertTitle>
            {success.details}
          </Alert>
        </Snackbar>
      )}

      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        {!isLoading ? (
          <>
            <DialogTitle sx={{ mt: 3, p: 2, textAlign: "center" }}>
              <b>Baptism Request Information</b>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={1} sx={{ padding: 4 }}>
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
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name="birth_date"
                      fullWidth
                      type="date"
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

                <Grid item sm={8}>
                  <label>Father's complete name:</label>
                  <TextField
                    name="father_name"
                    onChange={handleChange}
                    value={formData.father_name}
                    fullWidth
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Age:</label>
                  <TextField
                    value={details?.father_age}
                    name="father_age"
                    onChange={handleDetailsChange}
                    type="number"
                    fullWidth
                    sx={TextFieldStyle}
                  />
                </Grid>

                <Grid item sm={8}>
                  <label>Mother's complete name:</label>
                  <TextField
                    value={formData.mother_name}
                    name="mother_name"
                    onChange={handleChange}
                    fullWidth
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Age:</label>
                  <TextField
                    value={details?.mother_age}
                    name="mother_age"
                    onChange={handleDetailsChange}
                    type="number"
                    fullWidth
                    sx={TextFieldStyle}
                  />
                </Grid>

                <Grid item sm={12} sx={{ marginY: 2 }}>
                  <Grid container spacing={4} sx={{ marginBottom: "20px" }}>
                    <Grid item xs={3} sm={3}>
                      <Typography>Is Church Married?</Typography>
                      <RadioGroup
                        row
                        name="isChurchMarried"
                        sx={{ marginTop: "-5px" }}
                        value={details?.isChurchMarried}
                        readonly
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
                    {details.isChurchMarried == 1 ? (
                      <>
                        <Grid item xs={4} sm={4}>
                          <Typography>Marriage Date</Typography>
                          <TextField
                            value={util.formatDate(details?.marriage_date)}
                            name="marriage_date"
                            readonly
                            fullWidth
                            sx={TextFieldStyle}
                          />
                        </Grid>
                        <Grid item xs={4} sm={4}>
                          <Typography>Place of Marriage</Typography>
                          <TextField
                            value={details?.marriage_place}
                            name="marriage_place"
                            readonly
                            fullWidth
                            sx={TextFieldStyle}
                          />
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item xs={3} sm={3}>
                          <Typography>Is Civilly Married?</Typography>
                          <RadioGroup
                            row
                            name="civil_married"
                            sx={{ marginTop: "-5px" }}
                            value={details?.isCivilMarried}
                            readonly
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
                      </>
                    )}
                    {details.isCivilMarried == 0 &&
                      details.isChurchMarried == 0 && (
                        <>
                          <Grid item xs={3} sm={3}>
                            <Typography>Is Live-in?</Typography>
                            <RadioGroup
                              row
                              name="isLiveIn"
                              sx={{ marginTop: "-5px" }}
                              value={details?.isLiveIn}
                              readonly
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
                        </>
                      )}
                    {details.isLiveIn == 1 && (
                      <>
                        <Grid item xs={3} sm={3}>
                          <Typography>How many years?</Typography>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={inputstlying}
                            name="liveIn_years"
                            value={details?.liveIn_years}
                            readonly
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item sm={8}>
                      <Grid container>
                        <Grid item sm={8}>
                          <Typography variant="subtitle1">
                            <b>Godparents:</b>
                          </Typography>
                        </Grid>
                        <Grid item sm={4}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Catholic?
                          </Typography>
                        </Grid>
                      </Grid>
                      <Box
                        fullWidth
                        sx={{
                          height:
                            formData.payment_method == "cash"
                              ? "90px"
                              : "300px",
                          overflowY: "auto",
                        }}
                      >
                        {/* Ninong */}
                        <Grid container>
                          {sponsors &&
                            sponsors.map((godparent, index) => (
                              <Grid container spacing={2} key={index}>
                                <Grid item sm={0.5}>
                                  <p>{index + 1}.</p>
                                </Grid>
                                <Grid item sm={7}>
                                  <TextField
                                    fullWidth
                                    value={godparent.name}
                                    sx={TextFieldStyle}
                                    name="godparent"
                                  />
                                </Grid>
                                <Grid item sm={4.5}>
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
                      <Box fullWidth>
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
                              control={
                                <Checkbox
                                  name="birthCert"
                                  checked={details?.birthCert === 1}
                                  onChange={(e) =>
                                    handleDetailsChange({
                                      target: {
                                        name: e.target.name,
                                        value: e.target.checked ? 1 : 0,
                                      },
                                    })
                                  }
                                />
                              }
                              label={
                                <Typography sx={{ fontSize: "13px" }}>
                                  Photocopy of Birth Certificate
                                </Typography>
                              }
                            />
                          </Grid>

                          <Grid item sm={12}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="parent_marriageCert"
                                  checked={details?.parent_marriageCert === 1}
                                  onChange={(e) =>
                                    handleDetailsChange({
                                      target: {
                                        name: e.target.name,
                                        value: e.target.checked ? 1 : 0,
                                      },
                                    })
                                  }
                                />
                              }
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
                              ₱{parseFloat(formData.donation).toFixed(2)}
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
                              <MenuItem value="unpaid">unpaid</MenuItem>
                              <MenuItem value="paid">paid</MenuItem>
                            </TextField>
                          </Grid>
                          {formData && formData.payment_method === "gcash" && (
                            <>
                              <Grid item sm={12} sx={{ mt: 1 }}>
                                <Typography variant="subtitle1">
                                  GCash Reference No:
                                </Typography>
                                <TextField
                                  value={formData.gcashRefNo}
                                  name="gcashRefNo"
                                  onChange={handleChange}
                                  fullWidth
                                  sx={TextFieldStyle}
                                  required
                                />
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sm={12}>
                  <hr className="my-1" />
                </Grid>

                <Grid item sm={4}>
                  <label>Priest:</label>
                  <TextField
                    value={formData.priest_id}
                    fullWidth
                    name="priest_id"
                    select
                    onChange={handleChange}
                    sx={TextFieldStyle}
                  >
                    {priests.map((priest) => (
                      <MenuItem key={priest.priestID} value={priest.priestID}>
                        {"Fr. " + priest.first_name + " " + priest.last_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item sm={3}>
                  <label>Date:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      type="date"
                      fullWidth
                      name="preferred_date"
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
                      sx={TextFieldStyle}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item sm={3}>
                  <label>Start Time:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      timeSteps={{ hours: 30, minutes: 30 }}
                      minTime={dayjs().set("hour", 5)}
                      maxTime={dayjs().set("hour", 19)}
                      type="time"
                      fullWidth
                      name="preferred_time"
                      value={
                        formData.preferred_time
                          ? dayjs(formData.preferred_time, "HH:mm:ss")
                          : null
                      }
                      onChange={(time) =>
                        handleTimeChange("preferred_time", time)
                      }
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                      sx={TextFieldStyle}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item sm={3}>
                  <label>End Time:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      timeSteps={{ hours: 30, minutes: 30 }}
                      minTime={dayjs().set("hour", 6)}
                      maxTime={dayjs().set("hour", 19)}
                      type="time"
                      fullWidth
                      name="end_time"
                      value={
                        formData.end_time
                          ? dayjs(formData.end_time, "HH:mm:ss")
                          : null
                      }
                      onChange={(time) => handleTimeChange("end_time", time)}
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                      sx={TextFieldStyle}
                      required
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item sm={2}>
                  {available === "Available" ? (
                    <span className="font-bold text-green-700 text-xs">
                      Church is Available
                    </span>
                  ) : available === "Unavailable" ? (
                    <span className="font-bold text-red-500 text-xs">
                      Church Unavailable
                    </span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog("approve")}
                    fullWidth
                    sx={{
                      backgroundColor: "#355173",
                      gap: 1,
                      height: "30px",
                      fontWeight: "bold",
                      color: "white",
                      "&:hover": { bgcolor: "#4C74A5" },
                    }}
                    disabled={available === "Unavailable"}
                  >
                    <EventAvailableIcon sx={{ fontSize: "1.3em" }} />
                    Assign
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
              </Grid>
            </DialogContent>

            <DialogActions>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    margin: "-40px 0 10px 0",
                    justifyContent: "center",
                    gap: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog("update")}
                    sx={{
                      bgcolor: "#CDAB52",
                      marginTop: "24px",
                      height: "40px",
                      fontWeight: "bold",
                      color: "white",
                      "&:hover": { bgcolor: "#A58228" },
                    }}
                  >
                    UPDATE
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog("cancel")}
                    sx={{
                      bgcolor: "#C34444",
                      marginTop: "24px",
                      height: "40px",
                      fontWeight: "bold",
                      color: "white",
                      "&:hover": { bgcolor: "#f44336" },
                    }}
                  >
                    CANCEL
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </>
        ) : (
          // Skeleton loading effect for the entire form
          <Grid container spacing={2} sx={{ padding: 4 }}>
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
      </Dialog>
      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        action={currentAction}
        onConfirm={handleConfirm}
        service={"baptism"}
      />
    </>
  );
};

export default BaptismPending;
