import React, {useState, useEffect} from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogContent,
  Grid,
  Select,
  MenuItem,
  Typography,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import config from "../config";
import dayjs from "dayjs";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import Snackbar from "@mui/material/Snackbar";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import formatDate from "../utils/DateTimeFormatter";

const TextFieldStyle = {
  "& .MuiInputBase-root": {height: "40px"},
};

const AddSchedulesModal = ({open, close}) => {
  const [priests, setPriests] = useState([]);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    activity: "",
    start_time: "",
    end_time: "",
    priest_id: "",
  });

  const handleDateChange = (name, date) => {
    setFormData({...formData, [name]: date.format("YYYY-MM-DD")});
  };

  const handleTimeChange = (name, time) => {
    setFormData({...formData, [name]: time.format("HH:mm:ss")});
  };

  const handleClose = () => {
    setError(null);
    window.location.reload();
  };

  useEffect(() => {
    const fetchPriest = async () => {
      try {
        const response = await axios(`${config.API}/priest/retrieve`, {
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
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const addSchedule = async () => {
    try {
      const response = await axios.get(
        `${config.API}/priest/retrieve-schedule-by-params`,
        {
          params: {
            priest: formData.priest_id,
            date: formData.date,
            start: formData.start_time,
            end: formData.end_time,
          },
        }
      );

      if (
        response.data &&
        (Object.keys(response.data).length > 0 || response.data !== "")
      ) {
        setError({
          message: "Schedule conflict detected",
          details: "Please select another time range.",
        });
      } else {
        try {
          axios.post(`${config.API}/priest/createPriestSched`, formData);

          setFormData({
            date: "",
            activity: "",
            start_time: "",
            end_time: "",
            priest_id: "",
          });
          setSnackbarOpen(true);
        } catch (err) {
          console.error("Error adding schedule", err);
          setError({
            message: "Error adding schedule",
            details: err.message,
          });
        }
      }
    } catch (err) {
      console.error("Error retrieving schedule", err);
      setError({
        message: "Schedule conflict detected",
        details: "Please select another time range.",
      });
    }
  };

  return (
    <>
      {snackbarOpen && (
        <Snackbar
          sx={{backgroundColor: "white"}}
          open={true}
          autoHideDuration={5000}
          message={
            <>
              <span style={{fontWeight: "bold", fontSize: "18px"}}>
                Schedule successfully added!
              </span>
            </>
          }
        />
      )}

      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>
          <Box sx={{display: "flex", justifyContent: "center", gap: 2}}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                margin: "5px",
              }}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}>
                Add New Activity
              </Typography>

              <Grid container spacing={2} sx={{padding: "0px 8px"}}>
                <Grid item xs={12} sm={12}>
                  <label>Select Priest: </label>
                  <Select
                    labelId="demo-simple-select-label"
                    fullWidth
                    name="priest_id"
                    size="small"
                    value={formData.priest_id}
                    onChange={handleChange}
                    id="demo-simple-select">
                    {priests.map((priest) => (
                      <MenuItem key={priest.priestID} value={priest.priestID}>
                        {priest.first_name} {priest.last_name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <label>Activity: </label>
                  <TextField
                    fullWidth
                    size="small"
                    name="activity"
                    value={formData.activity}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <label>Date: </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{textField: {fullWidth: true}}}
                      variant="outlined"
                      size="small"
                      sx={TextFieldStyle}
                      name="date"
                      disablePast
                      onChange={(date) => handleDateChange("date", date)}
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                      required
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <label>Start Time: </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      slotProps={{textField: {fullWidth: true}}}
                      variant="outlined"
                      sx={TextFieldStyle}
                      name="start_time"
                      onChange={(time) => handleTimeChange("start_time", time)}
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                      timeSteps={{hours: 30, minutes: 30}} // if mabuang, delete hours
                      minTime={dayjs().set("hour", 7)}
                      maxTime={dayjs().set("hour", 20)}
                      required
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <label>End Time: </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      slotProps={{textField: {fullWidth: true}}}
                      variant="outlined"
                      sx={TextFieldStyle}
                      name="end_time"
                      onChange={(time) => handleTimeChange("end_time", time)}
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                      timeSteps={{hours: 30, minutes: 30}} // if mabuang, delete hours
                      minTime={dayjs().set("hour", 7)}
                      maxTime={dayjs().set("hour", 20)}
                      required
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              {error && (
                <Typography sx={{textAlign: "center", color: "red"}}>
                  {error.message}.&nbsp;{error.details}
                </Typography>
              )}

              <DialogActions>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "18px",
                  }}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "20px",
                    }}>
                    <Button
                      variant="contained"
                      sx={{backgroundColor: "#355173"}}
                      onClick={addSchedule}>
                      Add Activity
                    </Button>
                    <Button
                      sx={{backgroundColor: "#D9D9D9", color: "black"}}
                      onClick={handleClose}>
                      Close
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

const EditSchedulesModal = ({open, close, activity, priestList}) => {
  if (!activity) {
    return null;
  }

  const [editedActivity, setEditedActivity] = useState(activity);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setEditedActivity(activity);
  }, [activity]);

  const handleDateChange = (date) => {
    setEditedActivity({...editedActivity, date: date.format("YYYY-MM-DD")});
  };

  const handleTimeChange = (name, time) => {
    setEditedActivity({...editedActivity, [name]: time.format("HH:mm:ss")});
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEditedActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setError(null);
    close();
  };

  const updateSchedule = async () => {
    try {
      const formattedDate = dayjs(editedActivity.date).format("YYYY-MM-DD");
      const updatedActivity = {
        ...editedActivity,
        date: formattedDate,
      };
      const response = await axios.put(
        `${config.API}/priest/editSched/${editedActivity.scheduleID}`,
        updatedActivity
      );
      setSnackbarOpen(true);
      close();
    } catch (err) {
      console.error("Error updating schedule:", err);
      setError({
        message: "Error updating schedule",
        details: err.response?.data?.error || err.message,
      });
    }
  };

  return (
    <>
      {snackbarOpen && (
        <Snackbar
          sx={{backgroundColor: "white"}}
          open={true}
          autoHideDuration={5000}
          message={
            <span style={{fontWeight: "bold", fontSize: "18px"}}>
              Schedule successfully updated!
            </span>
          }
        />
      )}

      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>
          <Box sx={{display: "flex", justifyContent: "center", gap: 2}}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                margin: "5px",
              }}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}>
                Edit Activity
              </Typography>

              <Grid container spacing={2} sx={{padding: "0px 8px"}}>
                <Grid item xs={12}>
                  <label>Select Priest: </label>
                  <Select
                    labelId="demo-simple-select-label"
                    fullWidth
                    name="priest_id"
                    size="small"
                    value={editedActivity.priest_id}
                    onChange={handleChange}
                    id="demo-simple-select">
                    {priestList.map((priest) => (
                      <MenuItem key={priest.priestID} value={priest.priestID}>
                        {priest.first_name} {priest.last_name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={12}>
                  <label>Activity: </label>
                  <TextField
                    fullWidth
                    size="small"
                    name="activity"
                    value={editedActivity.activity}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <label>Date: </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{textField: {fullWidth: true}}}
                      variant="outlined"
                      size="small"
                      sx={TextFieldStyle}
                      disablePast
                      value={dayjs(editedActivity.date)}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                      required
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <label>Start Time: </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      slotProps={{textField: {fullWidth: true}}}
                      variant="outlined"
                      sx={TextFieldStyle}
                      name="start_time"
                      value={dayjs(editedActivity.start_time, "HH:mm:ss")}
                      onChange={(time) => handleTimeChange("start_time", time)}
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                      timeSteps={{hours: 1, minutes: 30}}
                      minTime={dayjs().set("hour", 7)}
                      maxTime={dayjs().set("hour", 20)}
                      required
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <label>End Time: </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      slotProps={{textField: {fullWidth: true}}}
                      variant="outlined"
                      sx={TextFieldStyle}
                      name="end_time"
                      value={dayjs(editedActivity.end_time, "HH:mm:ss")}
                      onChange={(time) => handleTimeChange("end_time", time)}
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                      timeSteps={{hours: 1, minutes: 30}}
                      minTime={dayjs().set("hour", 7)}
                      maxTime={dayjs().set("hour", 20)}
                      required
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              {error && (
                <Typography sx={{textAlign: "center", color: "red"}}>
                  {error.message}.&nbsp;{error.details}
                </Typography>
              )}

              <DialogActions>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "18px",
                  }}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "20px",
                    }}>
                    <Button
                      variant="contained"
                      sx={{backgroundColor: "#355173"}}
                      onClick={updateSchedule}>
                      Edit
                    </Button>
                    <Button
                      sx={{backgroundColor: "#D9D9D9", color: "black"}}
                      onClick={handleClose}>
                      Close
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default {AddSchedulesModal, EditSchedulesModal};
