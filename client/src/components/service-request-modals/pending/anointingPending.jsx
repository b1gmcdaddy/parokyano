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
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useState} from "react";
import ConfirmationDialog from "../../ConfirmationModal";

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

const AnointingPending = ({open, handleClose, request}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service] = useState("anointing");

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  {
    /** for sameple if success, ari butang backend**/
  }
  const handleConfirm = (action) => {
    switch (action) {
      case "approve":
        alert("Approval action confirmed.");
        break;
      case "update":
        alert("Update action confirmed.");
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
                Anointing of the Sick Request Information
              </Typography>
            </Grid>

            <Grid item sm={1}>
              <label>Name:</label>
            </Grid>
            <Grid item sm={8}>
              <TextField
                fullWidth
                value={request.first_name}
                sx={TextFieldStyle}
              />
            </Grid>
            <Grid item sm={0.8}>
              <label>Age:</label>
            </Grid>
            <Grid item sm={2.2}>
              <TextField fullWidth value={request.age} sx={TextFieldStyle} />
            </Grid>

            <Grid item sm={1.3}>
              <label>Address:</label>
            </Grid>
            <Grid item sm={10.7}>
              <TextField
                fullWidth
                value={request.address}
                sx={TextFieldStyle}
              />
            </Grid>

            <Grid item sm={2.2}>
              <label>Requested by:</label>
            </Grid>
            <Grid item sm={5}>
              <TextField
                fullWidth
                value={request.requested_by}
                sx={TextFieldStyle}
              />
            </Grid>
            <Grid item sm={1.9}>
              <label>Relationship:</label>
            </Grid>
            <Grid item sm={2.9}>
              <TextField
                fullWidth
                value={request.relationship}
                sx={TextFieldStyle}
              />
            </Grid>

            <Grid item sm={1.9}>
              <label>Contact no:</label>
            </Grid>
            <Grid item sm={4.9}>
              <TextField
                fullWidth
                value={request.contact_no}
                sx={TextFieldStyle}
              />
            </Grid>
            <Grid item sm={2.3}>
              <label>Sickness/Status:</label>
            </Grid>
            <Grid item sm={2.9}>
              <TextField
                fullWidth
                value={request.patient_status}
                sx={TextFieldStyle}
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
              <TextField fullWidth select sx={TextFieldStyle} />
            </Grid>
            <Grid item sm={3}>
              <label>Date:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker fullWidth sx={TextFieldStyle} />
              </LocalizationProvider>
            </Grid>
            <Grid item sm={3}>
              <label>Time:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker fullWidth sx={TextFieldStyle} />
              </LocalizationProvider>
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
                040124hash
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

export default AnointingPending;
