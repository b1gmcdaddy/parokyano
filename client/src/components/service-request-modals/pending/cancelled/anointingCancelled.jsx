import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, Box, Grid, Typography, IconButton, TextField} from "@mui/material"
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

const TextFieldStyleDis ={
  "& .MuiInputBase-root":{height:'30px'},
  bgcolor:'#D9D9D9'
};

const AnointingCancelled = ({open, data, handleClose}) =>{
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
                <Typography variant="subtitle1" sx={{textAlign:'center', fontWeight:'bold'}}>Anointing of the Sick Request Information</Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={modalContentStyle}>
            <Grid container justifyContent={"center"} spacing={2}>
              <Grid item sm={1}>
                <label>Name:</label>
              </Grid>
              <Grid item sm={8}>
                <TextField disabled value={data.first_name} fullWidth  sx={TextFieldStyleDis}/>
              </Grid>
              <Grid item sm={.8}>
                <label>Age:</label>
              </Grid>
              <Grid item sm={2.2}>
                <TextField disabled value={data.age} fullWidth  sx={TextFieldStyleDis}/>
              </Grid>

              <Grid item sm={1.3}>
                <label>Address:</label>
              </Grid>
              <Grid item sm={10.7}>
                <TextField disabled value={data.address} fullWidth  sx={TextFieldStyleDis}/>
              </Grid>

              <Grid item sm={2.2}>
                <label>Requested by:</label>
              </Grid>
              <Grid item sm={5}>
                <TextField disabled fullWidth value={data.requested_by}  sx={TextFieldStyleDis}/>
              </Grid>
              <Grid item sm={1.9}>
                <label>Relationship:</label>
              </Grid>
              <Grid item sm={2.9}>
                <TextField disabled fullWidth value={data.relationship}  sx={TextFieldStyleDis}/>
              </Grid>

              <Grid item sm={1.9}>
                <label>Contact no:</label>
              </Grid>
              <Grid item sm={4.9}>
                <TextField disabled fullWidth value={data.contact_no}  sx={TextFieldStyleDis}/>
              </Grid>
              <Grid item sm={2.3}>
                <label>Sickness/Status:</label>
              </Grid>
              <Grid item sm={2.9}>
                <TextField disabled fullWidth value={data.patient_status}   sx={TextFieldStyleDis}/>
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
                <Typography variant="body2" sx={{fontWeight:'bold'}}>{data.transactio_no}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </Modal>
        </>
    )
}

export default AnointingCancelled