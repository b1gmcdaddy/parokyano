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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import config from "../../config";
import CompareRecords from "./CompareRecords";
import ConfirmationDialog from "../ConfirmationModal";
import sendSMS from "../../utils/smsService";

const SearchCertRecords = ({open, data, close}) => {
  const [certType, setCertType] = useState(null);
  const [confirmationData, setConfirmationData] = useState([]);
  const [confirmationID, setConfirmationID] = useState(null);
  const [records, setRecords] = useState([]);
  const [openCompareModal, setOpenCompareModal] = useState(false);
  const [recordData, setRecordData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");

  // const fetchConfirmation = async (confID) => {
  //   try {
  //     const response = await axios.get(`${config.API}/confirmation/retrieve`, {
  //       params: {confID},
  //     });
  //     setConfirmationData(response.data.result);
  //   } catch (err) {
  //     console.error("Error fetching confirmation data", err);
  //     setError("Failed to retrieve confirmation record");
  //   }
  // };

  useEffect(() => {
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
            status: "pending",
          },
        });
        setRecords(res.data.result);

        console.log(res.data.result);
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
        user_id: 1,
        request_id: data.requestID,
      });
      // sendSMS(data.service_id, data, "cancel-cert");
      console.log("logs success!");
      alert("certificate request successfulyl  cancelled!");
      window.location.reload();
    } catch (err) {
      console.error("error updating request", err);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogContent>
        {/* START COMPARISON OF CERTIFICATE MODAL */}
        <CompareRecords
          open={openCompareModal}
          close={closeCompareModal}
          certData={data}
          recordData={recordData}
        />
        {/* END COMPARISON OF CERTIFICATE MODAL */}
        <Box sx={{display: "flex", justifyContent: "center", gap: 2}}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              margin: "10px",
            }}>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                marginBottom: "10px",
              }}>
              SEARCH RESULT
            </Typography>
            <IconButton
              aria-label="close"
              onClick={close}
              sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
              })}>
              <CloseIcon />
            </IconButton>

            <Grid
              container
              spacing={2}
              sx={{
                height: "auto",
                overflowY: "auto",
              }}>
              <Grid
                item
                xs={12}
                sx={{display: "flex", justifyContent: "center"}}>
                {records.length > 0 ? (
                  <CheckCircleIcon sx={{color: "green", fontSize: "5em"}} />
                ) : (
                  <CancelIcon sx={{color: "#C34444", fontSize: "5em"}} />
                )}
              </Grid>
              <Grid item xs={12} sx={{textAlign: "center"}}>
                <Typography sx={{fontWeight: "bold"}}>
                  {records.length} RECORDS FOUND
                </Typography>
              </Grid>

              {records.length > 0 ? (
                <Grid item xs={12}>
                  {records.map((rec) => (
                    <Paper
                      key={rec.requestID}
                      elevation={3}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "14px 14px",
                        backgroundColor: "#D9D9D9",
                        marginBottom: "8px",
                      }}>
                      <Typography>
                        {data.service_id == 3 || data.service_id == 4
                          ? rec.first_name + rec.last_name
                          : rec.father_name}
                      </Typography>

                      {/* Container for buttons */}
                      <Box sx={{display: "flex", gap: 1}}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#355173",
                            color: "white",
                            borderRadius: "4px",
                            "&:hover": {
                              backgroundColor: "#0036B1",
                            },
                          }}
                          onClick={() => handleOpenCompareModal(rec)}>
                          View
                        </Button>
                      </Box>
                    </Paper>
                  ))}
                </Grid>
              ) : null}
            </Grid>

            <DialogActions>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  sx={{display: "flex", justifyContent: "center"}}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleOpenDialog("cancel")}
                    sx={{
                      backgroundColor: "#C34444",
                      color: "white",
                      paddingX: "12px",
                      "&:hover": {
                        backgroundColor: "maroon",
                      },
                    }}>
                    NOTIFY AND CANCEL REQUEST
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Grid>
          {/* START Confirmation Dialog */}
          <ConfirmationDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            action={currentAction}
            onConfirm={cancelCertRequest}
            service={"certificate"}
          />
          {/* END Confirmation Dialog */}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SearchCertRecords;
