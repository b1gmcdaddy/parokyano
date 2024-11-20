import React, {useEffect, useState} from "react";
import NavStaff from "../../components/NavStaff";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {styled} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import config from "../../config";
import axios from "axios";
import ManageUserForm from "../../components/ManageUserForm";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#355173",
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const ManageAccounts = () => {
  const [user, setUser] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
  }, []);

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

  return (
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
            sx={{fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 600}}>
            Manage Accounts
          </Typography>
          <Button
            variant="contained"
            type="button"
            sx={{backgroundColor: "#355173"}}
            onClick={() => handleFormOpen()}>
            Create New Staff
          </Button>
        </Box>

        <Box sx={{marginTop: "3em"}}>
          <TableContainer component={Paper} sx={{overflowX: "auto"}}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Username</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Created On</StyledTableCell>
                  {/* <StyledTableCell>Last Activity</StyledTableCell> */}
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.map((user) => (
                  <StyledTableRow key={user.userID}>
                    <StyledTableCell component="th" scope="row">
                      {`${user.first_name} ${user.last_name}`}
                    </StyledTableCell>
                    <StyledTableCell>{capitalize(user.status)}</StyledTableCell>
                    <StyledTableCell>
                      {new Date(user.date_started).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </StyledTableCell>
                    {/* <StyledTableCell>{user?.activity}</StyledTableCell> */}
                    <StyledTableCell onClick={() => handleFormOpen(user)}>
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

          <Dialog
            open={openForm}
            onClose={handleFormClose}
            fullWidth
            maxWidth="sm">
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
        </Box>
      </Box>
    </Box>
  );
};

export default ManageAccounts;
