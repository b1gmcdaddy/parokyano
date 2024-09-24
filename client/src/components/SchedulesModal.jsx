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
import formatDate from "../utils/DateTimeFormatter";

const AddSchedulesModal = ({open, close}) => {
  const [priests, setPriests] = useState([]);

  useEffect(() => {
    const fetchPriest = async () => {
      try {
        const response = await axios(`${config.API}/priest/retrieve`, {
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
                  {priests.map((priest) => (
                    <MenuItem key={priest.priestID} value={priest.priestID}>
                      {priest.first_name} {priest.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} sm={12}>
                <label>Activity: </label>
                <TextField
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Date: </label>
                <TextField
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <label>Start Time: </label>
                <TextField
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <label>End Time: </label>
                <TextField
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
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

const EditSchedulesModal = ({open, close, activity, priestList}) => {
  if (!activity) {
    return null;
  }
  const [editedActivity, setEditedActivity] = useState(activity);

  useEffect(() => {
    setEditedActivity(activity);
  }, [activity]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setEditedActivity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
              Edit Activity
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{padding: "0px 4px", overflowY: "auto"}}>
              <Grid item xs={12} sm={12}>
                <label>Selected Priest: </label>
                <Select
                  labelId="demo-simple-select-label"
                  fullWidth
                  size="small"
                  id="demo-simple-select"
                  value={editedActivity.priest_id}
                  onChange={handleChange}>
                  {priestList.map((priest) => (
                    <MenuItem key={priest.priestID} value={priest.priestID}>
                      {priest.first_name} {priest.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} sm={12}>
                <label>Activity: </label>
                <TextField
                  fullWidth
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  value={editedActivity.activity}
                  name="activity"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Date: </label>
                <TextField
                  fullWidth
                  size="small"
                  value={editedActivity.date}
                  id="outlined-basic"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <label>Start Time: </label>
                <TextField
                  fullWidth
                  size="small"
                  value={editedActivity.start_time}
                  id="outlined-basic"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <label>End Time: </label>
                <TextField
                  fullWidth
                  size="small"
                  value={editedActivity.end_time}
                  onChange={handleChange}
                  id="outlined-basic"
                  variant="outlined"
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
                    Edit
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

export default {AddSchedulesModal, EditSchedulesModal};
