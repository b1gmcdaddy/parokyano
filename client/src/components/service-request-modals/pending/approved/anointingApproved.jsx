import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, Box, Button, Grid, Typography, IconButton, TextField} from "@mui/material"
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from "react"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 'md',  
    bgcolor: 'white',
    borderRadius: '10px',
    boxShadow: 3,
    px: 1,
    py: 1,
};

const TextFieldStyle ={
  "& .MuiInputBase-root":{height:'30px'}
};

const TextFieldStyleDis ={
  "& .MuiInputBase-root":{height:'30px'},
  bgcolor:'#D9D9D9'
};

const AnointingApproved = () =>{

const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
              <Typography variant="subtitle1" sx={{textAlign:'center', fontWeight:'bold'}}>Anointing of the Sick Request Information</Typography>
            </Grid>

            <Grid item sm={1}>
              <label>Name:</label>
            </Grid>
            <Grid item sm={8}>
              <TextField fullWidth  sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={.8}>
              <label>Age:</label>
            </Grid>
            <Grid item sm={2.2}>
              <TextField fullWidth  sx={TextFieldStyle}/>
            </Grid>

            <Grid item sm={1.3}>
              <label>Address:</label>
            </Grid>
            <Grid item sm={10.7}>
              <TextField fullWidth  sx={TextFieldStyle}/>
            </Grid>

            <Grid item sm={2.1}>
              <label>Requested by:</label>
            </Grid>
            <Grid item sm={4}>
              <TextField fullWidth  sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={2}>
              <label>Relationship:</label>
            </Grid>
            <Grid item sm={3.9}>
              <TextField fullWidth  sx={TextFieldStyle}/>
            </Grid>

            <Grid item sm={2.1}>
              <label>Contact no:</label>
            </Grid>
            <Grid item sm={4}>
              <TextField fullWidth  sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={2}>
              <label>Sickness/Status:</label>
            </Grid>
            <Grid item sm={3.9}>
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
              <Button fullWidth sx={{bgcolor:'#247E38',marginTop:'24px', height: '30px', fontWeight:'bold', color:'white', "&:hover":{bgcolor:"#34AC4F"}}}>SET</Button>
            </Grid>

            <Grid item sm={12} sx={{textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <Typography variant="body2" sx={{marginRight: '5px'}}>Transaction Code:</Typography>
              <Typography variant="body2" sx={{fontWeight:'bold'}}>040124hash</Typography>
            </Grid>

            <Grid item sm={12} sx={{textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <Button sx={{bgcolor:'#CDAB52',marginTop:'14px', height: '35px', width:'90px', fontWeight:'bold', color:'white',"&:hover":{bgcolor:"#F0CA67"}}}>UPDATE</Button>
              <Button sx={{bgcolor:'#C34444',margin:'14px 0px 0px 5px', height: '35px', width:'90px', fontWeight:'bold', color:'white', "&:hover":{bgcolor:"#F05A5A"}}}>CANCEL</Button>
            </Grid>
          </Grid>
        </Box>
        </Modal>
        </>
    )
}

export default AnointingApproved