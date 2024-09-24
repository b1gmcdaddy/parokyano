import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, Box, Button, Grid, Typography, IconButton, TextField, RadioGroup, FormControlLabel, Radio} from "@mui/material"
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

const BlessingCancelled = () =>{
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [radioValue, setRadioValue] = useState("");
  const [otherValue, setOtherValue] = useState("");
  
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
                <FormControlLabel disabled  value="House Blessing" control={<Radio size="small" />} label="House" />
                <FormControlLabel disabled  value="Company Blessing" control={<Radio size="small" />} label="Company"/>
                <FormControlLabel disabled  value="others" control={<Radio size="small" />} label="Others:" />
                <TextField disabled value={otherValue} onChange={handleOtherChange} sx={{"& .MuiInputBase-root":{height:'30px'}, opacity: isOtherSelected ? 1 : 0.4, marginTop: '5px'}}/>
              </RadioGroup>
            </Grid>

            <Grid item sm={1.3}>
              <label>Name:</label>
            </Grid>
            <Grid item sm={10.7}>
              <TextField disabled fullWidth  sx={TextFieldStyle}/>
            </Grid>
            
            <Grid item sm={1.3}>
              <label>Address:</label>
            </Grid>
            <Grid item sm={10.7}>
              <TextField disabled fullWidth  sx={TextFieldStyle}/>
            </Grid>

            <Grid item sm={2.2}>
              <label>Requested by:</label>
            </Grid>
            <Grid item sm={3.7}>
              <TextField disabled fullWidth  sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={1.9}>
              <label>Contact no:</label>
            </Grid>
            <Grid item sm={4.2}>
              <TextField disabled fullWidth  sx={TextFieldStyle}/>
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

            <Grid item sm={12} sx={{textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <Typography variant="body2" sx={{marginRight: '5px'}}>Transaction Code:</Typography>
              <Typography variant="body2" sx={{fontWeight:'bold'}}>040124hash</Typography>
            </Grid>
          </Grid>
        </Box>
        </Modal>
        </>
    )
}

export default BlessingCancelled