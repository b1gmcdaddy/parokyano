import CloseIcon from "@mui/icons-material/Close";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Grid,
  Typography,
  IconButton,
  TextField,
  MenuItem,
  Paper,
  Skeleton,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import React from "react";
import ConfirmationDialog from "../../../ConfirmationModal";
import axios from "axios";
import config from "../../../../config";
import dayjs from "dayjs";
import sendSMS from "../../../../utils/smsService";
import RequirementsModal from "../../RequirementsModal";

const TextFieldStyle = {
  "& .MuiInputBase-root": { height: "40px", bgcolor: "white" },
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

// retrieve w fee
const fetchWeddingDetails = async (id) => {
  try {
    const response = await axios.get(`${config.API}/wedding/retrieve`, {
      params: { reqID: id },
    });

    return response.data?.result[0];
  } catch (err) {
    console.error(err);
    return null;
  }
};

const WeddingApproved = ({ open, data, handleClose, refreshList }) => {
  const [available, setAvailable] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [completeRequirements, setCompleteRequirements] = useState(0);
  const [currentAction, setCurrentAction] = useState("");
  const [service, setService] = useState({});
  const [approver, setApprover] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [snackBarStyle, setSnackBarStyle] = useState(null);
  const [priests, setPriests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(null);

  // START RETRIEVE WEDDING DETAILS
  const fetchWeddingData = async () => {
    try {
      const weddingDetails = await fetchWeddingDetails(data.requestID);

      if (weddingDetails) {
        setFormData((prevData) => ({
          ...prevData,
          spouse_firstName: weddingDetails.spouse_firstName || "",
          spouse_middleName: weddingDetails.spouse_middleName || "",
          spouse_lastName: weddingDetails.spouse_lastName || "",
        }));
        setCompleteRequirements(weddingDetails.isComplete || 0);
      }
    } catch (err) {
      console.error("Error fetching wedding details", err);
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
    setIsLoading(true);
    if (open && data) {
      setFormData({
        requestID: data.requestID,
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        contact_no: data.contact_no,
        relationship: data.relationship,
        interview_date: data.interview_date
          ? dayjs(data.interview_date).format("YYYY-MM-DD")
          : null,
        interview_time: data.interview_time || null,
        priest_id: data.priest_id || null,
        preferred_date: data.preferred_date
          ? dayjs(data.preferred_date).format("YYYY-MM-DD")
          : null,
        preferred_time: data.preferred_time || null,
        end_time: data?.end_time || null,
        transaction_no: data.transaction_no,
        payment_status: data.payment_status,
        service_id: data.service_id,
        spouse_firstName: "",
        spouse_middleName: "",
        spouse_lastName: "",
        donation: data.donation || "",
      });
      fetchWeddingData();
      fetchUser(data.user_id);
      fetchPriest();
      fetchService();
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
    console.log(avail.data.message);
    setAvailable(avail.data.message);
  };

  useEffect(() => {
    if (formData?.preferred_date && formData?.preferred_time) {
      fetchAvailability(
        formData?.preferred_date,
        formData?.preferred_time,
        formData?.end_time
      );
    }
  }, [
    formData?.preferred_date,
    formData?.preferred_time,
    formData?.priest_id,
    open,
  ]);

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

  // END RETRIEVE WEDDING DETAILS

  // START FORM HANDLERS AND CONTROLS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date.format("YYYY-MM-DD") });
  };

  const handleTimeChange = (name, time) => {
    setFormData({ ...formData, [name]: time.format("HH:mm:ss") });
  };

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseRequirementsDialog = async () => {
    await fetchWeddingData();
  };
  // END FORM HANDLERS AND CONTROLS

  const handleConfirm = async (action) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    switch (action) {
      case "update": ///// UPDATE PENDING REQUEST////
        const res = await axios.put(
          `${config.API}/wedding/updateWedding/${data.requestID}`,
          formData
        );
        if (res.status !== 200) {
          console.log("error updating request");
          setError({
            message: res.data.message,
            details: res.data?.details,
          });
        } else {
          console.log("request updated!");

          axios.post(`${config.API}/logs/create`, {
            activity: `Updated Wedding Request - Transaction number: ${data.transaction_no}`,
            user_id: currentUser.id,
            request_id: data.requestID,
          });
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
          activity: `Cancelled Wedding Request - Transaction number: ${data.transaction_no}`,
          user_id: currentUser.id,
          request_id: data.requestID,
        });
        closeInfoModal("cancel");
        break;

      case "reschedule": ////// RESCHEDULE
        try {
          if (
            dayjs(formData.end_time, "HH:mm:ss").isBefore(
              dayjs(formData.preferred_time, "HH:mm:ss")
            )
          ) {
            setError({
              message: "Invalid Time Range",
              details:
                "End time cannot be earlier than or equal to start time.",
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
              activity: `Wedding for ${formData.first_name} and ${formData.spouse_firstName}`,
              start_time: formData.preferred_time,
              end_time: endTime(formData.preferred_time, service.duration),
              priest_id: formData.priest_id,
              request_id: data.requestID,
            }),
            axios.post(`${config.API}/logs/create`, {
              activity: `Rescheduled Wedding for ${formData.first_name} and ${formData.spouse_firstName}`,
              user_id: currentUser.id,
              request_id: data.requestID,
            }),
            sendSMS(data.service_id, formData, "reschedule"),
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
              <b>Wedding Request Information</b>
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
                <Grid item xs={12} sm={4}>
                  <label>Groom's First Name:</label>
                  <TextField
                    fullWidth
                    name="first_name"
                    onChange={handleChange}
                    value={formData?.first_name}
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Groom's Middle Name:</label>
                  <TextField
                    fullWidth
                    name="middle_name"
                    onChange={handleChange}
                    value={formData?.middle_name}
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Groom's Last Name:</label>
                  <TextField
                    fullWidth
                    name="last_name"
                    onChange={handleChange}
                    value={formData?.last_name || ""}
                    sx={TextFieldStyle}
                  />
                </Grid>

                <Grid item sm={4}>
                  <label>Bride's First Name:</label>
                  <TextField
                    fullWidth
                    value={formData?.spouse_firstName}
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Bride's Middle Name:</label>
                  <TextField
                    fullWidth
                    value={formData?.spouse_middleName}
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Bride's Last Name:</label>
                  <TextField
                    fullWidth
                    value={formData?.spouse_lastName}
                    sx={TextFieldStyle}
                  />
                </Grid>

                <Grid item sm={4}>
                  <label>Contact No:</label>
                  <TextField
                    fullWidth
                    name="contact_no"
                    onChange={handleChange}
                    value={formData?.contact_no}
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Status:</label>
                  <TextField
                    name="relationship"
                    onChange={handleChange}
                    value={formData.relationship}
                    fullWidth
                    select
                    sx={TextFieldStyle}
                  >
                    <MenuItem value="Civilly Married">Civilly Married</MenuItem>
                    <MenuItem value="Live-in for under 4 years">
                      Live-in for under 4 years
                    </MenuItem>
                    <MenuItem value="Live-in for more than 4 years">
                      Live-in for more than 4 years
                    </MenuItem>
                    <MenuItem value="Widow">Widow</MenuItem>
                  </TextField>
                </Grid>
                <Grid item sm={4}>
                  <label>
                    Payment:
                    <strong>
                      {formData.donation != null
                        ? `₱ ${parseFloat(formData.donation).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}`
                        : ""}
                    </strong>
                  </label>
                  <TextField
                    name="payment_status"
                    onChange={handleChange}
                    value={formData?.payment_status}
                    select
                    fullWidth
                    sx={TextFieldStyle}
                  >
                    <MenuItem value="unpaid">Unpaid</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography sx={{ display: "inline-block" }}>
                    Requirements:
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      display: "inline-block",
                      marginLeft: "5px",
                      marginBottom: 1,
                      fontSize: "14px",
                      color:
                        completeRequirements == 1 &&
                        formData.payment_status == "paid"
                          ? "green"
                          : "red",
                    }}
                  >
                    {completeRequirements == 1 &&
                    formData.payment_status == "paid" ? (
                      <span className="font-bold">COMPLETE</span>
                    ) : completeRequirements == 1 &&
                      formData.payment_status == "unpaid" ? (
                      <span className="font-bold">Lacking Payment</span>
                    ) : completeRequirements == 0 &&
                      formData.payment_status == "paid" ? (
                      <span className="font-bold">INCOMPLETE</span>
                    ) : (
                      <span className="font-bold">INCOMPLETE</span>
                    )}
                  </Typography>

                  <RequirementsModal
                    id={data.requestID}
                    type={data.relationship}
                    onClose={handleCloseRequirementsDialog}
                  />
                </Grid>

                <Grid item xs={12}>
                  <hr className="my-1" />
                </Grid>

                <Grid item xs={12}>
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
                <Grid item xs={12} sm={3}>
                  <label> Date:</label>
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
                <Grid item xs={12} sm={2.5}>
                  <label> Start Time:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      fullWidth
                      sx={TextFieldStyle}
                      timeSteps={{ hours: 30, minutes: 30 }}
                      minTime={dayjs().set("hour", 6)}
                      maxTime={dayjs().set("hour", 19)}
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

                <Grid item sm={2.5}>
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

                <Grid item sm={1.7}>
                  <label>Church:</label>
                  <TextField value={available} size="small" fullWidth />
                </Grid>

                <Grid item xs={12} sm={2} sx={{ margin: "auto" }}>
                  <Button
                    disabled={
                      !completeRequirements ||
                      formData.payment_status == "unpaid"
                    }
                    variant="contained"
                    onClick={() => handleOpenDialog("reschedule")}
                    sx={{
                      bgcolor: "#247E38",
                      marginTop: "24px",
                      height: "40px",
                      fontWeight: "bold",
                      color: "white",
                      "&:hover": { bgcolor: "green" },
                    }}
                  >
                    Reschedule
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <label>Approved by:</label>
                  <TextField
                    fullWidth
                    sx={TextFieldStyle}
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
                    }}
                  >
                    <p>{data.transaction_no}</p>
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
          <Grid container spacing={2} sx={{ padding: 6 }}>
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
        service={"Wedding"}
      />
    </>
  );
};

export default WeddingApproved;
