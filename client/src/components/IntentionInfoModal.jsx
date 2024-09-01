import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Dialog, DialogContent, Grid, Divider, Typography, DialogContentText, DialogActions } from '@mui/material';
import axios from 'axios';
import config from "../config";

const SoulsInfoModal = ({open, data, close}) => {

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


const ThanksgivingInfoModal = ({open, data, close}) => {

    const handleChange = (e) => {
        setUserFormData({ ...UserFormData, [e.target.name]: e.target.value });
    };

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

                        <Grid container spacing={1} sx={{height: '180px', padding: '0px 10px', overflowY: 'auto'}}>
                            {data.intention_details.saint != null && (
                                <Grid item xs={12} sm={12}>
                                    <TextField variant='outlined' multiline label='In Honor of Saints' fullWidth value={data.intention_details.saint} inputProps={{readOnly: true}}/>
                                </Grid>
                            )}
                            {data.intention_details.wedding != null && (
                                <Grid item xs={12} sm={12}>
                                    <TextField variant='outlined' multiline label='Wedding Anniversary of' fullWidth value={data.intention_details.wedding} inputProps={{readOnly: true}}/>
                                </Grid>
                            )}
                            {data.intention_details.success != null && (
                                <Grid item xs={12} sm={12}>
                                    <TextField variant='outlined' multiline label='For the success of' fullWidth value={data.intention_details.success} inputProps={{readOnly: true}}/>
                                </Grid>
                            )}
                            {data.intention_details.birthday != null && (
                                <Grid item xs={12} sm={12}>
                                    <TextField variant='outlined' multiline label='For the Birthday of' fullWidth value={data.intention_details.birthday} inputProps={{readOnly: true}}/>
                                </Grid>
                            )}
                            {data.intention_details.others != null && (
                                <Grid item xs={12} sm={12}>
                                    <TextField variant='outlined' multiline label='Others' fullWidth value={data.intention_details.others} inputProps={{readOnly: true}}/>
                                </Grid>
                            )}
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


const PetitionInfoModal = ({open, data, close}) => {

    const handleChange = (e) => {
        setUserFormData({ ...UserFormData, [e.target.name]: e.target.value });
    };

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
                            {data.intention_details != null && (
                                <Grid item xs={12} sm={12}>
                                    <TextField variant='outlined' multiline fullWidth value={data.intention_details} inputProps={{readOnly: true}}/>
                                </Grid>
                            )}
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
    SoulsInfoModal,
    ThanksgivingInfoModal,
    PetitionInfoModal
};
