import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  Paper,
  Select,
  Skeleton,
  MenuItem,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import config from "../../config";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Snackbar from "@mui/material/Snackbar";

const TextFieldStyle = {
  "& .MuiInputBase-root": { height: "40px" },
};

// const ManagePriestsModal = ({ open, close }) => {
//   const [priestList, setPriestList] = useState([]);
//   const [addPriest, setAddPriest] = useState(false);
//   const [editPriest, setEditPriest] = useState(null);
//   const [editModalOpen, setEditModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchPriests = async () => {
//       try {
//         const activeResponse = await axios(`${config.API}/priest/retrieve`, {
//           params: { col: "status", val: "active" },
//         });
//         const inactiveResponse = await axios(`${config.API}/priest/retrieve`, {
//           params: { col: "status", val: "inactive" },
//         });
//         const combinedPriests = [
//           ...activeResponse.data,
//           ...inactiveResponse.data,
//         ];
//         setPriestList(combinedPriests);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchPriests();
//   }, []);

//   const openAddPriestModal = () => {
//     setAddPriest(true);
//   };

//   const handleEditClick = (priest) => {
//     setEditPriest(priest);
//     setEditModalOpen(true);
//   };

//   return (
//     <Dialog fullWidth maxWidth="sm" onClose={close} open={open}>
//       <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }}>
//         Manage Priests
//       </DialogTitle>
//       <IconButton
//         aria-label="close"
//         onClick={close}
//         sx={{ position: "absolute", right: 8, top: 8 }}
//       >
//         <CloseIcon />
//       </IconButton>
//       <DialogContent dividers>
//         {priestList.map((priest) => (
//           <Paper
//             key={priest.priestID}
//             elevation={3}
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               padding: "14px 20px",
//               backgroundColor: "#D9D9D9",
//               marginBottom: "8px",
//             }}
//           >
//             <Typography>
//               {priest.first_name}&nbsp;{priest.last_name}
//             </Typography>
//             <IconButton onClick={() => handleEditClick(priest)}>
//               <EditIcon sx={{ cursor: "pointer" }} />
//             </IconButton>
//           </Paper>
//         ))}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={openAddPriestModal}>Add Priest</Button>
//       </DialogActions>

//       <AddPriestModal open={addPriest} close={() => setAddPriest(false)} />
//       {editPriest && (
//         <EditPriestModal
//           open={editModalOpen}
//           close={() => setEditModalOpen(false)}
//           priest={editPriest}
//         />
//       )}
//     </Dialog>
//   );
// };

const AddPriestModal = ({ open, close }) => {
  const currentYear = dayjs();
  const [priestList, setPriestList] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    contact_no: "",
    year_started: "",
    year_ended: null,
    status: "active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddPriest = () => {
    axios.post(`${config.API}/priest/createPriest`, formData);
    alert("Priest successfully added");
    window.location.reload();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={close}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, textAlign: "center" }}
        id="customized-dialog-title"
      >
        Add Priests
      </DialogTitle>
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
      <DialogContent>
        <Grid container spacing={2} sx={{ padding: "0px 8px" }}>
          <Grid item xs={12} sm={6}>
            <label>First Name: </label>
            <TextField
              fullWidth
              size="small"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Last Name: </label>
            <TextField
              fullWidth
              size="small"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Contact Number: </label>
            <TextField
              fullWidth
              size="small"
              name="contact_no"
              value={formData.contact_no}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <label>Term Started: </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                maxDate={currentYear}
                openTo="year"
                views={["year"]}
                name="year_started"
                sx={TextFieldStyle}
                value={
                  formData.year_started
                    ? dayjs().year(formData.year_started)
                    : null
                }
                onChange={(date) => {
                  if (date) {
                    setFormData({ ...formData, year_started: date.year() });
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddPriest}>add priest</Button>
      </DialogActions>
    </Dialog>
  );
};

const EditPriestModal = ({ open, close, priest }) => {
  const currentYear = dayjs();
  const [formData, setFormData] = useState({ ...priest });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (priest) {
      setIsLoading(true);
      setFormData({ ...priest });
      setIsLoading(false);
    }
  }, [priest]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditPriest = () => {
    setIsLoading(true);
    axios
      .put(`${config.API}/priest/editPriest/${priest.priestID}`, formData)
      .then(() => {
        alert("Priest successfully updated");
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error updating priest:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? (
        <Dialog fullWidth maxWidth="sm" open={open}>
          <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }}>
            <Skeleton width="40%" />
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ padding: "0px 8px" }}>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Skeleton variant="rectangular" width={80} height={36} />
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog fullWidth maxWidth="sm" onClose={close} open={open}>
          <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }}>
            Edit Priest
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={close}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Grid container spacing={2} sx={{ padding: "0px 8px" }}>
              <Grid item xs={12} sm={6}>
                <label>First Name: </label>
                <TextField
                  fullWidth
                  size="small"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Last Name: </label>
                <TextField
                  fullWidth
                  size="small"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Contact Number: </label>
                <TextField
                  fullWidth
                  size="small"
                  name="contact_no"
                  value={formData.contact_no}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Term Started: </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    maxDate={currentYear}
                    openTo="year"
                    sx={TextFieldStyle}
                    views={["year"]}
                    name="year_started"
                    value={
                      formData.year_started
                        ? dayjs().year(formData.year_started)
                        : null
                    }
                    onChange={(date) => {
                      if (date) {
                        setFormData({ ...formData, year_started: date.year() });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth size="small" />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <label>Term Ended: </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    maxDate={currentYear}
                    openTo="year"
                    views={["year"]}
                    sx={TextFieldStyle}
                    name="year_ended"
                    value={
                      formData.year_ended
                        ? dayjs().year(formData.year_ended)
                        : null
                    }
                    onChange={(date) => {
                      if (date) {
                        setFormData({ ...formData, year_ended: date.year() });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth size="small" />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Status: </label>
                <Select
                  fullWidth
                  size="small"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  variant="outlined"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditPriest}>Update Priest</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default {
  // ManagePriestsModal,
  AddPriestModal,
  EditPriestModal,
};
