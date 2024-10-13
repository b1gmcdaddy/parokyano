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
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faUnlockAlt} from "@fortawesome/free-solid-svg-icons";
import ConfirmationDialog from "../../components/ConfirmationModal";
import axios from "axios";
import config from "../../config";
import util from "../../utils/DateTimeFormatter";

const TextFieldStyle = {
  "& .MuiInputBase-root": {height: "40px"},
  bgcolor: "#D9D9D9",
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
                  <Button
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
                <Typography variant="h6" sx={{marginBottom: "10px"}}>
                  Activity Logs
                </Typography>

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
        </Box>
      </Box>
    </>
  );
};

export default Settings;
