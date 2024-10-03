import React, {useState, useEffect} from "react";
import {
  Box,
  Toolbar,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  RadioGroup,
  MenuItem,
  FormControlLabel,
  Radio,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import generateHash from "../../utils/GenerateHash";

const AddBaptismCertReq = ({open, onClose}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
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
              Add New Request - Baptism Certificate
            </Typography>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}>
              <CloseIcon />
            </IconButton>

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
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Middle Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Last Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <label>Place of Birth: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Contact No: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Father's Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Mother's Maiden Name: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Baptism: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Request: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Purpose: </label>
                <TextField
                  labelId="demo-simple-select-label"
                  fullWidth
                  size="small"
                  id="demo-simple-select"
                  select>
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
                />
              </Grid>
            </Grid>

            <DialogActions>
              <Button
                sx={{
                  backgroundColor: "#307C41",
                  color: "white",
                  paddingX: "12px",
                  "&:hover": {
                    backgroundColor: "#1E5730",
                  },
                }}>
                Search Records
              </Button>
            </DialogActions>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const AddMarriageCertReq = ({open, onClose}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Typography>This is Add Marriage Cert Add req...</Typography>
    </Dialog>
  );
};
const AddConfirmationCertReq = ({open, onClose}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Typography>This is Add Confirmation Cert Add req...</Typography>
    </Dialog>
  );
};

export default {
  AddBaptismCertReq,
  AddMarriageCertReq,
  AddConfirmationCertReq,
};
