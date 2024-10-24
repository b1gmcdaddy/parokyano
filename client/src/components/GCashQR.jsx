import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import qrCode from "../assets/sampleQRCode.png";

export default function GCashQR({open, close, service}) {
  return (
    <Dialog
      onClose={close}
      fullWidth
      maxWidth="xs"
      aria-labelledby="customized-dialog-title"
      open={open}>
      <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
        Gethsemane Parish GCash QR Code
      </DialogTitle>
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
      <DialogContent dividers sx={{margin: "auto"}}>
        {service == "baptism" ? (
          <Typography sx={{textAlign: "center"}}>Please pay 800 PHP</Typography>
        ) : (
          <Typography>Please pay your inputted donation amount.</Typography>
        )}
        <img src={qrCode} />
      </DialogContent>
    </Dialog>
  );
}
