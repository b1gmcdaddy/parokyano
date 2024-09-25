import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, Box, Button, Grid, Typography, IconButton, TextField, Checkbox, FormControlLabel, MenuItem, Radio, RadioGroup} from "@mui/material"
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from "react"
import ConfirmationDialog from "../../ConfirmationModal";

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
    maxHeight: '97vh',
    overflowY: 'auto',
    scrollbarWidth: 'none',   
    "&::-webkit-scrollbar": {  
        display: "none"
    }
};

const TextFieldStyle ={
  "& .MuiInputBase-root":{height:'30px'}
};

const TextFieldStyleDis ={
  "& .MuiInputBase-root":{height:'30px'},
  bgcolor:'#D9D9D9'
};

const godparents = [
    { name: "Clyde Joseph Noob", isCatholic: "yes" },
    { name: "Carl Dave Barrera", isCatholic: "yes" },
    { name: "Jolony Tangpuz", isCatholic: "yes" },
    { name: "Carl Joseph Noob", isCatholic: "yes" },
    { name: "Clyde Joseph Noob", isCatholic: "yes" },
    { name: "Carl Dave Barrera", isCatholic: "yes" },
    { name: "Jolony Tangpuz", isCatholic: "yes" },
    { name: "Carl Joseph Noob", isCatholic: "yes" }
];

const BaptismPending = ({open, handleClose}) =>{
const [dialogOpen, setDialogOpen] = useState(false);
const [currentAction, setCurrentAction] = useState('');
const [service] = useState('baptism');

const handleOpenDialog = (action) => {
  setCurrentAction(action);
  setDialogOpen(true);
};

const handleCloseDialog = () => {
  setDialogOpen(false);
};

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
    default:
      break;
  }
};
  
    return(
        <>
        <Modal
          open={open} 
          onClose={handleClose}
        >
        <Box sx={style}>
        <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <IconButton onClick={handleClose} size="small">
                <FontAwesomeIcon icon={faXmark} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"} spacing={.8}>
            <Grid item sm={12}>
              <Typography variant="subtitle1" sx={{textAlign:'center', fontWeight:'bold'}}>Baptism Request Information</Typography>
            </Grid>
            <Grid item sm={4}>
              <label>First name of child:</label>
              <TextField fullWidth sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={4}>
              <label>Middle name of child:</label>
              <TextField fullWidth sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={4}>
              <label>Last name of child:</label>
              <TextField fullWidth sx={TextFieldStyle}/>
            </Grid>

            <Grid item sm={4}>
              <label>Date of birth:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker fullWidth sx={TextFieldStyle}/>
              </LocalizationProvider>
            </Grid>
            <Grid item sm={4}>
              <label>Place of brith:</label>
              <TextField fullWidth sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={4}>
              <label>Gender:</label>
              <TextField fullWidth select sx={TextFieldStyle}/>
            </Grid>

            <Grid item sm={9}>
              <label>Father's complete name:</label>
              <TextField fullWidth sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={3}>
              <label>Age:</label>
              <TextField fullWidth sx={TextFieldStyle}/>
            </Grid>

            <Grid item sm={9}>
              <label>Mother's complete name:</label>
              <TextField fullWidth sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={3}>
              <label>Age:</label>
              <TextField fullWidth sx={TextFieldStyle}/>
            </Grid>

            <Grid item sm={12}>
                <Grid container spacing={2}>
                    <Grid item sm={8}>
                        <Grid container>
                            <Grid item sm={8}>
                                <Typography variant="subtitle1">Godparents:</Typography>
                            </Grid>
                            <Grid item sm={4}>
                                <Typography variant="subtitle1">Catholic?</Typography>
                            </Grid>
                        </Grid>
                        <Box fullWidth sx={{height: '175px', overflowY: 'auto'}}> {/* Ninong */}
                            <Grid container>
                                {godparents.map((godparent, index) => (
                                    <Grid container spacing={2} key={index}>
                                        <Grid item sm={.7}>
                                            <p>{index + 1}.</p>
                                        </Grid>
                                        <Grid item sm={6.3}>
                                        <TextField fullWidth value={godparent.name} sx={TextFieldStyle} />
                                        </Grid>
                                        <Grid item sm={5}>
                                        <RadioGroup row defaultValue={godparent.isCatholic} sx={{marginTop:'-7px'}}>
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item sm={4}>
                        <Box fullWidth sx={{height:'175px'}}>
                            <Grid container>
                                <Grid item sm={12}>
                                    <Typography variant="subtitle1" sx={{fontWeight:'bold'}}>Requirements:</Typography>
                                </Grid>
                                <Grid item sm={12}>
                                    <FormControlLabel control={<Checkbox/>}  label={<Typography sx={{ fontSize: '13px' }}>Photocopy of Birth Certificate</Typography>} />
                                </Grid>
                                <Grid item sm={12}>
                                    <FormControlLabel control={<Checkbox/>}  label={<Typography sx={{ fontSize: '13px' }}>Photocopy of Parent - Marriage Certificate</Typography>}/>
                                </Grid>
                                <Grid item sm={12}>
                                    <Typography variant="subtitle1" sx={{display:'inline-block'}}>Payment:</Typography>
                                    <Typography variant="subtitle1" sx={{fontWeight:'bold', display:'inline-block', marginLeft:'10px'}}>800</Typography>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField fullWidth value={'cash'} sx={TextFieldStyle}/>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField fullWidth select sx={TextFieldStyle}>
                                        <MenuItem value={'Unpaid'} sx={{fontWeight:'bold', color:'#950000'}}>Unpaid</MenuItem>
                                        <MenuItem value={'Paid'} sx={{fontWeight:'bold', color:'#247E38'}}>Paid</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item sm={12}>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div style={{flex: .1, height: '1px', backgroundColor: 'black'}} />
                <div>
                  <p style={{width: '80px', textAlign: 'center', fontWeight:'bold'}}>Preferred</p>
                </div>
                <div style={{flex: 1, height: '1px', backgroundColor: 'black'}} />
              </div>
            </Grid>

            <Grid item sm={2.5}>
              <label>Priest:</label>
              <TextField fullWidth select sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={3}>
              <label>Date:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker fullWidth sx={TextFieldStyle}/>
              </LocalizationProvider>
            </Grid>
            <Grid item sm={2.7}>
              <label>Time:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker fullWidth sx={TextFieldStyle}/>
              </LocalizationProvider>
            </Grid>
            <Grid item sm={1.8}>
              <label>Venue:</label>
              <TextField disabled fullWidth sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={2}>
              <Button onClick={() => handleOpenDialog('approve')} fullWidth sx={{backgroundColor:'#355173',marginTop:'24px', height: '30px', fontWeight:'bold', color:'white', "&:hover":{bgcolor:"#4C74A5"}}}>Assign</Button>
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

            <Grid item sm={2.5}>
              <label>Priest:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis}/>
            </Grid>
            <Grid item sm={3}>
              <label>Date:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis}/>
            </Grid>
            <Grid item sm={2.7}>
              <label>Time:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis}/>
            </Grid>
            <Grid item sm={1.8}>
              <label>Venue:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis}/>
            </Grid>
            <Grid item sm={2}>
              <Button fullWidth sx={{bgcolor:'#BBB6B6',marginTop:'24px', height: '30px', fontWeight:'bold', color:'#355173', "&:hover":{bgcolor:"#D3CECE"}}}>CLEAR</Button>
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

export default BaptismPending