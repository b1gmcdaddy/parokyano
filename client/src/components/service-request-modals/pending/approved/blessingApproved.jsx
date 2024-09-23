import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, Box, Button, Grid, Typography, IconButton, TextField, RadioGroup, FormControlLabel, Radio} from "@mui/material"
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from "react"
import ConfirmationDialog from "../../../ConfirmationModal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 'md',  
    bgcolor: 'white',
    borderRadius: '10px',
    boxShadow: 3,
    px: 4,
    py: 3,
};

const TextFieldStyle ={
  "& .MuiInputBase-root":{height:'30px'}
};

const TextFieldStyleDis ={
  "& .MuiInputBase-root":{height:'30px'},
  bgcolor:'#D9D9D9'
};

const BlessingApproved = () =>{
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [radioValue, setRadioValue] = useState("");
  const [otherValue, setOtherValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [service] = useState('blessing');

  const handleOpenDialog = (action) => {
    setCurrentAction(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  
  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
    if (e.target.value !== "others") {
        setOtherValue("");
    }
  }

  const handleOtherChange = (e) => {
    setOtherValue(e.target.value);
  }

  const isOtherSelected = radioValue === "others";
  
  {/** for sameple if success, ari butang backend**/}
  const handleConfirm = (action) => {
    switch (action) {
      case 'approve':
        alert('Approval action confirmed.');
        break;
      case 'update':
        alert('Update action confirmed.');
        break;
      case 'cancel':
        alert('Cancel action confirmed.');
        break;
      case 'reschedule':
        alert('Reschedule action confirmed.');
        break;
      default:
        break;
    }
  };
  
    return(
        <>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal sx={{}}
        open={open}
        >
        <Box sx={style}>
        <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <IconButton onClick={handleClose} size="small">
                <FontAwesomeIcon icon={faXmark} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"} spacing={2}>
            <Grid item sm={12}>
              <Typography variant="subtitle1" sx={{textAlign:'center', fontWeight:'bold'}}>Blessing Request Information</Typography>
            </Grid>

            <Grid item sm={1}>
              <label>Type:</label>
            </Grid>
            <Grid item sm={11}>
              <RadioGroup row name="type" sx={{marginTop:'-5px'}} value={radioValue} onChange={handleRadioChange}>
                <FormControlLabel value="House Blessing" control={<Radio size="small" />} label="House" />
                <FormControlLabel value="Company Blessing" control={<Radio size="small" />} label="Company"/>
                <FormControlLabel value="others" control={<Radio size="small" />} label="Others:" />
                <TextField disabled={isOtherSelected ? false : true} value={otherValue} onChange={handleOtherChange} sx={{"& .MuiInputBase-root":{height:'30px'}, opacity: isOtherSelected ? 1 : 0.4, marginTop: '5px'}}/>
              </RadioGroup>
            </Grid>

            <Grid item sm={1.3}>
              <label>Name:</label>
            </Grid>
            <Grid item sm={10.7}>
              <TextField fullWidth  sx={TextFieldStyle}/>
            </Grid>
            
            <Grid item sm={1.3}>
              <label>Address:</label>
            </Grid>
            <Grid item sm={10.7}>
              <TextField fullWidth  sx={TextFieldStyle}/>
            </Grid>

            <Grid item sm={2.2}>
              <label>Requested by:</label>
            </Grid>
            <Grid item sm={3.7}>
              <TextField fullWidth  sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={1.9}>
              <label>Contact no:</label>
            </Grid>
            <Grid item sm={4.2}>
              <TextField fullWidth  sx={TextFieldStyle}/>
            </Grid>

            <Grid item sm={12}>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div style={{flex: .1, height: '1px', backgroundColor: 'black'}} />
                <div>
                  <p style={{width: '80px', textAlign: 'center', fontWeight:'bold'}}>Assigned</p>
                </div>
                <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
              </div>
            </Grid>

            <Grid item sm={4}>
              <label>Priest:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis}/>
            </Grid>
            <Grid item sm={4}>
              <label>Date:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis}/>
            </Grid>
            <Grid item sm={4}>
              <label>Time:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis}/>
            </Grid>

            <Grid item sm={12}>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <div style={{flex: .1, height: '1px', backgroundColor: 'black'}} />
                    <div>
                        <p style={{width: '95px', textAlign: 'center', fontWeight:'bold'}}>Reschedule</p>
                    </div>
                    <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
                </div>
            </Grid>

            <Grid item sm={2.5}>
              <label>Priest:</label>
              <TextField fullWidth select sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={4}>
              <label>Date:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker fullWidth sx={TextFieldStyle}/>
              </LocalizationProvider>
            </Grid>
            <Grid item sm={3.5}>
              <label>Time:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker fullWidth sx={TextFieldStyle}/>
              </LocalizationProvider>
            </Grid>
            <Grid item sm={2}>
              <Button onClick={() => handleOpenDialog('reschedule')} fullWidth sx={{bgcolor:'#247E38',marginTop:'24px', height: '30px', fontWeight:'bold', color:'white', "&:hover":{bgcolor:"#34AC4F"}}}>SET</Button>
            </Grid>

            <Grid item sm={12} sx={{textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <Typography variant="body2" sx={{marginRight: '5px'}}>Transaction Code:</Typography>
              <Typography variant="body2" sx={{fontWeight:'bold'}}>040124hash</Typography>
            </Grid>

            <Grid item sm={12} sx={{textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <Button onClick={() => handleOpenDialog('update')} sx={{bgcolor:'#CDAB52',marginTop:'14px', height: '35px', width:'90px', fontWeight:'bold', color:'white',"&:hover":{bgcolor:"#F0CA67"}}}>UPDATE</Button>
              <Button onClick={() => handleOpenDialog('cancel')} sx={{bgcolor:'#C34444',margin:'14px 0px 0px 5px', height: '35px', width:'90px', fontWeight:'bold', color:'white', "&:hover":{bgcolor:"#F05A5A"}}}>CANCEL</Button>
            </Grid>
          </Grid>
          <ConfirmationDialog open={dialogOpen} onClose={handleCloseDialog} action={currentAction} onConfirm={handleConfirm} service={service} />
        </Box>
        </Modal>
        </>
    )
}

export default BlessingApproved