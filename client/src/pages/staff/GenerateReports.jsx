import React, { useState, useRef } from 'react';
import NavStaff from '../../components/NavStaff';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Grid, Typography, TextField, Button, MenuItem, Container } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faPrint } from '@fortawesome/free-solid-svg-icons';
import StaffReport from '../../components/StaffReport';
import ReactToPrint from 'react-to-print';

const GenerateReports = () => {

    const [reportDetails, setReportDetails] = useState({
        startDate: '',   
        endDate: '',
        category: ''
    });

    const handleChange =(e) => {
        setReportDetails({ ...reportDetails, [e.target.name]: e.target.value});
    };

    const componentRef = useRef();

    return (
        <Box sx={{ display: 'flex', mx: { md: '30px' } }}>
            <NavStaff />
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }} >
                <Toolbar />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', 
                    marginTop: '8px', alignItems: 'center', marginBottom: '1.5em' }}>
                    <Typography sx={{fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: 600}}>Generate Report</Typography> 
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <label>Start Date:</label>
                        <TextField type="date" size="small" name="startDate" variant="outlined" value={reportDetails.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth required />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <label>End Date:</label>
                        <TextField type="date" size="small" name="endDate" variant="outlined" value={reportDetails.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth required />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <label>Category: </label>
                        <TextField select variant="outlined" name="category" onChange={handleChange} value={reportDetails.category} size="small" fullWidth required>
                          <MenuItem value="All">All</MenuItem>
                          <MenuItem value="Baptism">Baptism</MenuItem>
                          <MenuItem value="Wedding">Wedding</MenuItem>
                          <MenuItem value="Anointing">Anointing of the Sick</MenuItem>
                          <MenuItem value="Funeral-Mass">Funeral Mass</MenuItem>
                          <MenuItem value="Outside-Mass">Outside Mass</MenuItem>
                          <MenuItem value="Wake-Mass">Wake Mass</MenuItem>
                          <MenuItem value="Blessing">Blessing</MenuItem>
                          <MenuItem value="Baptismal-Certificate">Baptismal Certificate</MenuItem>
                          <MenuItem value="Wedding-Certificate">Wedding Certificate</MenuItem>
                          </TextField>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button sx={{backgroundColor: '#F5F5F5', color: '#355173', border: '.1px solid', marginTop: { sm: '1.6em' }}}>GENERATE</Button>
                    </Grid>
                </Grid>

                <Box className="md:mt-14 xs:mt-14">
                    <Box sx={{backgroundColor: "#355173", padding: "12px", display: "flex", alignItems: "center", color: 'white', justifyContent: 'space-between' }} className="gap-2">
                        <Typography sx={{ width: '100%', color: 'whitesmoke' }}>{reportDetails.startDate} &nbsp;-&nbsp; {reportDetails.endDate}</Typography>
                        <Typography>Export</Typography>
                        <FontAwesomeIcon icon={faFileExport} className='text-white md:mr-5' />
                        <ReactToPrint trigger={() => (
                                <Button sx={{color: 'white'}}>Print<FontAwesomeIcon icon={faPrint} className='text-white md:mr-5 md:ml-2' /></Button>   
                            )} content={() => componentRef.current}
                        />
                    </Box>
                <Box sx={{border:'solid 1px', maxHeight: '700px', overflowY: 'auto', backgroundColor: '#F5F5F5'}} ref={componentRef}>
                    <Container maxWidth="lg" sx={{backgroundColor: 'white',}}>
                        <StaffReport />
                    </Container>
                </Box>
              </Box>
            </Box>
        </Box>
        
    );
};

export default GenerateReports;
