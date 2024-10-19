import React, {useState, useEffect} from "react";
import NavStaff from "../../components/NavStaff";
import {
  Box,
  Toolbar,
  Typography,
  Grid,
  Button,
  IconButton,
  TextField,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  TableHead,
  Divider,
  Modal,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faUnlockAlt, faXmark} from "@fortawesome/free-solid-svg-icons";
import ConfirmationDialog from "../../components/ConfirmationModal";
import axios from "axios";
import config from "../../config";
import util from "../../utils/DateTimeFormatter";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import generateHash from "../../utils/GenerateHash";
import all from "../../components/PaymentModal";
import ValidateForm from "../../utils/Validators";
import {DefaultCopyField} from "@eisberg-labs/mui-copy-field";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '100vw',  
  bgcolor: 'white',
  borderRadius: '10px',
  boxShadow: 3,
  px: 4,
  py: 2,
  maxHeight: '100vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
};

const modalContentStyle = {
overflowY: 'auto',
flexGrow: 1,
scrollbarWidth: 'none',   
  "&::-webkit-scrollbar": {  
      display: "none"
}
};

const TextFieldStyleModal ={
  "& .MuiInputBase-root":{height:'30px', bgcolor:'white'}
};

const TextFieldStyle = {
  "& .MuiInputBase-root": {height: "40px"},
  bgcolor: "#D9D9D9",
};

const inputstyling = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      boxShadow: "0 3px 2px rgba(0,0,0,0.1)",
      borderRadius: "20px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#355173",
      borderWidth: "0.5px",
    },
    "& .MuiInputBase-input": {
      textAlign: "center",
      fontWeight: "bold",
      marginLeft: "30px",
      fontSize: "25px",
    },
    "&.Mui-disabled .MuiInputBase-input": {
      color: "black",
      WebkitTextFillColor: "black",
    },
  },
};

const Settings = () => {
  const [currentView, setCurrentView] = useState("settings");
  const [hover, setHover] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [service] = useState("change password");
  const [logs, setLogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [transacNoModal, setOpenTransac] = useState(false);
  const handleOpen = () => setOpen(true);
  const id = 2;
  const dateToday = new Date().toJSON().slice(0, 10);
  const hash = dateToday + generateHash().slice(0, 20);
  const [serviceInfo, setServiceInfo] = useState({});
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    birth_date: null,
    birth_place: "",
    contact_no: "",
    father_name: "",
    mother_name: "",
    spouse_name: null,
    preferred_date: null,
    archive_info: {
      book_no: "",
      page_no: "",
      line_no: "",
    },
    service_id: id,
    transaction_no: hash,
    date_requested: dateToday,
    purpose: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      setOpen(false);
    }
  };


  // PAGINATION
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const fetchLogs = async () => {
    try {
      const res = await axios.get(`${config.API}/logs/retrieve-all`, {
        params: {
          page: page + 1,
          limit: rowsPerPage,
        },
      });
      setLogs(res.data.result);
    } catch (err) {
      console.error("error retrieving logs..", err);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page]);

  const handleChangeView = (view) => {
    setCurrentView(view);
  };

  const handleClearFields = () => {
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseTransacModal = (event, reason) =>{
    if (reason === "backdropClick") {
      setOpen(false);
      setOpenTransac(false);
    }else{
      setOpen(false);
      setOpenTransac(false);
    }
  }

  const handleConfirm = (action) => {
    switch (action) {
      case "change password":
        alert("Change password confirmed.");
        handleChangeView("settings");
        break;
      default:
        break;
    }
  };

  //Confirmation Modal
  useEffect(() => {
    const fetchServiceInfo = async () => {
      try {
        const response = await axios.get(
          `${config.API}/service/retrieveByParams`,
          {
            params: {
              id: id,
            },
          }
        );
        setServiceInfo(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("error retrieving service info from server", err);
      }
    };
    fetchServiceInfo();
  }, []);

  // event handlers
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleDateChange = (name, date) => {
    setFormData({...formData, [name]: date.format("YYYY-MM-DD")});
  };

  // this handles book line and page no.
  const handleArchive = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      archive_info: {...formData.archive_info, [e.target.name]: e.target.value},
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = ValidateForm(formData);
    setErrors(validate);
    console.log(validate);
    console.log(formData);
    if (Object.keys(validate).length == 0 && validate.constructor == Object) {
      try {
        axios.post(`${config.API}/request/create-certificate`, formData);
        //axios.post(`${config.API}/logs/create`, {
        //  activity: `Added a Confirmation Certificate Request - Transaction number: ${formData.transaction_no}`,
        //  user_id: 1,
        //  request_id: formData.requestID,
        //});
        setOpenTransac(true);
      } catch (err) {
        console.error("error submitting data", err);
      }
    }
  };

  return (
    <>
      <Box sx={{display: "flex", mx: {md: "30px"}}}>
        <NavStaff />
        <Box
          component="main"
          sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${240}px)`}}}>
          <Toolbar />

          {currentView === "settings" ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}>
                <Typography
                  sx={{
                    fontSize: "1.25rem",
                    lineHeight: "1.75rem",
                    fontWeight: 600,
                  }}>
                  Settings
                </Typography>

                <Box sx={{display: "flex", gap: 2}}>
                  <Button onClick={handleOpen}
                    sx={{
                      backgroundColor: "#355173",
                      height: "35px",
                      color: "white",
                      "&:hover": {bgcolor: "#4C74A5"},
                    }}>
                    ADD CONFIRMATION REQUEST
                  </Button>
                  <Button
                    onClick={() => handleChangeView("changePassword")}
                    sx={{
                      backgroundColor: "#CFCFCF",
                      height: "35px",
                      color: "#355173",
                      fontWeight: "bold",
                      "&:hover": {bgcolor: "#A9A5A5"},
                    }}>
                    CHANGE PASSWORD
                  </Button>
                </Box>
              </Box>

              <Box sx={{width: "100%", marginTop: "20px"}}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    lineHeight: "1.75rem",
                  }}>
                  Activity Logs
                </Typography>{" "}
                <Divider sx={{marginTop: "12px"}} />
                <Grid container spacing={1}>
                  <Grid item sm={12}>
                    <TableContainer
                      sx={{
                        display: "flex",
                        borderRadius: "16px",
                        border: "none",
                      }}>
                      <Table
                        stickyHeader
                        aria-label="custom table"
                        sx={{
                          borderCollapse: "separate",
                          borderSpacing: 0,
                        }}>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                border: "none",
                                fontSize: "0.85rem",
                                fontWeight: "bold",
                              }}>
                              STAFF MEMBER
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                border: "none",
                                fontSize: "0.85rem",
                                fontWeight: "bold",
                              }}>
                              ACTIVITY
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                border: "none",
                                fontSize: "0.85rem",
                                fontWeight: "bold",
                              }}>
                              DATE OF ACTIVITY
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {logs.map((log) => (
                            <React.Fragment key={log.log_id}>
                              {/* this is to add space in between rows sa table */}
                              <TableRow>
                                <TableCell
                                  colSpan={5}
                                  sx={{
                                    backgroundColor: "#ffffff",
                                    padding: 0,
                                    border: "none",
                                  }}>
                                  <Box
                                    sx={{
                                      height: "5px",
                                      backgroundColor: "white",
                                    }}
                                  />
                                </TableCell>
                              </TableRow>

                              <TableRow
                                sx={{
                                  backgroundColor: "#e0e0e0",
                                  borderRadius: "10px",
                                  "& > *": {
                                    borderBottom: "none",
                                  },
                                }}>
                                <TableCell
                                  sx={{
                                    border: "none",
                                    padding: "16px",
                                    textAlign: "center",
                                    borderRadius: "15px 0 0 15px",
                                    backgroundColor: "#e0e0e0",
                                  }}>
                                  {log.first_name} {log.last_name}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    border: "none",
                                    padding: "16px",
                                    textAlign: "center",
                                    backgroundColor: "#e0e0e0",
                                  }}>
                                  {log.activity}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    border: "none",
                                    padding: "16px",
                                    textAlign: "center",
                                    backgroundColor: "#e0e0e0",
                                  }}>
                                  {util.formatDate(log.date)}
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 2,
                      }}>
                      <IconButton
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 0} // Disable on the first page
                        sx={{
                          backgroundColor: page === 0 ? "grey.300" : "black",
                          color: page === 0 ? "grey.600" : "white",
                          marginRight: "10px",
                        }}>
                        <KeyboardArrowLeft />
                      </IconButton>

                      <Typography sx={{margin: "0 10px", fontWeight: "bold"}}>
                        Page {page + 1} of {totalPages}
                      </Typography>

                      <IconButton
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages - 1}
                        sx={{
                          backgroundColor:
                            page === totalPages - 1 ? "grey.300" : "black",
                          color: page === totalPages - 1 ? "grey.600" : "white",
                          marginLeft: "10px",
                        }}>
                        <KeyboardArrowRight />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}>
                <Box sx={{display: "flex", gap: 2}}>
                  <IconButton
                    sx={{marginTop: "-4px"}}
                    onClick={() => handleChangeView("settings")}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}>
                    <FontAwesomeIcon
                      size="sm"
                      style={{
                        color: hover ? "#247E38" : "#000000",
                        transition: "color 0.3s ease",
                      }}
                      icon={faArrowLeft}
                    />
                  </IconButton>
                  <Typography
                    sx={{
                      fontSize: "1.25rem",
                      lineHeight: "1.75rem",
                      fontWeight: 600,
                    }}>
                    Change Password
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  top: "55%",
                  left: "57%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: "md",
                  bgcolor: "white",
                  borderRadius: "10px",
                  boxShadow: 3,
                  px: 4,
                  py: 3,
                }}>
                <Grid container spacing={1} justifyContent={"center"}>
                  <Grid item sm="12" textAlign={"center"}>
                    <FontAwesomeIcon size="lg" icon={faUnlockAlt} />
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        lineHeight: "1.75rem",
                        fontWeight: 600,
                        display: "inline",
                        marginLeft: "11px",
                      }}>
                      Change Password
                    </Typography>
                  </Grid>
                  <Grid sx={{marginTop: "20px"}} item sm="12">
                    <TextField
                      fullWidth
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter Your New Password"
                      sx={TextFieldStyle}></TextField>
                  </Grid>
                  <Grid item sm="12">
                    <TextField
                      fullWidth
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm New Password"
                      sx={TextFieldStyle}></TextField>
                  </Grid>
                  <Grid item sm="12" textAlign={"center"}>
                    <Button
                      onClick={handleClearFields}
                      sx={{color: "#000000", ":hover": {color: "red"}}}>
                      Clear All Fields
                    </Button>
                  </Grid>
                  <Grid item sm="12" textAlign={"center"}>
                    <Button
                      onClick={() => handleOpenDialog("change password")}
                      sx={{
                        backgroundColor: "#355173",
                        height: "35px",
                        width: "100px",
                        fontWeight: "bold",
                        color: "white",
                        "&:hover": {bgcolor: "#4C74A5"},
                      }}>
                      CONFIRM
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
            </>
          )}

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Box sx={{position: 'sticky', paddingBottom: '10px'}}>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <IconButton onClick={() => setOpen(false)} size="small">
                  <FontAwesomeIcon icon={faXmark} />
                </IconButton>
              </Grid>
              <Grid item sm={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Manual Confirmation Certificate Request
                  </Typography>
                </Grid>
            </Grid>
          </Box>

          <Box sx={modalContentStyle}>
            <form onSubmit={handleSubmit}>
              <Grid container justifyContent={"center"} spacing={2}>
                <Grid item sm={4}>
                  <label>First Name:</label>
                  <TextField name="first_name" onChange={handleChange} autoComplete="off" required fullWidth sx={TextFieldStyleModal}/>
                </Grid>
                <Grid item sm={4}>
                  <label>Middle Name:</label>
                  <TextField name="middle_name" onChange={handleChange} autoComplete="off" required fullWidth sx={TextFieldStyleModal}/>
                </Grid>
                <Grid item sm={4}>
                  <label>Last Name:</label>
                  <TextField name="last_name" onChange={handleChange} autoComplete="off" required fullWidth sx={TextFieldStyleModal}/>
                </Grid>

                <Grid item sm={4}>
                  <label>Place of Birth:</label>
                  <TextField name="birth_place" onChange={handleChange} autoComplete="off" required fullWidth sx={TextFieldStyleModal}/>
                </Grid>
                <Grid item sm={4}>
                  <label>Father's Name:</label>
                  <TextField name="father_name" onChange={handleChange} autoComplete="off" required fullWidth sx={TextFieldStyleModal}/>
                </Grid>
                <Grid item sm={4}>
                  <label>Mother's Maiden Name:</label>
                  <TextField name="mother_name" onChange={handleChange} autoComplete="off" required fullWidth sx={TextFieldStyleModal}/>
                </Grid>

                <Grid item sm={6}>
                <label>Date of Confirmation:</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{ textField: { fullWidth: true }}}
                    variant="outlined"
                    size="small"
                    disableFuture
                    sx={TextFieldStyleModal}
                    name="preferred_date"
                    onChange={(date) => handleDateChange("preferred_date", date)}
                    renderInput={(params) => <TextField {...params} required />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item sm={6}>
                <label>Contact Number:</label>
                <TextField name="contact_no" onChange={handleChange} autoComplete="off" required fullWidth sx={TextFieldStyleModal}/>
              </Grid>

              <Grid item sm={12}>
                <label>Purpose:</label>
              </Grid>
              <Grid item sm={12}>
                <RadioGroup
                  row
                  name="purpose"
                  sx={{ marginTop: "-5px" }}
                  onChange={handleChange} 
                  required
                >
                  <FormControlLabel
                    value="marriage"
                    control={<Radio size="small" />}
                    label="Marriage"
                  />
                  <FormControlLabel
                    value="passport"
                    control={<Radio size="small" />}
                    label="Passport"
                  />
                  <FormControlLabel
                    value="school"
                    control={<Radio size="small" />}
                    label="School"
                  />
                  <FormControlLabel
                    value="late registration"
                    control={<Radio size="small" />}
                    label="Late Registration"
                  />
                  <FormControlLabel
                    value="sss"
                    control={<Radio size="small" />}
                    label="SSS"
                  />
                  <FormControlLabel
                    value="others"
                    control={<Radio size="small" />}
                    label="Others:"
                  />
                  <TextField
                    disabled={formData.purpose === "others" ? false : true}
                    sx={{
                      "& .MuiInputBase-root": { height: "30px" },
                      opacity: formData.purpose === "others" ? 1 : 0.4,
                      marginTop: "5px",
                    }}
                  />
                </RadioGroup>
              </Grid>

              <Grid item sm={12}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ flex: 0.1, height: "1px", backgroundColor: "black" }}
                  />
                  <div>
                    <p
                      style={{
                        width: "80px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Optional
                    </p>
                  </div>
                  <div
                    style={{ flex: 1, height: "1px", backgroundColor: "black" }}
                  />
                </div>
              </Grid>

              <Grid item sm={4}>
                <label>Book no.</label>
                <TextField name="book_no" onChange={handleArchive} autoComplete="off" fullWidth sx={TextFieldStyleModal}/>
              </Grid>
              <Grid item sm={4}>
                <label>Page no.</label>
                <TextField name="page_no" onChange={handleArchive} autoComplete="off" fullWidth sx={TextFieldStyleModal}/>
              </Grid>
              <Grid item sm={4}>
                <label>Line no.</label>
                <TextField name="line_no" onChange={handleArchive} autoComplete="off" fullWidth sx={TextFieldStyleModal}/>
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
                  type="submit"
                  sx={{
                    bgcolor: "#355173",
                    marginTop: "14px",
                    height: "35px",
                    width: "90px",
                    fontWeight: "bold",
                    color: "white",
                    "&:hover": { bgcolor: "#247E38" },
                  }}
                >
                  Submit
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  sx={{
                    bgcolor: "#C34444",
                    margin: "14px 0px 0px 5px",
                    height: "35px",
                    width: "90px",
                    fontWeight: "bold",
                    color: "white",
                    "&:hover": { bgcolor: "#F05A5A" },
                  }}
                >
                  CLOSE
                </Button>
              </Grid>
              </Grid>
              </form>
              
        <Modal open={transacNoModal} onClose={handleClose}>
            <Box sx={modalStyle}>
              <Box sx={{position: 'sticky', paddingBottom: '10px'}}>
                <Grid container justifyContent={"flex-end"}>
                  <Grid item>
                    <IconButton onClick={handleCloseTransacModal} size="small">
                      <FontAwesomeIcon icon={faXmark} />
                    </IconButton>
                  </Grid>
                  <Grid item sm={12}>
                      <Typography
                        variant="subtitle1"
                        sx={{ textAlign: "center", fontWeight: "bold" }}
                      >
                        Transaction Number
                      </Typography>
                    </Grid>
                </Grid>
              </Box>
              <Grid container spacing={2}>
                <Grid item sm={12}>
                  <DefaultCopyField
                    fullWidth
                    disabled
                    value={formData.transaction_no}
                    sx={inputstyling}
                  />
                </Grid>
                <Grid item sm={12}>
                  <Typography
                    variant="subtitle1"
                    sx={{textAlign: "center", color: "#950000"}}>
                    Save the transaction number above to track the status of this
                    request.
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </Box>
      </Box>
      </Modal>
    </Box>
      </Box>
    </>
  );
};

export default Settings;
