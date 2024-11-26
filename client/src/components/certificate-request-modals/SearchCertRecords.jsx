import React, {useState, useEffect} from "react";
import {
  Button,
  Box,
  Dialog,
  DialogContent,
  Grid,
  Paper,
  Typography,
  DialogActions,
  TextField,
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
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {styled} from "@mui/material/styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";

const SearchCertRecords = ({open, data, close, refreshList}) => {
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
  const [searchQuery, setSearchQuery] = useState("");

  const StyledTableCell = styled(TableCell)(({theme}) => ({
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

  const StyledTableRow = styled(TableRow)(({theme}) => ({
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
            middle_name: data.middle_name || "",
            last_name: data.last_name || "",
            contact_no: data.contact_no || "",
            mother_name: data.mother_name || "",
            father_name: data.father_name || "",
            birth_place: data.birth_place || "",
            // status: "approved", // should be finished
            preferred_date: data.preferred_date || "",
            spouse_name: JSON.parse(data.spouse_name) || "",
            birth_date: data.birth_date || "",
          },
        });
        setRecords(res.data.results);
        // console.log("data", data);
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

  const filteredRecords = records
    .filter((rec) => Object.keys(rec.Matches).length > 0)
    .sort(
      (a, b) => Object.keys(b.Matches).length - Object.keys(a.Matches).length
    )
    .slice(0, 10);

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
          <Alert severity="info" sx={{width: "100%"}}>
            <AlertTitle>{success.message}</AlertTitle>
            {success.details}
          </Alert>
        </Snackbar>
      )}

      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={() => {
          setSearchQuery("");
          close();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>
          <CompareRecords
            open={openCompareModal}
            close={closeCompareModal}
            certData={data}
            recordData={recordData}
            refreshList={refreshList}
          />
          <Box sx={{display: "flex", justifyContent: "flex-start", mb: 2}}>
            <TextField
              size="small"
              label="Search"
              variant="outlined"
              sx={{width: "300px"}}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
          <Box>
            <TableContainer component={Paper} sx={{overflowX: "auto"}}>
              <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Matching Fields</StyledTableCell>
                    <StyledTableCell>Percentage</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRecords && filteredRecords.length > 0 ? (
                    filteredRecords.map((rec) => {
                      let fieldsToCompare = Object.keys(rec).filter((key) => {
                        if (data.spouse_name && key == "spouse_firstName") {
                          return key;
                        }
                        if (data.spouse_name && key == "spouse_lastName") {
                          return key;
                        }
                        if (data.spouse_name && key == "spouse_middleName") {
                          return key;
                        }
                        if (data.birth_date && key == "birth_date") {
                          return key;
                        }
                        if (data.preferred_date && key == "preferred_date") {
                          return key;
                        }
                        if (data.contact_no && key == "contact_no") {
                          return key;
                        }
                        if (data.birth_place && key == "birth_place") {
                          return key;
                        }
                        if (data.birth_date && key == "birth_date") {
                          return key;
                        }
                        if (data.first_name && key == "first_name") {
                          return key;
                        }
                        if (key == "last_name") {
                          return key;
                        }
                        if (key == "middle_name") {
                          return key;
                        }
                        if (data.mother_name && key == "mother_name") {
                          return key;
                        }
                        if (data.father_name && key == "father_name") {
                          return key;
                        }
                      });

                      console.log("fieldsToCompare", fieldsToCompare);

                      const matchingFields = Object.keys(rec.Matches).length;

                      const totalFields = fieldsToCompare.length;
                      const matchingPercentage = (
                        (matchingFields / totalFields) *
                        100
                      ).toFixed(2);

                      return (
                        <StyledTableRow key={rec.requestID}>
                          <StyledTableCell>
                            {rec && data.service_id == 2
                              ? `${rec.child_name?.first_name} ${rec.child_name?.last_name}`
                              : `${rec.first_name} ${rec.last_name}`}
                          </StyledTableCell>
                          <StyledTableCell>
                            {Object.entries(rec.Matches).map(([key, value]) => (
                              <Chip
                                key={key}
                                label={`${key}: ${value}`}
                                sx={{margin: "2px"}}
                              />
                            ))}
                          </StyledTableCell>
                          <StyledTableCell>
                            {`Matching: ${matchingPercentage}%`}
                          </StyledTableCell>
                          <StyledTableCell sx={{textAlign: "center"}}>
                            <Button
                              variant="text"
                              onClick={() => handleOpenCompareModal(rec)}>
                              <VisibilityIcon className="cursor-pointer" />
                              &nbsp;<span className="cursor-pointer">View</span>
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })
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
