import React, { useState } from "react";
import NavStaff from "../../components/NavStaff";
import {
  Box,
  Toolbar,
  Typography,
  Grid,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import ConfirmationDialog from "../../components/ConfirmationModal";

const TextFieldStyle = {
    "& .MuiInputBase-root": { height: "40px" },
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
    
      {
        /** for sameple if success, ari butang backend**/
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
                        sx={{
                            backgroundColor: "#355173",
                            height: "35px",
                            color: "white",
                            "&:hover": { bgcolor: "#4C74A5" },
                        }}>
                     ADD CONFIRMATION REQUEST</Button>
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
                  <Grid container spacing={1}>
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
                        <div>
                          <p
                            style={{
                              width: "110px",
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            Activity Log
                          </p>
                        </div>
                        <div
                          style={{ flex: 1, height: "1px", backgroundColor: "black" }}
                        />
                      </div>
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
                    <IconButton sx={{marginTop:'-4px'}} onClick={() => handleChangeView("settings")} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <FontAwesomeIcon size="sm" style={{
                            color: hover ? "#247E38" : "#000000",
                            transition: "color 0.3s ease",
                            }} 
                        icon={faArrowLeft} />
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

                <Box sx={{ position: "absolute",
                    top: "55%",
                    left: "57%",
                    transform: "translate(-50%, -50%)",
                    maxWidth: "md",
                    bgcolor: "white",
                    borderRadius: "10px",
                    boxShadow: 3,
                    px: 4,
                    py: 3,}}
                >
                    <Grid container spacing={1} justifyContent={'center'}>
                        <Grid item sm='12' textAlign={'center'}>
                            <FontAwesomeIcon size="lg" icon={faUnlockAlt} />
                            <Typography
                                sx={{
                                fontSize: "1.5rem",
                                lineHeight: "1.75rem",
                                fontWeight: 600,
                                display: 'inline',
                                marginLeft: '11px',
                                }}
                            >
                                Change Password
                            </Typography>
                        </Grid>
                        <Grid sx={{marginTop:'20px'}} item sm='12'>
                            <TextField fullWidth  value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter Your New Password" sx={TextFieldStyle}></TextField>
                        </Grid>
                        <Grid item sm='12'>
                            <TextField fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" sx={TextFieldStyle}></TextField>
                        </Grid>
                        <Grid item sm='12' textAlign={'center'}>
                            <Button onClick={handleClearFields} sx={{color: '#000000', ":hover": {color: 'red'}}}>Clear All Fields</Button>
                        </Grid>
                        <Grid item sm='12' textAlign={'center'}>
                            <Button
                                onClick={() => handleOpenDialog("change password")}
                                sx={{
                                    backgroundColor: "#355173",
                                    height: "35px",
                                    width: "100px",
                                    fontWeight: "bold",
                                    color: "white",
                                    "&:hover": { bgcolor: "#4C74A5" },
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

export default Settings
