import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {Button, Grid, Typography, IconButton} from "@mui/material"



const ConfirmationDialog = ({ open, onClose, action, onConfirm, service }) => {
    const handleConfirm = () => {
        onConfirm(action);
        onClose();
      };

    const getMessage = () => {
        switch (action) {
          case 'approve':
            return {
              title: 'Approved',
              message: 'All requirements are satisfied. Approve this',
              service: service
            };
          case 'update':
            return {
              title: 'Update',
              message: 'Save the changes to this',
              service: service
            };
          case 'cancel':
            return {
              title: 'Cancel',
              message: 'Are you sure you want to cancel this',
              service: service
            };
          case 'reschedule':
            return {
                title: 'Reschedule',
                message: 'Reschedule this',
                service: service
            };
          case 'Update sponsors':
            return {
                title: 'Update',
                message: 'Save the changes to the sponsors of this',
                service: service
            };
          case 'Update wedding requirement':
            return {
                title: 'Update',
                message: 'Save the changes to the requirements of this',
                service: service
            };
          default:
            return {
              title: '',
              message: '',
              service: ''
            };
        }
      };

      const { title, message, service: serviceInfo } = getMessage();

  return (
    <>
    <Dialog
open={open}
onClose={onClose}
        sx={{
            '& .MuiDialog-paper': {
              borderRadius: '16px',
              boxShadow: '0px 4px 20px black',
            }
          }}
    >
      <DialogContent>
      <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <IconButton onClick={onClose} size="small">
                <FontAwesomeIcon icon={faXmark} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"} spacing={2}>
            <Grid item sm={12}>
              <Typography variant="subtitle1" sx={{textAlign:'center', fontWeight:'bold'}}>{title} Request Confirmation</Typography> 
            </Grid>
            <Grid item sm={12}>
              <Typography variant="subtitle1" sx={{textAlign:'center'}}>{message} {serviceInfo} request?</Typography> 
            </Grid>
            <Grid item sm={12} sx={{textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <Button onClick={handleConfirm} sx={{bgcolor:'#44C360', height: '30px', width:'90px', fontWeight:'bold', color:'white',"&:hover":{bgcolor:"#58FF7D"}}}>YES</Button>
              <Button onClick={onClose} sx={{bgcolor:'#C34444',margin:'0px 0px 0px 5px', height: '30px', width:'90px', fontWeight:'bold', color:'white', "&:hover":{bgcolor:"#F05A5A"}}}>NO</Button>
            </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
    </>
  );
}


export default ConfirmationDialog
