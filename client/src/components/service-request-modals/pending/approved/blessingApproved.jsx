import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  Modal,
  Box,
  Button,
  Grid,
  Typography,
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
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useEffect, useState} from "react";
import ConfirmationDialog from "../../../ConfirmationModal";
import util from "../../../../utils/DateTimeFormatter";
import axios from "axios";
import config from "../../../../config";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import sendSMS from "../../../../utils/smsService";

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
  "& .MuiInputBase-root": {height: "30px"},
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

const BlessingApproved = ({open, data, handleClose}) => {
  const [radioValue, setRadioValue] = useState("");
  const [otherValue, setOtherValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service, setService] = useState({});
  const [priests, setPriests] = useState([]);
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

  // const refetchData = async () => {
  //   try {
  //     const response = await axios.get(`${config.API}/request/retrieve`, {
  //       params: {
  //         col: "requestID",
  //         val: data.requestID,
  //       },
  //     });
  //     setFormData({
  //       type: response.data.type,
  //       first_name: response.data.first_name,
  //       address: response.data.address,
  //       requested_by: response.data.requested_by,
  //       contact_no: response.data.contact_no,
  //       preferred_date: dayjs(response.data.preferred_date).format(
  //         "YYYY-MM-DD"
  //       ),
  //       preferred_time: response.data.preferred_time,
  //       priest_id: response.data.priest_id,
  //       isParishioner: response.data.isParishioner,
  //       transaction_no: response.data.transaction_no,
  //       payment_status: response.data.payment_status,
  //       service_id: response.data.service_id,
  //     });
  //   } catch (err) {
  //     console.error("error retrieving request", err);
  //   }
  // };

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
    fetchService();
    fetchPriest();
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
    switch (action) {
      case "update": //// UPDATE
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
          handleClose();
        }
        break;
      case "cancel": ////// CANCEL
        try {
          axios.put(`${config.API}/request/update`, null, {
            params: {
              col: "status",
              val: "cancelled",
              id: data.requestID,
            },
          });

          console.log("request cancelled!");
          axios
            .delete(`${config.API}/priest/deleteSched`, {
              params: {
                col: "request_id",
                val: data.requestID,
              },
            })
            .then(() => {
              console.log("priest sched deleted!");
              axios.post(`${config.API}/logs/create`, {
                activity: `Cancelled Blessing Request - Transaction number: ${data.transaction_no}`,
                user_id: 1,
                request_id: data.requestID,
              });
              console.log("logs success!");
            });
          handleClose();
          break;
        } catch (err) {
          console.error("error updating request", err);
        }
        break;
      case "reschedule": /////////// RESCHEDULE ////////
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
            const reschedule = {
              preferred_date: formData.preferred_date,
              preferred_time: formData.preferred_time,
              priest_id: formData.priest_id,
            };

            axios.put(`${config.API}/request/update-bulk`, {
              formData: reschedule,
              id: data.requestID,
            });

            axios.delete(`${config.API}/priest/deleteSched`, {
              params: {
                col: "request_id",
                val: data.requestID,
              },
            });

            axios.post(`${config.API}/priest/createPriestSched`, {
              activity: `Blessing for ${formData.first_name} at ${formData.address}`,
              priest_id: formData.priest_id,
              request_id: data.requestID,
              start_time: formData.preferred_time,
              end_time: endTime(formData.preferred_time, service.duration),
              date: formData.preferred_date,
            });

            axios.post(`${config.API}/logs/create`, {
              activity: `Rescheduled Blessing for ${formData.first_name} at ${formData.address}`,
              user_id: 1,
              request_id: data.requestID,
            });

            // sendSMS(data.service_id, formData, "reschedule");
            // window.location.reload(); //replace with fetch soon
          }
        } catch (err) {
          console.log("error submitting to server", err);
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

      <Modal open={open} onClose={handleClose}>
        {formData && priests && formData ? (
          <Box sx={modalStyle}>
            <Box sx={{position: "sticky", paddingBottom: "10px"}}>
              <Grid container justifyContent={"flex-end"}>
                <Grid item>
                  <IconButton onClick={handleClose} size="small">
                    <FontAwesomeIcon icon={faXmark} />
                  </IconButton>
                </Grid>
                <Grid item sm={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{textAlign: "center", fontWeight: "bold"}}>
                    Blessing Request Information
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box sx={modalContentStyle}>
              <Grid container justifyContent={"center"} spacing={2}>
                <Grid item sm={1}>
                  <label>Type:</label>
                </Grid>
                <Grid item sm={11}>
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

                <Grid item sm={1.3}>
                  <label>Name:</label>
                </Grid>
                <Grid item sm={10.7}>
                  <TextField
                    name="first_name"
                    fullWidth
                    sx={TextFieldStyle}
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item sm={1.3}>
                  <label>Address:</label>
                </Grid>
                <Grid item sm={10.7}>
                  <TextField
                    name="address"
                    fullWidth
                    sx={TextFieldStyle}
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item sm={2.2}>
                  <label>Requested by:</label>
                </Grid>
                <Grid item sm={3.7}>
                  <TextField
                    name="requested_by"
                    fullWidth
                    sx={TextFieldStyle}
                    value={formData.requested_by}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item sm={1.9}>
                  <label>Contact no:</label>
                </Grid>
                <Grid item sm={4.2}>
                  <TextField
                    name="contact_no"
                    fullWidth
                    sx={TextFieldStyle}
                    value={formData.contact_no}
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
                  <label>Venue:</label>
                  <TextField fullWidth size="small" disabled />
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

                <Grid
                  item
                  sm={12}
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}>
                  <Button
                    onClick={() => handleOpenDialog("update")}
                    sx={{
                      bgcolor: "#CDAB52",
                      marginTop: "14px",
                      height: "35px",
                      width: "90px",
                      fontWeight: "bold",
                      color: "white",
                      "&:hover": {bgcolor: "#F0CA67"},
                    }}>
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
                      "&:hover": {bgcolor: "#F05A5A"},
                    }}>
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
              service={"blessing"}
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
            <Grid item sm={12} sx={{mt: 2}}>
              <Skeleton variant="rectangular" width="30%" height={40} />
            </Grid>
            <Grid item sm={12} sx={{mt: 1}}>
              <Skeleton variant="text" width="50%" height={30} />
              <Skeleton variant="rectangular" width="100%" height={150} />
            </Grid>
            <Grid item sm={12} sx={{mt: 2}}>
              <Skeleton variant="rectangular" width="30%" height={40} />
              <Skeleton
                variant="rectangular"
                width="30%"
                height={40}
                sx={{ml: 2}}
              />
            </Grid>
          </Grid>
        )}
      </Modal>
    </>
  );
};

export default BlessingApproved;
