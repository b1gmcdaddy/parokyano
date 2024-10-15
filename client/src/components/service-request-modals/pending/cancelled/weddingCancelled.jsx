import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal, Box, Button, Grid, Typography, IconButton, TextField, Tabs, Tab, FormControlLabel, Checkbox, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, MenuItem} from "@mui/material"
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../../config";

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
  py: 2,
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

const fetchWeddingDetails = async (id) => {
  try {
    const response = await axios.get(`${config.API}/wedding/retrieve`, {
      params: {reqID: id},
    });

    return response.data?.result[0];
  } catch (err) {
    console.error(err);
    return null;
  }
};

function RequirementsModal({id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tabValue, setTabValue] = useState(0);
  const [requirements, setRequirements] = useState({
    groom_baptismCert: 0,
    groom_confirmationCert: 0,
    groom_birthCert: 0,
    spouse_baptismCert: 0,
    spouse_confirmationCert: 0,
    spouse_birthCert: 0,
    isParishPermit: 0,
    isPrenuptial: 0,
    isPreCana: 0,
    isMarriageLicense: 0,
  });

  useEffect(() => {
    const fetchAndSetRequirements = async () => {
      const req = await fetchWeddingDetails(id);
      if (req) {
        setRequirements({
          groom_baptismCert: req.groom_baptismCert ?? 0,
          groom_confirmationCert: req.groom_confirmationCert ?? 0,
          groom_birthCert: req.groom_birthCert ?? 0,
          spouse_baptismCert: req.spouse_baptismCert ?? 0,
          spouse_confirmationCert: req.spouse_confirmationCert ?? 0,
          spouse_birthCert: req.spouse_birthCert ?? 0,
          isParishPermit: req.isParishPermit ?? 0,
          isPrenuptial: req.isPrenuptial ?? 0,
          isPreCana: req.isPreCana ?? 0,
          isMarriageLicense: req.isMarriageLicense ?? 0,
        });
      }
    };
    if (open) {
      fetchAndSetRequirements();
    }
  }, [open, id]);

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
                            <FormControlLabel disabled checked={requirements.groom_birthCert === 1} control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Birth Certificate</Typography>} />
                        </Grid>
                        <Grid item sm={12}>
                            <FormControlLabel disabled checked={requirements.groom_baptismCert === 1} control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Baptismal Certificate</Typography>} />
                        </Grid>
                        <Grid item sm={12}>
                            <FormControlLabel disabled checked={requirements.groom_confirmationCert === 1} control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Confirmation Certificate</Typography>} />
                        </Grid>
                      </>
                    )}
                    {tabValue === 1 && (
                        <>
                          <Grid item sm={12}>
                              <FormControlLabel disabled checked={requirements.spouse_birthCert === 1} control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Birth Certificate</Typography>} />
                          </Grid>
                          <Grid item sm={12}>
                              <FormControlLabel disabled checked={requirements.spouse_baptismCert === 1} control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Baptismal Certificate</Typography>} />
                          </Grid>
                          <Grid item sm={12}>
                              <FormControlLabel disabled checked={requirements.spouse_confirmationCert === 1} control={<Checkbox/>}  label={<Typography sx={{ fontSize: '15px' }}>Confirmation Certificate</Typography>} />
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
                <FormControlLabel disabled checked={requirements.isMarriageLicense === 1} control={<Checkbox/>} label={<Typography sx={{ fontSize: '15px' }}>Marriage License</Typography>} />
              </Grid>
              <Grid item sm={12}>
                <FormControlLabel disabled checked={requirements.isParishPermit === 1} control={<Checkbox/>} label={<Typography sx={{ fontSize: '15px' }}>Parish Permit</Typography>} />
              </Grid>
              <Grid item sm={12}>
                <FormControlLabel disabled checked={requirements.isPrenuptial === 1} control={<Checkbox/>} label={<Typography sx={{ fontSize: '15px' }}>Prenuptial Questionnaire</Typography>} />
              </Grid>
              <Grid item sm={12}>
                <FormControlLabel disabled checked={requirements.isPreCana === 1} control={<Checkbox/>} label={<Typography sx={{ fontSize: '15px' }}>Pre-Cana Seminar</Typography>} />
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

function SponsorsModal({id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sponsors, setSponsors] = useState([]);
  const fetchSponsors = async () => {
    try {
      const response = await axios.get(`${config.API}/sponsor/retrieve`, {
        params: {
          reqID: id,
        },
      });
      setSponsors(response.data.result);
    } catch (err) {
      console.error("error retrieving sponsors", err);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);
  
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
                        <TableCell align="center">{sponsor.isMarried}</TableCell>
                        <TableCell align="center">{sponsor.isCatholic}</TableCell>
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


const WeddingCancelled = ({open, data, handleClose}) =>{
  const [completeRequirements, setCompleteRequirements] = useState(0);
  const [spouseDetails, setSpouseData] = useState({
    spouse_firstName: "",
    spouse_middleName: "",
    spouse_lastName: "",
  });

  const fetchWeddingData = async () => {
    try {
      const weddingDetails = await fetchWeddingDetails(data.requestID);

      if (weddingDetails) {
        setSpouseData(() => ({
          spouse_firstName: weddingDetails.spouse_firstName || "",
          spouse_middleName: weddingDetails.spouse_middleName || "",
          spouse_lastName: weddingDetails.spouse_lastName || "",
        }));

        setCompleteRequirements(weddingDetails.isComplete || 0);
      }
    } catch (err) {
      console.error("Error fetching wedding details", err);
    }
  };

  useEffect(() => {
    fetchWeddingData();
  }, []);

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
                <Typography variant="subtitle1" sx={{textAlign:'center', fontWeight:'bold'}}>Wedding Request Information</Typography> 
              </Grid>
            </Grid>
          </Box>

          <Box sx={modalContentStyle}>
          <Grid container justifyContent={"center"} spacing={2}>
            <Grid item sm={12}>
              <Box fullWidth sx={{bgcolor:'#D9D9D9',padding:'10px', borderRadius:'5px'}}>
                <Grid container spacing={1}>
                  <Grid item sm={12}>
                    <Typography variant="subtitle1" sx={{fontWeight:'bold', fontSize:'14px'}}>Groom:</Typography>
                  </Grid>
                  <Grid item sm={4}>
                    <label>First Name:</label>
                    <TextField disabled value={data.first_name} fullWidth sx={TextFieldStyle}/>
                  </Grid>
                  <Grid item sm={4}>
                    <label>Middle Name:</label>
                    <TextField disabled value={data?.middle_name} fullWidth sx={TextFieldStyle}/>
                  </Grid>
                  <Grid item sm={4}>
                    <label>Last Name:</label>
                    <TextField disabled value={data.last_name} fullWidth sx={TextFieldStyle}/>
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
                    <TextField value={spouseDetails.spouse_firstName} disabled fullWidth sx={TextFieldStyle}/>
                  </Grid>
                  <Grid item sm={4}>
                    <label>Middle Name:</label>
                    <TextField disabled value={spouseDetails?.spouse_middleName} fullWidth sx={TextFieldStyle}/>
                  </Grid>
                  <Grid item sm={4}>
                    <label>Last Name:</label>
                    <TextField disabled value={spouseDetails.spouse_lastName} fullWidth sx={TextFieldStyle}/>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item sm={4}>
              <label>Contact No:</label>
              <TextField disabled value={data.contact_no} fullWidth sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={4}>
              <label>Status:</label>
              <TextField disabled value={data.relationship} fullWidth sx={TextFieldStyle}/>
            </Grid>
            <Grid item sm={4}>
              <label>Payment:</label>
              <TextField disabled value={data.payment_status} fullWidth sx={TextFieldStyle}/>
            </Grid>

            <Grid item sm={12} textAlign={"center"}>
              <Typography variant="subtitle1" sx={{display:'inline-block', fontSize:'14px'}}>Requirements:</Typography>
              <Typography variant="subtitle1" sx={{ display: "inline-block", marginLeft: "5px", fontSize: "14px", color: completeRequirements == 1 ? "green" : "red",}}>
                {completeRequirements == 1 ? "Complete" : "Incomplete"}
              </Typography>
              <RequirementsModal id={data.requestID}/>
              <Typography variant="subtitle1" sx={{display:'inline-block', marginLeft:'5px', fontSize:'14px'}}>Sponsors:</Typography>
              <SponsorsModal id={data.requestID}/>
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

export default WeddingCancelled