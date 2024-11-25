import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogContent,
  Grid,
  Paper,
  Typography,
  DialogActions,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Chip from "@mui/material/Chip";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import config from "../../config";
import CompareRecords from "./CompareRecords";
import ConfirmationDialog from "../ConfirmationModal";
import sendSMS from "../../utils/smsService";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const SearchCertRecords = ({ open, data, close, refreshList }) => {
  const [certType, setCertType] = useState(null);
  const [confirmationData, setConfirmationData] = useState([]);
  const [confirmationID, setConfirmationID] = useState(null);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openCompareModal, setOpenCompareModal] = useState(false);
  const [recordData, setRecordData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");

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
  useEffect(() => {
    console.log(data);
    const searchRecords = async () => {
      try {
        const res = await axios.get(`${config.API}/request/search-records`, {
          params: {
            service_id:
              data.service_id === 3
                ? 5
                : data.service_id === 4
                ? 7
                : data.service_id === 2
                ? 14
                : null,
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            contact_no: data.contact_no || "",
            mother_name: data.mother_name || "",
            father_name: data.father_name || "",
            birth_place: data.birth_place || "",
            status: "approved", // should be finished
            preferred_date: data.preferred_date || "",
            spouse_firstName: JSON.parse(data.spouse_name) || "",
            spouse_lastName: JSON.parse(data.spouse_name) || "",
          },
        });
        setRecords(res.data.results);
        console.log("matchingFields", res.data.matchingFields);
        console.log("results", res.data.results);
      } catch (err) {
        console.error("Error retrieving matching records", err);
      }
    };
    if (data.service_id) {
      searchRecords();
    }

    console.log(data);
  }, [open, data]);

  const handleOpenCompareModal = (rec) => {
    setOpenCompareModal(true);
    setRecordData(rec);
  };

  const closeCompareModal = () => {
    setOpenCompareModal(false);
  };

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const cancelCertRequest = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    try {
      axios.put(`${config.API}/request/update`, null, {
        params: {
          col: "status",
          val: "cancelled",
          id: data.requestID,
        },
      });
      console.log("request cancelled!");
      axios.post(`${config.API}/logs/create`, {
        activity: `Cancelled Certificate Request - Transaction number: ${data.transaction_no}`,
        user_id: currentUser.id,
        request_id: data.requestID,
      });
      sendSMS(data.service_id, data, "cancel-cert");
      console.log("logs success!");
      setSuccess({
        message: "Cancelation Success",
        details: "Certificate Request Canceled.",
      });
      refreshList();
      close();
    } catch (err) {
      console.error("error updating request", err);
      setError({
        message: err,
        details: "",
      });
    }
  };

  return (
    <>
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          autoHideDuration={5000}
          onClose={() => setError(null)}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            <AlertTitle>{error.message}</AlertTitle>
            {error.details}
          </Alert>
        </Snackbar>
      )}

      {success && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          autoHideDuration={5000}
          onClose={() => setSuccess(null)}
        >
          <Alert severity="info" sx={{ width: "100%" }}>
            <AlertTitle>{success.message}</AlertTitle>
            {success.details}
          </Alert>
        </Snackbar>
      )}

      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box>
            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Matching Fields</StyledTableCell>
                    {/* <StyledTableCell>Created On</StyledTableCell> */}
                    {/* <StyledTableCell>Last Activity</StyledTableCell> */}
                    <StyledTableCell>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {records && records.length > 0 ? (
                    records.map((rec) => (
                      <StyledTableRow key={rec.requestID}>
                        <StyledTableCell>
                          {data.service_id == 2
                            ? `${rec.child_name.first_name} ${rec.child_name.last_name}`
                            : `${rec.first_name} ${rec.last_name}`}
                        </StyledTableCell>
                        <StyledTableCell>
                          {/* {JSON.stringify(Object.values(rec.Matches))} */}
                          {Object.entries(rec.Matches).map(([key, value]) => (
                            <Chip
                              key={key}
                              label={`${key}: ${value}`}
                              sx={{ margin: "2px" }}
                            />
                          ))}
                        </StyledTableCell>
                        <StyledTableCell sx={{ textAlign: "center" }}>
                          <VisibilityIcon className="cursor-pointer" />
                          &nbsp;<span className="cursor-pointer">View</span>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <StyledTableRow>
                      <StyledTableCell>No records found</StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchCertRecords;
