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

const BaptismCancelled = ({open, data, handleClose}) =>{
  const [sponsors, setSponsors] = useState([]);
  const [priests, setPriests] = useState([]);
  const [details, setDetails] = useState({});

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
    fetchSponsors(data.requestID);
    fetchBaptismDetails(data.requestID);
  }, [open, data]);

  const fetchSponsors = async (id) => {
    try {
      const response = await axios.get(`${config.API}/sponsor/retrieve`, {
        params: {
          reqID: id,
        },
      });
      setSponsors(response.data.result);
      return;
    } catch (err) {
      console.error("error retrieving sponsors", err);
    }
  };

  const fetchBaptismDetails = async (id) => {
    try {
      const response = await axios.get(`${config.API}/baptism/retrieve`, {
        params: {
          reqID: id,
        },
      });
      setDetails({
        birthCert: response.data.result[0].birthCert,
        parent_marriageCert: response.data.result[0].parent_marriageCert,
        gender: response.data.result[0].gender,
        father_age: response.data.result[0].father_age,
        mother_age: response.data.result[0].mother_age,
      });

      return;
    } catch (err) {
      console.error("error retrieving sponsors", err);
    }
  };
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
                <TextField disabled value={data.first_name} fullWidth sx={TextFieldStyleDis}/>
              </Grid>
              <Grid item sm={4}>
                <label>Middle name of child:</label>
                <TextField disabled value={data.middle_name} fullWidth sx={TextFieldStyleDis}/>
              </Grid>
              <Grid item sm={4}>
                <label>Last name of child:</label>
                <TextField disabled value={data.last_name} fullWidth sx={TextFieldStyleDis}/>
              </Grid>

              <Grid item sm={4}>
                <label>Date of birth:</label>
                <TextField disabled value={util.formatDate(data.preferred_date)} fullWidth sx={TextFieldStyleDis}/>
              </Grid>
              <Grid item sm={4}>
                <label>Place of brith:</label>
                <TextField disabled value={data.address} fullWidth sx={TextFieldStyleDis}/>
              </Grid>
              <Grid item sm={4}>
                <label>Gender:</label>
                <TextField disabled value={details.gender} fullWidth sx={TextFieldStyleDis}/>
              </Grid>

              <Grid item sm={9}>
                <label>Father's complete name:</label>
                <TextField disabled value={data.father_name} fullWidth sx={TextFieldStyleDis}/>
              </Grid>
              <Grid item sm={3}>
                <label>Age:</label>
                <TextField disabled value={details.father_age} fullWidth sx={TextFieldStyleDis}/>
              </Grid>

              <Grid item sm={9}>
                <label>Mother's complete name:</label>
                <TextField disabled value={data.mother_name} fullWidth sx={TextFieldStyleDis}/>
              </Grid>
              <Grid item sm={3}>
                <label>Age:</label>
                <TextField disabled value={details.mother_age} fullWidth sx={TextFieldStyleDis}/>
              </Grid>

              <Grid item sm={12}>
                  <Grid container spacing={2}>
                      <Grid item sm={12}>
                          <Grid container>
                              <Grid item sm={8}>
                                  <Typography variant="subtitle1">Godparents:</Typography>
                              </Grid>
                          </Grid>
                          <Box fullWidth sx={{overflowY: 'auto'}}>
                              <Grid container>
                                  {sponsors && sponsors.map((godparent, index) => (
                                      <Grid container spacing={3} item sm={6}  key={index}>
                                          <Grid item sm={1}>
                                              <p>{index + 1}.</p>
                                          </Grid>
                                          <Grid item sm={10}>
                                              <TextField disabled fullWidth value={godparent.name} sx={TextFieldStyleDis} />
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

export default BaptismCancelled