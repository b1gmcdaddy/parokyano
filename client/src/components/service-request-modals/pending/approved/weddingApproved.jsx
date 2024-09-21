import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, Box, Button, Grid, Typography, IconButton, TextField, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody} from "@mui/material"
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
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

const TextFieldStyleDis ={
  "& .MuiInputBase-root":{height:'30px'},
  bgcolor:'#D9D9D9'
};

const sponsors = [
  {name: "John Dominic Cocjic", age:"22", marital: "Married", catholic: "Yes"},
  {name: "Andrew Garfiels", age:"31", marital: "Married", catholic: "Yes"},
  {name: "Ariana Grande", age:"25", marital: "Married", catholic: "Yes"},
  {name: "Olivia Rodrigo", age:"23", marital: "Married", catholic: "Yes"}
];

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
            <Grid item sm={4.5}>
              <label>Full Name:</label>
              <TextField fullWidth sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={1.5}>
              <label>Age:</label>
              <TextField fullWidth sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={3}>
              <label>Marital Status:</label>
              <TextField select fullWidth sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={3}>
              <label>Catholic?:</label>
              <TextField select fullWidth sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={12} sx={{textAlign:'center'}}>
                <Button sx={{bgcolor:'#355173', height: '28px', width:'150px', fontWeight:'bold', color:'white',"&:hover":{bgcolor:"#4C74A5"}}}>Add Sponsor</Button>
            </Grid>

            <Grid item sm={12}>
              <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                      <TableCell align="center">Full Name</TableCell>
                      <TableCell align="center">Age</TableCell>
                      <TableCell align="center">Marital Status</TableCell>
                      <TableCell align="center">Catholic?</TableCell>
                      <TableCell align="center"> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sponsors.map((sponsor)=> (
                        <TableRow key={sponsor.name}>
                        <TableCell align="center" component="th">{sponsor.name}</TableCell>
                        <TableCell align="center">{sponsor.age}</TableCell>
                        <TableCell align="center">{sponsor.marital}</TableCell>
                        <TableCell align="center">{sponsor.catholic}</TableCell>
                        <TableCell align="center">
                          <IconButton size="small">
                            <FontAwesomeIcon icon={faXmark} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </Grid>

            <Grid item sm={12} sx={{textAlign:'center'}}>
                <Button sx={{bgcolor:'#CDAB52', height: '35px', width:'90px', fontWeight:'bold', color:'white',"&:hover":{bgcolor:"#F0CA67"}}}>UPDATE</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}


const WeddingApproved = () =>{
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
                    <TextField fullWidth sx={TextFieldStyle}/>
                  </Grid>
                  <Grid item sm={4}>
                    <label>Middle Name:</label>
                    <TextField fullWidth sx={TextFieldStyle}/>
                  </Grid>
                  <Grid item sm={4}>
                    <label>Last Name:</label>
                    <TextField fullWidth sx={TextFieldStyle}/>
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
                    <TextField fullWidth sx={TextFieldStyle}/>
                  </Grid>
                  <Grid item sm={4}>
                    <label>Middle Name:</label>
                    <TextField fullWidth sx={TextFieldStyle}/>
                  </Grid>
                  <Grid item sm={4}>
                    <label>Last Name:</label>
                    <TextField fullWidth sx={TextFieldStyle}/>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item sm={4}>
              <label>Contact No:</label>
              <TextField fullWidth sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={4}>
              <label>Status:</label>
              <TextField select fullWidth sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={4}>
              <label>Payment:</label>
              <TextField select fullWidth sx={TextFieldStyle}/>
            </Grid>

            <Grid item sm={12} textAlign={"center"}>
              <Typography variant="subtitle1" sx={{display:'inline-block', fontSize:'14px'}}>Requirements:</Typography>
              <Typography variant="subtitle1" sx={{display:'inline-block', marginLeft:'5px', fontSize:'14px'}}>Incomplete</Typography>
              <Typography variant="subtitle1" sx={{display:'inline-block', marginLeft:'5px', fontSize:'14px'}}>Sponsors:</Typography>
              <Typography variant="subtitle1" sx={{display:'inline-block', marginLeft:'5px', fontSize:'14px'}}>Incomplete</Typography>
              <SponsorsModal/>
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

            <Grid item sm={3}>
              <label>Priest:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis}/>
            </Grid>
            <Grid item sm={3}>
              <label>Date:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis}/>
            </Grid>
            <Grid item sm={3}>
              <label>Time:</label>
              <TextField disabled fullWidth sx={TextFieldStyleDis}/>
            </Grid>
            <Grid item sm={3}>
              <label>Venue:</label>
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
              <Button fullWidth sx={{bgcolor:'#247E38',marginTop:'24px', height: '30px', fontWeight:'bold', color:'white', "&:hover":{bgcolor:"#34AC4F"}}}>SET</Button>
            </Grid>

            <Grid item sm={12} sx={{textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <Typography variant="body2" sx={{marginRight: '5px'}}>Transaction Code:</Typography>
              <Typography variant="body2" sx={{fontWeight:'bold'}}>040124hash</Typography>
            </Grid>

            <Grid item sm={12} sx={{textAlign:'center', display:'flex', flexDirection:'row', justifyContent:'center'}}>
              <Button sx={{bgcolor:'#CDAB52', height: '35px', width:'90px', fontWeight:'bold', color:'white',"&:hover":{bgcolor:"#F0CA67"}}}>UPDATE</Button>
              <Button sx={{bgcolor:'#C34444',margin:'0px 0px 0px 5px', height: '35px', width:'90px', fontWeight:'bold', color:'white', "&:hover":{bgcolor:"#F05A5A"}}}>CANCEL</Button>
            </Grid>
          </Grid>
        </Box>
        </Modal>
        </>
    )
}

export default WeddingApproved