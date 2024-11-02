import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Grid, Typography, IconButton} from "@mui/material";

const ConfirmationDialog = ({open, onClose, action, onConfirm, service}) => {
  const handleConfirm = () => {
    onConfirm(action);
    onClose();
  };

  const getMessage = () => {
    switch (action) {
      case "approve":
        return {
          title: "Approve",
          message: "All requirements are satisfied. Approve this",
          service: service,
        };
      case "update":
        return {
          title: "Update",
          message: "Save the changes to this",
          service: service,
        };
      case "cancel":
        return {
          title: "Cancel",
          message: "Are you sure you want to cancel this",
          service: service,
        };
      case "reschedule":
        return {
          title: "Reschedule",
          message: "Reschedule this",
          service: service,
        };
      case "Update sponsors":
        return {
          title: "Update",
          message: "Save the changes to the sponsors of this",
          service: service,
        };
      case "Update wedding requirement":
        return {
          title: "Update",
          message: "Save the changes to the requirements of this",
          service: service,
        };
      case "change password":
        return {
          title: "Change Password",
          message: "Are you sure you want to confirm this",
          service: service,
        };
      default:
        return {
          title: "",
          message: "",
          service: "",
        };
    }
  };

  const {title, message, service: serviceInfo} = getMessage();

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "4px",
            boxShadow: "0px 4px 20px black",
          },
        }}>
        <DialogContent>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <IconButton onClick={onClose} size="small">
                <FontAwesomeIcon icon={faXmark} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"} spacing={1}>
            <Grid item sm={12}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.2em",
                }}>
                {title} Request Confirmation
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography variant="subtitle1" sx={{textAlign: "center"}}>
                {message} {serviceInfo} request?
              </Typography>
            </Grid>
            <Grid
              item
              sm={12}
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 2,
              }}>
              <Button
                variant="contained"
                onClick={() => handleConfirm()}
                sx={{
                  bgcolor: "#44C360",

                  fontWeight: "bold",
                  color: "white",
                  "&:hover": {bgcolor: "#355E3B"},
                }}>
                yes
              </Button>
              <Button
                variant="contained"
                onClick={onClose}
                sx={{
                  bgcolor: "#C34444",
                  margin: "0px 0px 0px 8px",

                  fontWeight: "bold",
                  color: "white",
                  "&:hover": {bgcolor: "#880808"},
                }}>
                No
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfirmationDialog;
