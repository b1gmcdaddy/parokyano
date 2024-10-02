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
import util from "../../../utils/DateTimeFormatter";
import config from "../../../config";
import axios from "axios";

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
  "& .MuiInputBase-root": {height: "30px"},
};

const TextFieldStyleDis = {
  "& .MuiInputBase-root": {height: "30px"},
  bgcolor: "#D9D9D9",
};

const BlessingPending = ({open, data, handleClose}) => {
  const [radioValue, setRadioValue] = useState("");
  const [otherValue, setOtherValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service] = useState("blessing");
  const [priests, setPriests] = useState([]);
  const [formData, setFormData] = useState({
    type: data.type,
    first_name: data.first_name,
    last_name: data.last_name,
    address: data.address,
    requested_by: data.requested_by,
    contact_no: data.contact_no,
    preferred_date: data.preferred_date,
    preferred_time: data.preferred_time,
    preferred_priest: data.priest_id,
    isParishioner: data.isParishioner,
    transaction_no: data.transaction_no,
    service_id: 13,
  });

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
  }, []);

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleDateChange = (name, date) => {
    setFormData({...formData, [name]: date.format("YYYY-MM-DD")});
    console.log(formData.preferred_date);
  };

  const handleTimeChange = (name, time) => {
    setFormData({...formData, [name]: time.format("HH-mm-ss")});
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

  const isOtherSelected = radioValue === "others";

  {
    /** for sameple if success, ari butang backend**/
  }
  const handleConfirm = (action) => {
    switch (action) {
      case "approve":
        console.log(formData);
        break;
      case "update":
        console.log(formData);
        break;
      case "cancel":
        alert("Cancel action confirmed.");
        break;
      default:
        break;
    }
  };

  return (
    <>
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
                sx={{textAlign: "center", fontWeight: "bold"}}>
                Blessing Request Information
              </Typography>
            </Grid>

            <Grid item sm={1}>
              <label>Type:</label>
            </Grid>
            <Grid item sm={11}>
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
                fullWidth
                sx={TextFieldStyle}
                value={
                  formData.first_name + " " + formData.last_name
                }></TextField>
            </Grid>

            <Grid item sm={1.3}>
              <label>Address:</label>
            </Grid>
            <Grid item sm={10.7}>
              <TextField
                fullWidth
                sx={TextFieldStyle}
                value={formData.address}
                readonly
              />
            </Grid>

            <Grid item sm={2.2}>
              <label>Requested by:</label>
            </Grid>
            <Grid item sm={3.7}>
              <TextField
                fullWidth
                sx={TextFieldStyle}
                value={formData.requested_by}
                readonly
              />
            </Grid>
            <Grid item sm={1.9}>
              <label>Contact no:</label>
            </Grid>
            <Grid item sm={4.2}>
              <TextField
                fullWidth
                sx={TextFieldStyle}
                value={formData.contact_no}
                readonly
              />
            </Grid>

            <Grid item sm={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <div
                  style={{flex: 0.1, height: "1px", backgroundColor: "black"}}
                />
                <div>
                  <p
                    style={{
                      width: "80px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}>
                    Preferred
                  </p>
                </div>
                <div
                  style={{flex: 1, height: "1px", backgroundColor: "black"}}
                />
              </div>
            </Grid>

            <Grid item sm={3}>
              <label>Priest:</label>
              <TextField
                fullWidth
                sx={TextFieldStyle}
                value={formData.preferred_priest}
              />
            </Grid>
            <Grid item sm={3}>
              <label>Date:</label>
              <TextField
                fullWidth
                sx={TextFieldStyle}
                value={
                  formData.preferred_date
                    ? util.formatDate(formData.preferred_date)
                    : ""
                }
              />
            </Grid>
            <Grid item sm={3}>
              <label>Time:</label>
              <TextField
                fullWidth
                sx={TextFieldStyle}
                type="time"
                value={formData.preferred_time}
              />
            </Grid>
            <Grid item sm={2}>
              <Button
                fullWidth
                onClick={() => handleOpenDialog("approve")}
                sx={{
                  backgroundColor: "#355173",
                  marginTop: "24px",
                  height: "30px",
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": {bgcolor: "#4C74A5"},
                }}>
                Assign
              </Button>
            </Grid>

            <Grid item sm={12}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <div
                  style={{flex: 0.1, height: "1px", backgroundColor: "black"}}
                />
                <div>
                  <p
                    style={{
                      width: "80px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}>
                    Assigned
                  </p>
                </div>
                <div
                  style={{flex: 1, height: "1px", backgroundColor: "black"}}
                />
              </div>
            </Grid>

            <Grid item sm={3}>
              <label>Priest:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis} />
            </Grid>
            <Grid item sm={3}>
              <label>Date:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis} />
            </Grid>
            <Grid item sm={3}>
              <label>Time:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis} />
            </Grid>
            <Grid item sm={2}>
              <Button
                fullWidth
                sx={{
                  bgcolor: "#BBB6B6",
                  marginTop: "24px",
                  height: "30px",
                  fontWeight: "bold",
                  color: "#355173",
                  "&:hover": {bgcolor: "#D3CECE"},
                }}>
                CLEAR
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
          <ConfirmationDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            action={currentAction}
            onConfirm={handleConfirm}
            service={service}
          />
        </Box>
      </Modal>
    </>
  );
};

export default BlessingPending;
