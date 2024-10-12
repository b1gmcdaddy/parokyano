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

const BaptismCancelled = ({open, handleClose}) =>{
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
                <Typography variant="subtitle1" sx={{textAlign:'center', fontWeight:'bold'}}>Baptism Request Information</Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={modalContentStyle}>
            <Grid container justifyContent={"center"} spacing={.8}>
              <Grid item sm={4}>
                <label>First name of child:</label>
                <TextField disabled fullWidth sx={TextFieldStyle}/>
              </Grid>
              <Grid item sm={4}>
                <label>Middle name of child:</label>
                <TextField disabled fullWidth sx={TextFieldStyle}/>
              </Grid>
              <Grid item sm={4}>
                <label>Last name of child:</label>
                <TextField disabled fullWidth sx={TextFieldStyle}/>
              </Grid>

              <Grid item sm={4}>
                <label>Date of birth:</label>
                <TextField disabled fullWidth sx={TextFieldStyle}/>
              </Grid>
              <Grid item sm={4}>
                <label>Place of brith:</label>
                <TextField disabled fullWidth sx={TextFieldStyle}/>
              </Grid>
              <Grid item sm={4}>
                <label>Gender:</label>
                <TextField disabled fullWidth sx={TextFieldStyle}/>
              </Grid>

              <Grid item sm={9}>
                <label>Father's complete name:</label>
                <TextField disabled fullWidth sx={TextFieldStyle}/>
              </Grid>
              <Grid item sm={3}>
                <label>Age:</label>
                <TextField disabled fullWidth sx={TextFieldStyle}/>
              </Grid>

              <Grid item sm={9}>
                <label>Mother's complete name:</label>
                <TextField disabled fullWidth sx={TextFieldStyle}/>
              </Grid>
              <Grid item sm={3}>
                <label>Age:</label>
                <TextField disabled fullWidth sx={TextFieldStyle}/>
              </Grid>

              <Grid item sm={12}>
                  <Grid container spacing={2}>
                      <Grid item sm={12}>
                          <Grid container>
                              <Grid item sm={8}>
                                  <Typography variant="subtitle1">Godparents:</Typography>
                              </Grid>
                          </Grid>
                          <Box fullWidth sx={{overflowY: 'auto'}}> {/* Ninong */}
                              <Grid container>
                                  {godparents.map((godparent, index) => (
                                      <Grid container spacing={3} item sm={6}  key={index}>
                                          <Grid item sm={1}>
                                              <p>{index + 1}.</p>
                                          </Grid>
                                          <Grid item sm={10}>
                                              <TextField disabled fullWidth value={godparent.name} sx={TextFieldStyle} />
                                          </Grid>
                                      </Grid>
                                  ))}
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

export default BaptismCancelled