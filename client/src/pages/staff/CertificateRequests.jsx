import {useState} from "react";
import React from "react";
import NavStaff from "../../components/NavStaff";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Toolbar,
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CertificatesPending from "./certificates-list/CertificatesPending";
import CertificatesForClaiming from "./certificates-list/CertificatesForClaiming";
import all from "../../components/certificate-request-modals/AddCertRequest";

const CertificateRequests = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openSelectionModal, setOpenSelectionModal] = useState(false);
  const [openAddCertModal, setOpenAddCertModal] = useState(false);
  const [selectedCertType, setSelectedCertType] = useState("Baptism");

  const handleTabChange = (index) => {
    setActiveTab(index);
  };
  const handleCertTypeSelection = (e) => {
    setSelectedCertType(e.target.value);
  };
  const handleOpenSelection = () => {
    setOpenSelectionModal(true);
  };
  const handleCloseSelection = () => {
    setOpenSelectionModal(false);
  };
  const handleOpenAdd = () => {
    setOpenSelectionModal(false);
    setOpenAddCertModal(true); // Open the certificate modal
  };
  const handleCloseCertModal = () => {
    setOpenAddCertModal(false);
  };

  const renderCertModal = () => {
    switch (selectedCertType) {
      case "Baptism":
        return (
          <all.AddBaptismCertReq
            open={openAddCertModal}
            onClose={handleCloseCertModal}
          />
        );
      case "Marriage":
        return (
          <all.AddMarriageCertReq
            open={openAddCertModal}
            onClose={handleCloseCertModal}
          />
        );
      case "Confirmation":
        return (
          <all.AddConfirmationCertReq
            open={openAddCertModal}
            onClose={handleCloseCertModal}
          />
        );
      default:
        return null;
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
              alignItems: "center",
            }}>
            <Typography
              sx={{
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
                fontWeight: 600,
              }}>
              Certificate Requests
            </Typography>
            <Button
              variant="contained"
              type="button"
              onClick={handleOpenSelection}
              sx={{backgroundColor: "#355173"}}>
              ADD REQUEST
            </Button>
          </Box>

          {/*-----START MANUALLY ADD CERTIFICATE REQUEST SELECTION MODAL-----*/}
          <Dialog
            fullWidth
            onClose={handleCloseSelection}
            aria-labelledby="customized-dialog-title"
            open={openSelectionModal}>
            <DialogTitle
              sx={{mt: 4, p: 2, textAlign: "center", fontWeight: "bold"}}
              id="customized-dialog-title">
              Add Certificate Request
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleCloseSelection}
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}>
              <CloseIcon />
            </IconButton>
            <DialogContent>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Type of Certificate Request
                </InputLabel>
                <NativeSelect
                  defaultValue="Baptism"
                  value={selectedCertType}
                  onChange={handleCertTypeSelection}>
                  <option value="Baptism">Baptism</option>
                  <option value="Marriage">Marriage</option>
                  <option value="Confirmation">Confirmation</option>
                </NativeSelect>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleOpenAdd} sx={{color: "#355173"}}>
                CONFIRM
              </Button>
            </DialogActions>
          </Dialog>
          {renderCertModal()}
          {/*-----END MANUALLY ADD CERTIFICATE REQUEST SELECTION MODAL-----*/}

          <Box sx={{width: "100%", marginTop: "20px"}}>
            <Grid container spacing={1}>
              <Grid item sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  type="button"
                  sx={{
                    backgroundColor: activeTab === 0 ? "#355173" : "#D9D9D9",
                    height: "40px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    color: activeTab === 0 ? "white" : "black",
                  }}
                  onClick={() => handleTabChange(0)}>
                  Pending
                </Button>
              </Grid>
              <Grid item sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  type="button"
                  sx={{
                    backgroundColor: activeTab === 1 ? "#355173" : "#D9D9D9",
                    height: "40px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    color: activeTab === 1 ? "white" : "black",
                  }}
                  onClick={() => handleTabChange(1)}>
                  For Claiming
                </Button>
              </Grid>

              <Grid item sm={12}>
                <TextField
                  fullWidth
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item sm={12}>
                <Box sx={{p: 3}}>
                  {activeTab === 0 && <CertificatesPending />}
                  {activeTab === 1 && <CertificatesForClaiming />}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CertificateRequests;
