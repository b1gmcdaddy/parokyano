import React, { useEffect, useState } from 'react';
import NavStaff from '../../components/NavStaff';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { Button, Typography, Container } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChurch, faStamp, faHandsPraying } from '@fortawesome/free-solid-svg-icons';

const sideBarWidth = 240;

const sampleStatistics = {
  noServiceReq: 18,
  noCertReq: 2,
  noMassIntentions: 30
};

// kani siya is mga under 'upcoming' status lang nya bai...
const sampleRecentServices = [
  {type: "Funeral Mass", requestor: "John Doe", dateRequested: "April 11, 2024"},
  {type: "Baptism", requestor: "John Doe", dateRequested: "April 08, 2024"},
  {type: "Wake Mass", requestor: "John Doe", dateRequested: "April 05, 2024"},
  {type: "Outside Mass", requestor: "John Doe", dateRequested: "April 01, 2024"},
  {type: "Wake Mass", requestor: "John Doe", dateRequested: "April 05, 2024"},
  {type: "Outside Mass", requestor: "John Doe", dateRequested: "April 01, 2024"},
];

const StaffDashboard = () => {

  const [statistics, setStatistics] = useState({});
  const [recentServices, setRecentServices] = useState([]);

  useEffect(() => {
    setStatistics(sampleStatistics);
    setRecentServices(sampleRecentServices);
  }, []);

  return (
    <Box sx={{ display: 'flex', mx: { md: '30px' } }}>
      <NavStaff />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${sideBarWidth}px)` } }} >
          <Toolbar />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', 
            marginTop: '8px', alignItems: 'center' }}>
            <h1 className='text-xl font-semibold'>Dashboard</h1>
            <Button variant="contained" type="button" sx={{backgroundColor:"#355173"}}>Generate Reports</Button>
          </Box>
          <div className='mt-8 border-1 border-neutral-900 inline-block'>
            <select className='outline-none'>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <Box sx={{ display: { md: 'flex'}, justifyContent: 'space-between', marginTop: '30px' }}>
            <Paper sx={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', backgroundColor: "#D9D9D9" }} >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FontAwesomeIcon icon={faChurch} />
                  <Typography sx={{ marginLeft: '8px', fontWeight: 'bold' }}>Service Requests</Typography>
                </Box>
                <Typography sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>{statistics.noServiceReq}</Typography>
            </Paper>
            <Paper sx={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', backgroundColor: "#D9D9D9" }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FontAwesomeIcon icon={faStamp} />
                  <Typography sx={{ marginLeft: '8px', fontWeight: 'bold' }}>Certificate Requests</Typography>
                </Box>
                <Typography sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>{statistics.noCertReq}</Typography>
            </Paper>
            <Paper sx={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', backgroundColor: "#D9D9D9" }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FontAwesomeIcon icon={faHandsPraying} />
                  <Typography sx={{ marginLeft: '8px', fontWeight: 'bold' }}>Mass Intentions</Typography>
                </Box>
                <Typography sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>{statistics.noMassIntentions}</Typography>
            </Paper>
          </Box>
          <Box sx={{ display: 'flex', marginTop: { md: '4em', xs: '2em' } }}>
            <h1 className='text-xl font-semibold'>Upcoming Events</h1>
          </Box>
          <Box className="md:mt-5 xs:mt-2">
            <Box sx={{backgroundColor: "#355173", padding: "8px", display: "flex", alignItems: "center" }} className="gap-2">
                <Typography sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', color: 'whitesmoke' }}>See More</Typography>
                <FontAwesomeIcon icon={faArrowRight} className='text-white md:mr-5' />
            </Box>
            <Box sx={{border:'solid 1px', maxHeight: '400px', overflowY: 'auto'}}>
              <Container maxWidth="lg">
                {
                  recentServices.map((service, index) => (
                    <Paper sx={{ padding: '16px', marginBottom: '16px', backgroundColor: "#F5F5F5" }} key={index}>
                      <Typography variant="h6">{service.type}</Typography>
                      <Typography variant="body1">Requested by: {service.requestor}</Typography>
                      <Typography variant="body2">Date: {service.dateRequested}</Typography>
                    </Paper>
                  ))
                }
              </Container>
            </Box>
          </Box>
      </Box>
      
    </Box>
    
  );
}

export default StaffDashboard;
