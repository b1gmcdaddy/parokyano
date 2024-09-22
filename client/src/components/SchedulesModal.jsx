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

const AddSchedulesModal = ({open, close}) => {
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
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
              margin: "5px",
            }}>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "10px",
              }}>
              Add New Activity
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{padding: "0px 4px", overflowY: "auto"}}>
              <Grid item xs={12} sm={12}>
                <label>Select Priest: </label>
                <Select
                  labelId="demo-simple-select-label"
                  fullWidth
                  size="small"
                  id="demo-simple-select">
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sm={12}>
                <label>Activity: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Date: </label>
                <TextField
                  variant="outlined"
                  type="date"
                  multiline
                  size="small"
                  fullWidth
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>From: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  inputProps={{readOnly: true}}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>To: </label>
                <TextField
                  variant="outlined"
                  multiline
                  size="small"
                  fullWidth
                  inputProps={{readOnly: true}}
                />
              </Grid>
            </Grid>

            <DialogActions>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  sx={{display: "flex", justifyContent: "center", gap: "20px"}}>
                  <Button variant="contained" sx={{backgroundColor: "#355173"}}>
                    Add Activity
                  </Button>
                  <Button
                    sx={{backgroundColor: "#D9D9D9", color: "black"}}
                    onClick={close}>
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

const EditSchedulesModal = () => {
  return <div>SchedulesModal</div>;
};

export default {
  AddSchedulesModal,
  EditSchedulesModal,
};
