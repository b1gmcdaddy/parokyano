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
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import ConfirmationDialog from "../../../ConfirmationModal";
import util from "../../../../utils/DateTimeFormatter";
import config from "../../../../config";
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
  "& .MuiInputBase-root": { height: "30px" },
};

const TextFieldStyleDis = {
  "& .MuiInputBase-root": { height: "30px" },
  bgcolor: "#D9D9D9",
};

const AnointingApproved = ({ open, data, handleClose }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [formData, setFormData] = useState({});
  const [service] = useState("anointing");

  useEffect(() => {
    if (open && data) {
      setFormData({
        requestID: data.requestID,
        type: data.type,
        age: data.age,
        first_name: data.first_name,
        last_name: data.last_name,
        relationship: data.relationship,
        spouse_name: data.spouse_name,
        address: data.address,
        requested_by: data.requested_by,
        contact_no: data.contact_no,
        preferred_date: data.preferred_date,
        preferred_time: data.preferred_time,
        preferred_priest: data.preferred_priest,
        isParishioner: data.isParishioner,
        transaction_no: data.transaction_no,
        patient_status: data.patient_status,
        payment_status: data.payment_status,
        service_id: data.service_id,
      });
    }
  }, [open, data]);

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
      // case 'approve':
      //   alert('Approval action confirmed.');
      //   break;
      case "update":
        alert("Update action confirmed.");
        break;
      case "cancel":
        try {
          axios.put(`${config.API}/request/update`, null, {
            params: {
              col: "status",
              val: "cancelled",
              id: formData.requestID,
            },
          });

          console.log("request cancelled!");
          // axios.delete(`${config.API}/priest/deleteSched`, {
          //   params: {
          //     col: "request_id",
          //     val: formData.requestID,
          //   },
          // });
          console.log("priest sched deleted!");
        } catch (err) {
          console.error("error updating request", err);
        }
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
        {formData && formData ? (
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
                  Anointing of the Sick Request Information
                </Typography>
              </Grid>

              <Grid item sm={1}>
                <label>Name:</label>
              </Grid>
              <Grid item sm={8}>
                <TextField
                  fullWidth
                  sx={TextFieldStyle}
                  value={formData.first_name}
                />
              </Grid>
              <Grid item sm={0.8}>
                <label>Age:</label>
              </Grid>
              <Grid item sm={2.2}>
                <TextField fullWidth sx={TextFieldStyle} value={formData.age} />
              </Grid>

              <Grid item sm={1.3}>
                <label>Address:</label>
              </Grid>
              <Grid item sm={10.7}>
                <TextField
                  fullWidth
                  sx={TextFieldStyle}
                  value={formData.address}
                />
              </Grid>

              <Grid item sm={2.2}>
                <label>Requested by:</label>
              </Grid>
              <Grid item sm={5}>
                <TextField
                  fullWidth
                  sx={TextFieldStyle}
                  value={formData.requested_by}
                />
              </Grid>
              <Grid item sm={1.9}>
                <label>Relationship:</label>
              </Grid>
              <Grid item sm={2.9}>
                <TextField
                  fullWidth
                  sx={TextFieldStyle}
                  value={formData.relationship}
                />
              </Grid>

              <Grid item sm={1.9}>
                <label>Contact no:</label>
              </Grid>
              <Grid item sm={4.9}>
                <TextField
                  fullWidth
                  sx={TextFieldStyle}
                  value={formData.contact_no}
                />
              </Grid>
              <Grid item sm={2.3}>
                <label>Sickness/Status:</label>
              </Grid>
              <Grid item sm={2.9}>
                <TextField
                  fullWidth
                  sx={TextFieldStyle}
                  value={formData.patient_status}
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

              <Grid item sm={4}>
                <label>Priest:</label>
                <TextField
                  disabled
                  fullWidth
                  sx={TextFieldStyleDis}
                  value={formData.preferred_priest}
                />
              </Grid>
              <Grid item sm={4}>
                <label>Date:</label>
                <TextField
                  disabled
                  fullWidth
                  sx={TextFieldStyleDis}
                  value={util.formatDate(formData.preferred_date)}
                />
              </Grid>
              <Grid item sm={4}>
                <label>Time:</label>
                <TextField
                  disabled
                  fullWidth
                  sx={TextFieldStyleDis}
                  value={formData.preferred_time}
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
              <Grid item sm={4}>
                <label>Date:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker fullWidth sx={TextFieldStyle} />
                </LocalizationProvider>
              </Grid>
              <Grid item sm={3.5}>
                <label>Time:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker fullWidth sx={TextFieldStyle} />
                </LocalizationProvider>
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
                <Typography variant="body2" sx={{ marginRight: "5px" }}>
                  Transaction Code:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
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

export default AnointingApproved;
