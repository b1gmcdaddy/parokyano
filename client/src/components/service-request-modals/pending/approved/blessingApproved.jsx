import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  IconButton,
  TextField,
  RadioGroup,
  Paper,
  FormControlLabel,
  MenuItem,
  Radio,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useEffect, useState} from "react";
import ConfirmationDialog from "../../../ConfirmationModal";
import util from "../../../../utils/DateTimeFormatter";
import axios from "axios";
import config from "../../../../config";
import dayjs from "dayjs";
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

const BlessingApproved = ({open, data, handleClose, refreshList}) => {
  const [radioValue, setRadioValue] = useState("");
  const [otherValue, setOtherValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [approver, setApprover] = useState({});
  const [service, setService] = useState({});
  const [priests, setPriests] = useState([]);
  const [success, setSuccess] = useState(null);
  const [snackBarStyle, setSnackBarStyle] = useState(null);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    requestID: "",
    type: "",
    first_name: "",
    address: "",
    requested_by: "",
    contact_no: "",
    preferred_date: "",
    preferred_time: "",
    priest_id: "",
    isParishioner: "",
    transaction_no: "",
    service_id: "",
  });

  useEffect(() => {
    if (open && data) {
      setFormData({
        requestID: data.requestID,
        type: data.type,
        first_name: data.first_name,
        address: data.address,
        requested_by: data.requested_by,
        contact_no: data.contact_no,
        preferred_date: dayjs(data.preferred_date).format("YYYY-MM-DD"),
        preferred_time: data.preferred_time,
        priest_id: data.priest_id,
        isParishioner: data.isParishioner,
        transaction_no: data.transaction_no,
        service_id: data.service_id,
      });
    }
  }, [open, data]);

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
    fetchService();
    fetchPriest();
    fetchUser(data.user_id);
  }, [open]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
    if (e.target.value !== "others") {
      setOtherValue("");
    }
  };

  const handleOtherChange = (e) => {
    setOtherValue(e.target.value);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const isOtherSelected = radioValue === "others";

  const handleDateChange = (name, date) => {
    setFormData({...formData, [name]: date.format("YYYY-MM-DD")});
    console.log(formData.preferred_date);
  };

  const handleTimeChange = (name, time) => {
    setFormData({...formData, [name]: time.format("HH:mm:ss")});
  };

  const handleConfirm = async (action) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
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
              activity: `Updated Blessing Request - Transaction number: ${data.transaction_no}`,
              user_id: currentUser.id,
              request_id: data.requestID,
            });
            closeInfoModal("update");
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
              activity: `Cancelled Blessing Request - Transaction number: ${data.transaction_no}`,
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
              activity: `Blessing for ${formData.first_name} at ${formData.address}`,
              start_time: formData.preferred_time,
              end_time: endTime(formData.preferred_time, service.duration),
              priest_id: formData.priest_id,
              request_id: data.requestID,
            }),
            axios.post(`${config.API}/logs/create`, {
              activity: `Rescheduled Blessing for ${formData.first_name} at ${formData.address}`,
              user_id: currentUser.id,
              request_id: data.requestID,
            }),
            // sendSMS(data.service_id, formData, "reschedule"),
            closeInfoModal("reschedule"),
          ]);
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
            <DialogTitle sx={{mt: 3, p: 2, textAlign: "center"}}>
              <b>Blessing Request Information</b>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{position: "absolute", right: 8, top: 8}}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{padding: 3}}>
                <Grid item sm={12}>
                  <RadioGroup
                    row
                    name="type"
                    sx={{marginTop: "-5px"}}
                    value={formData.type}
                    onChange={handleRadioChange}>
                    <FormControlLabel
                      value="House Blessing"
                      control={<Radio size="small" />}
                      label="House"
                    />
                    <FormControlLabel
                      value="Company Blessing"
                      control={<Radio size="small" />}
                      label="Company"
                    />
                    <FormControlLabel
                      value="others"
                      control={<Radio size="small" />}
                      label="Others:"
                    />
                    <TextField
                      disabled={isOtherSelected ? false : true}
                      value={otherValue}
                      size="small"
                      onChange={handleOtherChange}
                      sx={{
                        opacity: isOtherSelected ? 1 : 0.4,
                        marginLeft: "10px",
                      }}
                    />
                  </RadioGroup>
                </Grid>

                <Grid item sm={8}>
                  <label>Name:</label>
                  <TextField
                    fullWidth
                    name="first_name"
                    onChange={handleChange}
                    size="small"
                    value={formData.first_name}></TextField>
                </Grid>

                <Grid item sm={4}>
                  <label>Requested by:</label>
                  <TextField
                    fullWidth
                    name="requested_by"
                    onChange={handleChange}
                    size="small"
                    value={formData.requested_by}
                    readonly
                  />
                </Grid>

                <Grid item sm={8}>
                  <label>Address:</label>
                  <TextField
                    fullWidth
                    name="address"
                    onChange={handleChange}
                    size="small"
                    value={formData.address}
                    readonly
                  />
                </Grid>

                <Grid item sm={4}>
                  <label>Contact no:</label>
                  <TextField
                    fullWidth
                    name="contact_no"
                    onChange={handleChange}
                    size="small"
                    value={formData.contact_no}
                    readonly
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
                  sm={12}
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
        service={"blessing"}
      />
    </>
  );
};

export default BlessingApproved;
