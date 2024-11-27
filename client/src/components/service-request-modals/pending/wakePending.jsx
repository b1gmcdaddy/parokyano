import CloseIcon from "@mui/icons-material/Close";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Grid,
  Typography,
  IconButton,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import ConfirmationDialog from "../../ConfirmationModal";
import axios from "axios";
import config from "../../../config";
import dayjs from "dayjs";
import sendSMS from "../../../utils/smsService";

const TextFieldStyle = {
  "& .MuiInputBase-root": { height: "40px" },
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

const WakePending = ({ open, data, handleClose, refreshList }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service, setService] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [snackBarStyle, setSnackBarStyle] = useState(null);
  const [priests, setPriests] = useState([]);
  const [formData, setFormData] = useState({
    requestID: "",
    first_name: "", // full name ni sa deceased
    address: "",
    contact_no: "",
    requested_by: "",
    relationship: "",
    preferred_date: "",
    preferred_time: "",
    end_time: "",
    priest_id: "",
    isParishioner: "",
    transaction_no: "",
    service_id: "",
    type: "",
  });

  useEffect(() => {
    if (open && data) {
      setFormData({
        requestID: data.requestID,
        first_name: data.first_name, // full name ni sa deceased
        address: null,
        contact_no: data.contact_no,
        requested_by: data.requested_by,
        relationship: data.relationship,
        preferred_date: dayjs(data.preferred_date).format("YYYY-MM-DD"),
        preferred_time: data.preferred_time,
        end_time: endTime(data.preferred_time, 1), // Set end_time based on preferred_time and service duration
        priest_id: data.priest_id,
        isParishioner: data.isParishioner,
        transaction_no: data.transaction_no,
        service_id: data.service_id,
        type: null,
      });
    }
  }, [open, data]);

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
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPriest();
    fetchService();
  }, []);

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
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

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // CONFIRM ACTION (APPROVAL, UPDATE, CANCELLATION)
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
          if (response.data && Object.keys(response.data).length > 0) {
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
              activity: `Wake mass for ${formData.first_name}`,
              start_time: formData.preferred_time,
              end_time: formData.end_time,
              priest_id: formData.priest_id,
              request_id: data.requestID,
            }),
            console.log("priest sched success!"),
            axios.post(`${config.API}/logs/create`, {
              activity: `Approved Wake Request for ${formData.first_name}`,
              user_id: currentUser.id,
              request_id: data.requestID,
            }),
            console.log("logs success!"),
            sendSMS(data.service_id, formData, "approve"),
            closeInfoModal("approve"),
            refreshList(),
          ]);
        } catch (err) {
          if (err.response) {
            setError({
              message: err.response.data.message,
              details: err.response.data.details,
            });
          }
        } finally {
          refreshList();
        }
        break;
      case "update": // UPDATE PENDING REQUEST
        const res = await axios.put(`${config.API}/request/update-bulk`, {
          formData,
          id: data.requestID,
        });
        if (res.status !== 200) {
          console.log("error updating request");
          setError({
            message: res.data.message,
            details: res.data?.details,
          });
        } else {
          console.log("request updated!");
          axios.post(`${config.API}/logs/create`, {
            activity: `Updated WakeMass Request - Transaction number: ${data.transaction_no}`,
            user_id: currentUser.id,
            request_id: data.requestID,
          });
          console.log("logs success!");
          closeInfoModal("update");
        }
        break;
      case "cancel": // CANCEL PENDING REQUEST
        await axios.put(`${config.API}/request/update`, null, {
          params: {
            col: "status",
            val: "cancelled",
            id: formData.requestID,
          },
        });

        console.log("request cancelled!");
        sendSMS(data.service_id, formData, "cancel");
        await axios.post(`${config.API}/logs/create`, {
          activity: `Cancelled WakeMass Request - Transaction number: ${data.transaction_no}`,
          user_id: currentUser.id,
          request_id: data.requestID,
        });
        closeInfoModal("cancel");
        break;
      default:
        break;
    }
  };

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
        {formData && priests ? (
          <>
            <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }}>
              <b>Wake Mass Request Information</b>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ padding: 3 }}>
                <Grid item xs={12} sm={6}>
                  <label>Name of Deceased:</label>
                  <TextField
                    fullWidth
                    name="first_name"
                    size="small"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>Contact Number: </label>
                  <TextField
                    fullWidth
                    size="small"
                    name="contact_no"
                    value={formData.contact_no}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>Requested by:</label>
                  <TextField
                    fullWidth
                    size="small"
                    name="requested_by"
                    value={formData.requested_by}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>Relationship to the Deceased:</label>
                  <TextField
                    fullWidth
                    size="small"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <hr className="my-3" />
                </Grid>

                <Grid item xs={12}>
                  <label>Priest:</label>
                  <TextField
                    value={formData.priest_id}
                    name="priest_id"
                    onChange={handleChange}
                    select
                    fullWidth
                    sx={TextFieldStyle}
                  >
                    {priests.map((priest) => (
                      <MenuItem key={priest.priestID} value={priest.priestID}>
                        {"Fr. " + priest.first_name + " " + priest.last_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item sm={4}>
                  <label>Date:</label>
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
                <Grid item sm={3}>
                  <label>Start Time:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      fullWidth
                      timeSteps={{ hours: 30, minutes: 30 }}
                      minTime={dayjs().set("hour", 6)}
                      maxTime={dayjs().set("hour", 19)}
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
                <Grid item sm={3}>
                  <label>End Time:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      fullWidth
                      timeSteps={{ hours: 30, minutes: 30 }}
                      minTime={dayjs().set("hour", 6)}
                      maxTime={dayjs().set("hour", 19)}
                      sx={TextFieldStyle}
                      value={
                        formData.end_time
                          ? dayjs(formData.end_time, "HH:mm:ss")
                          : null
                      }
                      onChange={(time) => handleTimeChange("end_time", time)}
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item sm={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleOpenDialog("approve")}
                    sx={{
                      backgroundColor: "#355173",
                      marginTop: "24px",
                      gap: 1,
                      height: "40px",
                      fontWeight: "bold",
                      color: "white",
                      "&:hover": { bgcolor: "#4C74A5" },
                    }}
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
          <Skeleton variant="rectangular" height={400} />
        )}
      </Dialog>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        action={currentAction}
        onConfirm={handleConfirm}
        service={"Wake Mass"}
      />
    </>
  );
};

export default WakePending;
