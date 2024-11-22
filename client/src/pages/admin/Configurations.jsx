import React, { useEffect, useState } from "react";
import NavStaff from "../../components/NavStaff";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  Button,
  Typography,
  Dialog,
  DialogContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  DialogTitle,
  InputAdornment,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import config from "../../config";
import axios from "axios";
import ManageUserForm from "../../components/ManageUserForm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormControlLabel, Switch } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Grid, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ManagePriestsModal from "../../components/configurations-modals/ManagePriestsModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(15 23 42)",
    color: theme.palette.common.white,
    fontSize: 18,
    height: 50,
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    textAlign: "center",
  },
  "&:first-of-type": {
    textAlign: "left",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // "&:nth-of-type(odd)": {
  //   backgroundColor: theme.palette.action.hover,
  // },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Configurations = () => {
  const [user, setUser] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [isAddPriest, setIsAddPriest] = useState(false);
  const [editPriest, setEditPriest] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [priestList, setPriestList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  // const [addPriest, setAddPriest] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);

  const fetchPriests = async () => {
    try {
      const activeResponse = await axios(`${config.API}/priest/retrieve`, {
        params: { col: "status", val: "active" },
      });
      const inactiveResponse = await axios(`${config.API}/priest/retrieve`, {
        params: { col: "status", val: "inactive" },
      });
      const combinedPriests = [
        ...activeResponse.data,
        ...inactiveResponse.data,
      ];
      setPriestList(combinedPriests);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchServices = async () => {
    try {
      console.log("fetching services");
      const response = await axios.get(`${config.API}/service/retrieve-all`);
      console.log(response.data);
      setServiceList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${config.API}/user/retrieveUsers`);
        setUser(res.data);
      } catch (err) {
        console.error("error retrieving user", err);
      }
    };
    getUsers();
    fetchPriests();
    fetchServices();
  }, []);

  const handleEditPriest = (priest) => {
    setSelectedItem(priest);
    setEditPriest(true);
  };

  const handleServiceFeeChange = (serviceID, newFee) => {
    setServiceList((prevServices) =>
      prevServices.map((service) =>
        service.serviceID === serviceID ? { ...service, fee: newFee } : service
      )
    );
  };

  const handleEditService = async (service) => {
    try {
      const response = await axios.put(`${config.API}/service/update-service`, {
        col: "fee",
        val: service.fee,
        serviceID: service.serviceID,
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormOpen = (user) => {
    setCurrentUser(user);
    setOpenForm(true);
  };

  const handleFormClose = () => {
    setOpenForm(false);
    setCurrentUser(null);
  };

  const handleFormSave = async () => {
    handleFormClose();
    const res = await axios.get(`${config.API}/user/retrieveUsers`);
    setUser(res.data);
  };

  // const handleAddPriest = () => {
  //   // axios.post(`${config.API}/priest/createPriest`, formData);
  //   // alert("Priest successfully added");
  //   // window.location.reload();
  //   setIsAddPriest(true);
  // };

  return (
    <Box sx={{ display: "flex", mx: { md: "30px" } }}>
      <NavStaff />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }}
      >
        <Toolbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 600 }}
          >
            Configurations
          </Typography>
          {/* <Button
            variant="contained"
            type="button"
            sx={{ backgroundColor: "#355173" }}
            onClick={() => handleFormOpen()}
          >
            Create New Staff
          </Button> */}
        </Box>

        <Accordion sx={{ borderRadius: 2, backgroundColor: "#f5f5f5" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              minHeight: 70,
              marginTop: "1em",
            }}
          >
            Service Fees
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{}}>
              <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow sx={{ height: 40 }}>
                      <StyledTableCell>Service</StyledTableCell>
                      <StyledTableCell>Fee</StyledTableCell>
                      <StyledTableCell>Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {serviceList
                      .filter((service) => service.fee !== null)
                      .map((service) => (
                        <TableRow key={service.serviceID}>
                          <StyledTableCell component="th" scope="row">
                            {service.name}
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{ textAlign: "center", width: "200px" }}
                          >
                            <TextField
                              fullWidth
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    ₱
                                  </InputAdornment>
                                ),
                              }}
                              variant="outlined"
                              size="small"
                              value={service.fee}
                              onChange={(e) =>
                                handleServiceFeeChange(
                                  service.serviceID,
                                  e.target.value
                                )
                              }
                            />
                          </StyledTableCell>
                          <StyledTableCell sx={{ textAlign: "center" }}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleEditService(service)}
                            >
                              Edit
                            </Button>
                          </StyledTableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ borderRadius: 2, backgroundColor: "#f5f5f5" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ minHeight: 70, borderRadius: 2, marginTop: "1em" }}
          >
            Manage Priests
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{}}>
              <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Priest Name</StyledTableCell>
                      <StyledTableCell>Contact Number</StyledTableCell>
                      {/* <StyledTableCell>Status</StyledTableCell> */}
                      {/* <StyledTableCell>Last Activity</StyledTableCell> */}
                      <StyledTableCell>Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {priestList.map((priest) => (
                      <StyledTableRow key={priest.priestID}>
                        <StyledTableCell>
                          {`${priest.first_name} ${priest.last_name}`}
                        </StyledTableCell>
                        <StyledTableCell sx={{ textAlign: "center" }}>
                          {priest.contact_no}
                        </StyledTableCell>
                        <StyledTableCell
                          sx={{ textAlign: "center" }}
                          onClick={() => handleEditPriest(priest)}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="cursor-pointer"
                          />
                          &nbsp;<span className="cursor-pointer">Edit</span>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </AccordionDetails>
          <AccordionActions>
            {/* <Button>Cancel</Button> */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsAddPriest(true)}
              sx={{ marginRight: 1, marginBottom: 1, width: "80px" }}
            >
              Add
            </Button>
          </AccordionActions>
        </Accordion>

        <Accordion sx={{ borderRadius: 2, backgroundColor: "#f5f5f5" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ minHeight: 70, borderRadius: 2, marginTop: "1em" }}
          >
            Manage Staff
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{}}>
              <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell>Created On</StyledTableCell>
                      {/* <StyledTableCell>Last Activity</StyledTableCell> */}
                      <StyledTableCell>Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {user.map((user) => (
                      <StyledTableRow key={user.userID}>
                        <StyledTableCell>
                          {`${user.first_name} ${user.last_name}`}
                        </StyledTableCell>
                        <StyledTableCell sx={{ textAlign: "center" }}>
                          {capitalize(user.status)}
                        </StyledTableCell>
                        <StyledTableCell sx={{ textAlign: "center" }}>
                          {new Date(user.date_started).toLocaleDateString(
                            "en-US",
                            {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </StyledTableCell>
                        {/* <StyledTableCell>{user?.activity}</StyledTableCell> */}
                        <StyledTableCell
                          sx={{ textAlign: "center" }}
                          onClick={() => handleFormOpen(user)}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="cursor-pointer"
                          />
                          &nbsp;<span className="cursor-pointer">Edit</span>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </AccordionDetails>
          <AccordionActions>
            {/* <Button>Cancel</Button> */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleFormOpen()}
              sx={{ marginRight: 1, marginBottom: 1, width: "80px" }}
            >
              Add
            </Button>
          </AccordionActions>
        </Accordion>

        <Paper
          elevation={0}
          sx={{ marginTop: "1em", backgroundColor: "#f5f5f5", borderRadius: 2 }}
        >
          <Box sx={{ padding: "1em" }}>
            <Typography variant="h6">SMS Notifications</Typography>
            <FormControlLabel
              sx={{ margin: "1em" }}
              control={
                <Switch
                  checked={true}
                  // onChange={handleSmsToggle}
                  name="smsNotifications"
                  color="primary"
                />
              }
              label="Enable SMS Notifications"
            />
          </Box>
        </Paper>
      </Box>

      <Dialog open={openForm} onClose={handleFormClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {currentUser ? "Edit Staff Account" : "Create New Staff Account"}
        </DialogTitle>
        <DialogContent>
          <ManageUserForm
            userData={currentUser}
            onSave={handleFormSave}
            onCancel={handleFormClose}
          />
        </DialogContent>
      </Dialog>

      <ManagePriestsModal.EditPriestModal
        open={editPriest}
        close={() => setEditPriest(false)}
        priest={selectedItem}
      />
      <ManagePriestsModal.AddPriestModal
        open={isAddPriest}
        close={() => setIsAddPriest(false)}
      />
    </Box>
  );
};

export default Configurations;
