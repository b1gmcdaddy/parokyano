import React, { useState, useEffect } from "react";
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

const TransactionModal = ({ open, data, close }) => {
  console.log(data);
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      //   onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              margin: "10px",
            }}
          >
            <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
              Payment Information
            </Typography>

            <Grid container sx={{ marginTop: "10px" }}>
              <Grid container justifyContent={"left"} sx={{ padding: 1 }}>
                <Typography variant="subtitle2" sx={{ marginRight: 2 }}>
                  <strong>Transaction number:</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{}}>
                  {data.transaction_no}
                </Typography>
              </Grid>

              <Grid container justifyContent={"left"} sx={{ padding: 1 }}>
                <Typography variant="subtitle2" sx={{ marginRight: 2 }}>
                  <strong>Name:</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{}}>
                  {data.requested_by}
                </Typography>
              </Grid>

              <Grid container justifyContent={"left"} sx={{ padding: 1 }}>
                <Typography variant="subtitle2" sx={{ marginRight: 2 }}>
                  <strong>Amount Paid:</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{}}>
                  {data.donation}
                </Typography>
              </Grid>

              <Grid container justifyContent={"left"} sx={{ padding: 1 }}>
                <Typography variant="subtitle2" sx={{ marginRight: 2 }}>
                  <strong>Contact number:</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{}}>
                  {data.contact_no}
                </Typography>
              </Grid>

              <Grid container justifyContent={"left"} sx={{ padding: 1 }}>
                <Typography variant="subtitle2" sx={{ marginRight: 2 }}>
                  <strong>Date paid:</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{}}>
                  {data.transaction_date}
                </Typography>
              </Grid>

              <Grid container justifyContent={"left"} sx={{ padding: 1 }}>
                <Typography variant="subtitle2" sx={{ marginRight: 2 }}>
                  <strong>Payment for:</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{}}>
                  // dummy
                </Typography>
              </Grid>

              <Grid container justifyContent={"left"} sx={{ padding: 1 }}>
                <Typography variant="subtitle2" sx={{ marginRight: 2 }}>
                  <strong>Mode of payment:</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{}}>
                  {data.payment_method}
                </Typography>
              </Grid>

              <Grid container justifyContent={"left"} sx={{ padding: 1 }}>
                <Typography variant="subtitle2" sx={{ marginRight: 2 }}>
                  <strong>Handled by:</strong>
                </Typography>
                <Typography variant="subtitle2" sx={{}}>
                  // dummy
                </Typography>
              </Grid>
            </Grid>

            <DialogActions>
              <Grid
                container
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Grid item xs={12} sm={"auto"}>
                  <Button variant="contained" color="error" onClick={close}>
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
