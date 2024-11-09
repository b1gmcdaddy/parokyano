import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Grid,
  MenuItem,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import {useEffect, useState} from "react";
import ConfirmationDialog from "../../../ConfirmationModal";
import config from "../../../../config";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import sendSMS from "../../../../utils/smsService";

const TextFieldStyle = {
  "& .MuiInputBase-root": {height: "40px"},
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

const WakeApproved = ({open, data, handleClose, refreshList}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [approver, setApprover] = useState({});
  const [success, setSuccess] = useState(null);
  const [snackBarStyle, setSnackBarStyle] = useState(null);
  const [service, setService] = useState({});
  const [priests, setPriests] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    first_name: "",
    relationship: "",
    requested_by: "",
    contact_no: "",
    preferred_date: "",
    preferred_time: "",
    priest_id: "",
    isParishioner: "",
    transaction_no: "",
    service_id: "",
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

  const fetchUser = async (id) => {
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
    fetchUser(data.user_id);
  }, [open]);

  const handleDateChange = (name, date) => {
    setFormData({...formData, [name]: date.format("YYYY-MM-DD")});
    console.log(formData.preferred_date);
  };

  const handleTimeChange = (name, time) => {
    setFormData({...formData, [name]: time.format("HH:mm:ss")});
  };

  useEffect(() => {
    if (open && data) {
      setFormData({
        type: data.type,
        first_name: data.first_name,
        relationship: data.relationship,
        requested_by: data.requested_by,
        contact_no: data.contact_no,
        preferred_date: dayjs(data.preferred_date).format("YYYY-MM-DD"),
        preferred_time: data.preferred_time,
        priest_id: data.priest_id,
        isParishioner: data.isParishioner,
        transaction_no: data.transaction_no,
        payment_status: data.payment_status,
        service_id: data.service_id,
      });
    }
  }, [open, data]);

  const closeInfoModal = (action) => {
    if (action == "reschedule") {
      setSuccess({
        message: "Reschedule Confirmed!",
        details: "The request has been successfully rescheduled.",
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

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const handleConfirm = async (action) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    try {
      switch (action) {
        case "update": ///////// UPDATE DETAILS ////////////
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
                activity: `Updated Wake Mass Request - Transaction number: ${data.transaction_no}`,
                user_id: currentUser.id,
                request_id: data.requestID,
              });
              closeInfoModal("update");
            }
          } catch (err) {
            console.error("Error updating request", err);
          }
          break;

        case "cancel": // CANCEL
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
                activity: `Cancelled Wake Mass Request - Transaction number: ${data.transaction_no}`,
                user_id: currentUser.id,
                request_id: data.requestID,
              }),
              // sendSMS(data.service_id, formData, "cancel");
              closeInfoModal("cancel"),
            ]);
          } catch (err) {
            console.error("Error cancelling request", err);
          }
          break;

        case "reschedule": // RESCHEDULE
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

            await axios.put(`${config.API}/priest/reschedule`, {
              date: formData.preferred_date,
              activity: `Wake Mass for ${formData.first_name}`,
              start_time: formData.preferred_time,
              end_time: endTime(formData.preferred_time, service.duration),
              priest_id: formData.priest_id,
              request_id: data.requestID,
            });

            await axios.post(`${config.API}/logs/create`, {
              activity: `Rescheduled Wake Mass for ${formData.first_name}`,
              user_id: currentUser.id,
              request_id: data.requestID,
            });
            // sendSMS(data.service_id, formData, "reschedule"),
            closeInfoModal("reschedule");
          } catch (err) {
            setError({
              message: err.response.data.message,
              details: err.response.data.details,
            });
          }
          break;

        default:
          break;
      }
    } catch (globalError) {
      console.error("Unexpected error occurred:", globalError);
    }
  };

  return (
    <>
      {error && (
        <Snackbar
          anchorOrigin={{vertical: "top", horizontal: "center"}}
          open={true}
          autoHideDuration={5000}
          onClose={() => setError(null)}>
          <Alert severity="error" sx={{width: "100%"}}>
            <AlertTitle>{error.message}</AlertTitle>
            {error.details}
          </Alert>
        </Snackbar>
      )}

      {success && (
        <Snackbar
          anchorOrigin={{vertical: "top", horizontal: "center"}}
          open={true}
          autoHideDuration={5000}
          onClose={() => setSuccess(null)}>
          <Alert severity={snackBarStyle} sx={{width: "100%"}}>
            <AlertTitle>{success.message}</AlertTitle>
            {success.details}
          </Alert>
        </Snackbar>
      )}

      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        {formData && priests ? (
          <>
            <DialogTitle sx={{m: 0, p: 2, textAlign: "center"}}>
              <b>Wake Mass Request Information</b>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{position: "absolute", right: 8, top: 8}}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{padding: 3}}>
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

                <Grid item xs={12} sm={4}>
                  <label>Selected Priest:</label>
                  <TextField
                    value={formData.priest_id}
                    size="small"
                    name="priest_id"
                    onChange={handleChange}
                    select
                    fullWidth>
                    {priests.map((priest) => (
                      <MenuItem key={priest.priestID} value={priest.priestID}>
                        {priest.first_name + " " + priest.last_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={3}>
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
                <Grid item xs={12} sm={2} sx={{margin: "auto"}}>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog("reschedule")}
                    sx={{
                      bgcolor: "#247E38",
                      marginTop: "24px",
                      height: "40px",
                      fontWeight: "bold",
                      color: "white",
                      "&:hover": {bgcolor: "#578A62"},
                    }}>
                    Reschedule
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <label>Approved by:</label>
                  <TextField
                    fullWidth
                    size="small"
                    disabled
                    value={approver?.first_name + " " + approver?.last_name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <label>Transaction Number:</label>
                  <Paper
                    elevation={1}
                    sx={{
                      height: "40px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "#d1d1d1",
                      fontWeight: "bold",
                    }}>
                    {data.transaction_no}
                  </Paper>
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
                }}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    margin: "-40px 0 10px 0",
                    justifyContent: "center",
                    gap: "20px",
                  }}>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog("update")}
                    sx={{
                      bgcolor: "#CDAB52",
                      marginTop: "24px",
                      height: "40px",
                      fontWeight: "bold",
                      color: "white",
                      "&:hover": {bgcolor: "#A58228"},
                    }}>
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
                      "&:hover": {bgcolor: "#f44336"},
                    }}>
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

export default WakeApproved;
