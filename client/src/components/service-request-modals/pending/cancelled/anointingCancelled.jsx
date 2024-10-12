import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, Box, Grid, Typography, IconButton, TextField} from "@mui/material"

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

const AnointingCancelled = ({open, handleClose}) =>{
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
                <TextField disabled fullWidth  sx={TextFieldStyleDis}/>
              </Grid>
              <Grid item sm={.8}>
                <label>Age:</label>
              </Grid>
              <Grid item sm={2.2}>
                <TextField disabled fullWidth  sx={TextFieldStyleDis}/>
              </Grid>

              <Grid item sm={1.3}>
                <label>Address:</label>
              </Grid>
              <Grid item sm={10.7}>
                <TextField disabled fullWidth  sx={TextFieldStyleDis}/>
              </Grid>

              <Grid item sm={2.2}>
                <label>Requested by:</label>
              </Grid>
              <Grid item sm={5}>
                <TextField fullWidth  sx={TextFieldStyleDis}/>
              </Grid>
              <Grid item sm={1.9}>
                <label>Relationship:</label>
              </Grid>
              <Grid item sm={2.9}>
                <TextField fullWidth  sx={TextFieldStyleDis}/>
              </Grid>

              <Grid item sm={1.9}>
                <label>Contact no:</label>
              </Grid>
              <Grid item sm={4.9}>
                <TextField fullWidth  sx={TextFieldStyleDis}/>
              </Grid>
              <Grid item sm={2.3}>
                <label>Sickness/Status:</label>
              </Grid>
              <Grid item sm={2.9}>
                <TextField fullWidth  sx={TextFieldStyleDis}/>
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
        </Box>
        </Modal>
        </>
    )
}

export default AnointingCancelled