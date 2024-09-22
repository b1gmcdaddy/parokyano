import React, {useState, useEffect} from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogContent,
  Grid,
  Select,
  MenuItem,
  Typography,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import config from "../config";

// const formatTime = (time24) => {
//   let [hour, minute] = time24.split(":");
//   hour = parseInt(hour);
//   const period = hour >= 12 ? "PM" : "AM";
//   hour = hour % 12 || 12; // Convert hour to 12-hour format
//   return `${hour}:${minute} ${period}`;
// };

// const formatDate = (rawDate) => {
//   const formatted = new Date(rawDate).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
//   return formatted;
// };

const BaptismCertInfoModal = ({open, data, close}) => {
  // const details = JSON.parse(data.details);
  // const schedule =
  //   formatTime(data.preferred_time) +
  //   " ,  " +
  //   formatDate(data.preferred_date.slice(0, 10));

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogContent>
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
              }}>
              Baptismal Certificate Request Information
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{height: "auto", padding: "0px 10px", overflowY: "auto"}}>
              <Grid item xs={12} sm={4}>
                <label>First Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  fullWidth
                  size="small"
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Middle Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  fullWidth
                  size="small"
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Last Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Place of Birth: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Contact No: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Place of Birth: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Contact No: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Father's Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Mother's Maiden Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Baptism: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Request: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Purpose: </label>
                <Select
                  labelId="demo-simple-select-label"
                  fullWidth
                  size="small"
                  id="demo-simple-select"
                  // value={age}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>&nbsp;</label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  placeholder="DISABLED"
                  fullWidth
                  disabled
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
            </Grid>

            <Typography
              fontSize={"medium"}
              sx={{textAlign: "center", marginTop: "12px"}}>
              Transaction no: <b>{data.transaction_no}</b>
            </Typography>
            {data.status === "paid" && (
              <Typography fontSize={"small"} sx={{textAlign: "center"}}>
                Approved by: dummyDataStaffName
              </Typography>
            )}
            <DialogActions>
              <Grid
                container
                spacing={2}
                sx={{justifyContent: "center", alignItems: "center"}}>
                {data.payment_status === "unpaid" && (
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      // onClick={() => updatePayment(data.requestID, close)}
                    >
                      Mark as Paid
                    </Button>
                  </Grid>
                )}
                <Grid item xs={12} sm={"auto"}>
                  <Button variant="contained" color="error" onClick={close}>
                    Close
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const ConfirmationCertInfoModal = ({open, data, close}) => {
  // const details = JSON.parse(data.details);
  // const schedule =
  //   formatTime(data.preferred_time) +
  //   " ,  " +
  //   formatDate(data.preferred_date.slice(0, 10));

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogContent>
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
              }}>
              Confirmation Certificate Request Information
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{height: "auto", padding: "0px 10px", overflowY: "auto"}}>
              <Grid item xs={12} sm={4}>
                <label>First Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  fullWidth
                  size="small"
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Middle Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  fullWidth
                  size="small"
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Last Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Place of Birth: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Contact No: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Place of Birth: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Contact No: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Father's Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Mother's Maiden Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Baptism: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Request: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Purpose: </label>
                <Select
                  labelId="demo-simple-select-label"
                  fullWidth
                  size="small"
                  id="demo-simple-select"
                  // value={age}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>&nbsp;</label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  placeholder="DISABLED"
                  fullWidth
                  disabled
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
            </Grid>

            <Typography
              fontSize={"medium"}
              sx={{textAlign: "center", marginTop: "12px"}}>
              Transaction no: <b>{data.transaction_no}</b>
            </Typography>
            {data.status === "paid" && (
              <Typography fontSize={"small"} sx={{textAlign: "center"}}>
                Approved by: dummyDataStaffName
              </Typography>
            )}
            <DialogActions>
              <Grid
                container
                spacing={2}
                sx={{justifyContent: "center", alignItems: "center"}}>
                {data.payment_status === "unpaid" && (
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      // onClick={() => updatePayment(data.requestID, close)}
                    >
                      Mark as Paid
                    </Button>
                  </Grid>
                )}
                <Grid item xs={12} sm={"auto"}>
                  <Button variant="contained" color="error" onClick={close}>
                    Close
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const MarriageCertInfoModal = ({open, data, close}) => {
  // const details = JSON.parse(data.details);
  // const schedule =
  //   formatTime(data.preferred_time) +
  //   " ,  " +
  //   formatDate(data.preferred_date.slice(0, 10));

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogContent>
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
              }}>
              Marriage Certificate Request Information
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{height: "auto", padding: "0px 10px", overflowY: "auto"}}>
              <Grid item xs={12} sm={4}>
                <label>First Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  fullWidth
                  size="small"
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Middle Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  fullWidth
                  size="small"
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Last Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Place of Birth: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Contact No: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Place of Birth: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Contact No: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Father's Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Mother's Maiden Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Baptism: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Request: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Purpose: </label>
                <Select
                  labelId="demo-simple-select-label"
                  fullWidth
                  size="small"
                  id="demo-simple-select"
                  // value={age}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>&nbsp;</label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  placeholder="DISABLED"
                  fullWidth
                  disabled
                  // value={details}
                  inputProps={{readOnly: true}}
                />
              </Grid>
            </Grid>

            <Typography
              fontSize={"medium"}
              sx={{textAlign: "center", marginTop: "12px"}}>
              Transaction no: <b>{data.transaction_no}</b>
            </Typography>
            {data.status === "paid" && (
              <Typography fontSize={"small"} sx={{textAlign: "center"}}>
                Approved by: dummyDataStaffName
              </Typography>
            )}
            <DialogActions>
              <Grid
                container
                spacing={2}
                sx={{justifyContent: "center", alignItems: "center"}}>
                {data.payment_status === "unpaid" && (
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      // onClick={() => updatePayment(data.requestID, close)}
                    >
                      Mark as Paid
                    </Button>
                  </Grid>
                )}
                <Grid item xs={12} sm={"auto"}>
                  <Button variant="contained" color="error" onClick={close}>
                    Close
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default {
  BaptismCertInfoModal,
  ConfirmationCertInfoModal,
  MarriageCertInfoModal,
};
