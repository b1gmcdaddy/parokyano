import React, {useState, useEffect} from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  DialogActions,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import config from "../../config";
import util from "../../utils/DateTimeFormatter";
import ConfirmationDialog from "../ConfirmationModal";
import sendSMS from "../../utils/smsService";

const CompareRecords = ({open, close, certData, recordData}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");

  useEffect(() => {
    console.log(recordData);
  }, [open, recordData]);

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.put(
        `${config.API}/request/approve-dynamic`,
        null,
        {
          params: {
            col: "status",
            val: "approved",
            col4: "requestID",
            val4: certData.requestID,
          },
        }
      );
      // INSERT to LoGS
      axios.post(`${config.API}/logs/create`, {
        activity: `Approved Certificate Request for ${certData.first_name} ${certData.last_name}`,
        user_id: 1,
        request_id: certData.requestID,
      });
      console.log("logs success!");
      // sendSMS(certData.service_id, certData, "approve-cert");
      alert("Updated successfully");

      close();
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating.");
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogContent sx={{padding: "3em"}}>
        <Box sx={{display: "flex", justifyContent: "center", gap: 2}}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              margin: "10px",
            }}>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "10px",
                fontSize: "20px",
              }}>
              COMPARISON VIEW
            </Typography>
            <IconButton
              aria-label="close"
              onClick={close}
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Box>
        <Grid container spacing={1} sx={{marginTop: "1em"}}>
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}>
                  {recordData.service_id == 5 || recordData == 6
                    ? "BAPTISM"
                    : "MARRIAGE"}{" "}
                  RECORD
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <label>First Name: </label>
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  value={recordData.first_name}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <label>Middle Name: </label>
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  value={recordData.middle_name}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <label>Last Name: </label>
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  value={recordData.last_name}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <label>Contact Number: </label>
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  value={recordData.contact_no}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <label>Date of Birth: </label>
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  value={util.formatDate(recordData.birth_date)}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                {recordData.service_id === 5 ? (
                  <label>Date of Baptism</label>
                ) : (
                  <label>Date of Marriage</label>
                )}
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  value={util.formatDate(recordData.preferred_date)}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <label>Birth Place: </label>
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  value={recordData.birth_place}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <label>Father's Name: </label>
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  value={recordData.father_name}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <label>Mother's Name: </label>
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  value={recordData.mother_name}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <label>Book no.: </label>
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  value={
                    certData.details ? JSON.parse(certData.details).book_no : ""
                  }
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <label>Page no.: </label>
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  value={
                    certData.details ? JSON.parse(certData.details).page_no : ""
                  }
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <label>Line no.: </label>
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  value={
                    certData.details ? JSON.parse(certData.details).line_no : ""
                  }
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100%",
            }}>
            <Divider orientation="vertical" variant="middle" flexItem />
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}>
                  CERTIFICATE REQUEST
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <label>First Name: </label>
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  color="success"
                  focused
                  value={certData.first_name}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <label>Last Name: </label>
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  color="success"
                  focused
                  value={certData.last_name}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              {certData.service_id == 3 ? (
                <>
                  <Grid item xs={6}>
                    <label>Father's Name: </label>
                    <TextField
                      size="small"
                      fullWidth
                      variant="filled"
                      color="success"
                      focused
                      value={certData.father_name}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <label>Mother's Name: </label>
                    <TextField
                      size="small"
                      fullWidth
                      variant="filled"
                      color="success"
                      focused
                      value={certData.father_name}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    />
                  </Grid>
                </>
              ) : null}
              <Grid item xs={12}>
                <label>Birth Place: </label>
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  color="success"
                  focused
                  value={certData.birth_place}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <label>Date of Birth: </label>
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  color="success"
                  focused
                  value={util.formatDate(certData.birth_date)}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
              {certData.service_id == 4 ? (
                <>
                  <Grid item xs={12}>
                    <label>Date of Marriage: </label>
                    <TextField
                      size="small"
                      fullWidth
                      variant="filled"
                      color="success"
                      focused
                      value={util.formatDate(certData.preferred_date)}
                      slotProps={{
                        inputLabel: {
                          shrink: true,
                        },
                      }}
                    />
                  </Grid>
                </>
              ) : null}
              <Grid item xs={12}>
                <label>Contact No: </label>
                <TextField
                  size="small"
                  fullWidth
                  variant="filled"
                  color="success"
                  focused
                  value={certData.contact_no}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Grid>
            </Grid>
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
            marginY: "16px",
          }}>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}>
            <Button
              onClick={() => handleOpenDialog("approve")}
              sx={{
                backgroundColor: "#44C360",
                color: "white",
                "&:hover": {
                  backgroundColor: "green",
                },
              }}>
              Confirm
            </Button>
            <Button
              onClick={close}
              sx={{
                backgroundColor: "#d9d9d9",
                color: "black",
                paddingX: "12px",
              }}>
              Close
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
      {/* START Confirmation Dialog */}
      <ConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        action={currentAction}
        onConfirm={handleConfirm}
        service={"certificate"}
      />
      {/* END Confirmation Dialog */}
    </Dialog>
  );
};

export default CompareRecords;
