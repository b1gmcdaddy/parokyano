import React from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from '../../assets/imageHeader.jpg';
import Footer from '../../components/Footer';
import { Typography, Grid, Container, Box, Paper } from "@mui/material";
import {DefaultCopyField} from '@eisberg-labs/mui-copy-field';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


const inputstyling = {
  '& .MuiOutlinedInput-root': {
      '& fieldset': {
          boxShadow: '0 3px 2px rgba(0,0,0,0.1)',
          borderRadius: '10px',
      },
      '&.Mui-focused fieldset': {
          borderColor: '#355173',
          borderWidth: '0.5px'
      },
      '& .MuiInputBase-input': {
          textAlign: 'center',
          fontWeight: 'bold',
          marginLeft: '30px',
          fontSize: '18px',
          padding: '10px'
      },
      '&.Mui-disabled .MuiInputBase-input': {
      color: 'black', 
      WebkitTextFillColor: 'black',
      }
  },
};
const sampleInfo = [
  {transaction: '04124<hash>', serviceRequested: 'Baptism', requestedBy: 'Manong Dodoy', 
    contact: '0917 546 8814', status: 'Approved', }
];

const sampleLogs = [
  {logId: '1', request_id: '22', datetime: 'August 1, 2024  3:12 PM', activity:'Priest C was assigned'},
  {logId: '2', request_id: '22', datetime: 'July 28, 2024  1:09 PM', activity:'Paid Service Fee & Submitted Requirements'},
  {logId: '3', request_id: '22', datetime: 'July 26, 2024  4:00 PM', activity:'Request Submitted'}
];

const contactNumberSplit = (contact) => {
  const lastFour = contact.slice(-4);
  const beforeLastFour = contact.slice(0, -4).replace(/\d/g, '*');
  return beforeLastFour + lastFour;
};

const TrackRequest = () => {
  const locate = useLocation()
  const request = locate.state.requestData
  console.log(request)

  const Info = sampleInfo[0];
  const statusStyling = Info.status === 'Approved' ? { color: 'green' } : { color: 'orange' };

  return (
    <>
      <NavParishioner />
      <Box
        sx={{
          backgroundImage: `url(${imageHeader})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography gutterBottom sx={{textAlign: 'center', fontSize: '18px'}}>
                  Transaction No.
                </Typography>
                <DefaultCopyField fullWidth disabled value={"040124<hash>"} sx={inputstyling}/>

                <Typography variant="body1" sx={{marginTop: '40px', marginBottom: '10px', fontWeight: 'bold'}}>
                  Request Information
                </Typography>
                {
                  sampleInfo.map((info) => (
                    <div key={info.requestedBy}>
                    <div className="flex justify-between md:mb-3">
                      <Typography variant="body1">Service Requested:</Typography>
                      <Typography variant="body1">{info.serviceRequested}</Typography>
                    </div>

                    <div className="flex justify-between md:mb-3">
                      <Typography variant="body1">Requested By:</Typography>
                      <Typography variant="body1">{request.result[0].requested_by}</Typography>
                    </div>

                    <div className="flex justify-between">
                      <Typography variant="body1">Contact Number:</Typography>
                      <Typography variant="body1">{contactNumberSplit(request.result[0].contact_no)}</Typography>
                    </div>

                    </div>
                  ))
                }
              </Paper>
            </Grid>


            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h5" gutterBottom sx={{fontWeight:'bold', fontSize: '28px', ...statusStyling}}>
                  {
                  Info.status == 'Approved'? 'APPROVED' : 'PENDING'
                  }
                  
                </Typography>
                  
                {
                  sampleLogs.map((activity) => (
                    <div key={activity.logId} className="md:mt-8 md:flex justify-between p-8">
                      <Typography>{activity.datetime}</Typography>
                      <Typography>{activity.activity}</Typography>
                      </div>
                  ))
                }
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default TrackRequest;
