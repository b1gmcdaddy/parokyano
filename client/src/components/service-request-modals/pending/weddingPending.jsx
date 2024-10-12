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
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox,
  MenuItem,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Menu,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import Snackbar from "@mui/material/Snackbar";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useState, useEffect} from "react";
import React from "react";
import ConfirmationDialog from "../../ConfirmationModal";
import util from "../../../utils/DateTimeFormatter";
import axios from "axios";
import config from "../../../config";
import dayjs from "dayjs";

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
  maxHeight: "97vh",
  overflowY: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

const boxModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "sm",
  bgcolor: "white",
  borderRadius: "10px",
  boxShadow: 3,
  px: 4,
  py: 3,
  maxHeight: "97vh",
  overflowY: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

const TextFieldStyle = {
  "& .MuiInputBase-root": {height: "30px", bgcolor: "white"},
};

const tabStyle = {
  fontWeight: "bold",
  color: "black",
  bgcolor: "#D9D9D9",
};

const endTime = (timeString, hoursToAdd) => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  let newHours = hours + Math.floor(hoursToAdd);
  let newMinutes = minutes + (hoursToAdd % 1) * 60;

  newHours += Math.floor(newMinutes / 60);
  newMinutes = newMinutes % 60;

  return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};

const fetchWeddingDetails = async (id) => {
  try {
    const response = await axios.get(`${config.API}/wedding/retrieve`, {
      params: {reqID: id},
    });

    return response.data?.result[0];
  } catch (err) {
    console.error(err);
    return null;
  }
};

function RequirementsModal({id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tabValue, setTabValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service] = useState("wedding");
  const [selectedWeddingId, setSelectedWeddingId] = useState(null);
  const [requirements, setRequirements] = useState({
    groom_baptismCert: 0,
    groom_confirmationCert: 0,
    groom_birthCert: 0,
    spouse_baptismCert: 0,
    spouse_confirmationCert: 0,
    spouse_birthCert: 0,
    isParishPermit: 0,
    isPrenuptial: 0,
    isPreCana: 0,
    isMarriageLicense: 0,
  });

  useEffect(() => {
    const fetchAndSetRequirements = async () => {
      const req = await fetchWeddingDetails(id);
      if (req) {
        setRequirements({
          groom_baptismCert: req.groom_baptismCert || 0,
          groom_confirmationCert: req.groom_confirmationCert || 0,
          groom_birthCert: req.groom_birthCert || 0,
          spouse_baptismCert: req.spouse_baptismCert || 0,
          spouse_confirmationCert: req.spouse_confirmationCert || 0,
          spouse_birthCert: req.spouse_birthCert || 0,
          isParishPermit: req.isParishPermit || 0,
          isPrenuptial: req.isPrenuptial || 0,
          isPreCana: req.isPreCana || 0,
          isMarriageLicense: req.isMarriageLicense || 0,
        });
        setSelectedWeddingId(req.wedding_id);
      }
    };
    if (open) {
      fetchAndSetRequirements();
    }
  }, [open, id]);

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const updateRequirements = async () => {
    try {
      await axios.put(
        `${config.API}/wedding/requirements/${selectedWeddingId}`,
        requirements
      );
      alert("Wedding requirements updated successfully!");
      handleClose();
    } catch (err) {
      console.error("Error updating wedding requirements:", err);
      alert("Failed to update wedding requirements. Please try again.");
    }
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: "#355173",
          height: "25px",
          fontSize: "11px",
          marginLeft: "5px",
          color: "white",
          "&:hover": {bgcolor: "#4C74A5"},
        }}>
        Requirements
      </Button>
      <Modal open={open}>
        <Box sx={boxModal}>
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
                Wedding Requirements Information
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Tabs
                centered
                variant="fullWidth"
                value={tabValue}
                onChange={handleTabChange}
                sx={{borderRadius: "10px 10px 0px 0px"}}>
                <Tab label="Groom" sx={tabStyle} />
                <Tab label="Bride" sx={tabStyle} />
              </Tabs>
              <Box
                fullWidth
                sx={{
                  bgcolor: "#D9D9D9",
                  padding: "10px",
                  borderRadius: "0px 0px 5px 5px",
                }}>
                <Grid container justifyContent={"center"}>
                  <Box>
                    {tabValue === 0 && (
                      <>
                        <Grid item sm={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={requirements.groom_birthCert === 1}
                                onChange={(e) =>
                                  setRequirements((prev) => ({
                                    ...prev,
                                    groom_birthCert: e.target.checked ? 1 : 0,
                                  }))
                                }
                              />
                            }
                            label={
                              <Typography sx={{fontSize: "15px"}}>
                                Birth Certificate
                              </Typography>
                            }
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={requirements.groom_baptismCert === 1}
                                onChange={(e) =>
                                  setRequirements((prev) => ({
                                    ...prev,
                                    groom_baptismCert: e.target.checked ? 1 : 0,
                                  }))
                                }
                              />
                            }
                            label={
                              <Typography sx={{fontSize: "15px"}}>
                                Baptismal Certificate
                              </Typography>
                            }
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  requirements.groom_confirmationCert === 1
                                }
                                onChange={(e) =>
                                  setRequirements((prev) => ({
                                    ...prev,
                                    groom_confirmationCert: e.target.checked
                                      ? 1
                                      : 0,
                                  }))
                                }
                              />
                            }
                            label={
                              <Typography sx={{fontSize: "15px"}}>
                                Confirmation Certificate
                              </Typography>
                            }
                          />
                        </Grid>
                      </>
                    )}
                    {tabValue === 1 && (
                      <>
                        <Grid item sm={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={requirements.spouse_birthCert === 1}
                                onChange={(e) =>
                                  setRequirements((prev) => ({
                                    ...prev,
                                    spouse_birthCert: e.target.checked ? 1 : 0,
                                  }))
                                }
                              />
                            }
                            label={
                              <Typography sx={{fontSize: "15px"}}>
                                Birth Certificate
                              </Typography>
                            }
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={requirements.spouse_baptismCert === 1}
                                onChange={(e) =>
                                  setRequirements((prev) => ({
                                    ...prev,
                                    spouse_baptismCert: e.target.checked
                                      ? 1
                                      : 0,
                                  }))
                                }
                              />
                            }
                            label={
                              <Typography sx={{fontSize: "15px"}}>
                                Baptismal Certificate
                              </Typography>
                            }
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  requirements.spouse_confirmationCert === 1
                                }
                                onChange={(e) =>
                                  setRequirements((prev) => ({
                                    ...prev,
                                    spouse_confirmationCert: e.target.checked
                                      ? 1
                                      : 0,
                                  }))
                                }
                              />
                            }
                            label={
                              <Typography sx={{fontSize: "15px"}}>
                                Confirmation Certificate
                              </Typography>
                            }
                          />
                        </Grid>
                      </>
                    )}
                  </Box>
                </Grid>
              </Box>
            </Grid>

            <Grid item sm={12} sx={{marginTop: "5px"}}>
              <div
                style={{flex: 0.1, height: "1.8px", backgroundColor: "black"}}
              />
            </Grid>

            <Box>
              <Grid item sm={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={requirements.isMarriageLicense === 1}
                      onChange={(e) =>
                        setRequirements((prev) => ({
                          ...prev,
                          isMarriageLicense: e.target.checked ? 1 : 0,
                        }))
                      }
                    />
                  }
                  label={
                    <Typography sx={{fontSize: "15px"}}>
                      Marriage License
                    </Typography>
                  }
                />
              </Grid>
              <Grid item sm={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={requirements.isParishPermit === 1}
                      onChange={(e) =>
                        setRequirements((prev) => ({
                          ...prev,
                          isParishPermit: e.target.checked ? 1 : 0,
                        }))
                      }
                    />
                  }
                  label={
                    <Typography sx={{fontSize: "15px"}}>
                      Parish Permit
                    </Typography>
                  }
                />
              </Grid>
              <Grid item sm={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={requirements.isPrenuptial === 1}
                      onChange={(e) =>
                        setRequirements((prev) => ({
                          ...prev,
                          isPrenuptial: e.target.checked ? 1 : 0,
                        }))
                      }
                    />
                  }
                  label={
                    <Typography sx={{fontSize: "15px"}}>
                      Prenuptial Agreement
                    </Typography>
                  }
                />
              </Grid>
              <Grid item sm={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={requirements.isPreCana === 1}
                      onChange={(e) =>
                        setRequirements((prev) => ({
                          ...prev,
                          isPreCana: e.target.checked ? 1 : 0,
                        }))
                      }
                    />
                  }
                  label={
                    <Typography sx={{fontSize: "15px"}}>
                      Pre-Cana Certificate
                    </Typography>
                  }
                />
              </Grid>
            </Box>

            <Grid item sm={12} sx={{marginTop: "10px"}}>
              <Button
                onClick={updateRequirements}
                variant="contained"
                sx={{bgcolor: "#355173"}}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function SponsorsModal({id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [service] = useState("wedding");
  const [sponsors, setSponsors] = useState([]);
  const [newSponsor, setNewSponsor] = useState({
    name: "",
    age: "",
    isMarried: "",
    isCatholic: "",
  });
  const [sponsorid, setsponsorid] = useState(null);

  const fetchSponsors = async () => {
    try {
      const response = await axios.get(`${config.API}/sponsor/retrieve`, {
        params: {
          reqID: id,
        },
      });
      setSponsors(response.data.result);
    } catch (err) {
      console.error("error retrieving sponsors", err);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setNewSponsor((prev) => ({...prev, [name]: value}));
  };

  const handleAddSponsor = async () => {
    try {
      const response = await axios.post(
        `${config.API}/sponsor/create-sponsor`,
        {
          ...newSponsor,
          request_id: id,
        }
      );
      const newSponsorData = {
        ...newSponsor,
      };
      fetchSponsors();
      setNewSponsor({name: "", age: "", isMarried: "", isCatholic: ""});
    } catch (err) {
      console.error("Error adding sponsor", err);
    }
  };

  const handleDeleteSponsor = async (sponsor) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${sponsor.name}?`
    );

    if (confirmDelete) {
      try {
        await axios.delete(
          `${config.API}/sponsor/delete-sponsor/${sponsor.sponsorID}`
        );
        fetchSponsors();
        alert("Sponsor deleted successfully!");
      } catch (err) {
        console.error("Error deleting sponsor", err);
        alert("Failed to delete sponsor.");
      }
    }
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: "#355173",
          height: "25px",
          fontSize: "11px",
          marginLeft: "5px",
          color: "white",
          "&:hover": {bgcolor: "#4C74A5"},
        }}>
        Sponsors
      </Button>
      <Modal open={open}>
        <Box sx={boxModal}>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <IconButton onClick={handleClose} size="small">
                <FontAwesomeIcon icon={faXmark} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"} spacing={1}>
            <Grid item sm={12}>
              <Typography
                variant="subtitle1"
                sx={{textAlign: "center", fontWeight: "bold"}}>
                Wedding Sponsors Information
              </Typography>
            </Grid>
            <Grid item sm={4.5}>
              <label>Full Name:</label>
              <TextField
                name="name"
                value={newSponsor.name}
                fullWidth
                onChange={handleInputChange}
                sx={TextFieldStyle}
              />
            </Grid>
            <Grid item sm={1.5}>
              <label>Age:</label>
              <TextField
                name="age"
                value={newSponsor.age}
                onChange={handleInputChange}
                fullWidth
                sx={TextFieldStyle}
              />
            </Grid>
            <Grid item sm={3}>
              <label>Marital Status:</label>
              <TextField
                value={newSponsor.isMarried}
                select
                name="isMarried"
                onChange={handleInputChange}
                fullWidth
                sx={TextFieldStyle}>
                <MenuItem value="1">Married</MenuItem>
                <MenuItem value="0">Not Married</MenuItem>
              </TextField>
            </Grid>
            <Grid item sm={3}>
              <label>Catholic?:</label>
              <TextField
                select
                name="isCatholic"
                value={newSponsor.isCatholic}
                onChange={handleInputChange}
                fullWidth
                sx={TextFieldStyle}>
                <MenuItem value="1">Yes</MenuItem>
                <MenuItem value="0">No</MenuItem>
              </TextField>
            </Grid>
            <Grid item sm={12} sx={{textAlign: "center"}}>
              <Button
                onClick={handleAddSponsor}
                sx={{
                  bgcolor: "#355173",
                  height: "28px",
                  width: "150px",
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": {bgcolor: "#4C74A5"},
                }}>
                Add Sponsor
              </Button>
            </Grid>

            <Grid item sm={12}>
              <TableContainer component={Paper}>
                <Table sx={{tableLayout: "fixed"}}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Full Name</TableCell>
                      <TableCell align="center">Age</TableCell>
                      <TableCell align="center">Marital Status</TableCell>
                      <TableCell align="center">Catholic?</TableCell>
                      <TableCell
                        align="center"
                        sx={{width: "50px"}}></TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
              <div
                style={{
                  maxHeight: "35vh",
                  overflowY: "auto",
                  width: "100%",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}>
                <Table sx={{tableLayout: "fixed", width: "100%"}}>
                  <TableBody>
                    {sponsors.map((sponsor) => (
                      <TableRow key={sponsor.sponsorID}>
                        <TableCell align="center" component="th">
                          {sponsor.name}
                        </TableCell>
                        <TableCell align="center">{sponsor.age}</TableCell>
                        <TableCell align="center">
                          {sponsor.isMarried == 1 ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="center">
                          {sponsor.isCatholic == 1 ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="center" sx={{width: "50px"}}>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteSponsor(sponsor)}>
                            <FontAwesomeIcon icon={faXmark} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const WeddingPending = ({open, data, handleClose}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [completeRequirements, setCompleteRequirements] = useState(0);
  const [currentAction, setCurrentAction] = useState("");
  const [service, setService] = useState({});
  const [error, setError] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [priests, setPriests] = useState([]);
  const [formData, setFormData] = useState({
    requestID: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    relationship: "",
    spouse_firstName: "",
    spouse_middleName: "",
    spouse_lastName: "",
    contact_no: "",
    preferred_date: "",
    preferred_time: "",
    preferred_priest: "",
    transaction_no: "",
    payment_status: "",
    service_id: "",
  });

  // START RETRIEVE WEDDING DETAILS
  useEffect(() => {
    const fetchWeddingData = async () => {
      try {
        const weddingDetails = await fetchWeddingDetails(data.requestID);

        if (weddingDetails) {
          setFormData((prevData) => ({
            ...prevData,
            spouse_firstName: weddingDetails.spouse_firstName || "",
            spouse_middleName: weddingDetails.spouse_middleName || "",
            spouse_lastName: weddingDetails.spouse_lastName || "",
          }));
        }
      } catch (err) {
        console.error("Error fetching wedding details", err);
      }
    };

    if (open && data) {
      // Set groom details first
      setFormData({
        requestID: data.requestID,
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        contact_no: data.contact_no,
        relationship: data.relationship,
        preferred_date: data.preferred_date,
        preferred_time: data.preferred_time,
        preferred_priest: data.priest_id,
        transaction_no: data.transaction_no,
        payment_status: data.payment_status,
        service_id: data.service_id,
        spouse_firstName: "", // Initialize spouse fields to empty
        spouse_middleName: "",
        spouse_lastName: "",
      });

      // Fetch and set spouse details after setting groom details
      fetchWeddingData();
    }
  }, [open, data]);

  const fetchService = async () => {
    try {
      const response = await axios.get(
        `${config.API}/service/retrieveByParams`,
        {
          params: {
            id: data.service_id,
          },
        }
      );
      console.log(response.data);
      setService(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchPriest = async () => {
      try {
        const response = await axios.get(`${config.API}/priest/retrieve`, {
          params: {
            col: "status",
            val: "active",
          },
        });
        setPriests(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPriest();
    fetchService();
  }, []);
  // END RETRIEVE WEDDING DETAILS

  // START FORM HANDLERS AND CONTROLS
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const handleDateChange = (name, date) => {
    setFormData({...formData, [name]: date.format("YYYY-MM-DD")});
    console.log(formData.preferred_date);
  };

  const handleTimeChange = (name, time) => {
    setFormData({...formData, [name]: time.format("HH-mm-ss")});
  };

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  // END FORM HANDLERS AND CONTROLS

  const handleConfirm = async (action) => {
    switch (action) {
      case "approve":
        console.log(formData);
        try {
          const response = await axios.get(
            `${config.API}/priest/retrieve-schedule-by-params`,
            {
              params: {
                priest: formData.preferred_priest,
                date: formData.preferred_date,
                start: formData.preferred_time,
                end: endTime(formData.preferred_time, service.duration),
              },
            }
          );
          console.log(response);
          if (Object.keys(response.data).length > 0 || response.data != "") {
            setError({
              message: response.data.message,
              details: response.data?.details,
            });
          } else {
            axios.put(`${config.API}/request/approve-service`, null, {
              params: {
                col: "status",
                val: "approved",
                col2: "payment_status",
                val2: "paid",
                col3: "preferred_date",
                val3: formData.preferred_date,
                col4: "priest_id",
                val4: formData.preferred_priest,
                col5: "requestID",
                val5: formData.requestID,
              },
            });
            console.log("request success!");
            axios.post(`${config.API}/priest/createPriestSched`, {
              date: formData.preferred_date,
              activity: `${formData.type} at ${formData.address}`,
              start_time: formData.preferred_time,
              end_time: endTime(formData.preferred_time, service.duration),
              priest_id: formData.preferred_priest,
            });
            console.log("priest sched success!");
            handleClose();
          }
        } catch (err) {
          console.log("error submitting to server", err);
        }
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
      {error && (
        <Snackbar
          open={true}
          autoHideDuration={5000}
          onClose={() => setError(null)}
          message={
            <>
              <span style={{fontWeight: "bold", fontSize: "18px"}}>
                {error.message}
              </span>
              <p>{error.details}</p>
            </>
          }
        />
      )}

      <Modal open={open} onClose={() => handleClose}>
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
                Wedding Request Information
              </Typography>
            </Grid>

            <Grid item sm={12}>
              <Box
                fullWidth
                sx={{
                  bgcolor: "#D9D9D9",
                  padding: "10px",
                  borderRadius: "5px",
                }}>
                <Grid container spacing={1}>
                  <Grid item sm={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{fontWeight: "bold", fontSize: "14px"}}>
                      Groom:
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <label>First Name:</label>
                    <TextField
                      fullWidth
                      name="first_name"
                      onChange={handleChange}
                      value={formData?.first_name}
                      sx={TextFieldStyle}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <label>Middle Name:</label>
                    <TextField
                      fullWidth
                      name="middle_name"
                      onChange={handleChange}
                      value={formData?.middle_name}
                      sx={TextFieldStyle}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <label>Last Name:</label>
                    <TextField
                      fullWidth
                      name="last_name"
                      onChange={handleChange}
                      value={formData?.last_name || ""}
                      sx={TextFieldStyle}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item sm={12}>
              <Box
                fullWidth
                sx={{
                  bgcolor: "#D9D9D9",
                  padding: "10px",
                  borderRadius: "5px",
                }}>
                <Grid container spacing={1}>
                  <Grid item sm={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{fontWeight: "bold", fontSize: "14px"}}>
                      Bride:
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <label>First Name:</label>
                    <TextField
                      fullWidth
                      value={formData?.spouse_firstName}
                      sx={TextFieldStyle}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <label>Middle Name:</label>
                    <TextField
                      fullWidth
                      value={formData?.spouse_middleName}
                      sx={TextFieldStyle}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <label>Last Name:</label>
                    <TextField
                      fullWidth
                      value={formData?.spouse_lastName}
                      sx={TextFieldStyle}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item sm={4}>
              <label>Contact No:</label>
              <TextField
                fullWidth
                name="contact_no"
                onChange={handleChange}
                value={formData?.contact_no}
                sx={TextFieldStyle}
              />
            </Grid>
            <Grid item sm={4}>
              <label>Status:</label>
              <TextField
                name="relationship"
                onChange={handleChange}
                value={formData.relationship}
                fullWidth
                select
                sx={TextFieldStyle}>
                <MenuItem value="Civilly Married">Civilly Married</MenuItem>
                <MenuItem value="Live-in for under 4 years">
                  Live-in for under 4 years
                </MenuItem>
                <MenuItem value="Live-in for more than 4 years">
                  Live-in for more than 4 years
                </MenuItem>
                <MenuItem value="Widow">Widow</MenuItem>
              </TextField>
            </Grid>
            <Grid item sm={4}>
              <label>Payment:</label>
              <TextField
                name="payment_status"
                onChange={handleChange}
                value={formData?.payment_status}
                select
                fullWidth
                sx={TextFieldStyle}>
                <MenuItem value="unpaid">Unpaid</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
              </TextField>
            </Grid>

            <Grid item sm={12} textAlign={"center"}>
              <Typography
                variant="subtitle1"
                sx={{display: "inline-block", fontSize: "14px"}}>
                Requirements:
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  display: "inline-block",
                  marginLeft: "5px",
                  fontSize: "14px",
                  color: completeRequirements === 1 ? "green" : "red",
                }}>
                {completeRequirements === 1 ? "Complete" : "Incomplete"}
              </Typography>
              <RequirementsModal id={data.requestID} />
              <Typography
                variant="subtitle1"
                sx={{
                  display: "inline-block",
                  marginLeft: "5px",
                  fontSize: "14px",
                }}>
                Sponsors:
              </Typography>
              {/* <Typography
                variant="subtitle1"
                sx={{
                  display: "inline-block",
                  marginLeft: "5px",
                  fontSize: "14px",
                }}
              >
                Incomplete
              </Typography> */}
              <SponsorsModal id={data.requestID} />
            </Grid>

            <Grid item sm={12}>
              <Box
                fullWidth
                sx={{
                  bgcolor: "#D9D9D9",
                  padding: "10px",
                  borderRadius: "5px",
                }}>
                <Grid container spacing={1}>
                  <Grid item sm={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{fontWeight: "bold", fontSize: "14px"}}>
                      INTERVIEW
                    </Typography>
                  </Grid>
                  <Grid item sm={6}>
                    <Box fullWidth>
                      <Grid container>
                        <Grid item sm={12}>
                          <Typography
                            variant="subtitle1"
                            sx={{fontWeight: "bold", fontSize: "13px"}}>
                            Preferred
                          </Typography>
                        </Grid>
                        <Grid item sm={12}>
                          <label>Priest:</label>
                          <TextField
                            select
                            fullWidth
                            sx={TextFieldStyle}
                            value={formData.preferred_priest}
                            onChange={handleChange}>
                            {priests.map((priest) => (
                              <MenuItem key={priest.id} value={priest.priestID}>
                                {`${priest.first_name} ${priest.last_name}`}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item sm={6}>
                          <label>Date:</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              fullWidth
                              sx={TextFieldStyle}
                              value={
                                formData.preferred_date
                                  ? dayjs(formData.preferred_date)
                                  : null
                              }
                              onChange={(date) =>
                                handleTimeChange("preferred_date", date)
                              }
                              renderInput={(params) => (
                                <TextField {...params} required />
                              )}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item sm={6}>
                          <label>Time:</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                              fullWidth
                              sx={TextFieldStyle}
                              value={
                                formData.preferred_time
                                  ? dayjs(formData.preferred_time, "HH:mm:ss")
                                  : null
                              }
                              onChange={(time) =>
                                handleTimeChange("preferred_time", time)
                              }
                              renderInput={(params) => (
                                <TextField {...params} required />
                              )}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item sm={12}>
                          <Button
                            fullWidth
                            sx={{
                              backgroundColor: "#355173",
                              marginTop: "5px",
                              height: "30px",
                              fontWeight: "bold",
                              color: "white",
                              "&:hover": {bgcolor: "#4C74A5"},
                            }}>
                            Assign
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item sm={6}>
                    <Box fullWidth>
                      <Grid container>
                        <Grid item sm={12}>
                          <Typography
                            variant="subtitle1"
                            sx={{fontWeight: "bold", fontSize: "13px"}}>
                            Assigned
                          </Typography>
                        </Grid>
                        <Grid item sm={12}>
                          <label>Priest:</label>
                          <TextField
                            select
                            fullWidth
                            sx={TextFieldStyle}
                            value={formData.preferred_priest}
                            onChange={handleChange}>
                            {priests.map((priest) => (
                              <MenuItem key={priest.id} value={priest.priestID}>
                                {`${priest.first_name} ${priest.last_name}`}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item sm={6}>
                          <label>Date:</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker fullWidth sx={TextFieldStyle} />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item sm={6}>
                          <label>Time:</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker fullWidth sx={TextFieldStyle} />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item sm={12}>
                          <Button
                            fullWidth
                            sx={{
                              bgcolor: "#BBB6B6",
                              marginTop: "5px",
                              height: "30px",
                              fontWeight: "bold",
                              color: "#355173",
                              "&:hover": {bgcolor: "#D3CECE"},
                            }}>
                            CLEAR
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item sm={12}>
              <Box
                fullWidth
                sx={{
                  bgcolor: "#D9D9D9",
                  padding: "10px",
                  borderRadius: "5px",
                }}>
                <Grid container spacing={1}>
                  <Grid item sm={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{fontWeight: "bold", fontSize: "14px"}}>
                      WEDDING
                    </Typography>
                  </Grid>
                  <Grid item sm={6}>
                    <Box fullWidth>
                      <Grid container>
                        <Grid item sm={12}>
                          <Typography
                            variant="subtitle1"
                            sx={{fontWeight: "bold", fontSize: "13px"}}>
                            Preferred
                          </Typography>
                        </Grid>
                        <Grid item sm={7}>
                          <label>Priest:</label>
                          <TextField
                            select
                            fullWidth
                            sx={TextFieldStyle}
                            value={formData.preferred_priest}
                            onChange={handleChange}>
                            {priests.map((priest) => (
                              <MenuItem key={priest.id} value={priest.priestID}>
                                {`${priest.first_name} ${priest.last_name}`}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        {/* <Grid item sm={5}>
                          <label>Venue:</label>
                          <TextField disabled fullWidth sx={TextFieldStyle} />
                        </Grid> */}
                        <Grid item sm={6}>
                          <label>Date:</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker fullWidth sx={TextFieldStyle} />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item sm={6}>
                          <label>Time:</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker fullWidth sx={TextFieldStyle} />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item sm={12}>
                          <Button
                            fullWidth
                            sx={{
                              backgroundColor: "#355173",
                              marginTop: "5px",
                              height: "30px",
                              fontWeight: "bold",
                              color: "white",
                              "&:hover": {bgcolor: "#4C74A5"},
                            }}>
                            Assign
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item sm={6}>
                    <Box fullWidth>
                      <Grid container>
                        <Grid item sm={12}>
                          <Typography
                            variant="subtitle1"
                            sx={{fontWeight: "bold", fontSize: "13px"}}>
                            Assigned
                          </Typography>
                        </Grid>
                        <Grid item sm={12}>
                          <label>Priest:</label>
                          <TextField
                            select
                            fullWidth
                            sx={TextFieldStyle}
                            value={formData.preferred_priest}
                            onChange={handleChange}>
                            {priests.map((priest) => (
                              <MenuItem key={priest.id} value={priest.priestID}>
                                {`${priest.first_name} ${priest.last_name}`}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item sm={6}>
                          <label>Date:</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker fullWidth sx={TextFieldStyle} />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item sm={6}>
                          <label>Time:</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker fullWidth sx={TextFieldStyle} />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item sm={12}>
                          <Button
                            fullWidth
                            sx={{
                              bgcolor: "#BBB6B6",
                              marginTop: "5px",
                              height: "30px",
                              fontWeight: "bold",
                              color: "#355173",
                              "&:hover": {bgcolor: "#D3CECE"},
                            }}>
                            CLEAR
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
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
                {formData.transaction_no}
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
                  margin: "0px 0px 0px 5px",
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
            service={"service"}
          />
        </Box>
      </Modal>
    </>
  );
};

export default WeddingPending;
