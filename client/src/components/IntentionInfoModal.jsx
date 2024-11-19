import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogContent,
  Grid,
  Divider,
  Typography,
  DialogActions,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import axios from "axios";
import config from "../config";
import sendSMS from "../utils/smsService";
import ConfirmationDialog from "./ConfirmationModal";

const formatTime = (time24) => {
  let [hour, minute] = time24.split(":");
  hour = parseInt(hour);
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert hour to 12-hour format
  return `${hour}:${minute} ${period}`;
};

const formatDate = (rawDate) => {
  const formatted = new Date(rawDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatted;
};

const fetchUser = async (id, setApprover) => {
  try {
    const response = await axios.get(`${config.API}/user/retrieve`, {
      params: {
        id: id,
      },
    });
    console.log(response.data[0]);
    if (response.status === 200) {
      setApprover(response.data[0]);
    }
  } catch (err) {
    console.log(err);
  }
};

const SoulsInfoModal = ({ open, data, close, refreshList }) => {
  const details = JSON.parse(data.details);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [approver, setApprover] = useState({});
  const schedule =
    formatTime(data.preferred_time) +
    " ,  " +
    formatDate(data.preferred_date.slice(0, 10));

  const updatePayment = async (id, close) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    try {
      if (currentUser) {
        await axios.put(`${config.API}/request/approve-intention`, null, {
          params: {
            col: "payment_status",
            val: "paid",
            col2: "status",
            val2: "approved",
            col3: "user_id",
            val3: currentUser.id,
            col4: "requestID",
            val4: id,
          },
        });
        console.log("approved intention");
        await axios.post(`${config.API}/logs/create`, {
          activity: `Approved Mass Intention - Transaction number: ${data.transaction_no}`,
          user_id: currentUser.id,
          request_id: data.requestID,
        });
        console.log("logs success");
        // sendSMS(data.service_id, data, "approve");
        setSuccess({
          message: "Successfully Marked as Paid",
          details: "Mass Intention approved.",
        });
        refreshList();
      }
    } catch (err) {
      setError({
        message: err,
        details: "",
      });
    }
  };

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  useEffect(() => {
    fetchUser(data.user_id, setApprover);
  }, [open, data]);

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
          <Alert severity="success" sx={{ width: "100%" }}>
            <AlertTitle>{success.message}</AlertTitle>
            {success.details}
          </Alert>
        </Snackbar>
      )}

      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                margin: "10px",
              }}
            >
              <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                Mass Intention - SOULS Information
              </Typography>
              <label>For the souls of: </label>
              <Grid
                container
                spacing={2}
                sx={{ height: "150px", overflowY: "auto" }}
              >
                {details.map((soul, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <TextField
                      variant="filled"
                      label={index + 1}
                      fullWidth
                      value={soul}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Divider />
              <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Offered by:"
                    value={data.requested_by}
                    fullWidth
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Mass Schedule"
                    value={schedule}
                    fullWidth
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Donation"
                    value={
                      data.donation
                        ? `₱ ${parseFloat(data.donation).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}`
                        : "N/A"
                    }
                    fullWidth
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Payment Method"
                    value={data.payment_method}
                    fullWidth
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                {data.payment_method === "gcash" && (
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label="GCash Ref no."
                      value={data.gcashRefNo}
                      fullWidth
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                )}
              </Grid>
              <Typography fontSize={"medium"} sx={{ textAlign: "center" }}>
                Transaction no:{" "}
                <span style={{ color: "red" }}>{data.transaction_no}</span>
              </Typography>
              {approver && data.status === "approved" && (
                <Typography fontSize={"small"} sx={{ textAlign: "center" }}>
                  Approved by: {approver.first_name} {approver.last_name}
                </Typography>
              )}
              <br />
              <DialogActions>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      margin: "-40px 0 10px 0",
                      justifyContent: "center",
                      gap: "40px",
                    }}
                  >
                    {data.payment_status === "unpaid" && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#355173",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#0036B1",
                          },
                        }}
                        onClick={() => handleOpenDialog("approve")}
                      >
                        Mark as Paid
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#d9d9d9",
                        color: "black",
                        paddingX: "12px",
                        "&:hover": {
                          backgroundColor: "#d1d1d1",
                        },
                      }}
                      onClick={close}
                    >
                      Close
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        action={currentAction}
        onConfirm={() => updatePayment(data.requestID, close)}
        service={"Mass Intention"}
      />
    </>
  );
};

const ThanksgivingInfoModal = ({ open, data, close, refreshList }) => {
  const details = JSON.parse(data.details);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [approver, setApprover] = useState({});
  const schedule =
    formatTime(data.preferred_time) +
    " ,  " +
    formatDate(data.preferred_date.slice(0, 10));

  const updatePayment = async (id, close) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    try {
      if (currentUser) {
        await axios.put(`${config.API}/request/approve-intention`, null, {
          params: {
            col: "payment_status",
            val: "paid",
            col2: "status",
            val2: "approved",
            col3: "user_id",
            val3: currentUser.id,
            col4: "requestID",
            val4: id,
          },
        });
        console.log("approved intention");
        await axios.post(`${config.API}/logs/create`, {
          activity: `Approved Mass Intention - Transaction number: ${data.transaction_no}`,
          user_id: currentUser.id,
          request_id: data.requestID,
        });
        console.log("logs success");
        // sendSMS(data.service_id, data, "approve");
        setSuccess({
          message: "Successfully Marked as Paid",
          details: "Mass Intention approved.",
        });
        refreshList();
      }
    } catch (err) {
      setError({
        message: err,
        details: "",
      });
    }
  };

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  useEffect(() => {
    fetchUser(data.user_id, setApprover);
  }, [open, data]);

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
          <Alert severity="success" sx={{ width: "100%" }}>
            <AlertTitle>{success.message}</AlertTitle>
            {success.details}
          </Alert>
        </Snackbar>
      )}

      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                margin: "10px",
              }}
            >
              <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                Mass Intention - THANKSGIVING Information
              </Typography>
              <label>Thanksgiving for: </label>

              <Grid
                container
                spacing={1}
                sx={{ display: "flex", padding: "0px 10px", overflowY: "auto" }}
              >
                {details.saint != null && (
                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      multiline
                      label="In Honor of Saints"
                      fullWidth
                      value={details.saint}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                )}
                {details.wedding != null && (
                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      multiline
                      label="Wedding Anniversary of"
                      fullWidth
                      value={details.wedding}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                )}
                {details.success != null && (
                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      multiline
                      label="For the success of"
                      fullWidth
                      value={details.success}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                )}
                {details.birthday != null && (
                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      multiline
                      label="For the Birthday of"
                      fullWidth
                      value={details.birthday}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                )}
                {details.others != null && (
                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant="outlined"
                      multiline
                      label="Others"
                      fullWidth
                      value={details.others}
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                )}
              </Grid>

              <Divider />

              <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Offered by:"
                    value={data.requested_by}
                    fullWidth
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Mass Schedule"
                    value={schedule}
                    fullWidth
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Donation"
                    value={
                      data.donation
                        ? `₱ ${parseFloat(data.donation).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}`
                        : "N/A"
                    }
                    fullWidth
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Payment Method"
                    value={data.payment_method}
                    fullWidth
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                {data.payment_method === "gcash" && (
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label="GCash Ref no."
                      value={data.gcashRefNo}
                      fullWidth
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                )}
              </Grid>

              <Typography fontSize={"medium"} sx={{ textAlign: "center" }}>
                Transaction no: {data.transaction_no}
              </Typography>
              {approver && data.status === "approved" && (
                <Typography fontSize={"small"} sx={{ textAlign: "center" }}>
                  Approved by: {approver.first_name} {approver.last_name}
                </Typography>
              )}
              <br />
              <DialogActions>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      margin: "-40px 0 10px 0",
                      justifyContent: "center",
                      gap: "40px",
                    }}
                  >
                    {data.payment_status === "unpaid" && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#355173",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#0036B1",
                          },
                        }}
                        onClick={() => handleOpenDialog("approve")}
                      >
                        Mark as Paid
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#d9d9d9",
                        color: "black",
                        paddingX: "12px",
                        "&:hover": {
                          backgroundColor: "#d1d1d1",
                        },
                      }}
                      onClick={close}
                    >
                      Close
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        action={currentAction}
        onConfirm={() => updatePayment(data.requestID, close)}
        service={"Mass Intention"}
      />
    </>
  );
};

const PetitionInfoModal = ({ open, data, close, refreshList }) => {
  const details = JSON.parse(data.details);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [approver, setApprover] = useState({});
  const schedule =
    formatTime(data.preferred_time) +
    " ,  " +
    formatDate(data.preferred_date.slice(0, 10));

  const updatePayment = async (id, close) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    try {
      if (currentUser) {
        await axios.put(`${config.API}/request/approve-intention`, null, {
          params: {
            col: "payment_status",
            val: "paid",
            col2: "status",
            val2: "approved",
            col3: "user_id",
            val3: currentUser.id,
            col4: "requestID",
            val4: id,
          },
        });
        console.log("approved intention");
        await axios.post(`${config.API}/logs/create`, {
          activity: `Approved Mass Intention - Transaction number: ${data.transaction_no}`,
          user_id: currentUser.id,
          request_id: data.requestID,
        });
        console.log("logs success");
        // sendSMS(data.service_id, data, "approve");
        setSuccess({
          message: "Successfully Marked as Paid",
          details: "Mass Intention approved.",
        });
        refreshList();
      }
    } catch (err) {
      setError({
        message: err,
        details: "",
      });
    }
  };

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  useEffect(() => {
    fetchUser(data.user_id, setApprover);
  }, [open, data]);

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
          <Alert severity="success" sx={{ width: "100%" }}>
            <AlertTitle>{success.message}</AlertTitle>
            {success.details}
          </Alert>
        </Snackbar>
      )}

      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                margin: "10px",
              }}
            >
              <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
                Mass Intention - PETITION Information
              </Typography>
              <label>Petition: </label>

              <Grid
                container
                spacing={1}
                sx={{ height: "auto", padding: "0px 10px", overflowY: "auto" }}
              >
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    multiline
                    fullWidth
                    value={details}
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
              </Grid>

              <Divider />

              <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Offered by:"
                    value={data.requested_by}
                    fullWidth
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Mass Schedule"
                    value={schedule}
                    fullWidth
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Donation"
                    value={
                      data.donation
                        ? `₱ ${parseFloat(data.donation).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}`
                        : "N/A"
                    }
                    fullWidth
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Payment Method"
                    value={data.payment_method}
                    fullWidth
                    inputProps={{ readOnly: true }}
                  />
                </Grid>
                {data.payment_method === "gcash" && (
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label="GCash Ref no."
                      value={data.gcashRefNo}
                      fullWidth
                      inputProps={{ readOnly: true }}
                    />
                  </Grid>
                )}
              </Grid>
              <Typography fontSize={"medium"} sx={{ textAlign: "center" }}>
                Transaction no: {data.transaction_no}
              </Typography>
              {approver && data.status === "approved" && (
                <Typography fontSize={"small"} sx={{ textAlign: "center" }}>
                  Approved by: {approver.first_name} {approver.last_name}
                </Typography>
              )}
              <br />
              <DialogActions>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      margin: "-40px 0 10px 0",
                      justifyContent: "center",
                      gap: "40px",
                    }}
                  >
                    {data.payment_status === "unpaid" && (
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#355173",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#0036B1",
                          },
                        }}
                        onClick={() => handleOpenDialog("approve")}
                      >
                        Mark as Paid
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#d9d9d9",
                        color: "black",
                        paddingX: "12px",
                        "&:hover": {
                          backgroundColor: "#d1d1d1",
                        },
                      }}
                      onClick={close}
                    >
                      Close
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        action={currentAction}
        onConfirm={() => updatePayment(data.requestID, close)}
        service={"Mass Intention"}
      />
    </>
  );
};

export default {
  SoulsInfoModal,
  ThanksgivingInfoModal,
  PetitionInfoModal,
};
