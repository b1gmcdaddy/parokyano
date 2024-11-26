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
  Skeleton,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import Snackbar from "@mui/material/Snackbar";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useState, useEffect} from "react";
import React from "react";
import ConfirmationDialog from "../../ConfirmationModal";
import axios from "axios";
import config from "../../../config";
import dayjs from "dayjs";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import sendSMS from "../../../utils/smsService";
import RequirementsModal from "../RequirementsModal";

const TextFieldStyle = {
  "& .MuiInputBase-root": {height: "40px", bgcolor: "white"},
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

const fetchWeddingDetails = async (id) => {
  try {
    const response = await axios.get(`${config.API}/wedding/retrieve`, {
      params: {reqID: id},
    });
    return response.data?.result[0];
  } catch (err) {
    console.error(err);
    return null;
  }
};

const WeddingPending = ({open, data, handleClose, refreshList}) => {
  const [available, setAvailable] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [completeRequirements, setCompleteRequirements] = useState(0);
  const [currentAction, setCurrentAction] = useState("");
  const [service, setService] = useState({});
  const [snackBarStyle, setSnackBarStyle] = useState(null);
  const [error, setError] = useState(null);
  const [priests, setPriests] = useState([]);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weddingInfo, setWeddingInfo] = useState({});
  const [formData, setFormData] = useState(null);
  const [paymentFee, setPaymentFee] = useState(0);

  // START RETRIEVE WEDDING DETAILS WITH FEE
  const fetchWeddingData = async () => {
    try {
      const weddingDetails = await fetchWeddingDetails(data.requestID);

      if (weddingDetails) {
        setWeddingInfo({
          spouse_firstName: weddingDetails.spouse_firstName || "",
          spouse_middleName: weddingDetails.spouse_middleName || "",
          spouse_lastName: weddingDetails.spouse_lastName || "",
        });
        setPaymentFee(weddingDetails.donation);
        setCompleteRequirements(weddingDetails.isComplete || 0);
      }
    } catch (err) {
      console.error("Error fetching wedding details", err);
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

  useEffect(() => {
    setIsLoading(true);
    if (open && data) {
      setFormData({
        requestID: data.requestID || "",
        first_name: data.first_name || "",
        middle_name: data.middle_name || "",
        last_name: data.last_name || "",
        contact_no: data.contact_no || "",
        relationship: data.relationship || "",
        interview_date: data.interview_date
          ? dayjs(data.interview_date).format("YYYY-MM-DD")
          : null,
        interview_time: data.interview_time || "",
        priest_id: data.priest_id || "",
        preferred_date: data?.preferred_date
          ? dayjs(data?.preferred_date).format("YYYY-MM-DD")
          : null,
        preferred_time: data.preferred_time || "",
        transaction_no: data.transaction_no || "",
        payment_status: data.payment_status || "",
        service_id: data.service_id || "",
        donation: data.donation || 0,
      });
      fetchWeddingData();
      fetchPriest();
      fetchService();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, "500");
  }, [open, data]);

  useEffect(() => {
    if (!formData?.preferred_date || !formData?.preferred_time) return;

    try {
      const isSpecialSchedule =
        dayjs(formData.preferred_date).isValid() &&
        dayjs(formData.preferred_time, "HH:mm:ss").isValid() &&
        dayjs(formData.preferred_date).day() === 0 && // Sunday
        dayjs(formData.preferred_time, "HH:mm:ss").hour() === 6; // 6 AM

      // Set donation amount based on conditions
      setFormData((prevState) => ({
        ...prevState,
        donation: isSpecialSchedule
          ? 1000.0 // Special schedule price
          : data?.isParishioner
          ? 3000.0 // Parishioner price
          : 3500.0, // Non-parishioner price
      }));

      // Optional: Log for debugging
      console.log({
        isSpecialSchedule,
        isParishioner: data?.isParishioner,
        baseFee: formData?.donation,
        additionalFee: paymentFee,
      });
    } catch (error) {
      console.error("Error calculating donation amount:", error);
      setFormData((prevState) => ({
        ...prevState,
        donation: 3500.0,
      }));
    }
  }, [formData?.preferred_date, formData?.preferred_time, data?.isParishioner]);

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

  const handleUpdateInterview = () => {
    setSuccess({
      message: "Interview Schedule Success",
      details: "Request Interview Schedule has been set",
    });
    setSnackBarStyle("info");
    handleClose();
    refreshList();
  };

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
    setAvailable(avail.data.message);
  };

  useEffect(() => {
    if (formData?.preferred_date && formData?.preferred_time) {
      fetchAvailability(
        formData?.preferred_date,
        formData?.preferred_time,
        endTime(formData?.preferred_time, service.duration)
      );
    }
  }, [
    formData?.preferred_date,
    formData?.preferred_time,
    formData?.priest_id,
    open,
  ]);
  // END RETRIEVE WEDDING DETAILS

  // START FORM HANDLERS AND CONTROLS
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const handleDateChange = (name, date) => {
    setFormData({...formData, [name]: date.format("YYYY-MM-DD")});
  };

  const handleTimeChange = (name, time) => {
    setFormData({...formData, [name]: time.format("HH:mm:ss")});
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

  // START SET INTERVIEW METHOD
  const handleSetInterview = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(
        `${config.API}/priest/retrieve-schedule-by-params`,
        {
          params: {
            priest: formData.priest_id,
            date: formData.interview_date,
            start: formData.interview_time,
            end: endTime(formData.interview_time, service.duration),
          },
        }
      );
      // console.log(response);
      if (Object.keys(response.data).length > 0 || response.data != "") {
        setError({
          message: response.data.message,
          details: response.data?.details,
        });
      } else {
        await Promise.all([
          axios.put(`${config.API}/request/update-bulk`, {
            formData,
            id: data.requestID,
          }),

          axios.post(`${config.API}/priest/createPriestSched`, {
            date: dayjs(formData.interview_date).format("YYYY-MM-DD"),
            activity: `Marriage Interview for ${formData.first_name}`,
            start_time: formData.interview_time,
            end_time: endTime(formData.interview_time, service.duration),
            priest_id: formData.priest_id,
            request_id: formData.requestID,
          }),

          axios.post(`${config.API}/logs/create`, {
            activity: `Set Marriage Interview Schedule for ${formData.first_name}`,
            user_id: currentUser.id,
            request_id: formData.requestID,
          }),
          handleUpdateInterview(),
          refreshList(),
        ]);
      }
      refreshList();
    } catch (err) {
      setError({
        message: err.response?.data?.message,
        details: err.response?.data?.details,
      });
    } finally {
      refreshList();
    }
  };
  // END SET INTERVIEW METHOD

  const handleConfirm = async (action) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    switch (action) {
      case "update": // UPDATE PENDING REQUEST
        const res = await axios.put(
          `${config.API}/wedding/updateWedding/${data.requestID}`,
          formData
        );
        if (res.status !== 200) {
          // console.log("error updating request");
          setError({
            message: res.data.message,
            details: res.data?.details,
          });
        } else {
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
        sendSMS(data.service_id, formData, "cancel");
        await axios.post(`${config.API}/logs/create`, {
          activity: `Cancelled Wedding Request - Transaction number: ${data.transaction_no}`,
          user_id: currentUser.id,
          request_id: data.requestID,
        });
        closeInfoModal("cancel");
        break;
      case "approve": ///////////// APPROVE WEDDING ///////////
        try {
          if (formData.payment_status == "paid" && completeRequirements == 1) {
            const res = await axios.put(`${config.API}/request/update-bulk`, {
              formData: {
                ...formData,
                donation: formData.donation + paymentFee, // fee + additional from sponsors
              },
              id: data.requestID,
            });

            await axios.put(`${config.API}/wedding/update-bulk`, {
              weddingInfo,
              id: data.requestID,
            });

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
            if (response.status !== 200) {
              setError({
                message: response.data.message,
                details: response.data?.details,
              });
            } else {
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
              axios.post(`${config.API}/priest/createPriestSched`, {
                date: dayjs(formData.preferred_date).format("YYYY-MM-DD"),
                activity: `Wedding of ${formData.first_name} and ${weddingInfo.spouse_firstName}`,
                start_time: formData.preferred_time,
                end_time: endTime(formData.preferred_time, service.duration),
                priest_id: formData.priest_id,
                request_id: formData.requestID,
              });

              axios.post(`${config.API}/logs/create`, {
                activity: `Approved Wedding of ${formData.first_name} and ${weddingInfo.spouse_firstName}`,
                user_id: currentUser.id,
                request_id: formData.requestID,
              });
              sendSMS(data.service_id, formData, "approve");
              closeInfoModal("approve");
              refreshList();
            }
          } else {
            setError({
              message: response.data?.message,
              details: response.data?.details,
            });
          }
        } catch (err) {
          setError({
            message: err.response.data?.message,
            details: err.response.data?.details,
          });
        } finally {
          refreshList();
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
        {!isLoading ? (
          <>
            <DialogTitle sx={{mt: 3, p: 2, textAlign: "center"}}>
              <b>Wedding Request Information</b>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{position: "absolute", right: 8, top: 8}}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{padding: 3}}>
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
                    value={weddingInfo?.spouse_firstName}
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Bride's Middle Name:</label>
                  <TextField
                    fullWidth
                    value={weddingInfo?.spouse_middleName}
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Bride's Last Name:</label>
                  <TextField
                    fullWidth
                    value={weddingInfo?.spouse_lastName}
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
                    sx={TextFieldStyle}>
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
                      {paymentFee != null
                        ? ` ₱${parseFloat(
                            paymentFee + formData?.donation
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`
                        : ""}
                    </strong>
                  </label>
                  <TextField
                    name="payment_status"
                    onChange={handleChange}
                    value={formData?.payment_status}
                    select
                    fullWidth
                    sx={TextFieldStyle}>
                    <MenuItem value="unpaid">Unpaid</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Typography sx={{display: "inline-block"}}>
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
                    }}>
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

                <Grid item xs={12} sm={3}>
                  <label>Interview Priest:</label>
                  <TextField
                    select
                    fullWidth
                    name="priest_id"
                    sx={TextFieldStyle}
                    value={formData.priest_id}
                    onChange={handleChange}>
                    {priests.map((priest) => (
                      <MenuItem key={priest.id} value={priest.priestID}>
                        {`${priest.first_name} ${priest.last_name}`}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <label>Interview Date:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      fullWidth
                      name="interview_date"
                      disablePast
                      sx={TextFieldStyle}
                      value={
                        formData.interview_date
                          ? dayjs(formData.interview_date)
                          : null
                      }
                      onChange={(date) =>
                        handleDateChange("interview_date", date)
                      }
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <label>Interview Time:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      fullWidth
                      timeSteps={{hours: 30, minutes: 30}}
                      minTime={dayjs().set("hour", 6)}
                      maxTime={dayjs().set("hour", 19)}
                      name="interview_time"
                      sx={TextFieldStyle}
                      value={
                        formData.interview_time
                          ? dayjs(formData.interview_time, "HH:mm:ss")
                          : null
                      }
                      onChange={(time) =>
                        handleTimeChange("interview_time", time)
                      }
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleSetInterview}
                    sx={{
                      backgroundColor: "#355173",
                      marginTop: "24px",
                      height: "40px",
                      color: "white",
                      "&:hover": {bgcolor: "#4C74A5"},
                    }}>
                    Assign INTERVIEW
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <hr className="my-1" />
                </Grid>

                {completeRequirements == 1 ? (
                  <>
                    <Grid item xs={12} sm={3}>
                      <label>Wedding Priest:</label>
                      <TextField
                        select
                        fullWidth
                        sx={TextFieldStyle}
                        value={formData.priest_id}
                        onChange={handleChange}>
                        {priests.map((priest) => (
                          <MenuItem key={priest.id} value={priest.priestID}>
                            {`${priest.first_name} ${priest.last_name}`}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <label>Wedding Date:</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          fullWidth
                          disablePast
                          minDate={
                            formData.interview_date
                              ? dayjs(formData.interview_date).add(1, "day")
                              : null
                          }
                          name="preferred_date"
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
                      <label>Wedding Time:</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          fullWidth
                          timeSteps={{hours: 30, minutes: 30}}
                          minTime={dayjs().set("hour", 6)}
                          maxTime={dayjs().set("hour", 19)}
                          name="preferred_time"
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

                    <Grid item xs={12} sm={3}>
                      {available === "Available" ? (
                        <span className="font-bold text-green-700 text-sm">
                          Church is Available
                        </span>
                      ) : available === "Unavailable" ? (
                        <span className="font-bold text-red-500 text-sm">
                          Church is Unavailable
                        </span>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                      <Button
                        fullWidth
                        disabled={
                          !available ||
                          available == "Unavailable" ||
                          formData.payment_status == "unpaid" ||
                          completeRequirements != 1
                        }
                        variant="contained"
                        onClick={() => handleOpenDialog("approve")}
                        sx={{
                          bgcolor: "#d1d1d1",
                          height: "40px",
                          fontWeight: "bold",
                          color: "#355173",
                          "&:hover": {bgcolor: "#f9f9f9"},
                        }}>
                        CONFIRM WEDDING
                      </Button>
                    </Grid>
                  </>
                ) : null}

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
          // Skeleton loading effect for the entire form
          <Grid container spacing={2} sx={{padding: 8}}>
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

export default WeddingPending;
