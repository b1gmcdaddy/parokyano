import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Dialog, DialogContent, Grid, Divider, Typography, DialogContentText, DialogActions } from '@mui/material';
import axios from 'axios';
import config from "../config";

const SoulsInfoModal = ({open, data, close}) => {

    useEffect(() => {
        // const response = axios.get(`${config.API}/request/retrieve`, {
        //     params: {
        //         col: 'transaction_no',
        //         val: tran_no
        //     }
        // })
    })

    const handleChange = (e) => {
        setUserFormData({ ...UserFormData, [e.target.name]: e.target.value });
    };

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
                            {data.intention_details.map((soul, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <TextField variant='filled' label={index + 1} fullWidth value={soul} inputProps={{readOnly: true}}/>
                                </Grid>
                            ))}
                        </Grid>
                        <Divider />
                        <Grid container spacing={2} sx={{marginTop: '10px'}}>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Offered by:" value={data.offered_by} fullWidth inputProps={{readOnly: true}}/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Mass Schedule" value={'M W 1-3'} fullWidth inputProps={{readOnly: true}}/>
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
                                {data.status === 'unpaid' && (
                                    <Grid item xs={12} sm={6}>
                                        <Button variant='contained'>
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
    SoulsInfoModal
};
