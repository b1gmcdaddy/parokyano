import React, {useState, useEffect} from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  DialogActions,
  Divider,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import config from "../../config";
import util from "../../utils/DateTimeFormatter";
import ConfirmationDialog from "../ConfirmationModal";
import sendSMS from "../../utils/smsService";

const CompareRecords = ({open, close, certData, recordData, refreshList}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [modalSize, setModalSize] = useState("");
  const [priests, setPriests] = useState([]);
  const bookDetails = JSON.parse(recordData.details || "{}");
  const [baptismData, setBaptismData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    birth_place: "",
    father_name: "",
    mother_name: "",
    preferred_date: "",
    birth_date: "",
    priest_id: "",
  });

  const [confirmationData, setConfirmationData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    father_name: "",
    mother_name: "",
    preferred_date_date: "",
    priest_id: "",
  });

  const [marriageData, setMarriageData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    spouse_name: {
      firstName: "",
      middleName: "",
      lastName: "",
    },
    preferred_date_date: "",
    priest_id: "",
  });

  useEffect(() => {
    if (open && recordData) {
      if (certData.service_id == 3) {
        const details = {
          book_no: bookDetails.book_no || null,
          page_no: bookDetails.page_no || null,
          line_no: bookDetails.line_no || null,
          record_id: recordData.requestID || null,
        };
        setBaptismData({
          first_name: recordData.first_name,
          middle_name: recordData.middle_name,
          last_name: recordData.last_name,
          birth_place: recordData.birth_place,
          father_name: recordData.father_name,
          mother_name: recordData.mother_name,
          preferred_date: formatDate(recordData.preferred_date),
          birth_date: formatDate(recordData.birth_date),
          priest_id: recordData.priest_id,
          ...(details.book_no ||
          details.page_no ||
          details.line_no ||
          details.record_id
            ? {details}
            : {}),
        });
      }

      if (certData.service_id == 2) {
        const details = {
          book_no: bookDetails.book_no || null,
          page_no: bookDetails.page_no || null,
          line_no: bookDetails.line_no || null,
          sponsor_no1: bookDetails.sponsor_no1 || null,
          sponsor_no2: bookDetails.sponsor_no2 || null,
        };
        setConfirmationData({
          first_name: recordData.first_name,
          middle_name: recordData.middle_name,
          last_name: recordData.last_name,
          birth_place: recordData.birth_place,
          father_name: recordData.father_name,
          mother_name: recordData.mother_name,
          preferred_date: recordData.confirmation_date_date,
          priest_id: recordData.officiating_priest,
          ...(details.book_no ||
          details.page_no ||
          details.line_no ||
          details.sponsor_no1 ||
          details.sponsor_no2
            ? {details}
            : {}),
        });
      }

      if (certData.service_id == 4) {
        const details = {
          book_no: bookDetails.book_no || null,
          page_no: bookDetails.page_no || null,
          line_no: bookDetails.line_no || null,
          record_id: recordData.requestID || null,
        };

        setMarriageData({
          first_name: recordData.first_name,
          middle_name: recordData.middle_name,
          last_name: recordData.last_name,
          preferred_date: formatDate(recordData.preferred_date),
          priest_id: recordData.priest_id,
          ...(details.book_no ||
          details.page_no ||
          details.line_no ||
          details.record_id
            ? {details}
            : {}),
        });
        fetchWeddingData();
      }
    }
    console.log(recordData);
  }, [open, recordData]);

  useEffect(() => {
    // console.log(recordData);
    if (certData.service_id == 2 || certData.service_id == 4) {
      setModalSize("lg");
    } else {
      setModalSize("xl");
    }
  }, [open, recordData]);

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

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

  const fetchWeddingDetails = async (id) => {
    try {
      const response = await axios.get(`${config.API}/wedding/retrieve`, {
        params: {reqID: id},
      });

      return response.data?.result[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const fetchWeddingData = async () => {
    try {
      const weddingDetails = await fetchWeddingDetails(recordData.requestID);

      if (weddingDetails) {
        setMarriageData((prevData) => ({
          ...prevData,
          spouse_name: {
            firstName: weddingDetails.spouse_firstName || "",
            middleName: weddingDetails.spouse_middleName || "",
            lastName: weddingDetails.spouse_lastName || "",
          },
        }));
      }
    } catch (err) {
      console.error("Error fetching wedding details", err);
    }
  };

  const handleConfirm = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.put(
        `${config.API}/request/approve-dynamic`,
        null,
        {
          params: {
            col: "status",
            val: "approved",
            col4: "requestID",
            val4: certData.requestID,
          },
        }
      );

      // UPDATE Cert Request Data
      if (certData.service_id == 3) {
        await axios.put(`${config.API}/request/update-certificate`, {
          baptismData,
          id: certData.requestID,
        });
      }

      if (certData.service_id == 2) {
        await axios.put(`${config.API}/request/update-confirmation-cert`, {
          confirmationData,
          id: certData.requestID,
        });
      }

      if (certData.service_id == 4) {
        await axios.put(`${config.API}/request/update-marriage-cert`, {
          marriageData,
          id: certData.requestID,
        });
      }

      // INSERT to LoGS
      axios.post(`${config.API}/logs/create`, {
        activity: `Approved Certificate Request for ${certData.first_name} ${certData.last_name}`,
        user_id: currentUser.id,
        request_id: certData.requestID,
      });
      console.log("logs success!");
      sendSMS(certData.service_id, certData, "approve-cert");
      setSuccess({
        message: "Approval Success",
        details: "Certificate Request successfully approved.",
      });
      refreshList();
      close();

      close();
    } catch (err) {
      console.error(err);
      setError({
        message: err,
        details: "",
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

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
          <Alert severity="success" sx={{width: "100%"}}>
            <AlertTitle>{success.message}</AlertTitle>
            {success.details}
          </Alert>
        </Snackbar>
      )}

      <Dialog
        fullWidth
        maxWidth={modalSize}
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent sx={{padding: "3em"}}>
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
                  fontSize: "20px",
                }}>
                COMPARISON VIEW
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
            </Grid>
          </Box>
          <Grid container spacing={1} sx={{marginTop: "1em"}}>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}>
                    {recordData.service_id == 5 || recordData.service_id == 6
                      ? "BAPTISM "
                      : recordData.service_id == 7
                      ? "WEDDING "
                      : "CONFIRMATION "}
                    RECORD
                  </Typography>
                </Grid>
                {/* START BAPTISM RECORD */}
                {recordData.service_id == 5 || recordData.service_id == 6 ? (
                  <>
                    <Grid item xs={4}>
                      <label>First Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={recordData.first_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <label>Middle Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={recordData.middle_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <label>Last Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={recordData.last_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <label>Date of Birth: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={util.formatDate(recordData.birth_date)}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      {recordData.service_id == 5 ||
                      recordData.service_id == 6 ? (
                        <label>Date of Baptism:</label>
                      ) : recordData.service_id == 7 ? (
                        <label>Date of Wedding:</label>
                      ) : (
                        <label>Date of Confirmation:</label>
                      )}
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={util.formatDate(
                          recordData.preferred_date ||
                            recordData.confirmation_date
                        )}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <label>Contact Number: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={recordData.contact_no}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <label>Birth Place: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={recordData.birth_place}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label>Father's Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={recordData.father_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label>Mother's Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={recordData.mother_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                  </>
                ) : ////////// END BAPTISM RECORD ////////////

                ///////// START WEDDING RECORD ///////////
                recordData.service_id == 7 ? (
                  <>
                    {" "}
                    <Grid item xs={6}>
                      <label>First Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={recordData.first_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label>Last Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={recordData.last_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label>Spouse's First Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={marriageData?.spouse_name?.firstName || ""}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label>Spouse's Last Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={marriageData?.spouse_name?.lastName || ""}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label>Date of Wedding: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={util.formatDate(recordData.preferred_date)}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label>Contact Number: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={recordData.contact_no}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                  </>
                ) : (
                  //////// END WEDDING RECORD /////////////
                  /////// START CONFIRMATION RECORD //////////
                  <>
                    <Grid item xs={12}>
                      <label>Child's Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={
                          recordData.child_name
                            ? ((typeof recordData.child_name === "string"
                                ? JSON.parse(recordData.child_name)
                                : recordData.child_name
                              ).first_name || "") +
                              " " +
                              ((typeof recordData.child_name === "string"
                                ? JSON.parse(recordData.child_name)
                                : recordData.child_name
                              ).middle_name || "") +
                              " " +
                              ((typeof recordData.child_name === "string"
                                ? JSON.parse(recordData.child_name)
                                : recordData.child_name
                              ).last_name || "")
                            : ""
                        }
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <label>Gender: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={recordData.gender}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      {recordData.service_id == 5 ||
                      recordData.service_id == 6 ? (
                        <label>Date of Baptism:</label>
                      ) : recordData.service_id == 7 ? (
                        <label>Date of Wedding:</label>
                      ) : (
                        <label>Date of Confirmation:</label>
                      )}
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={util.formatDate(
                          recordData.preferred_date ||
                            recordData.confirmation_date
                        )}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <label>Ministered by: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={
                          priests.find(
                            (priest) =>
                              priest.priestID === recordData.officiating_priest
                          )?.first_name +
                          " " +
                          priests.find(
                            (priest) =>
                              priest.priestID === recordData.officiating_priest
                          )?.last_name
                        }
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label>Father's Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={recordData.father_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label>Mother's Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        value={recordData.mother_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                  </>
                  /////// END CONFIRMATION RECORD //////////
                )}

                <Grid item xs={4}>
                  <label>Book no.: </label>
                  <TextField
                    size="small"
                    fullWidth
                    variant="filled"
                    value={
                      certData.details
                        ? JSON.parse(certData.details).book_no
                        : ""
                    }
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <label>Page no.: </label>
                  <TextField
                    size="small"
                    fullWidth
                    variant="filled"
                    value={
                      certData.details
                        ? JSON.parse(certData.details).page_no
                        : ""
                    }
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <label>Line no.: </label>
                  <TextField
                    size="small"
                    fullWidth
                    variant="filled"
                    value={
                      certData.details
                        ? JSON.parse(certData.details).line_no
                        : ""
                    }
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100%",
              }}>
              <Divider orientation="vertical" variant="middle" flexItem />
            </Grid>
            <Grid item xs={3}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}>
                    CERTIFICATE REQUEST
                  </Typography>
                </Grid>
                {certData.service_id == 3 ? (
                  /////// BAPTISMAL CERTIFICATE ///////////
                  <>
                    <Grid item xs={6}>
                      <label>First Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={certData.first_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label>Last Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={certData.last_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <label>Father's Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={certData.father_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label>Mother's Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={certData.mother_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <label>Birth Place: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={certData.birth_place}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label>Date of Birth: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={util.formatDate(certData.birth_date)}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <label>Date of Baptism: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={util.formatDate(certData.preferred_date)}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <label>Contact No: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={certData.contact_no}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                  </>
                ) : /////////// CONFIRMATION CERTIFICATE ////////////
                certData.service_id == 2 ? (
                  <>
                    <Grid item xs={12}>
                      <label>Child's Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={
                          certData.first_name +
                          " " +
                          certData.middle_name +
                          " " +
                          certData.last_name
                        }
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <label>Father's Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={certData.father_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label>Mother's Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={certData.mother_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <label>Birth Place: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={certData.birth_place}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <label>Date of Confirmation: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={util.formatDate(certData.preferred_date)}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                  </>
                ) : (
                  //////////// WEDDING CERTIFICATE ///////////////
                  <>
                    <Grid item xs={6}>
                      <label>First Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={certData.first_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label>Last Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={certData.last_name}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label>Spouse's First Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={
                          certData.spouse_name
                            ? JSON.parse(certData.spouse_name).firstName
                            : ""
                        }
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <label>Spouse's Last Name: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={
                          certData.spouse_name
                            ? JSON.parse(certData.spouse_name).lastName
                            : ""
                        }
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <label>Contact Number: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={certData.contact_no}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <label>Date of Marriage: </label>
                      <TextField
                        size="small"
                        fullWidth
                        variant="filled"
                        color="success"
                        focused
                        value={util.formatDate(certData.preferred_date)}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "16px",
            }}>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
              }}>
              <Button
                variant="contained"
                onClick={() => handleOpenDialog("approve")}
                sx={{
                  backgroundColor: "#44C360",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "green",
                  },
                }}>
                Confirm
              </Button>
              <Button
                variant="contained"
                onClick={close}
                sx={{
                  backgroundColor: "#d9d9d9",
                  color: "black",
                  paddingX: "12px",
                  "&:hover": {
                    backgroundColor: "#dddddd",
                  },
                }}>
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
        {/* START Confirmation Dialog */}
        <ConfirmationDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          action={currentAction}
          onConfirm={handleConfirm}
          service={"certificate"}
        />
        {/* END Confirmation Dialog */}
      </Dialog>
    </>
  );
};

export default CompareRecords;
