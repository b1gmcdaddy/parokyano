import React, { useState, useEffect } from "react";
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
  MenuItem
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUnlockAlt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import ConfirmationDialog from "../../components/ConfirmationModal";
import axios from "axios";
import config from "../../config";
import util from "../../utils/DateTimeFormatter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "100vw",
  bgcolor: "white",
  borderRadius: "10px",
  boxShadow: 3,
  px: 4,
  py: 2,
  maxHeight: "100vh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

const modalContentStyle = {
  overflowY: "auto",
  flexGrow: 1,
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

const TextFieldStyleModal = {
  "& .MuiInputBase-root": { height: "30px", bgcolor: "white" },
};

const TextFieldStyle = {
  "& .MuiInputBase-root": { height: "40px" },
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
  const [errors, setErrors] = useState({});
  const [priests, setPriests] = useState([]);

  const [formData, setFormData] = useState({
    child_name:{
      first_name: "",
      middle_name: "",
      last_name: "",
    },
    father_name: "",
    mother_name: "",
    officiating_priest: "",
    confirmation_date: "",
    archive_info: {
      book_no: "",
      page_no: "",
      line_no: "",
      sponsor_no1: "",
      sponsor_no2: ""
    },
  });

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

  const fetchTotalLogs = async () => {
    try {
      const response = await axios.get(`${config.API}/logs/count`);
      setTotalItems(response.data.count);
      console.log(totalItems);
      console.log(totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchLogs();
    fetchTotalLogs();
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

  const handleCloseTransacModal = (event, reason) => {
    if (reason === "backdropClick") {
      setOpen(false);
      setOpenTransac(false);
    } else {
      setOpen(false);
      setOpenTransac(false);
    }
  };

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
  // event handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date.format("YYYY-MM-DD") });
  };

  const handleArchive = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      archive_info: {
        ...formData.archive_info,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleName = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      child_name: {
        ...formData.child_name,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      axios.post(`${config.API}/confirmation/add-record`, formData);
      setOpenTransac(true);
    } catch (err) {
      console.error("error submitting data", err);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", mx: { md: "30px" } }}>
        <NavStaff />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }}
        >
          <Toolbar />

          {currentView === "settings" ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "1.25rem",
                    lineHeight: "1.75rem",
                    fontWeight: 600,
                  }}
                >
                  Settings
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    onClick={handleOpen}
                    sx={{
                      backgroundColor: "#355173",
                      height: "35px",
                      color: "white",
                      "&:hover": { bgcolor: "#4C74A5" },
                    }}
                  >
                    ADD CONFIRMATION RECORD
                  </Button>
                  <Button
                    onClick={() => handleChangeView("changePassword")}
                    sx={{
                      backgroundColor: "#CFCFCF",
                      height: "35px",
                      color: "#355173",
                      fontWeight: "bold",
                      "&:hover": { bgcolor: "#A9A5A5" },
                    }}
                  >
                    CHANGE PASSWORD
                  </Button>
                </Box>
              </Box>

              <Box sx={{ width: "100%", marginTop: "20px" }}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    lineHeight: "1.75rem",
                  }}
                >
                  Activity Logs
                </Typography>{" "}
                <Divider sx={{ marginTop: "12px" }} />
                <Grid container spacing={1}>
                  <Grid item sm={12}>
                    <TableContainer
                      sx={{
                        display: "flex",
                        borderRadius: "16px",
                        border: "none",
                      }}
                    >
                      <Table
                        stickyHeader
                        aria-label="custom table"
                        sx={{
                          borderCollapse: "separate",
                          borderSpacing: 0,
                        }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                border: "none",
                                fontSize: "0.85rem",
                                fontWeight: "bold",
                              }}
                            >
                              STAFF MEMBER
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                border: "none",
                                fontSize: "0.85rem",
                                fontWeight: "bold",
                              }}
                            >
                              ACTIVITY
                            </TableCell>
                            <TableCell
                              sx={{
                                textAlign: "center",
                                border: "none",
                                fontSize: "0.85rem",
                                fontWeight: "bold",
                              }}
                            >
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
                                  }}
                                >
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
                                }}
                              >
                                <TableCell
                                  sx={{
                                    border: "none",
                                    padding: "16px",
                                    textAlign: "center",
                                    borderRadius: "15px 0 0 15px",
                                    backgroundColor: "#e0e0e0",
                                  }}
                                >
                                  {log.first_name} {log.last_name}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    border: "none",
                                    padding: "16px",
                                    textAlign: "left",
                                    backgroundColor: "#e0e0e0",
                                  }}
                                >
                                  {log.activity}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    border: "none",
                                    padding: "16px",
                                    textAlign: "center",
                                    borderRadius: "0 15px 15px 0",
                                    backgroundColor: "#e0e0e0",
                                  }}
                                >
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
                      }}
                    >
                      <IconButton
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 0} // Disable on the first page
                        sx={{
                          backgroundColor: page === 0 ? "grey.300" : "black",
                          color: page === 0 ? "grey.600" : "white",
                          marginRight: "10px",
                        }}
                      >
                        <KeyboardArrowLeft />
                      </IconButton>

                      <Typography sx={{ margin: "0 10px", fontWeight: "bold" }}>
                        Page {page + 1} of {totalPages}
                      </Typography>

                      <IconButton
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages - 1} // Disable on the last page
                        sx={{
                          backgroundColor:
                            page === totalPages - 1 ? "grey.300" : "black",
                          color: page === totalPages - 1 ? "grey.600" : "white",
                          marginLeft: "10px",
                        }}
                      >
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
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <IconButton
                    sx={{ marginTop: "-4px" }}
                    onClick={() => handleChangeView("settings")}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
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
                    }}
                  >
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
                }}
              >
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
                      }}
                    >
                      Change Password
                    </Typography>
                  </Grid>
                  <Grid sx={{ marginTop: "20px" }} item sm="12">
                    <TextField
                      fullWidth
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter Your New Password"
                      sx={TextFieldStyle}
                    ></TextField>
                  </Grid>
                  <Grid item sm="12">
                    <TextField
                      fullWidth
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm New Password"
                      sx={TextFieldStyle}
                    ></TextField>
                  </Grid>
                  <Grid item sm="12" textAlign={"center"}>
                    <Button
                      onClick={handleClearFields}
                      sx={{ color: "#000000", ":hover": { color: "red" } }}
                    >
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
                        "&:hover": { bgcolor: "#4C74A5" },
                      }}
                    >
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
              <Box sx={{ position: "sticky", paddingBottom: "10px" }}>
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
                      Manual Confirmation Record
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Box sx={modalContentStyle}>
                <form onSubmit={handleSubmit}>
                  <Grid container justifyContent={"center"} spacing={2}>
                    <Grid item sm={4}>
                      <label>First Name:</label>
                      <TextField
                        name="first_name"
                        onChange={handleName}
                        autoComplete="off"
                        required
                        fullWidth
                        sx={TextFieldStyleModal}
                      />
                    </Grid>
                    <Grid item sm={4}>
                      <label>Middle Name:</label>
                      <TextField
                        name="middle_name"
                        onChange={handleName}
                        autoComplete="off"
                        fullWidth
                        sx={TextFieldStyleModal}
                      />
                    </Grid>
                    <Grid item sm={4}>
                      <label>Last Name:</label>
                      <TextField
                        name="last_name"
                        onChange={handleName}
                        autoComplete="off"
                        required
                        fullWidth
                        sx={TextFieldStyleModal}
                      />
                    </Grid>

                    <Grid item sm={6}>
                      <label>Father's Name:</label>
                      <TextField
                        name="father_name"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                        fullWidth
                        sx={TextFieldStyleModal}
                      />
                    </Grid>
                    <Grid item sm={6}>
                      <label>Mother's Maiden Name:</label>
                      <TextField
                        name="mother_name"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                        fullWidth
                        sx={TextFieldStyleModal}
                      />
                    </Grid>

                    <Grid item sm={6}>
                      <label>Date of Confirmation:</label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          slotProps={{ textField: { fullWidth: true } }}
                          variant="outlined"
                          size="small"
                          disableFuture
                          sx={TextFieldStyleModal}
                          name="confirmation_date"
                          onChange={(date) =>
                            handleDateChange("confirmation_date", date)
                          }
                          renderInput={(params) => (
                            <TextField {...params} required />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item sm={6}>
                      <label>Minister:</label>
                      <TextField
                        value={formData.officiating_priest}
                        name="officiating_priest"
                        onChange={handleChange}
                        select
                        fullWidth
                        required
                        sx={TextFieldStyleModal}
                      >
                        {priests.map((priest) => (
                          <MenuItem key={priest.priestID} value={priest.priestID}>
                            {priest.first_name + " " + priest.last_name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item sm={6}>
                      <label>Sponsor 1:</label>
                      <TextField
                        name="sponsor_no1"
                        onChange={handleArchive}
                        autoComplete="off"
                        required
                        fullWidth
                        sx={TextFieldStyleModal}
                      />
                    </Grid>

                    <Grid item sm={6}>
                      <label>Sponsor 2:</label>
                      <TextField
                        name="sponsor_no2"
                        onChange={handleArchive}
                        autoComplete="off"
                        required
                        fullWidth
                        sx={TextFieldStyleModal}
                      />
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
                          style={{
                            flex: 0.1,
                            height: "1px",
                            backgroundColor: "black",
                          }}
                        />
                        <div
                          style={{
                            flex: 1,
                            height: "1px",
                            backgroundColor: "black",
                          }}
                        />
                      </div>
                    </Grid>

                    <Grid item sm={4}>
                      <label>Book no.</label>
                      <TextField
                        name="book_no"
                        onChange={handleArchive}
                        autoComplete="off"
                        fullWidth
                        required
                        sx={TextFieldStyleModal}
                      />
                    </Grid>
                    <Grid item sm={4}>
                      <label>Page no.</label>
                      <TextField
                        name="page_no"
                        onChange={handleArchive}
                        autoComplete="off"
                        fullWidth
                        required
                        sx={TextFieldStyleModal}
                      />
                    </Grid>
                    <Grid item sm={4}>
                      <label>Line no.</label>
                      <TextField
                        name="line_no"
                        onChange={handleArchive}
                        autoComplete="off"
                        fullWidth
                        required
                        sx={TextFieldStyleModal}
                      />
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
                    <Box sx={{ position: "sticky", paddingBottom: "10px" }}>
                      <Grid container justifyContent={"flex-end"}>
                        <Grid item>
                          <IconButton
                            onClick={handleCloseTransacModal}
                            size="small"
                          >
                            <FontAwesomeIcon icon={faXmark} />
                          </IconButton>
                        </Grid>
                        <Grid item sm={12}>
                          <Typography
                            variant="subtitle1"
                            sx={{ textAlign: "center", fontWeight: "bold" }}
                          >
                            Record Has Been Added
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item sm={12}>
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
