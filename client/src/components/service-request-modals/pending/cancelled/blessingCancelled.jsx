import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, Box, Grid, Typography, IconButton, TextField, RadioGroup, FormControlLabel, Radio} from "@mui/material"
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../../config";
import util from "../../../../utils/DateTimeFormatter";

const modalStyle = {
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
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
};

const modalContentStyle = {
overflowY: 'auto',
flexGrow: 1,
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

const BlessingCancelled = ({open, data, handleClose}) =>{
  const [radioValue, setRadioValue] = useState("");
  const [otherValue, setOtherValue] = useState("");
  const [priests, setPriests] = useState([]);
  useEffect(() => {
    const fetchPriest = async () => {
      try {
        const response = await axios.get(`${config.API}/priest/retrieve`, {
          params: {
            col: "status",
            val: "active",
          },
        });
        setPriests(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPriest();
  }, [open]);
  
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
        <Modal
          open={open} 
          onClose={handleClose}
        >
        <Box sx={modalStyle}>
          <Box sx={{position: 'sticky', paddingBottom: '10px'}}>
            <Grid container justifyContent={"flex-end"}>
                <Grid item>
                  <IconButton onClick={handleClose} size="small">
                    <FontAwesomeIcon icon={faXmark} />
                  </IconButton>
                </Grid>
                <Grid item sm={12}>
                  <Typography variant="subtitle1" sx={{textAlign:'center', fontWeight:'bold'}}>Blessing Request Information</Typography>
                </Grid>
              </Grid>
          </Box>

          <Box sx={modalContentStyle}>
            <Grid container justifyContent={"center"} spacing={2}>
              <Grid item sm={1}>
                <label>Type:</label>
              </Grid>
              <Grid item sm={11}>
                <RadioGroup row name="type" sx={{marginTop:'-5px'}} value={data.type} onChange={handleRadioChange}>
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
                <TextField disabled value={data.first_name} fullWidth  sx={TextFieldStyle}/>
              </Grid>
              
              <Grid item sm={1.3}>
                <label>Address:</label>
              </Grid>
              <Grid item sm={10.7}>
                <TextField disabled value={data.address} fullWidth  sx={TextFieldStyle}/>
              </Grid>

              <Grid item sm={2.2}>
                <label>Requested by:</label>
              </Grid>
              <Grid item sm={3.7}>
                <TextField disabled value={data.requested_by} fullWidth  sx={TextFieldStyle}/>
              </Grid>
              <Grid item sm={1.9}>
                <label>Contact no:</label>
              </Grid>
              <Grid item sm={4.2}>
                <TextField disabled value={data.contact_no} fullWidth  sx={TextFieldStyle}/>
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
                <TextField
                    disabled
                    fullWidth
                    sx={TextFieldStyleDis}
                    value={
                      priests.find(
                        (priest) => priest.priestID === data.priest_id
                      )?.first_name +
                      " " +
                      priests.find(
                        (priest) => priest.priestID === data.priest_id
                      )?.last_name
                    }
                />
              </Grid>
              <Grid item sm={4}>
                <label>Date:</label>
                <TextField disabled value={util.formatDate(data.preferred_date)} fullWidth sx={TextFieldStyleDis}/>
              </Grid>
              <Grid item sm={4}>
                <label>Time:</label>
                <TextField disabled value={util.formatTime(data.preferred_time)} fullWidth sx={TextFieldStyleDis}/>
              </Grid>

              <Grid item sm={12} sx={{textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <Typography variant="body2" sx={{marginRight: '5px'}}>Transaction Code:</Typography>
                <Typography variant="body2" sx={{fontWeight:'bold'}}>{data.transaction_no}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </Modal>
        </>
    )
}

export default BlessingCancelled