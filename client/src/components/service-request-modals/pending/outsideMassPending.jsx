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
  MenuItem,
  FormControlLabel,
  Radio,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import Snackbar from "@mui/material/Snackbar";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useState, useEffect} from "react";
import ConfirmationDialog from "../../ConfirmationModal";
import axios from "axios";
import config from "../../../config";
import dayjs from "dayjs";
import sendSMS from "../../../utils/smsService";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

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

const OutsidePending = ({open, data, handleClose}) => {
  const [radioValue, setRadioValue] = useState("");
  const [otherValue, setOtherValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [priests, setPriests] = useState([]);
  const [service, setService] = useState({});
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    address: "",
    contact_no: "",
    requested_by: "",
    relationship: "",
    preferred_date: "",
    preferred_time: "",
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
        first_name: data.first_name,
        address: data.address,
        contact_no: data.contact_no,
        requested_by: data.requested_by,
        relationship: data.relationship,
        preferred_date: dayjs(data.preferred_date).format("YYYY-MM-DD"),
        preferred_time: data.preferred_time,
        priest_id: data.priest_id,
        isParishioner: data.isParishioner,
        transaction_no: data.transaction_no,
        service_id: data.service_id,
        type: data.type,
      });
    }
    console.log(data);
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
    const {name, value} = e.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const handleDateChange = (name, date) => {
    setFormData({...formData, [name]: date.format("YYYY-MM-DD")});
    console.log(formData.preferred_date);
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
      case "approve":
        console.log(formData);
        const currentUser = JSON.parse(localStorage.getItem("user"));
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
          if (Object.keys(response.data).length > 0 || response.data != "") {
            setError({
              message: response.data.message,
              details: response.data?.details,
            });
          } else {
            axios.put(`${config.API}/request/update-bulk`, {
              formData,
              id: data.requestID,
            });
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
                val5: formData.requestID,
              },
            });
            console.log("request success!");
            axios.post(`${config.API}/priest/createPriestSched`, {
              date: dayjs(formData.preferred_date).format("YYYY-MM-DD"),
              activity: `Outside mass for ${formData.first_name}`,
              start_time: formData.preferred_time
                ? formData.preferred_time
                : data.preferred_time,
              end_time: endTime(formData.preferred_time, service.duration),
              priest_id: formData.priest_id,
              request_id: formData.requestID,
            });
            console.log("priest sched success!");
            axios.post(`${config.API}/logs/create`, {
              activity: `Approved Outside Mass at ${formData.first_name}`,
              user_id: 1,
              request_id: formData.requestID,
            });
            console.log("logs success!");
            // sendSMS(data.service_id, formData, "approve");
            handleClose();
            window.location.reload();
          }
        } catch (err) {
          setError({
            message: err.response.data.message,
            details: err.response.data.details,
          });
          console.log("error submitting to server", err);
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
            activity: `Updated OutsideMass Request - Transaction number: ${data.transaction_no}`,
            user_id: currentUser.id,
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
          activity: `Cancelled OutsideMass Request - Transaction number: ${data.transaction_no}`,
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
          open={true}
          autoHideDuration={5000}
          onClose={() => setError(null)}
          message={
            <>
              <span style={{fontWeight: "bold", fontSize: "18px"}}>
                {error.message}
              </span>
              <p>{error.details}</p>
            </>
          }
        />
      )}
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        {formData && priests ? (
          <>
            <DialogTitle sx={{m: 0, p: 2, textAlign: "center"}}>
              <b>Outside Mass Request Information</b>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{position: "absolute", right: 8, top: 8}}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{padding: 3}}>
                <Grid item xs={12} sm={12}>
                  <RadioGroup
                    row
                    name="type"
                    onChange={(e) => {
                      handleRadioChange(e);
                      setFormData({...formData, type: e.target.value});
                    }}
                    sx={{marginTop: "-5px"}}
                    value={formData.type}>
                    <FormControlLabel
                      value="chapel"
                      control={<Radio size="small" />}
                      label="Chapel"
                    />
                    <FormControlLabel
                      value="company"
                      control={<Radio size="small" />}
                      label="Company"
                    />
                    <FormControlLabel
                      value="others"
                      control={<Radio size="small" />}
                      label="Others:"
                    />
                    <TextField
                      disabled={!isOtherSelected} // Simplify condition
                      value={otherValue}
                      name="otherValue"
                      onChange={handleOtherChange}
                      sx={{
                        "& .MuiInputBase-root": {height: "30px"},
                        opacity: isOtherSelected ? 1 : 0.4,
                        marginTop: "5px",
                      }}
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                  <label>Celebration/Celebrator: </label>
                  <TextField
                    fullWidth
                    size="small"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label>Address:</label>
                  <TextField
                    fullWidth
                    size="small"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <label>Contact Person:</label>
                  <TextField
                    fullWidth
                    size="small"
                    name="requested_by"
                    value={formData.requested_by}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <label>Contact Number:</label>
                  <TextField
                    fullWidth
                    size="small"
                    name="contact_no"
                    value={formData.contact_no}
                    onChange={handleChange}
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
        service={"Outside Mass"}
      />
    </>
  );
};

export default OutsidePending;
