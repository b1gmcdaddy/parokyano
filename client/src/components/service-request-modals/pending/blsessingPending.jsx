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
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useState, useEffect} from "react";
import ConfirmationDialog from "../../ConfirmationModal";
import dayjs from "dayjs";
import axios from "axios";
import config from "../../../config";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import sendSMS from "../../../utils/smsService";

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

const BlessingPending = ({open, data, handleClose, refreshList}) => {
  const [radioValue, setRadioValue] = useState("");
  const [otherValue, setOtherValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service, setService] = useState({});
  const [priests, setPriests] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    requestID: "",
    type: "",
    first_name: "",
    last_name: "",
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
  }, []);

  const closeInfoModal = () => {
    setSuccess(true);
    handleClose();
    refreshList();
  };

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleDateChange = (name, date) => {
    setFormData({...formData, [name]: date.format("YYYY-MM-DD")});
    console.log(formData);
  };

  const handleTimeChange = (name, time) => {
    setFormData({...formData, [name]: time.format("HH:mm:ss")});
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleRadioChange = (e) => {
    const {value} = e.target;
    setFormData((prevData) => ({...prevData, type: value}));
    setRadioValue(value);
    if (e.target.value !== "others") {
      setOtherValue("");
    }
  };

  const handleOtherChange = (e) => {
    setOtherValue(e.target.value);
  };

  const isOtherSelected = radioValue === "others";

  {
    /** for sameple if success, ari butang backend**/
  }
  const handleConfirm = async (action) => {
    switch (action) {
      case "approve": // APPROVE PENDING REQUEST
        console.log("approve");
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
            axios.put(`${config.API}/request/approve-service`, null, {
              params: {
                col: "status",
                val: "approved",
                col2: "payment_status",
                val2: "paid",
                col3: "preferred_date",
                val3: dayjs(formData.preferred_date).format("YYYY-MM-DD"),
                col4: "priest_id",
                val4: formData.priest_id,
                col5: "requestID",
                val5: formData.requestID,
              },
            }),
            console.log("request success!"),
            axios.post(`${config.API}/priest/createPriestSched`, {
              date: dayjs(formData.preferred_date).format("YYYY-MM-DD"),
              activity: `Blessing for ${formData.first_name} at ${formData.address}`,
              start_time: formData.preferred_time,
              end_time: endTime(formData.preferred_time, service.duration),
              priest_id: formData.priest_id,
              request_id: formData.requestID,
            }),
            console.log("priest sched success!"),
            axios.post(`${config.API}/logs/create`, {
              activity: `Approved Blessing for ${formData.first_name} at ${formData.address}`,
              user_id: 1,
              request_id: formData.requestID,
            }),
            console.log("logs success!"),
            // sendSMS(data.service_id, formData, "approve");
            closeInfoModal(),
            refreshList(),
          ]);
        } catch (err) {
          setError({
            message: err.response.data.message,
            details: err.response.data.details,
          });
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
            activity: `Updated Blessing Request - Transaction number: ${data.transaction_no}`,
            user_id: 1,
            request_id: data.requestID,
          });
          console.log("logs success!");
          // refetchData();
        }
        window.location.reload();
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
        // sendSMS(data.service_id, formData, "cancel");

        await axios.post(`${config.API}/logs/create`, {
          activity: `Cancelled Blessing Request - Transaction number: ${data.transaction_no}`,
          user_id: 1,
          request_id: data.requestID,
        });
        window.location.reload();
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
          <Alert severity="info" sx={{width: "100%"}}>
            <AlertTitle>Success!</AlertTitle>
            The request was successfully updated.
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

                <Grid item sm={4}>
                  <label>Priest:</label>
                  <TextField
                    value={formData.priest_id}
                    name="priest_id"
                    onChange={handleChange}
                    select
                    fullWidth
                    size="small">
                    {priests.map((priest) => (
                      <MenuItem key={priest.priestID} value={priest.priestID}>
                        {priest.first_name + " " + priest.last_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item sm={3}>
                  <label>Date:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      fullWidth
                      disablePast
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
                  <label>Time:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      fullWidth
                      sx={TextFieldStyle}
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
                      "&:hover": {bgcolor: "#4C74A5"},
                    }}>
                    <EventAvailableIcon sx={{fontSize: "1.3em"}} />
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
                  }}>
                  <Typography variant="body2" sx={{marginRight: "5px"}}>
                    Transaction Code:
                  </Typography>
                  <Typography variant="body2" sx={{fontWeight: "bold"}}>
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

export default BlessingPending;
