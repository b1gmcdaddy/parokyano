import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Modal,
  Box,
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import ConfirmationDialog from "../../ConfirmationModal";
import util from "../../../utils/DateTimeFormatter";
import axios from "axios";
import config from "../../../config";
import dayjs from "dayjs";
import sendSMS from "../../../utils/smsService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "md",
  bgcolor: "white",
  borderRadius: "10px",
  boxShadow: 3,
  px: 4,
  py: 3,
};

const TextFieldStyle = {
  "& .MuiInputBase-root": { height: "30px" },
};

const TextFieldStyleDis = {
  "& .MuiInputBase-root": { height: "30px" },
  bgcolor: "#D9D9D9",
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

const FuneralMassModalPending = ({ open, data, handleClose }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service, setService] = useState({});
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [available, setAvailable] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [priests, setPriests] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "", // in the case of outside mass, this is the field for the celebration/celebrator
    address: "",
    contact_no: "",
    requested_by: "", // this is the field for the contact person's name
    relationship: "",
    preferred_date: "",
    preferred_time: "",
    priest_id: "", // value is the  priest id
    isParishioner: "",
    transaction_no: "",
    service_id: "",
    type: "",
  });

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  // const formatDate = (dateString) => {
  //   if (!dateString) return "";
  //   const date = new Date(dateString);
  //   return date.toISOString().split("T")[0];
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

  useEffect(() => {
    setIsLoading(true);
    if (open && data) {
      new Promise((resolve) => {
        setFormData({
          requestID: data.requestID,
          first_name: data.first_name, // in the case of outside mass, this is the field for the celebration/celebrator
          address: null,
          contact_no: data.contact_no,
          requested_by: data.requested_by, // this is the field for the contact person's name
          relationship: data.relationship,
          preferred_date: dayjs(data.preferred_date).format("YYYY-MM-DD"),
          preferred_time: data.preferred_time,
          priest_id: data.priest_id, // value is the  priest id
          isParishioner: data.isParishioner,
          transaction_no: data.transaction_no,
          service_id: data.service_id,
          type: null,
        });
        fetchPriest();
        fetchService();
        resolve();
      });
    }
    setTimeout(() => {
      setIsLoading(false);
    }, "500");
  }, [open, data]);

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
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const fetchAvailability = async (date, start, end) => {
    const avail = await axios.get(
      `${config.API}/priest/retrieve-schedule-venue`,
      {
        params: {
          date: date,
          start: start,
          end: end,
        },
      }
    );
    console.log(avail.data.message);
    setAvailable(avail.data.message);
  };

  useEffect(() => {
    fetchAvailability(
      formData.preferred_date,
      formData.preferred_time,
      endTime(formData.preferred_time, service.duration)
    );
  }, [
    formData.preferred_date,
    formData.preferred_time,
    formData.priest_id,
    open,
  ]);

  {
    /** for sameple if success, ari butang backend**/
  }
  const handleConfirm = async (action) => {
    switch (action) {
      case "approve":
        console.log(formData);
        try {
          const currentUser = JSON.parse(localStorage.getItem("user"));
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
          } else {
            if (available === "Unavailable") {
              setError({
                message: available,
                details: "Church is unavailable",
              });
              return;
            }
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
              activity: `Funeral mass for ${formData.first_name}`,
              start_time: formData.preferred_time,
              end_time: endTime(formData.preferred_time, service.duration),
              priest_id: formData.priest_id,
              request_id: formData.requestID,
            });
            console.log("priest sched success!");
            axios.post(`${config.API}/logs/create`, {
              activity: `Approved Funeral Mass for ${formData.first_name}`,
              user_id: 1,
              request_id: formData.requestID,
            });
            console.log("logs success!");
            sendSMS(data.service_id, formData, "approve");
            handleClose();
          }
          window.location.reload();
        } catch (err) {
          setError({
            message: err.response.data.message,
            details: err.response.data.details,
          });
          console.log("error submitting to server", err);
        }
        break;
      case "update": // UPDATE PENDING REQUEST
        try {
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
              activity: `Updated Funeral Mass Request - Transaction number: ${data.transaction_no}`,
              user_id: currentUser.id,
              request_id: data.requestID,
            });
            console.log("logs success!");
            // refetchData();
          }
          window.location.reload();
        } catch (err) {
          console.error(err);
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
        // sendSMS(data.service_id, formData, "cancel");
        await axios.post(`${config.API}/logs/create`, {
          activity: `Cancelled FuneralMass Request - Transaction number: ${data.transaction_no}`,
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
              <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                {error.message}
              </span>
              <p>{error.details}</p>
            </>
          }
        />
      )}

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <IconButton onClick={handleClose} size="small">
                <FontAwesomeIcon icon={faXmark} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"} spacing={2}>
            <Grid item sm={12}>
              <Typography
                variant="subtitle1"
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                Funeral Mass Request Information
              </Typography>
            </Grid>
            <Grid item sm={4}>
              <label>Name of the deceased:</label>
            </Grid>
            <Grid item sm={8}>
              <TextField
                fullWidth
                name="first_name"
                onChange={handleChange}
                sx={TextFieldStyle}
                value={formData.first_name}
              />
            </Grid>

            <Grid item sm={4}>
              <label>Requested by:</label>
            </Grid>
            <Grid item sm={8}>
              <TextField
                fullWidth
                name="requested_by"
                onChange={handleChange}
                sx={TextFieldStyle}
                value={formData.requested_by}
              />
            </Grid>

            <Grid item sm={4.3}>
              <label>Relationship to the deceased:</label>
            </Grid>
            <Grid item sm={7.7}>
              <TextField
                fullWidth
                name="relationship"
                onChange={handleChange}
                sx={TextFieldStyle}
                value={formData.relationship}
              />
            </Grid>

            <Grid item sm={4}>
              <label>Contact Number:</label>
            </Grid>
            <Grid item sm={8}>
              <TextField
                fullWidth
                onChange={handleChange}
                name="contact_no"
                sx={TextFieldStyle}
                value={formData.contact_no}
              />
            </Grid>

            <Grid item sm={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ flex: 0.1, height: "1px", backgroundColor: "black" }}
                />
                <div>
                  <p
                    style={{
                      width: "80px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Preferred
                  </p>
                </div>
                <div
                  style={{ flex: 1, height: "1px", backgroundColor: "black" }}
                />
              </div>
            </Grid>

            <Grid item sm={2.7}>
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
                    {priest.first_name + " " + priest.last_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item sm={2.5}>
              <label>Date:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  fullWidth
                  sx={TextFieldStyle}
                  value={
                    formData.preferred_date
                      ? dayjs(formData.preferred_date)
                      : null
                  }
                  onChange={(date) => handleDateChange("preferred_date", date)}
                  renderInput={(params) => <TextField {...params} required />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item sm={2.2}>
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
                  onChange={(time) => handleTimeChange("preferred_time", time)}
                  renderInput={(params) => <TextField {...params} required />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item sm={1.8}>
              <label>Church:</label>
              <TextField
                fullWidth
                sx={{
                  "& .MuiInputBase-root": { height: "30px" },
                  bgcolor: available === "Available" ? "#AFE1AF" : "#d67373",
                }}
                value={available}
                readonly
              />
            </Grid>
            <Grid item sm={2}>
              <Button
                onClick={() => handleOpenDialog("approve")}
                fullWidth
                sx={{
                  backgroundColor: "#355173",
                  marginTop: "24px",
                  height: "30px",
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": { bgcolor: "#4C74A5" },
                }}
                disabled={available === "Unavailable"}
              >
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
              <Button
                onClick={() => handleOpenDialog("update")}
                sx={{
                  bgcolor: "#CDAB52",
                  marginTop: "14px",
                  height: "35px",
                  width: "90px",
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": { bgcolor: "#F0CA67" },
                }}
                disabled={available === "Unavailable"}
              >
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
                  "&:hover": { bgcolor: "#F05A5A" },
                }}
              >
                CANCEL
              </Button>
            </Grid>
          </Grid>
          <ConfirmationDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            action={currentAction}
            onConfirm={handleConfirm}
            service={"funeral mass"}
          />
        </Box>
      </Modal>
    </>
  );
};

export default FuneralMassModalPending;
