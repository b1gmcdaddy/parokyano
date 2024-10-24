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
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Menu,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import Snackbar from "@mui/material/Snackbar";
import { Skeleton } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import ConfirmationDialog from "../../ConfirmationModal";
import axios from "axios";
import config from "../../../config";
import dayjs from "dayjs";
import util from "../../../utils/DateTimeFormatter";
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
  maxHeight: "97vh",
  width: "100%",
  overflowY: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

const TextFieldStyle = {
  "& .MuiInputBase-root": { height: "30px" },
};

const TextFieldStyleDis = {
  "& .MuiInputBase-root": { height: "30px" },
  bgcolor: "#D9D9D9",
};

const endTime = (timeString, hoursToAdd) => {
  console.log(timeString, hoursToAdd);
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

const BaptismPending = ({ open, data, handleClose }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [available, setAvailable] = useState("");
  const [sponsors, setSponsors] = useState([]);
  const [details, setDetails] = useState({});
  const [priests, setPriests] = useState([]);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleDetailsChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
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

  const fetchSponsors = async (id) => {
    try {
      const response = await axios.get(`${config.API}/sponsor/retrieve`, {
        params: {
          reqID: id,
        },
      });
      setSponsors(response.data.result);
      return;
    } catch (err) {
      console.error("error retrieving sponsors", err);
    }
  };

  const fetchBaptismDetails = async (id) => {
    try {
      const response = await axios.get(`${config.API}/baptism/retrieve`, {
        params: {
          reqID: id,
        },
      });
      console.log(response.data);
      setDetails({
        birthCert: response.data.result[0].birthCert,
        parent_marriageCert: response.data.result[0].parent_marriageCert,
        gender: response.data.result[0].gender,
        father_age: response.data.result[0].father_age,
        mother_age: response.data.result[0].mother_age,
      });

      return;
    } catch (err) {
      console.error("error retrieving sponsors", err);
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

  // useEffect(() => {

  // }, [open, data]);

  useEffect(() => {
    setIsLoading(true);
    if (open && data) {
      new Promise((resolve) => {
        setFormData({
          // requestID: data.requestID,
          first_name: data.first_name || "",
          middle_name: data.middle_name || "",
          last_name: data.last_name || "",
          birth_date: dayjs(data.birth_date).format("YYYY-MM-DD"),
          birth_place: data.birth_place || "",
          // gender: details?.gender || "",
          father_name: data.father_name || "",
          // father_age: details?.father_age || "",
          mother_name: data.mother_name || "",
          // mother_age: details?.mother_age || "",
          payment_method: data.payment_method || "",
          preferred_date: dayjs(data.preferred_date).format("YYYY-MM-DD"),
          preferred_time: data.preferred_time || "",
          priest_id: data.priest_id || "",
          payment_status: data.payment_status || "",
          transaction_no: data.transaction_no || "",
          gcashRefNo: data.gcashRefNo || "",
        });
        fetchPriest();
        fetchService();
        fetchSponsors(data.requestID);
        fetchBaptismDetails(data.requestID);
        resolve();
      });
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
        },
      }
    );
    console.log(avail.data.message);
    setAvailable(avail.data.message);
  };

  useEffect(() => {
    if (formData && service)
      fetchAvailability(
        formData.preferred_date,
        formData.preferred_time,
        endTime(formData.preferred_time, service.duration)
      );
  }, [
    formData?.preferred_date,
    formData?.preferred_time,
    formData?.priest_id,
    service,
    open,
  ]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  {
    /** for sameple if success, ari butang backend**/
  }
  const handleConfirm = async (action) => {
    switch (action) {
      case "approve":
        console.log(formData);
        try {
          if (
            (formData.payment_status === "paid" && details.birthCert == 1,
            details.parent_marriageCert == 1)
          ) {
            const res = await axios.put(`${config.API}/request/update-bulk`, {
              formData,
              id: data.requestID,
            });
            await axios.put(`${config.API}/baptism/update-bulk`, {
              details,
              id: data.requestID,
            });
            console.log("updated!", res);
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
            console.log(response.status);
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
                  col3: "preferred_date",
                  val3: dayjs(formData.preferred_date).format("YYYY-MM-DD"),
                  col4: "priest_id",
                  val4: formData.priest_id,
                  col5: "requestID",
                  val5: data.requestID,
                },
              });
              console.log("request success!");
              axios.post(`${config.API}/priest/createPriestSched`, {
                date: dayjs(formData.preferred_date).format("YYYY-MM-DD"),
                activity: `Baptism for ${formData.first_name} ${formData.last_name}`,
                start_time: formData.preferred_time,
                end_time: endTime(formData.preferred_time, service.duration),
                priest_id: formData.priest_id,
                request_id: formData.requestID,
              });
              console.log("priest sched success!");
              axios.post(`${config.API}/logs/create`, {
                activity: `Approved Baptism for ${formData.first_name} ${formData.last_name}`,
                user_id: 1,
                request_id: data.requestID,
              });
              console.log("logs success!");
              // sendSMS(data.service_id, formData, "approve");
              handleClose();
              window.location.reload();
            }
          } else {
            setError({
              message: "Requirements not met",
              details:
                "Please complete all requirements and have payment ready to proceed",
            });
          }
        } catch (err) {
          console.log("error submitting to server", err);
        }
        break;
      case "update":
        const response = await axios.put(`${config.API}/request/update-bulk`, {
          formData,
          id: data.requestID,
        });
        if (response.status !== 200) {
          setError({
            message: response.data.message,
            details: response.data?.details,
          });
        } else {
          console.log("request updated!");
          axios.post(`${config.API}/logs/create`, {
            activity: `Updated Pending Baptism Request`,
            user_id: 1,
            request_id: data.requestID,
          });
          console.log("logs success!");
          handleClose();
          window.location.reload();
        }
        break;
      case "cancel":
        try {
          axios.put(`${config.API}/request/update`, null, {
            params: {
              col: "status",
              val: "cancelled",
              id: data.requestID,
            },
          });
          // sendSMS(data.service_id, formData, "cancel");
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
                activity: `Cancelled Pending Request for Baptism`,
                user_id: 1,
                request_id: data.requestID,
              });
              console.log("logs success!");
              window.location.reload();
            });

          handleClose();
          break;
        } catch (err) {
          console.error("error updating request", err);
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
          {!isLoading ? (
            <>
              <Grid container justifyContent={"flex-end"}>
                <Grid item>
                  <IconButton onClick={handleClose} size="small">
                    <FontAwesomeIcon icon={faXmark} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container justifyContent={"center"} spacing={0.8}>
                <Grid item sm={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Baptism Request Information
                  </Typography>
                </Grid>
                <Grid item sm={4}>
                  <label>First name of child:</label>
                  <TextField
                    value={formData.first_name}
                    fullWidth
                    name="first_name"
                    onChange={handleChange}
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Middle name of child:</label>
                  <TextField
                    name="middle_name"
                    onChange={handleChange}
                    value={formData.middle_name}
                    fullWidth
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Last name of child:</label>
                  <TextField
                    name="last_name"
                    onChange={handleChange}
                    value={formData.last_name}
                    fullWidth
                    sx={TextFieldStyle}
                  />
                </Grid>

                <Grid item sm={4}>
                  <label>Date of Birth:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      name="birth_date"
                      fullWidth
                      type="date"
                      sx={TextFieldStyle}
                      value={
                        formData.birth_date ? dayjs(formData.birth_date) : null
                      }
                      onChange={(birth_date) =>
                        handleDateChange("birth_date", birth_date)
                      }
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item sm={4}>
                  <label>Place of brith:</label>
                  <TextField
                    name="birth_place"
                    onChange={handleChange}
                    value={formData.birth_place}
                    fullWidth
                    sx={TextFieldStyle}
                  />
                </Grid>

                <Grid item sm={4}>
                  <label>Gender:</label>
                  <TextField
                    value={details?.gender}
                    fullWidth
                    name="gender"
                    select
                    onChange={handleDetailsChange}
                    sx={TextFieldStyle}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                </Grid>

                <Grid item sm={9}>
                  <label>Father's complete name:</label>
                  <TextField
                    name="father_name"
                    onChange={handleChange}
                    value={formData.father_name}
                    fullWidth
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={3}>
                  <label>Age:</label>
                  <TextField
                    value={details?.father_age}
                    name="father_age"
                    onChange={handleDetailsChange}
                    type="number"
                    fullWidth
                    sx={TextFieldStyle}
                  />
                </Grid>

                <Grid item sm={9}>
                  <label>Mother's complete name:</label>
                  <TextField
                    value={formData.mother_name}
                    name="mother_name"
                    onChange={handleChange}
                    fullWidth
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={3}>
                  <label>Age:</label>
                  <TextField
                    value={details?.mother_age}
                    name="mother_age"
                    onChange={handleDetailsChange}
                    type="number"
                    fullWidth
                    sx={TextFieldStyle}
                  />
                </Grid>

                <Grid item sm={12}>
                  <Grid container spacing={2}>
                    <Grid item sm={8}>
                      <Grid container>
                        <Grid item sm={8}>
                          <Typography variant="subtitle1">
                            Godparents:
                          </Typography>
                        </Grid>
                        <Grid item sm={4}>
                          <Typography variant="subtitle1">Catholic?</Typography>
                        </Grid>
                      </Grid>
                      <Box
                        fullWidth
                        sx={{ height: "175px", overflowY: "auto" }}
                      >
                        {" "}
                        {/* Ninong */}
                        <Grid container>
                          {sponsors &&
                            sponsors.map((godparent, index) => (
                              <Grid container spacing={2} key={index}>
                                <Grid item sm={0.7}>
                                  <p>{index + 1}.</p>
                                </Grid>
                                <Grid item sm={6.3}>
                                  <TextField
                                    fullWidth
                                    value={godparent.name}
                                    sx={TextFieldStyle}
                                    name="godparent"
                                  />
                                </Grid>
                                <Grid item sm={5}>
                                  <RadioGroup
                                    row
                                    defaultValue={godparent.isCatholic}
                                    sx={{ marginTop: "-7px" }}
                                    value={godparent.isCatholic}
                                  >
                                    <FormControlLabel
                                      value="1"
                                      control={<Radio />}
                                      label="Yes"
                                    />
                                    <FormControlLabel
                                      value="0"
                                      control={<Radio />}
                                      label="No"
                                    />
                                  </RadioGroup>
                                </Grid>
                              </Grid>
                            ))}
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item sm={4}>
                      <Box fullWidth sx={{ height: "175px" }}>
                        <Grid container>
                          <Grid item sm={12}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold" }}
                            >
                              Requirements:
                            </Typography>
                          </Grid>
                          <Grid item sm={12}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="birthCert"
                                  checked={details?.birthCert === 1}
                                  onChange={(e) =>
                                    handleDetailsChange({
                                      target: {
                                        name: e.target.name,
                                        value: e.target.checked ? 1 : 0,
                                      },
                                    })
                                  }
                                />
                              }
                              label={
                                <Typography sx={{ fontSize: "13px" }}>
                                  Photocopy of Birth Certificate
                                </Typography>
                              }
                            />
                          </Grid>

                          <Grid item sm={12}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="parent_marriageCert"
                                  checked={details?.parent_marriageCert === 1}
                                  onChange={(e) =>
                                    handleDetailsChange({
                                      target: {
                                        name: e.target.name,
                                        value: e.target.checked ? 1 : 0,
                                      },
                                    })
                                  }
                                />
                              }
                              label={
                                <Typography sx={{ fontSize: "13px" }}>
                                  Photocopy of Parent - Marriage Certificate
                                </Typography>
                              }
                            />
                          </Grid>
                          <Grid item sm={12}>
                            <Typography
                              variant="subtitle1"
                              sx={{ display: "inline-block" }}
                            >
                              Payment:
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: "bold",
                                display: "inline-block",
                                marginLeft: "10px",
                              }}
                            >
                              800
                            </Typography>
                          </Grid>
                          <Grid item sm={6}>
                            <TextField
                              fullWidth
                              name="payment_method"
                              onChange={handleChange}
                              value={formData.payment_method}
                              sx={TextFieldStyle}
                              select
                            >
                              <MenuItem value="cash">Cash</MenuItem>
                              <MenuItem value="gcash">Gcash</MenuItem>
                            </TextField>
                          </Grid>
                          <Grid item sm={6}>
                            <TextField
                              value={formData.payment_status}
                              name="payment_status"
                              onChange={handleChange}
                              fullWidth
                              select
                              sx={TextFieldStyle}
                            >
                              <MenuItem value="unpaid">unpaid</MenuItem>
                              <MenuItem value="paid">paid</MenuItem>
                            </TextField>
                          </Grid>
                          {formData && formData.payment_method === "gcash" && (
                            <Grid item sm={12} sx={{ mt: 1 }}>
                              <TextField
                                value={`gcash ref no. ${formData.gcashRefNo}`}
                                name="gcashRefNo"
                                onChange={handleChange}
                                fullWidth
                                readonly
                                sx={TextFieldStyleDis}
                              />
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
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
                      style={{
                        flex: 0.1,
                        height: "1px",
                        backgroundColor: "black",
                      }}
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
                      style={{
                        flex: 1,
                        height: "1px",
                        backgroundColor: "black",
                      }}
                    />
                  </div>
                </Grid>

                <Grid item sm={2.7}>
                  <label>Priest:</label>
                  <TextField
                    value={formData.priest_id}
                    fullWidth
                    name="priest_id"
                    select
                    onChange={handleChange}
                    sx={TextFieldStyle}
                  >
                    {priests.map((priest) => (
                      <MenuItem key={priest.priestID} value={priest.priestID}>
                        {priest.first_name + " " + priest.last_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item sm={2.4}>
                  <label>Date:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      type="date"
                      fullWidth
                      name="preferred_date"
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
                      sx={TextFieldStyle}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item sm={2.2}>
                  <label>Time:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      type="time"
                      fullWidth
                      name="preferred_time"
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
                      sx={TextFieldStyle}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item sm={1.8}>
                  <label>Church:</label>
                  <TextField
                    fullWidth
                    sx={{
                      "& .MuiInputBase-root": { height: "30px" },
                      bgcolor:
                        available === "Available" ? "#AFE1AF" : "#d67373",
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
                service={"baptism"}
              />
            </>
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
        </Box>
      </Modal>
    </>
  );
};

export default BaptismPending;
