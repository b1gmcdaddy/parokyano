import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import React from "react";
import ConfirmationDialog from "../../ConfirmationModal";
import util from "../../../utils/DateTimeFormatter";
import axios from "axios";
import config from "../../../config";

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
  "& .MuiInputBase-root": { height: "30px", bgcolor: "white" },
};

const tabStyle = {
  fontWeight: "bold",
  color: "black",
  bgcolor: "#D9D9D9",
};

const sponsors = [
  {
    name: "John Dominic Cocjic",
    age: "22",
    marital: "Married",
    catholic: "Yes",
  },
  { name: "Andrew Garfiels", age: "31", marital: "Married", catholic: "Yes" },
  { name: "Ariana Grande", age: "25", marital: "Married", catholic: "Yes" },
  { name: "Olivia Rodrigo", age: "23", marital: "Married", catholic: "Yes" },
  {
    name: "John Dominic Cocjic",
    age: "22",
    marital: "Married",
    catholic: "Yes",
  },
  { name: "Andrew Garfiels", age: "31", marital: "Married", catholic: "Yes" },
  { name: "Ariana Grande", age: "25", marital: "Married", catholic: "Yes" },
  { name: "Olivia Rodrigo", age: "23", marital: "Married", catholic: "Yes" },
  {
    name: "John Dominic Cocjic",
    age: "22",
    marital: "Married",
    catholic: "Yes",
  },
  { name: "Andrew Garfiels", age: "31", marital: "Married", catholic: "Yes" },
  { name: "Ariana Grande", age: "25", marital: "Married", catholic: "Yes" },
  { name: "Olivia Rodrigo", age: "23", marital: "Married", catholic: "Yes" },
];

function RequirementsModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tabValue, setTabValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service] = useState("wedding");

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
  {
    /** for sameple if success, ari butang backend**/
  }
  const handleConfirm = (action) => {
    switch (action) {
      case "Update wedding requirement":
        alert("Update action confirmed.");
        break;
      default:
        break;
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
          "&:hover": { bgcolor: "#4C74A5" },
        }}
      >
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
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                Wedding Requirements Information
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Tabs
                centered
                variant="fullWidth"
                value={tabValue}
                onChange={handleTabChange}
                sx={{ borderRadius: "10px 10px 0px 0px" }}
              >
                <Tab label="Groom" sx={tabStyle} />
                <Tab label="Bride" sx={tabStyle} />
              </Tabs>
              <Box
                fullWidth
                sx={{
                  bgcolor: "#D9D9D9",
                  padding: "10px",
                  borderRadius: "0px 0px 5px 5px",
                }}
              >
                <Grid container justifyContent={"center"}>
                  <Box>
                    {tabValue === 0 && (
                      <>
                        <Grid item sm={12}>
                          <FormControlLabel
                            control={<Checkbox />}
                            label={
                              <Typography sx={{ fontSize: "15px" }}>
                                Marriage License
                              </Typography>
                            }
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <FormControlLabel
                            control={<Checkbox />}
                            label={
                              <Typography sx={{ fontSize: "15px" }}>
                                Birth Certificate
                              </Typography>
                            }
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <FormControlLabel
                            control={<Checkbox />}
                            label={
                              <Typography sx={{ fontSize: "15px" }}>
                                Baptismal Certificate
                              </Typography>
                            }
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <FormControlLabel
                            control={<Checkbox />}
                            label={
                              <Typography sx={{ fontSize: "15px" }}>
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
                            control={<Checkbox />}
                            label={
                              <Typography sx={{ fontSize: "15px" }}>
                                Marriage License
                              </Typography>
                            }
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <FormControlLabel
                            control={<Checkbox />}
                            label={
                              <Typography sx={{ fontSize: "15px" }}>
                                Birth Certificate
                              </Typography>
                            }
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <FormControlLabel
                            control={<Checkbox />}
                            label={
                              <Typography sx={{ fontSize: "15px" }}>
                                Baptismal Certificate
                              </Typography>
                            }
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <FormControlLabel
                            control={<Checkbox />}
                            label={
                              <Typography sx={{ fontSize: "15px" }}>
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

            <Grid item sm={12} sx={{ marginTop: "5px" }}>
              <div
                style={{ flex: 0.1, height: "1.8px", backgroundColor: "black" }}
              />
            </Grid>

            <Box>
              <Grid item sm={12}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Typography sx={{ fontSize: "15px" }}>
                      Parish Permit
                    </Typography>
                  }
                />
              </Grid>
              <Grid item sm={12}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Typography sx={{ fontSize: "15px" }}>
                      Prenuptial Questionnaire
                    </Typography>
                  }
                />
              </Grid>
              <Grid item sm={12}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <Typography sx={{ fontSize: "15px" }}>
                      Pre-Cana Seminar
                    </Typography>
                  }
                />
              </Grid>
            </Box>
            <Grid item sm={12} sx={{ textAlign: "center" }}>
              <Button
                onClick={() => handleOpenDialog("Update wedding requirement")}
                sx={{
                  bgcolor: "#CDAB52",
                  height: "35px",
                  width: "90px",
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": { bgcolor: "#F0CA67" },
                }}
              >
                UPDATE
              </Button>
            </Grid>
          </Grid>
          <ConfirmationDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            action={currentAction}
            onConfirm={handleConfirm}
            service={service}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function SponsorsModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service] = useState("wedding");

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  {
    /** for sameple if success, ari butang backend**/
  }
  const handleConfirm = (action) => {
    switch (action) {
      case "Update sponsors":
        alert("Update action confirmed.");
        break;
      default:
        break;
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
          "&:hover": { bgcolor: "#4C74A5" },
        }}
      >
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
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                Wedding Sponsors Information
              </Typography>
            </Grid>
            <Grid item sm={4.5}>
              <label>Full Name:</label>
              <TextField fullWidth sx={TextFieldStyle} />
            </Grid>
            <Grid item sm={1.5}>
              <label>Age:</label>
              <TextField fullWidth sx={TextFieldStyle} />
            </Grid>
            <Grid item sm={3}>
              <label>Marital Status:</label>
              <TextField select fullWidth sx={TextFieldStyle} />
            </Grid>
            <Grid item sm={3}>
              <label>Catholic?:</label>
              <TextField select fullWidth sx={TextFieldStyle} />
            </Grid>
            <Grid item sm={12} sx={{ textAlign: "center" }}>
              <Button
                sx={{
                  bgcolor: "#355173",
                  height: "28px",
                  width: "150px",
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": { bgcolor: "#4C74A5" },
                }}
              >
                Add Sponsor
              </Button>
            </Grid>

            <Grid item sm={12}>
              <TableContainer component={Paper}>
                <Table sx={{ tableLayout: "fixed" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Full Name</TableCell>
                      <TableCell align="center">Age</TableCell>
                      <TableCell align="center">Marital Status</TableCell>
                      <TableCell align="center">Catholic?</TableCell>
                      <TableCell
                        align="center"
                        sx={{ width: "50px" }}
                      ></TableCell>
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
                }}
              >
                <Table sx={{ tableLayout: "fixed", width: "100%" }}>
                  <TableBody>
                    {sponsors.map((sponsor) => (
                      <TableRow key={sponsor.name}>
                        <TableCell align="center" component="th">
                          {sponsor.name}
                        </TableCell>
                        <TableCell align="center">{sponsor.age}</TableCell>
                        <TableCell align="center">{sponsor.marital}</TableCell>
                        <TableCell align="center">{sponsor.catholic}</TableCell>
                        <TableCell align="center" sx={{ width: "50px" }}>
                          <IconButton size="small">
                            <FontAwesomeIcon icon={faXmark} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Grid>

            <Grid item sm={12} sx={{ textAlign: "center" }}>
              <Button
                onClick={() => handleOpenDialog("Update sponsors")}
                sx={{
                  bgcolor: "#CDAB52",
                  height: "35px",
                  width: "90px",
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": { bgcolor: "#F0CA67" },
                }}
              >
                UPDATE
              </Button>
            </Grid>
          </Grid>
          <ConfirmationDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            action={currentAction}
            onConfirm={handleConfirm}
            service={service}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const WeddingPending = ({ open, data, handleClose }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service] = useState("wedding");
  const [priests, setPriests] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    first_name: "",
    last_name: "",
    relationship: "",
    spouse_name: "",
    address: "",
    requested_by: "",
    contact_no: "",
    preferred_date: "",
    preferred_time: "",
    preferred_priest: "",
    isParishioner: "",
    transaction_no: "",
    payment_status: "",
    service_id: "",
  });

  useEffect(() => {
    if (open && data) {
      setFormData({
        type: data.type,
        first_name: data.first_name,
        last_name: data.last_name,
        relationship: data.relationship,
        spouse_name: data.spouse_name,
        address: data.address,
        requested_by: data.requested_by,
        contact_no: data.contact_no,
        preferred_date: data.preferred_date,
        preferred_time: data.preferred_time,
        preferred_priest: data.preferred_priest,
        isParishioner: data.isParishioner,
        transaction_no: data.transaction_no,
        payment_status: data.payment_status,
        service_id: 13,
      });
    }
  }, [open, data]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  {
    /** for sameple if success, ari butang backend**/
  }
  const handleConfirm = (action) => {
    switch (action) {
      case "approve":
        alert("Approval action confirmed.");
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
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
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
                }}
              >
                <Grid container spacing={1}>
                  <Grid item sm={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", fontSize: "14px" }}
                    >
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
                }}
              >
                <Grid container spacing={1}>
                  <Grid item sm={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", fontSize: "14px" }}
                    >
                      Bride:
                    </Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <label>First Name:</label>
                    <TextField
                      fullWidth
                      value={formData.spouse_name}
                      sx={TextFieldStyle}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <label>Middle Name:</label>
                    <TextField fullWidth value={""} sx={TextFieldStyle} />
                  </Grid>
                  <Grid item sm={4}>
                    <label>Last Name:</label>
                    <TextField fullWidth value={""} sx={TextFieldStyle} />
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
                sx={TextFieldStyle}
              >
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
                sx={TextFieldStyle}
              >
                <MenuItem value="unpaid">Unpaid</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
              </TextField>
            </Grid>

            <Grid item sm={12} textAlign={"center"}>
              <Typography
                variant="subtitle1"
                sx={{ display: "inline-block", fontSize: "14px" }}
              >
                Requirements:
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  display: "inline-block",
                  marginLeft: "5px",
                  fontSize: "14px",
                }}
              >
                Incomplete
              </Typography>
              <RequirementsModal />
              <Typography
                variant="subtitle1"
                sx={{
                  display: "inline-block",
                  marginLeft: "5px",
                  fontSize: "14px",
                }}
              >
                Sponsors:
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  display: "inline-block",
                  marginLeft: "5px",
                  fontSize: "14px",
                }}
              >
                Incomplete
              </Typography>
              <SponsorsModal />
            </Grid>

            <Grid item sm={12}>
              <Box
                fullWidth
                sx={{
                  bgcolor: "#D9D9D9",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item sm={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", fontSize: "14px" }}
                    >
                      INTERVIEW
                    </Typography>
                  </Grid>
                  <Grid item sm={6}>
                    <Box fullWidth>
                      <Grid container>
                        <Grid item sm={12}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", fontSize: "13px" }}
                          >
                            Preferred
                          </Typography>
                        </Grid>
                        <Grid item sm={12}>
                          <label>Priest:</label>
                          <TextField select fullWidth sx={TextFieldStyle} />
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
                              backgroundColor: "#355173",
                              marginTop: "5px",
                              height: "30px",
                              fontWeight: "bold",
                              color: "white",
                              "&:hover": { bgcolor: "#4C74A5" },
                            }}
                          >
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
                            sx={{ fontWeight: "bold", fontSize: "13px" }}
                          >
                            Assigned
                          </Typography>
                        </Grid>
                        <Grid item sm={12}>
                          <label>Priest:</label>
                          <TextField select fullWidth sx={TextFieldStyle} />
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
                              "&:hover": { bgcolor: "#D3CECE" },
                            }}
                          >
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
                }}
              >
                <Grid container spacing={1}>
                  <Grid item sm={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", fontSize: "14px" }}
                    >
                      WEDDING
                    </Typography>
                  </Grid>
                  <Grid item sm={6}>
                    <Box fullWidth>
                      <Grid container>
                        <Grid item sm={12}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", fontSize: "13px" }}
                          >
                            Preferred
                          </Typography>
                        </Grid>
                        <Grid item sm={7}>
                          <label>Priest:</label>
                          <TextField select fullWidth sx={TextFieldStyle} />
                        </Grid>
                        <Grid item sm={5}>
                          <label>Venue:</label>
                          <TextField disabled fullWidth sx={TextFieldStyle} />
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
                              backgroundColor: "#355173",
                              marginTop: "5px",
                              height: "30px",
                              fontWeight: "bold",
                              color: "white",
                              "&:hover": { bgcolor: "#4C74A5" },
                            }}
                          >
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
                            sx={{ fontWeight: "bold", fontSize: "13px" }}
                          >
                            Assigned
                          </Typography>
                        </Grid>
                        <Grid item sm={12}>
                          <label>Priest:</label>
                          <TextField select fullWidth sx={TextFieldStyle} />
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
                              "&:hover": { bgcolor: "#D3CECE" },
                            }}
                          >
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
              }}
            >
              <Typography variant="body2" sx={{ marginRight: "5px" }}>
                Transaction Code:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
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
              }}
            >
              <Button
                onClick={() => handleOpenDialog("update")}
                sx={{
                  bgcolor: "#CDAB52",
                  height: "35px",
                  width: "90px",
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": { bgcolor: "#F0CA67" },
                }}
              >
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
                  "&:hover": { bgcolor: "#F05A5A" },
                }}
              >
                CANCEL
              </Button>
            </Grid>
          </Grid>
          <ConfirmationDialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            action={currentAction}
            onConfirm={handleConfirm}
            service={service}
          />
        </Box>
      </Modal>
    </>
  );
};

export default WeddingPending;
