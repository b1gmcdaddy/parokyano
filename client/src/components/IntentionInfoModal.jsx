import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Dialog, DialogContent, Grid, Divider, Typography, DialogContentText, DialogActions } from '@mui/material';
import axios from 'axios';
import config from "../config";



const formatTime = (time24) => {
    let [hour, minute] = time24.split(':');
    hour = parseInt(hour);
    const period = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convert hour to 12-hour format
    return `${hour}:${minute} ${period}`;
};

const formatDate = (rawDate) => {
    const formatted = new Date(rawDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return formatted
}

const updatePayment = (id, close) => {
    try {
        axios.put(`${config.API}/request/updateRequest`, null, {
            params: {
                col: 'payment_status',
                val: 'paid',
                col2: 'status',
                val2: 'approved',
                col3: 'requestID',
                val3: id
            }
        })
        alert('updated succesfully')
        close()
    } catch (err) {
        console.error(err)
    }
}



const SoulsInfoModal = ({open, data, close}) => {

   const details = JSON.parse(data.details)
   const schedule = formatTime(data.preferred_time) + ' ,  ' + formatDate(data.preferred_date.slice(0, 10))

    return (
        <Dialog
            fullWidth
            maxWidth='sm'
            open={open}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Grid 
                        sx={{display: 'flex',
                            flexDirection: 'column', 
                            gap: 2, 
                            margin: '10px', 
                        }}>
                        <Typography sx={{textAlign: 'center', fontWeight: 'bold'}}>Mass Intention - SOULS Information</Typography>
                        <label>For the souls of: </label>
                        <Grid container spacing={2} sx={{height: '150px', overflowY: 'auto'}}>
                            {details.map((soul, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <TextField variant='filled' label={index + 1} fullWidth value={soul} inputProps={{readOnly: true}}/>
                                </Grid>
                            ))}
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} sx={{marginTop: '10px'}}>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Offered by:" value={data.requested_by} fullWidth inputProps={{readOnly: true}}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Mass Schedule" value={schedule} fullWidth inputProps={{readOnly: true}}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Donation" value={data.donation} fullWidth inputProps={{readOnly: true}}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Payment Method" value={data.payment_method} fullWidth inputProps={{readOnly: true}}/>
                            </Grid>
                        </Grid>
                        <Typography fontSize={'medium'} sx={{textAlign: 'center'}}>Transaction no: {data.transaction_no}</Typography>
                        {data.status === 'paid' && (
                            <Typography fontSize={'small'} sx={{textAlign: 'center'}}>Approved by: dummyDataStaffName</Typography>
                        )}
                        <DialogActions>
                            <Grid container spacing={2}  sx={{justifyContent: 'center', alignItems: 'center'}}>
                                {data.payment_status === 'unpaid' && (
                                    <Grid item xs={12} sm={6}>
                                        <Button variant='contained' onClick={() => updatePayment(data.requestID, close)}>
                                            Mark as Paid
                                        </Button>
                                    </Grid>
                                )}  
                                <Grid item xs={12} sm={'auto'}>
                                    <Button variant='contained' color='error' onClick={close}>
                                        Close
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>  
    );
};


const ThanksgivingInfoModal = ({open, data, close}) => {

    const details = JSON.parse(data.details)

    const schedule = formatTime(data.preferred_time) + ' ,  ' + formatDate(data.preferred_date.slice(0, 10))

    return (
        <Dialog
            fullWidth
            maxWidth='md'
            open={open}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2}}>
                    <Grid 
                        sx={{display: 'flex',
                            flexDirection: 'column', 
                            gap: 2, 
                            margin: '10px', 
                        }}>
                        <Typography sx={{textAlign: 'center', fontWeight: 'bold'}}>Mass Intention - THANKSGIVING Information</Typography>
                        <label>Thanksgiving for: </label>

                        <Grid container spacing={1} sx={{display: 'flex', padding: '0px 10px', overflowY: 'auto'}}>
                            {details.saint != null && (
                                <Grid item xs={12} sm={12}>
                                    <TextField variant='outlined' multiline label='In Honor of Saints' fullWidth value={details.saint} inputProps={{readOnly: true}}/>
                                </Grid>
                            )}
                            {details.wedding != null && (
                                <Grid item xs={12} sm={12}>
                                    <TextField variant='outlined' multiline label='Wedding Anniversary of' fullWidth value={details.wedding} inputProps={{readOnly: true}}/>
                                </Grid>
                            )}
                            {details.success != null && (
                                <Grid item xs={12} sm={12}>
                                    <TextField variant='outlined' multiline label='For the success of' fullWidth value={details.success} inputProps={{readOnly: true}}/>
                                </Grid>
                            )}
                            {details.birthday != null && (
                                <Grid item xs={12} sm={12}>
                                    <TextField variant='outlined' multiline label='For the Birthday of' fullWidth value={details.birthday} inputProps={{readOnly: true}}/>
                                </Grid>
                            )}
                            {details.others != null && (
                                <Grid item xs={12} sm={12}>
                                    <TextField variant='outlined' multiline label='Others' fullWidth value={details.others} inputProps={{readOnly: true}}/>
                                </Grid>
                            )}
                        </Grid>

                        <Divider />

                        <Grid container spacing={2} sx={{marginTop: '10px'}}>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Offered by:" value={data.requested_by} fullWidth inputProps={{readOnly: true}}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Mass Schedule" value={schedule} fullWidth inputProps={{readOnly: true}}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Donation" value={data.donation} fullWidth inputProps={{readOnly: true}}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Payment Method" value={data.payment_method} fullWidth inputProps={{readOnly: true}}/>
                            </Grid>
                        </Grid>
                        
                        <Typography fontSize={'medium'} sx={{textAlign: 'center'}}>Transaction no: {data.transaction_no}</Typography>
                        {data.status === 'paid' && (
                            <Typography fontSize={'small'} sx={{textAlign: 'center'}}>Approved by: dummyDataStaffName</Typography>
                        )}
                        <DialogActions>
                            <Grid container spacing={2}  sx={{justifyContent: 'center', alignItems: 'center'}}>
                                {data.payment_status === 'unpaid' && (
                                    <Grid item xs={12} sm={6}>
                                        <Button variant='contained' onClick={() => updatePayment(data.requestID, close)}>
                                            Mark as Paid
                                        </Button>
                                    </Grid>
                                )}  
                                <Grid item xs={12} sm={'auto'}>
                                    <Button variant='contained' color='error' onClick={close}>
                                        Close
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>  
    );
};


const PetitionInfoModal = ({open, data, close}) => {

    const details = JSON.parse(data.details)
    const schedule = formatTime(data.preferred_time) + ' ,  ' + formatDate(data.preferred_date.slice(0, 10))

    return (
        <Dialog
            fullWidth
            maxWidth='md'
            open={open}
            onClose={close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2}}>
                    <Grid 
                        sx={{display: 'flex',
                            flexDirection: 'column', 
                            gap: 2, 
                            margin: '10px', 
                        }}>
                        <Typography sx={{textAlign: 'center', fontWeight: 'bold'}}>Mass Intention - THANKSGIVING Information</Typography>
                        <label>Petition: </label>

                        <Grid container spacing={1} sx={{height: 'auto', padding: '0px 10px', overflowY: 'auto'}}>
                            <Grid item xs={12} sm={12}>
                                <TextField variant='outlined' multiline fullWidth value={details} inputProps={{readOnly: true}}/>
                            </Grid>
                        </Grid>

                        <Divider />

                        <Grid container spacing={2} sx={{marginTop: '10px'}}>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Offered by:" value={data.requested_by} fullWidth inputProps={{readOnly: true}}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Mass Schedule" value={schedule} fullWidth inputProps={{readOnly: true}}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Donation" value={'100'} fullWidth inputProps={{readOnly: true}}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Payment Method" value={data.payment_method} fullWidth inputProps={{readOnly: true}}/>
                            </Grid>
                        </Grid>
                        <Typography fontSize={'medium'} sx={{textAlign: 'center'}}>Transaction no: {data.transaction_no}</Typography>
                        {data.status === 'paid' && (
                            <Typography fontSize={'small'} sx={{textAlign: 'center'}}>Approved by: dummyDataStaffName</Typography>
                        )}
                        <DialogActions>
                            <Grid container spacing={2}  sx={{justifyContent: 'center', alignItems: 'center'}}>
                                {data.payment_status === 'unpaid' && (
                                    <Grid item xs={12} sm={6}>
                                        <Button variant='contained' onClick={() => updatePayment(data.requestID, close)}>
                                            Mark as Paid
                                        </Button>
                                    </Grid>
                                )}  
                                <Grid item xs={12} sm={'auto'}>
                                    <Button variant='contained' color='error' onClick={close}>
                                        Close
                                    </Button>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>  
    );
};

export default {
    SoulsInfoModal,
    ThanksgivingInfoModal,
    PetitionInfoModal
};
