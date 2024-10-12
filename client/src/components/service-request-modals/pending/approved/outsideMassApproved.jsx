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
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import ConfirmationDialog from "../../../ConfirmationModal";
import config from "../../../../config";
import axios from "axios";
import util from "../../../../utils/DateTimeFormatter";
import dayjs from "dayjs";

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

const OutsideApproved = ({ open, data, handleClose }) => {
  const [radioValue, setRadioValue] = useState("");
  const [otherValue, setOtherValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service] = useState("outside mass");
  const [formData, setFormData] = useState({});
  const [priests, setPriests] = useState([]);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (open && data) {
      setFormData({
        type: data.type,
        first_name: data.first_name,
        address: data.address,
        requested_by: data.requested_by,
        contact_no: data.contact_no,
        preferred_date: dayjs(data.preferred_date).format("YYYY-MM-DD"),
        preferred_time: data.preferred_time,
        priest_id: data.priest_id,
        isParishioner: data.isParishioner,
        payment_status: data.payment_status,
        service_id: data.service_id,
      });
      console.log(formData);
      fetchPriest();
    }
  }, [open, data]);

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

  // const handleOtherChange = (e) => {
  //   setOtherValue(e.target.value);
  // };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const isOtherSelected = radioValue === "others";
  {
    /** for sameple if success, ari butang backend**/
  }
  const handleConfirm = async (action) => {
    switch (action) {
      // case 'approve':
      //   alert('Approval action confirmed.');
      //   break;
      case "update":
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
            activity: `Updated Outside Mass Request - Transaction number: ${data.transaction_no}`,
            user_id: 1,
            request_id: data.requestID,
          });
          console.log("logs success!");
          // refetchData();
          handleClose();
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
                activity: `Cancelled Outside Mass Request - Transaction number: ${data.transaction_no}`,
                user_id: 1,
                request_id: data.requestID,
              });
              console.log("logs success!");
            });
        } catch (err) {
          console.error("error updating request", err);
        }
        break;
        break;
      case "reschedule":
        alert("Reschedule action confirmed.");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        {formData && priests && formData ? (
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
                  Outside Mass Request Information
                </Typography>
              </Grid>

              <Grid item sm={1}>
                <label>Type:</label>
              </Grid>
              <Grid item sm={11}>
                <RadioGroup
                  row
                  name="type"
                  sx={{ marginTop: "-5px" }}
                  value={formData.type}
                  readonly
                >
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
                    disabled={isOtherSelected ? false : true}
                    value={otherValue}
                    sx={{
                      "& .MuiInputBase-root": { height: "30px" },
                      opacity: isOtherSelected ? 1 : 0.4,
                      marginTop: "5px",
                    }}
                  />
                </RadioGroup>
              </Grid>

              <Grid item sm={3.2}>
                <label>Celebration/Celebrator:</label>
              </Grid>
              <Grid item sm={8.8}>
                <TextField
                  fullWidth
                  sx={TextFieldStyle}
                  name="first_name"
                  value={formData.first_name}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item sm={1.3}>
                <label>Address:</label>
              </Grid>
              <Grid item sm={10.7}>
                <TextField
                  fullWidth
                  sx={TextFieldStyle}
                  name="address"
                  onChange={(e) => handleChange(e)}
                  value={formData.address}
                />
              </Grid>

              <Grid item sm={2.4}>
                <label>Contact Person:</label>
              </Grid>
              <Grid item sm={4}>
                <TextField
                  fullWidth
                  sx={TextFieldStyle}
                  name="requested_by"
                  onChange={(e) => handleChange(e)}
                  value={formData.requested_by}
                />
              </Grid>
              <Grid item sm={1.9}>
                <label>Contact no:</label>
              </Grid>
              <Grid item sm={3.7}>
                <TextField
                  fullWidth
                  sx={TextFieldStyle}
                  name="contact_no"
                  onChange={(e) => handleChange(e)}
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
                      Assigned
                    </p>
                  </div>
                  <div
                    style={{ flex: 1, height: "1px", backgroundColor: "black" }}
                  />
                </div>
              </Grid>

              <Grid item sm={3}>
                <label>Priest:</label>
                <TextField
                  disabled
                  fullWidth
                  sx={TextFieldStyleDis}
                  value={
                    priests.find(
                      (priest) => priest.priestID === formData.priest_id
                    )?.first_name +
                    " " +
                    priests.find(
                      (priest) => priest.priestID === formData.priest_id
                    )?.last_name
                  }
                />
              </Grid>
              <Grid item sm={3}>
                <label>Date:</label>
                <TextField
                  disabled
                  fullWidth
                  sx={TextFieldStyleDis}
                  value={util.formatDate(formData.preferred_date)}
                />
              </Grid>
              <Grid item sm={3}>
                <label>Time:</label>
                <TextField
                  disabled
                  fullWidth
                  sx={TextFieldStyleDis}
                  value={formData.preferred_time}
                />
              </Grid>
              {/* <Grid item sm={3}>
              <label>Venue:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis}/>
            </Grid> */}

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
                        width: "95px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Reschedule
                    </p>
                  </div>
                  <div
                    style={{ flex: 1, height: "1px", backgroundColor: "black" }}
                  />
                </div>
              </Grid>

              <Grid item sm={2.5}>
                <label>Priest:</label>
                <TextField fullWidth select sx={TextFieldStyle} />
              </Grid>
              <Grid item sm={3}>
                <label>Date:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker fullWidth sx={TextFieldStyle} />
                </LocalizationProvider>
              </Grid>
              <Grid item sm={2.7}>
                <label>Time:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker fullWidth sx={TextFieldStyle} />
                </LocalizationProvider>
              </Grid>
              <Grid item sm={1.8}>
                <label>Venue:</label>
                <TextField disabled fullWidth sx={TextFieldStyle} />
              </Grid>
              <Grid item sm={2}>
                <Button
                  onClick={() => handleOpenDialog("reschedule")}
                  fullWidth
                  sx={{
                    bgcolor: "#247E38",
                    marginTop: "24px",
                    height: "30px",
                    fontWeight: "bold",
                    color: "white",
                    "&:hover": { bgcolor: "#34AC4F" },
                  }}
                >
                  SET
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
              service={service}
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
      </Modal>
    </>
  );
};

export default OutsideApproved;
