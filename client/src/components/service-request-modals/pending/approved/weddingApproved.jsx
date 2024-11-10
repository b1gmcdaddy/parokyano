import CloseIcon from "@mui/icons-material/Close";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
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
  Skeleton,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useState, useEffect} from "react";
import React from "react";
import ConfirmationDialog from "../../../ConfirmationModal";
import axios from "axios";
import config from "../../../../config";
import dayjs from "dayjs";
import sendSMS from "../../../../utils/smsService";

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
  "& .MuiInputBase-root": {height: "40px", bgcolor: "white"},
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

function RequirementsModal({id, type, onClose}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [tabValue, setTabValue] = useState(0);
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
    isMarriageBann: 0,
    isCENOMAR: 0,
    isCEDULA: 0,
    isJointAffidavit: 0,
    isCivilContract: 0,
    isDeathCert: 0,
  });

  useEffect(() => {
    const fetchAndSetRequirements = async () => {
      const req = await fetchWeddingDetails(id);
      if (req) {
        setRequirements({
          groom_baptismCert: req.groom_baptismCert ?? 0,
          groom_confirmationCert: req.groom_confirmationCert ?? 0,
          groom_birthCert: req.groom_birthCert ?? 0,
          spouse_baptismCert: req.spouse_baptismCert ?? 0,
          spouse_confirmationCert: req.spouse_confirmationCert ?? 0,
          spouse_birthCert: req.spouse_birthCert ?? 0,
          isParishPermit: req.isParishPermit ?? 0,
          isPrenuptial: req.isPrenuptial ?? 0,
          isPreCana: req.isPreCana ?? 0,
          isMarriageLicense: req.isMarriageLicense ?? 0,
          isMarriageBann: req.isMarriageBann ?? 0,
          isCENOMAR: req.isCENOMAR ?? 0,
          isCEDULA: req.isCEDULA ?? 0,
          isJointAffidavit: req.isJointAffidavit ?? 0,
          isCivilContract: req.isCivilContract ?? 0,
          isDeathCert: req.isDeathCert ?? 0,
        });
        setSelectedWeddingId(req.wedding_id);
      }
    };
    if (open) {
      fetchAndSetRequirements();
    }
  }, [open, id]);

  const dynamicRequirements = [
    {
      type: "Civilly Married",
      requirements: [
        {name: "Civil Marriage Contract", field: "isCivilContract"},
        {name: "Parish Permit", field: "isParishPermit"},
        {name: "Prenuptial Agreement", field: "isPrenuptial"},
        {name: "Pre-Cana Certificate", field: "isPreCana"},
        {name: "Marriage Bann", field: "isMarriageBann"},
      ],
    },
    {
      type: "Live-in for under 4 years",
      requirements: [
        {name: "Parish Permit", field: "isParishPermit"},
        {name: "Prenuptial Agreement", field: "isPrenuptial"},
        {name: "Pre-Cana Certificate", field: "isPreCana"},
        {name: "Marriage License", field: "isMarriageLicense"},
        {name: "CENOMAR", field: "isCENOMAR"},
        {name: "CEDULA", field: "isCEDULA"},
        {name: "Marriage Bann", field: "isMarriageBann"},
      ],
    },
    {
      type: "Live-in for more than 4 years",
      requirements: [
        {name: "Parish Permit", field: "isParishPermit"},
        {name: "Prenuptial Agreement", field: "isPrenuptial"},
        {name: "Pre-Cana Certificate", field: "isPreCana"},
        {name: "Joint Affidavit of Cohabitation", field: "isJointAffidavit"},
        {name: "CENOMAR", field: "isCENOMAR"},
        {name: "CEDULA", field: "isCEDULA"},
        {name: "Marriage Bann", field: "isMarriageBann"},
      ],
    },
    {
      type: "Widow",
      requirements: [
        {name: "Parish Permit", field: "isParishPermit"},
        {name: "Prenuptial Agreement", field: "isPrenuptial"},
        {name: "Pre-Cana Certificate", field: "isPreCana"},
        {name: "Marriage License", field: "isMarriageLicense"},
        {name: "CENOMAR", field: "isCENOMAR"},
        {name: "CEDULA", field: "isCEDULA"},
        {name: "Marriage Bann", field: "isMarriageBann"},
        {name: "Partner's Death Certificate", field: "isDeathCert"},
      ],
    },
  ];

  const selectedRequirements =
    dynamicRequirements.find((req) => req.type === type)?.requirements || [];

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const updateRequirements = () => {
    try {
      const reqs = {
        ...requirements,
        type,
      };

      axios.put(
        `${config.API}/wedding/requirements/${selectedWeddingId}`,
        reqs
      );
      alert("Successfully Updated Requirements!");
      fetchWeddingDetails(id);
    } catch (error) {
      alert("FAILED to Update Requirements...");
      fetchWeddingDetails(id);
    }
    console.log(selectedWeddingId);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          backgroundColor: "white",
          height: "30px",
          color: "#355173",
          fontSize: 12,
          "&:hover": {bgcolor: "#E5E4E2"},
        }}>
        Requirements
      </Button>
      <Modal open={open} onClose={handleClose}>
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
              {/* Static groom and spouse certificates (these are common for all types) */}

              {/* Render dynamic requirements based on the wedding type */}
              {selectedRequirements.map((req) => (
                <Grid item sm={12} key={req.field}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={requirements[req.field] === 1}
                        onChange={(e) =>
                          setRequirements((prev) => ({
                            ...prev,
                            [req.field]: e.target.checked ? 1 : 0,
                          }))
                        }
                      />
                    }
                    label={
                      <Typography sx={{fontSize: "15px"}}>
                        {req.name}
                      </Typography>
                    }
                  />
                </Grid>
              ))}
            </Box>

            <Grid item sm={12} sx={{marginTop: "10px", textAlign: "center"}}>
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
        variant="contained"
        sx={{
          backgroundColor: "white",
          height: "30px",
          marginLeft: 1,
          fontSize: 12,
          color: "#355173",
          "&:hover": {bgcolor: "#E5E4E2"},
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

const WeddingApproved = ({open, data, handleClose, refreshList}) => {
  const [available, setAvailable] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [completeRequirements, setCompleteRequirements] = useState(0);
  const [currentAction, setCurrentAction] = useState("");
  const [service, setService] = useState({});
  const [approver, setApprover] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [snackBarStyle, setSnackBarStyle] = useState(null);
  const [priests, setPriests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    interview_date: "",
    interview_time: "",
    priest_id: "",
    preferred_date: "",
    preferred_time: "",
    transaction_no: "",
    payment_status: "",
    service_id: "",
  });

  // START RETRIEVE WEDDING DETAILS
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

        setCompleteRequirements(weddingDetails.isComplete || 0);
      }
    } catch (err) {
      console.error("Error fetching wedding details", err);
    }
  };

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`${config.API}/user/retrieve`, {
        params: {
          id: id,
        },
      });
      console.log(response.data[0]);
      if (response.status === 200) {
        setApprover(response.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (open && data) {
      setFormData({
        requestID: data.requestID,
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        contact_no: data.contact_no,
        relationship: data.relationship,
        interview_date: data.interview_date
          ? dayjs(data.interview_date).format("YYYY-MM-DD")
          : null,
        interview_time: data.interview_time || null,
        priest_id: data.priest_id || null,
        preferred_date: data.preferred_date
          ? dayjs(data.preferred_date).format("YYYY-MM-DD")
          : null,
        preferred_time: data.preferred_time || null,
        transaction_no: data.transaction_no,
        payment_status: data.payment_status,
        service_id: data.service_id,
        spouse_firstName: "",
        spouse_middleName: "",
        spouse_lastName: "",
        donation: data.donation || "",
      });
      console.log(data);
      fetchWeddingData();
      fetchUser(data.user_id);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, "500");
  }, [open, data]);

  const fetchAvailability = async (date, start, end) => {
    const avail = await axios.get(
      `${config.API}/priest/retrieve-schedule-venue`,
      {
        params: {
          date: date,
          start: start,
          end: end,
        },
      }
    );
    console.log(avail.data.message);
    setAvailable(avail.data.message);
  };

  useEffect(() => {
    fetchAvailability(
      formData.preferred_date,
      formData.preferred_time,
      endTime(formData.preferred_time, service.duration)
    );
  }, [
    formData.preferred_date,
    formData.preferred_time,
    formData.priest_id,
    open,
  ]);

  const closeInfoModal = (action) => {
    if (action == "reschedule") {
      setSuccess({
        message: "Reschedule Confirmed!",
        details: "The request has been successfully rescheduled.",
      });
      setSnackBarStyle("success");
    } else if (action == "cancel") {
      setSuccess({
        message: "Cancellation Confirmed",
        details: "The request has been cancelled.",
      });
      setSnackBarStyle("info");
    } else {
      setSuccess({
        message: "Update Confirmed",
        details: "The request has been updated",
      });
      setSnackBarStyle("info");
    }
    handleClose();
    refreshList();
  };

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
  };

  const handleTimeChange = (name, time) => {
    setFormData({...formData, [name]: time.format("HH:mm:ss")});
  };

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseRequirementsDialog = async () => {
    await fetchWeddingData();
  };
  // END FORM HANDLERS AND CONTROLS

  const handleConfirm = async (action) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    switch (action) {
      case "update": ///// UPDATE PENDING REQUEST////
        const res = await axios.put(
          `${config.API}/wedding/updateWedding/${data.requestID}`,
          formData
        );
        if (res.status !== 200) {
          console.log("error updating request");
          setError({
            message: res.data.message,
            details: res.data?.details,
          });
        } else {
          console.log("request updated!");

          axios.post(`${config.API}/logs/create`, {
            activity: `Updated Wedding Request - Transaction number: ${data.transaction_no}`,
            user_id: currentUser.id,
            request_id: data.requestID,
          });
          closeInfoModal("update");
        }
        break;
      case "cancel": // CANCEL PENDING REQUEST
        await axios.put(`${config.API}/request/update`, null, {
          params: {
            col: "status",
            val: "cancelled",
            id: formData.requestID,
          },
        });

        console.log("request cancelled!");
        // sendSMS(data.service_id, formData, "cancel");
        await axios.post(`${config.API}/logs/create`, {
          activity: `Cancelled Wedding Request - Transaction number: ${data.transaction_no}`,
          user_id: currentUser.id,
          request_id: data.requestID,
        });
        closeInfoModal("cancel");
        break;

      case "reschedule": ////// RESCHEDULE
        try {
          const response = await axios.get(
            `${config.API}/priest/retrieve-schedule-by-params`,
            {
              params: {
                priest: formData.priest_id,
                date: formData.preferred_date,
                start: formData.preferred_time,
                end: endTime(formData.preferred_time, service.duration),
              },
            }
          );

          if (Object.keys(response.data).length > 0 || response.data != "") {
            setError({
              message: response.data.message,
              details: response.data?.details,
            });
            return;
          }

          const reschedule = {
            preferred_date: formData.preferred_date,
            preferred_time: formData.preferred_time,
            priest_id: formData.priest_id,
          };

          await axios.put(`${config.API}/request/update-bulk`, {
            formData: reschedule,
            id: data.requestID,
          });

          await Promise.all([
            axios.put(`${config.API}/priest/reschedule`, {
              date: formData.preferred_date,
              activity: `Wedding for ${formData.first_name} and ${formData.spouse_firstName}`,
              start_time: formData.preferred_time,
              end_time: endTime(formData.preferred_time, service.duration),
              priest_id: formData.priest_id,
              request_id: data.requestID,
            }),
            axios.post(`${config.API}/logs/create`, {
              activity: `Rescheduled Wedding for ${formData.first_name} and ${formData.spouse_firstName}`,
              user_id: currentUser.id,
              request_id: data.requestID,
            }),
            // sendSMS(data.service_id, formData, "reschedule"),
            closeInfoModal("reschedule"),
          ]);
        } catch (err) {
          setError({
            message: err.response.data.message,
            details: err.response.data.details,
          });
        }
        break;

      default:
        break;
    }
  };

  return (
    <>
      {error && (
        <Snackbar
          anchorOrigin={{vertical: "top", horizontal: "center"}}
          open={true}
          autoHideDuration={5000}
          onClose={() => setError(null)}>
          <Alert severity="error" sx={{width: "100%"}}>
            <AlertTitle>{error.message}</AlertTitle>
            {error.details}
          </Alert>
        </Snackbar>
      )}

      {success && (
        <Snackbar
          anchorOrigin={{vertical: "top", horizontal: "center"}}
          open={true}
          autoHideDuration={5000}
          onClose={() => setSuccess(null)}>
          <Alert severity={snackBarStyle} sx={{width: "100%"}}>
            <AlertTitle>{success.message}</AlertTitle>
            {success.details}
          </Alert>
        </Snackbar>
      )}

      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        {!isLoading ? (
          <>
            <DialogTitle sx={{mt: 3, p: 2, textAlign: "center"}}>
              <b>Wedding Request Information</b>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{position: "absolute", right: 8, top: 8}}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{padding: 3}}>
                <Grid item xs={12} sm={4}>
                  <label>Groom's First Name:</label>
                  <TextField
                    fullWidth
                    name="first_name"
                    onChange={handleChange}
                    value={formData?.first_name}
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Groom's Middle Name:</label>
                  <TextField
                    fullWidth
                    name="middle_name"
                    onChange={handleChange}
                    value={formData?.middle_name}
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Groom's Last Name:</label>
                  <TextField
                    fullWidth
                    name="last_name"
                    onChange={handleChange}
                    value={formData?.last_name || ""}
                    sx={TextFieldStyle}
                  />
                </Grid>

                <Grid item sm={4}>
                  <label>Bride's First Name:</label>
                  <TextField
                    fullWidth
                    value={formData?.spouse_firstName}
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Bride's Middle Name:</label>
                  <TextField
                    fullWidth
                    value={formData?.spouse_middleName}
                    sx={TextFieldStyle}
                  />
                </Grid>
                <Grid item sm={4}>
                  <label>Bride's Last Name:</label>
                  <TextField
                    fullWidth
                    value={formData?.spouse_lastName}
                    sx={TextFieldStyle}
                  />
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
                  <label>
                    Payment:
                    <strong>
                      {" "}
                      ₱{parseFloat(formData.donation).toFixed(2)}
                    </strong>
                  </label>
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

                <Grid item xs={12} sm={4}>
                  <Typography sx={{display: "inline-block"}}>
                    Requirements:
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      display: "inline-block",
                      marginLeft: "5px",
                      marginBottom: 1,
                      fontSize: "14px",
                      color:
                        completeRequirements == 1 &&
                        formData.payment_status == "paid"
                          ? "green"
                          : "red",
                    }}>
                    {completeRequirements == 1 &&
                    formData.payment_status == "paid" ? (
                      <span className="font-bold">COMPLETE</span>
                    ) : (
                      <span className="font-bold">INCOMPLETE</span>
                    )}
                  </Typography>

                  <RequirementsModal
                    id={data.requestID}
                    type={data.relationship}
                    onClose={handleCloseRequirementsDialog}
                  />
                  <SponsorsModal id={data.requestID} />
                </Grid>

                <Grid item xs={12}>
                  <hr className="my-1" />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <label>Selected Priest:</label>
                  <TextField
                    value={formData.priest_id}
                    size="small"
                    name="priest_id"
                    sx={TextFieldStyle}
                    onChange={handleChange}
                    select
                    fullWidth>
                    {priests.map((priest) => (
                      <MenuItem key={priest.priestID} value={priest.priestID}>
                        {priest.first_name + " " + priest.last_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <label>Selected Date:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                      fullWidth
                      sx={TextFieldStyle}
                      value={
                        formData.preferred_date
                          ? dayjs(formData.preferred_date)
                          : null
                      }
                      onChange={(date) =>
                        handleDateChange("preferred_date", date)
                      }
                      renderInput={(params) => (
                        <TextField {...params} required />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <label>Selected Time:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      fullWidth
                      sx={TextFieldStyle}
                      timeSteps={{hours: 30, minutes: 30}}
                      minTime={dayjs().set("hour", 6)}
                      maxTime={dayjs().set("hour", 19)}
                      value={
                        data.preferred_time
                          ? dayjs(data.preferred_time, "HH:mm:ss")
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

                <Grid item xs={12} sm={2} sx={{margin: "auto"}}>
                  <Button
                    onClick={() => handleOpenDialog("reschedule")}
                    sx={{
                      bgcolor: "#247E38",
                      marginTop: "24px",
                      height: "40px",
                      fontWeight: "bold",
                      color: "white",
                      "&:hover": {bgcolor: "#578A62"},
                    }}>
                    Reschedule
                  </Button>
                </Grid>
                {/* <Grid item sm={4}>
              <label>Church:</label>
              <TextField value={available} size="small" fullWidth />
            </Grid> */}
                <Grid item xs={6}>
                  <label>Approved by:</label>
                  <TextField
                    fullWidth
                    sx={TextFieldStyle}
                    size="small"
                    disabled
                    value={approver?.first_name + " " + approver?.last_name}
                  />
                </Grid>
                <Grid item xs={6}>
                  <label>Transaction Number:</label>
                  <Paper
                    elevation={1}
                    sx={{
                      height: "40px",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "#d1d1d1",
                      fontWeight: "bold",
                    }}>
                    <p>{data.transaction_no}</p>
                  </Paper>
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
                }}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    margin: "-40px 0 10px 0",
                    justifyContent: "center",
                    gap: "20px",
                  }}>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog("update")}
                    sx={{
                      bgcolor: "#CDAB52",
                      marginTop: "24px",
                      height: "40px",
                      fontWeight: "bold",
                      color: "white",
                      "&:hover": {bgcolor: "#A58228"},
                    }}>
                    UPDATE
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog("cancel")}
                    sx={{
                      bgcolor: "#C34444",
                      marginTop: "24px",
                      height: "40px",
                      fontWeight: "bold",
                      color: "white",
                      "&:hover": {bgcolor: "#f44336"},
                    }}>
                    CANCEL
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </>
        ) : (
          // Skeleton loading effect for the entire form
          <Grid container spacing={2} sx={{padding: 6}}>
            <Grid item sm={12}>
              <Skeleton variant="text" width="80%" height={30} />
            </Grid>
            {[...Array(9)].map((_, index) => (
              <Grid item sm={4} key={index}>
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Grid>
            ))}
            <Grid item sm={12} sx={{mt: 2}}>
              <Skeleton variant="rectangular" width="30%" height={40} />
            </Grid>
            <Grid item sm={12} sx={{mt: 1}}>
              <Skeleton variant="text" width="50%" height={30} />
              <Skeleton variant="rectangular" width="100%" height={150} />
            </Grid>
            <Grid item sm={12} sx={{mt: 2}}>
              <Skeleton variant="rectangular" width="30%" height={40} />
              <Skeleton
                variant="rectangular"
                width="30%"
                height={40}
                sx={{ml: 2}}
              />
            </Grid>
          </Grid>
        )}
      </Dialog>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        action={currentAction}
        onConfirm={handleConfirm}
        service={"Wedding"}
      />
    </>
  );
};

export default WeddingApproved;
