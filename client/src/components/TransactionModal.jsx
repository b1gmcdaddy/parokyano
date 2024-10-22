import React, {useState, useEffect} from "react";
import {
  Button,
  TextField,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Dialog,
  DialogContent,
  Grid,
  Divider,
  Typography,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import config from "../config";
import util from "../utils/DateTimeFormatter";

const TransactionModal = ({open, data, close}) => {
  const [staff, setStaff] = useState([]);
  console.log(data);

  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${config.API}/user/retrieveUsers`);
      setStaff(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [open, data]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogContent>
        <Box sx={{display: "flex", justifyContent: "center", gap: 2}}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              margin: "10px",
            }}>
            <Typography
              variant="h6"
              sx={{textAlign: "center", fontWeight: "bold"}}>
              Payment Information
            </Typography>

            <Grid container sx={{marginTop: "10px"}}>
              <Grid container justifyContent={"left"} sx={{padding: 1}}>
                <Typography variant="subtitle2" sx={{marginRight: 2}}>
                  <strong>Transaction number:</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{color: "red"}}>
                  {data.transaction_no}
                </Typography>
              </Grid>

              <Grid container justifyContent={"left"} sx={{padding: 1}}>
                <Typography variant="subtitle2" sx={{marginRight: 2}}>
                  <strong>Name:</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{}}>
                  {data.requested_by === null
                    ? `${data.first_name} ${data.last_name}`
                    : data.requested_by}
                </Typography>
              </Grid>

              <Grid container justifyContent={"left"} sx={{padding: 1}}>
                <Typography variant="subtitle2" sx={{marginRight: 2}}>
                  <strong>Amount Paid:</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{}}>
                  {(() => {
                    const amount = (() => {
                      switch (data.service_id) {
                        case 1:
                          return data.donation;
                        case 2:
                          return 50;
                        case 3:
                          return 100;
                        case 4:
                          return 150;
                        case 5:
                          return 1600;
                        case 6:
                          return 800;
                        case 7:
                          return 1000;
                        default:
                          return "N/A";
                      }
                    })();

                    return amount === "N/A" ? (
                      amount
                    ) : (
                      <span style={{fontWeight: "bold"}}>₱{amount}</span>
                    );
                  })()}
                </Typography>
              </Grid>

              <Grid container justifyContent={"left"} sx={{padding: 1}}>
                <Typography variant="subtitle2" sx={{marginRight: 2}}>
                  <strong>Contact number:</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{}}>
                  {data.contact_no}
                </Typography>
              </Grid>

              <Grid container justifyContent={"left"} sx={{padding: 1}}>
                <Typography variant="subtitle2" sx={{marginRight: 2}}>
                  <strong>Date paid:</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{}}>
                  {util.formatDate(data.transaction_date)}
                </Typography>
              </Grid>

              <Grid container justifyContent={"left"} sx={{padding: 1}}>
                <Typography variant="subtitle2" sx={{marginRight: 2}}>
                  <strong>Payment for:</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{}}>
                  {data.service_name}
                </Typography>
              </Grid>

              <Grid container justifyContent={"left"} sx={{padding: 1}}>
                <Typography variant="subtitle2" sx={{marginRight: 2}}>
                  <strong>Mode of payment:</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{}}>
                  {data.payment_method === "cash" ? "Cash" : "GCash"}
                </Typography>
              </Grid>

              <Grid container justifyContent={"left"} sx={{padding: 1}}>
                <Typography variant="subtitle2" sx={{marginRight: 2}}>
                  <strong>Handled by:</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{}}>
                  {staff.find((staff) => staff.userID == data.user_id)
                    ?.first_name +
                    " " +
                    staff.find((staff) => staff.userID == data.user_id)
                      ?.last_name}
                </Typography>
              </Grid>
            </Grid>

            <DialogActions>
              <Grid container sx={{display: "flex", justifyContent: "end"}}>
                <Grid item xs={12} sm={"auto"}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#f9f9f9",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#D9D9d9",
                      },
                    }}
                    onClick={close}>
                    Close
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
