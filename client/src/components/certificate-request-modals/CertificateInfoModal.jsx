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
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import config from "../../config";
import ConfirmationDialog from "../ConfirmationModal";

const BaptismCertInfoModal = ({open, data, close}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service, setService] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    birth_place: "",
    contact_no: "",
    father_name: "",
    mother_name: "",
    preferred_date: "",
    date_requested: "",
    purpose: "",
    transaction_no: "",
    service_id: "",
  });

  useEffect(() => {
    if (open && data) {
      setFormData({
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        birth_place: data.birth_place,
        contact_no: data.contact_no,
        father_name: data.father_name,
        mother_name: data.mother_name,
        preferred_date: formatDate(data.preferred_date), // baptism date
        date_requested: formatDate(data.date_requested),
        purpose: data.purpose,
        transaction_no: data.transaction_no,
        service_id: 3,
      });
    }
    console.log(data);
  }, [open, data]);

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const updateCertReq = async () => {
    const res = await axios.put(`${config.API}/request/update-bulk`, {
      formData,
      id: data.requestID,
    });
    if (res.status !== 200) {
      console.log("error updating request");
      // setError({
      //   message: res.data.message,
      //   details: res.data?.details,
      // });
    } else {
      console.log("certificate request updated!");

      axios.post(`${config.API}/logs/create`, {
        activity: `Updated Baptismal Certificate Request - Transaction number: ${data.transaction_no}`,
        user_id: 1,
        request_id: data.requestID,
      });
      console.log("logs success!");
    }
    window.location.reload();
  };

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

            <Grid
              container
              spacing={2}
              sx={{height: "auto", padding: "0px 10px", overflowY: "auto"}}>
              <Grid item xs={12} sm={4}>
                <label>First Name: </label>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="first_name"
                  onChange={handleChange}
                  value={formData.first_name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Middle Name: </label>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="middle_name"
                  onChange={handleChange}
                  value={formData.middle_name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Last Name: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="last_name"
                  onChange={handleChange}
                  value={formData.last_name}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <label>Place of Birth: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="birth_place"
                  onChange={handleChange}
                  value={formData.birth_place}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Contact No: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="contact_no"
                  onChange={handleChange}
                  value={formData.contact_no}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Father's Name: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="father_name"
                  onChange={handleChange}
                  value={formData.father_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Mother's Maiden Name: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="mother_name"
                  onChange={handleChange}
                  value={formData.mother_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Baptism: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="date"
                  name="preferred_date"
                  onChange={handleChange}
                  value={formData.preferred_date}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Request: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="date_requested"
                  onChange={handleChange}
                  value={formData.date_requested}
                />
              </Grid>
              <Grid item xs={12}>
                <label>Purpose: </label>
                <TextField
                  labelId="demo-simple-select-label"
                  fullWidth
                  size="small"
                  id="demo-simple-select"
                  name="purpose"
                  onChange={handleChange}
                  value={formData.purpose}
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
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                  }}>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog("update")}
                    sx={{
                      backgroundColor: "#CDAB52",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#B89545",
                      },
                    }}>
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    onClick={close}
                    sx={{
                      backgroundColor: "#d9d9d9",
                      color: "black",
                      paddingX: "12px",
                      "&:hover": {
                        backgroundColor: "#dddddd",
                      },
                    }}>
                    Close
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Grid>
          <ConfirmationDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            action={currentAction}
            onConfirm={updateCertReq}
            service={"Baptismal Certificate"}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const ConfirmationCertInfoModal = ({open, data, close}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service, setService] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    birth_place: "",
    contact_no: "",
    father_name: "",
    mother_name: "",
    preferred_date: "",
    date_requested: "",
    purpose: "",
    transaction_no: "",
    service_id: "",
  });

  useEffect(() => {
    if (open && data) {
      setFormData({
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        birth_place: data.birth_place,
        contact_no: data.contact_no,
        father_name: data.father_name,
        mother_name: data.mother_name,
        preferred_date: formatDate(data.preferred_date), // date of confirmation
        date_requested: formatDate(data.date_requested),
        purpose: data.purpose,
        transaction_no: data.transaction_no,
        service_id: 3,
      });
    }
    console.log(data);
  }, [open, data]);

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const updateCertReq2 = async () => {
    const res = await axios.put(`${config.API}/request/update-bulk`, {
      formData,
      id: data.requestID,
    });
    if (res.status !== 200) {
      console.log("error updating request");
      // setError({
      //   message: res.data.message,
      //   details: res.data?.details,
      // });
    } else {
      console.log(" confirmation certificate request updated!");

      axios.post(`${config.API}/logs/create`, {
        activity: `Updated Confirmation Certificate Request - Transaction number: ${data.transaction_no}`,
        user_id: 1,
        request_id: data.requestID,
      });
      console.log("logs success!");
    }
    window.location.reload();
  };

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

            <Grid
              container
              spacing={2}
              sx={{height: "auto", padding: "0px 10px", overflowY: "auto"}}>
              <Grid item xs={12} sm={4}>
                <label>First Name: </label>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={handleChange}
                  name="first_name"
                  value={formData.first_name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Middle Name: </label>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  onChange={handleChange}
                  name="middle_name"
                  value={formData.middle_name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Last Name: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                  name="last_name"
                  value={formData.last_name}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <label>Place of Birth: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                  name="birth_place"
                  value={formData.birth_place}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Contact No: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                  name="contact_no"
                  value={formData.contact_no}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Father's Name: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                  name="father_name"
                  value={formData.father_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Mother's Maiden Name: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                  name="mother_name"
                  value={formData.mother_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Confirmation: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                  name="preferred_date"
                  value={formData.preferred_date}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Request: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                  name="date_requested"
                  value={formData.date_requested}
                />
              </Grid>
              <Grid item xs={12}>
                <label>Purpose: </label>
                <TextField
                  labelId="demo-simple-select-label"
                  fullWidth
                  size="small"
                  id="demo-simple-select"
                  onChange={handleChange}
                  name="purpose"
                  value={formData.purpose}
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
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                  }}>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog("update")}
                    sx={{
                      backgroundColor: "#CDAB52",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#B89545",
                      },
                    }}>
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    onClick={close}
                    sx={{
                      backgroundColor: "#d9d9d9",
                      color: "black",
                      paddingX: "12px",
                      "&:hover": {
                        backgroundColor: "#dddddd",
                      },
                    }}>
                    Close
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Grid>
          <ConfirmationDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            action={currentAction}
            onConfirm={updateCertReq2}
            service={"Confirmation Certificate"}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const MarriageCertInfoModal = ({open, data, close}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service, setService] = useState({});
  const spouseDetails = JSON.parse(data.spouse_name);
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    spouse_firstName: "",
    spouse_middleName: "",
    spouse_lastName: "",
    contact_no: "",
    preferred_date: "",
    date_requested: "",
    purpose: "",
    transaction_no: "",
    service_id: "",
  });

  useEffect(() => {
    if (open && data) {
      setFormData({
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        spouse_firstName: spouseDetails.firstName,
        spouse_middleName: spouseDetails.middleName,
        spouse_lastName: spouseDetails.lastName,
        contact_no: data.contact_no,
        preferred_date: formatDate(data.preferred_date), // marriage Date
        date_requested: formatDate(data.date_requested),
        purpose: data.purpose,
        transaction_no: data.transaction_no,
        service_id: 4,
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

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const updateCertReq3 = async () => {
    // Merge spouse details into the `details` field
    const updatedFormData = {
      ...formData,
      details: JSON.stringify({
        spouse_firstName: formData.spouse_firstName,
        spouse_middleName: formData.spouse_middleName,
        spouse_lastName: formData.spouse_lastName,
      }),
    };
    delete updatedFormData.spouse_firstName;
    delete updatedFormData.spouse_middleName;
    delete updatedFormData.spouse_lastName;

    const res = await axios.put(`${config.API}/request/update-bulk`, {
      formData: updatedFormData,
      id: data.requestID,
    });

    if (res.status !== 200) {
      console.log("Error updating request");
    } else {
      console.log("Marriage certificate request updated!");

      axios.post(`${config.API}/logs/create`, {
        activity: `Updated Marriage Certificate Request - Transaction number: ${data.transaction_no}`,
        user_id: 1,
        request_id: data.requestID,
      });
      console.log("Logs success!");
    }

    window.location.reload();
  };

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

            <Grid
              container
              spacing={2}
              sx={{height: "auto", padding: "0px 10px", overflowY: "auto"}}>
              <Grid item xs={12} sm={4}>
                <label>First Name: </label>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="first_name"
                  onChange={handleChange}
                  value={formData.first_name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Middle Name: </label>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  name="middle_name"
                  onChange={handleChange}
                  value={formData.middle_name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Last Name: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="last_name"
                  onChange={handleChange}
                  value={formData.last_name}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>First Name of Spouse: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="spouse_firstName"
                  onChange={handleChange}
                  value={formData.spouse_firstName}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Middle Name of Spouse: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="spouse_middleName"
                  onChange={handleChange}
                  value={formData.spouse_middleName}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <label>Last Name of Spouse: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="spouse_lastName"
                  onChange={handleChange}
                  value={formData.spouse_lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Contact No: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  name="contact_no"
                  onChange={handleChange}
                  value={formData.contact_no}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Marriage: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="date"
                  name="preferred_date"
                  onChange={handleChange}
                  value={formData.preferred_date}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Date of Request: </label>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="date"
                  name="date_requested"
                  onChange={handleChange}
                  value={formData.date_requested}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <label>Purpose: </label>
                <TextField
                  labelId="demo-simple-select-label"
                  fullWidth
                  size="small"
                  id="demo-simple-select"
                  name="purpose"
                  onChange={handleChange}
                  value={formData.purpose}
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
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                  }}>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog("update")}
                    sx={{
                      backgroundColor: "#CDAB52",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#B89545",
                      },
                    }}>
                    Update
                  </Button>
                  <Button
                    variant="contained"
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
          </Grid>
          <ConfirmationDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            action={currentAction}
            onConfirm={updateCertReq3}
            service={"Marriage Certificate"}
          />
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
