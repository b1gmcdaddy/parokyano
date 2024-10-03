/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import config from "../../config";

const formatTime = (time24) => {
  let [hour, minute] = time24.split(":");
  hour = parseInt(hour);
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert hour to 12-hour format
  return `${hour}:${minute} ${period}`;
};

const formatDate = (rawDate) => {
  const formatted = new Date(rawDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatted;
};

const BaptismCertInfoModal = ({ open, data, close }) => {
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
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              margin: "10px",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Baptismal Certificate Request Information
            </Typography>
            <IconButton
              aria-label="close"
              onClick={close}
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <CloseIcon />
            </IconButton>

            <Grid
              container
              spacing={2}
              sx={{ height: "auto", padding: "0px 10px", overflowY: "auto" }}
            >
              <Grid item xs={12} sm={4}>
                <label>First Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  fullWidth
                  size="small"
                  value={data.first_name}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Middle Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  fullWidth
                  size="small"
                  value={data.middle_name}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Last Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.last_name}
                  inputProps={{ readOnly: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <label>Place of Birth: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.birth_place}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Contact No: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.contact_no}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Father's Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.father_name}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Mother's Maiden Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.mother_name}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Baptism: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.preferred_date}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Request: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.date_requested}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Purpose: </label>
                <TextField
                  labelId="demo-simple-select-label"
                  fullWidth
                  size="small"
                  id="demo-simple-select"
                  value={data.purpose}
                  select
                >
                  <MenuItem value="marriage">Marriage</MenuItem>
                  <MenuItem value="passport">Passport</MenuItem>
                  <MenuItem value="school">School</MenuItem>
                  <MenuItem value="late registration">
                    Late Registration
                  </MenuItem>
                  <MenuItem value="sss">SSS</MenuItem>
                  <MenuItem value="others">Other</MenuItem>
                </TextField>
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
                  inputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>

            <Typography
              fontSize={"medium"}
              sx={{ textAlign: "center", marginTop: "12px" }}
            >
              Transaction no: <b>{data.transaction_no}</b>
            </Typography>
            {data.status === "paid" && (
              <Typography fontSize={"small"} sx={{ textAlign: "center" }}>
                Approved by: dummyDataStaffName
              </Typography>
            )}
            <DialogActions>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: "#307C41",
                      color: "white",
                      paddingX: "12px",
                      "&:hover": {
                        backgroundColor: "#1E5730",
                      },
                    }}
                  >
                    Search Records
                  </Button>

                  <Button
                    sx={{
                      backgroundColor: "#CDAB52",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#B89545",
                      },
                    }}
                  >
                    Update
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

const ConfirmationCertInfoModal = ({ open, data, close }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              margin: "10px",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Confirmation Certificate Request Information
            </Typography>
            <IconButton
              aria-label="close"
              onClick={close}
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <CloseIcon />
            </IconButton>

            <Grid
              container
              spacing={2}
              sx={{ height: "auto", padding: "0px 10px", overflowY: "auto" }}
            >
              <Grid item xs={12} sm={4}>
                <label>First Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  fullWidth
                  size="small"
                  value={data.first_name}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Middle Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  fullWidth
                  size="small"
                  value={data.middle_name}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Last Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.last_name}
                  inputProps={{ readOnly: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <label>Place of Birth: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.birth_place}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Contact No: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.contact_no}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Father's Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.father_name}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Mother's Maiden Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.mother_name}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Confirmation: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.preferred_date}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Request: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.date_requested}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Purpose: </label>
                <TextField
                  labelId="demo-simple-select-label"
                  fullWidth
                  size="small"
                  id="demo-simple-select"
                  value={data.purpose}
                  select
                >
                  <MenuItem value="marriage">Marriage</MenuItem>
                  <MenuItem value="passport">Passport</MenuItem>
                  <MenuItem value="school">School</MenuItem>
                  <MenuItem value="late registration">
                    Late Registration
                  </MenuItem>
                  <MenuItem value="sss">SSS</MenuItem>
                  <MenuItem value="others">Other</MenuItem>
                </TextField>
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
                  inputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>

            <Typography
              fontSize={"medium"}
              sx={{ textAlign: "center", marginTop: "12px" }}
            >
              Transaction no: <b>{data.transaction_no}</b>
            </Typography>
            {data.status === "paid" && (
              <Typography fontSize={"small"} sx={{ textAlign: "center" }}>
                Approved by: dummyDataStaffName
              </Typography>
            )}
            <DialogActions>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: "#307C41",
                      color: "white",
                      paddingX: "12px",
                      "&:hover": {
                        backgroundColor: "#1E5730",
                      },
                    }}
                  >
                    Search Records
                  </Button>

                  <Button
                    sx={{
                      backgroundColor: "#CDAB52",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#B89545",
                      },
                    }}
                  >
                    Update
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

const MarriageCertInfoModal = ({ open, data, close }) => {
  // const details = JSON.parse(data.details);
  const spouseDetails = JSON.parse(data.spouse_name);
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
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              margin: "10px",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Marriage Certificate Request Information
            </Typography>
            <IconButton
              aria-label="close"
              onClick={close}
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}
            >
              <CloseIcon />
            </IconButton>

            <Grid
              container
              spacing={2}
              sx={{ height: "auto", padding: "0px 10px", overflowY: "auto" }}
            >
              <Grid item xs={12} sm={4}>
                <label>First Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  fullWidth
                  size="small"
                  value={data.first_name}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Middle Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  fullWidth
                  size="small"
                  value={data.middle_name}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Last Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.last_name}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>First Name of Spouse: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={spouseDetails.firstName}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Middle Name of Spouse: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={spouseDetails.middleName}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Last Name of Spouse: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={spouseDetails.lastName}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Contact No: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.contact_no}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Marriage: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.preferred_date}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Request: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  value={data.date_requested}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Purpose: </label>
                <TextField
                  labelId="demo-simple-select-label"
                  fullWidth
                  size="small"
                  id="demo-simple-select"
                  value={data.purpose}
                  select
                >
                  <MenuItem value="marriage">Marriage</MenuItem>
                  <MenuItem value="passport">Passport</MenuItem>
                  <MenuItem value="school">School</MenuItem>
                  <MenuItem value="late registration">
                    Late Registration
                  </MenuItem>
                  <MenuItem value="sss">SSS</MenuItem>
                  <MenuItem value="others">Other</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Typography
              fontSize={"medium"}
              sx={{ textAlign: "center", marginTop: "12px" }}
            >
              Transaction no: <b>{data.transaction_no}</b>
            </Typography>
            {data.status === "paid" && (
              <Typography fontSize={"small"} sx={{ textAlign: "center" }}>
                Approved by: dummyDataStaffName
              </Typography>
            )}
            <DialogActions>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: "#307C41",
                      color: "white",
                      paddingX: "12px",
                      "&:hover": {
                        backgroundColor: "#1E5730",
                      },
                    }}
                  >
                    Search Records
                  </Button>

                  <Button
                    sx={{
                      backgroundColor: "#CDAB52",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#B89545",
                      },
                    }}
                  >
                    Update
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
