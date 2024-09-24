import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, Box, Button, Grid, Typography, IconButton, TextField, Tabs, Tab, FormControlLabel, Checkbox, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material"
import { useState} from "react"
import React from "react";

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

const boxModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 'sm',  
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
}

const TextFieldStyle ={
  "& .MuiInputBase-root":{height:'30px', bgcolor:'white'}
};

const tabStyle ={
  fontWeight: 'bold',
  color: 'black',
  bgcolor:'#D9D9D9',
}

const sponsors = [
  {name: "John Dominic Cocjic", age:"22", marital: "Married", catholic: "Yes"},
  {name: "Andrew Garfiels", age:"31", marital: "Married", catholic: "Yes"},
  {name: "Ariana Grande", age:"25", marital: "Married", catholic: "Yes"},
  {name: "Olivia Rodrigo", age:"23", marital: "Married", catholic: "Yes"},
  {name: "John Dominic Cocjic", age:"22", marital: "Married", catholic: "Yes"},
  {name: "Andrew Garfiels", age:"31", marital: "Married", catholic: "Yes"},
  {name: "Ariana Grande", age:"25", marital: "Married", catholic: "Yes"},
  {name: "Olivia Rodrigo", age:"23", marital: "Married", catholic: "Yes"},
  {name: "John Dominic Cocjic", age:"22", marital: "Married", catholic: "Yes"},
  {name: "Andrew Garfiels", age:"31", marital: "Married", catholic: "Yes"},
  {name: "Ariana Grande", age:"25", marital: "Married", catholic: "Yes"},
  {name: "Olivia Rodrigo", age:"23", marital: "Married", catholic: "Yes"},
];

function RequirementsModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return(
    <React.Fragment>
      <Button onClick={handleOpen} sx={{backgroundColor:'#355173',height: '25px', fontSize:'11px', marginLeft:'5px', color:'white', "&:hover":{bgcolor:"#4C74A5"}}}>Requirements</Button>
      <Modal open={open}>
        <Box sx={boxModal}>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <IconButton onClick={handleClose} size="small">
                <FontAwesomeIcon icon={faXmark} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"} spacing={2}>
            <Grid item sm={12}>
              <Typography variant="subtitle1" sx={{textAlign:'center', fontWeight:'bold'}}>Wedding Requirements Information</Typography> 
            </Grid>
            <Grid item sm={12}>
              <Tabs centered variant="fullWidth" value={tabValue} onChange={handleTabChange} sx={{borderRadius:'10px 10px 0px 0px'}}>
                <Tab label="Groom" sx={tabStyle}/>
                <Tab label="Bride" sx={tabStyle}/>
              </Tabs>
              <Box fullWidth sx={{bgcolor:'#D9D9D9', padding:'10px', borderRadius:'0px 0px 5px 5px'}}>
                <Grid container justifyContent={"center"}>
                  <Box>
                    {tabValue === 0 && (
                      <>
                        <Grid item sm={12}>
                        <FormControlLabel disabled control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Marriage License</Typography>} />
                        </Grid>
                        <Grid item sm={12}>
                            <FormControlLabel disabled control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Birth Certificate</Typography>} />
                        </Grid>
                        <Grid item sm={12}>
                            <FormControlLabel disabled control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Baptismal Certificate</Typography>} />
                        </Grid>
                        <Grid item sm={12}>
                            <FormControlLabel disabled control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Confirmation Certificate</Typography>} />
                        </Grid>
                      </>
                    )}
                    {tabValue === 1 && (
                        <>
                          <Grid item sm={12}>
                            <FormControlLabel disabled control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Marriage License</Typography>} />
                          </Grid>
                          <Grid item sm={12}>
                              <FormControlLabel disabled control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Birth Certificate</Typography>} />
                          </Grid>
                          <Grid item sm={12}>
                              <FormControlLabel disabled control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Baptismal Certificate</Typography>} />
                          </Grid>
                          <Grid item sm={12}>
                              <FormControlLabel disabled control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Confirmation Certificate</Typography>} />
                          </Grid>
                        </>
                    )}
                  </Box>
                </Grid>
              </Box>
            </Grid>

            <Grid item sm={12} sx={{marginTop:'5px'}}>
                <div style={{flex: .1, height: '1.8px', backgroundColor: 'black'}} />
            </Grid>

            <Box>
              <Grid item sm={12}>
                <FormControlLabel disabled control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Parish Permit</Typography>} />
              </Grid>
              <Grid item sm={12}>
                <FormControlLabel disabled control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Prenuptial Questionnaire</Typography>} />
              </Grid>
              <Grid item sm={12}>
                <FormControlLabel disabled control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Pre-Cana Seminar</Typography>} />
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function SponsorsModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return(
    <React.Fragment>
        <Button onClick={handleOpen} sx={{backgroundColor:'#355173',height: '25px', fontSize:'11px', marginLeft:'5px', color:'white', "&:hover":{bgcolor:"#4C74A5"}}}>Sponsors</Button>
        <Modal open={open}>
        <Box sx={boxModal}>
          <Grid container justifyContent={"flex-end"}>
            <Grid item>
              <IconButton onClick={handleClose} size="small">
                <FontAwesomeIcon icon={faXmark} />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"} spacing={1}>
            <Grid item sm={12}>
              <Typography variant="subtitle1" sx={{textAlign:'center', fontWeight:'bold'}}>Wedding Sponsors Information</Typography> 
            </Grid>

            <Grid item sm={12}>
              <TableContainer component={Paper}>
                <Table sx={{ tableLayout: 'fixed' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Full Name</TableCell>
                      <TableCell align="center">Age</TableCell>
                      <TableCell align="center">Marital Status</TableCell>
                      <TableCell align="center">Catholic?</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
              <div
                style={{
                  maxHeight: '35vh',
                  overflowY: 'auto',
                  width: '100%',
                  scrollbarWidth: 'none',   
                  "&::-webkit-scrollbar": {  
                      display: "none"
                  }
                }}
              >
                <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
                  <TableBody>
                    {sponsors.map((sponsor) => (
                      <TableRow key={sponsor.name}>
                        <TableCell align="center" component="th">
                          {sponsor.name}
                        </TableCell>
                        <TableCell align="center">{sponsor.age}</TableCell>
                        <TableCell align="center">{sponsor.marital}</TableCell>
                        <TableCell align="center">{sponsor.catholic}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}


const WeddingCancelled = () =>{
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    return(
        <>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
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
              <Typography variant="subtitle1" sx={{textAlign:'center', fontWeight:'bold'}}>Wedding Request Information</Typography> 
            </Grid>
            
            <Grid item sm={12}>
              <Box fullWidth sx={{bgcolor:'#D9D9D9',padding:'10px', borderRadius:'5px'}}>
                <Grid container spacing={1}>
                  <Grid item sm={12}>
                    <Typography variant="subtitle1" sx={{fontWeight:'bold', fontSize:'14px'}}>Groom:</Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <label>First Name:</label>
                    <TextField disabled fullWidth sx={TextFieldStyle}/>
                  </Grid>
                  <Grid item sm={4}>
                    <label>Middle Name:</label>
                    <TextField disabled fullWidth sx={TextFieldStyle}/>
                  </Grid>
                  <Grid item sm={4}>
                    <label>Last Name:</label>
                    <TextField disabled fullWidth sx={TextFieldStyle}/>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item sm={12}>
              <Box fullWidth sx={{bgcolor:'#D9D9D9',padding:'10px', borderRadius:'5px'}}>
                <Grid container spacing={1}>
                  <Grid item sm={12}>
                    <Typography variant="subtitle1" sx={{fontWeight:'bold', fontSize:'14px'}}>Bride:</Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <label>First Name:</label>
                    <TextField disabled fullWidth sx={TextFieldStyle}/>
                  </Grid>
                  <Grid item sm={4}>
                    <label>Middle Name:</label>
                    <TextField disabled fullWidth sx={TextFieldStyle}/>
                  </Grid>
                  <Grid item sm={4}>
                    <label>Last Name:</label>
                    <TextField disabled fullWidth sx={TextFieldStyle}/>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item sm={4}>
              <label>Contact No:</label>
              <TextField disabled fullWidth sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={4}>
              <label>Status:</label>
              <TextField disabled select fullWidth sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={4}>
              <label>Payment:</label>
              <TextField disabled select fullWidth sx={TextFieldStyle}/>
            </Grid>

            <Grid item sm={12} textAlign={"center"}>
              <Typography variant="subtitle1" sx={{display:'inline-block', fontSize:'14px'}}>Requirements:</Typography>
              <Typography variant="subtitle1" sx={{display:'inline-block', marginLeft:'5px', fontSize:'14px'}}>Incomplete</Typography>
              <RequirementsModal/>
              <Typography variant="subtitle1" sx={{display:'inline-block', marginLeft:'5px', fontSize:'14px'}}>Sponsors:</Typography>
              <Typography variant="subtitle1" sx={{display:'inline-block', marginLeft:'5px', fontSize:'14px'}}>Incomplete</Typography>
              <SponsorsModal/>
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

export default WeddingCancelled