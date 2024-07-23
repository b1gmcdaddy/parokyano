import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {DefaultCopyField} from '@eisberg-labs/mui-copy-field';
import { Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import qrCode from '../assets/sampleQRCode.png'


const inputstyling = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            boxShadow: '0 3px 2px rgba(0,0,0,0.1)',
            borderRadius: '20px',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#355173',
            borderWidth: '0.5px'
        },
        '& .MuiInputBase-input': {
            textAlign: 'center',
            fontWeight: 'bold',
            marginLeft: '30px',
            fontSize: '25px'
        },
        '&.Mui-disabled .MuiInputBase-input': {
        color: 'black', 
        WebkitTextFillColor: 'black',
        }
    },
};

const CashPaymentModal = ({open, data}) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/');
    };

    return(
        <>
            <Dialog
                fullWidth
                maxWidth='md'
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
        
                <DialogContent>
                    <Grid container spacing={1} justifyContent={"center"}>
                        <Grid item sm={12}>
                            <Typography variant='h6' sx={{textAlign: 'center'}}>
                                Transaction Number
                            </Typography>
                        </Grid>
                        <Grid item sm={12}>
                            <DefaultCopyField fullWidth disabled value={data.transaction_no} sx={inputstyling}/>
                        </Grid>
                        {(data.fee != null || data.requirements != null) && (
                            <Grid container justifyContent={"center"} sx={{bgcolor:'#E8E8E8', padding: 2, margin: 2}}>
                                <Typography variant='subtitle2' sx={{marginRight: 4}}>
                                    {data.fee != null && (
                                        <p><strong>Amount:</strong></p>
                                    )}
                                    {data.requirements != null && (
                                        <p><strong>Requirements:</strong></p>
                                    )}
                                </Typography>
                                <Typography variant='subtitle2' sx={{textAlign: 'left'}}>
                                    {data.fee != null && (
                                        <p>{data.fee}</p>
                                    )}
                                    {data.requirements != null && data.requirements.map((req, index) => (
                                        <p key={index}>{req}</p>
                                    ))}
                                </Typography>
                            </Grid>
                        )}
                        
                        <Grid item sm={12}>
                            <Typography variant='subtitle1' sx={{textAlign: 'center', color: '#950000'}}>
                                Save the transaction number above to track the status of your request.
                            </Typography>
                        </Grid>
                        <Grid item sm={12}>
                            <Typography variant='subtitle2' sx={{textAlign: 'center', padding: 2}}>
                                {data.message}
                            </Typography>
                        </Grid>
            
                        <Grid item sm={12}>
                            <div className="mt-[1rem] mb-[1rem] flex justify-center">
                                <button className={`text-white py-3 px-3 font-medium shadow-sm rounded-md bg-[#355173]`} onClick={handleClick} type="button">
                                    Go back to Home
                                </button>
                            </div>
                        </Grid>
            
                        <Grid item sm={12}>
                            <Typography variant='subtitle2' sx={{textAlign: 'center'}}>
                                You may call us at (032) 346-9560 / +63969-021-7771 for any concerns.
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
      );
}   

const GCashPaymentModal = ({open, data}) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/');
    };

    return(
        <>
            <Dialog
                fullWidth
                maxWidth='md'
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

            {/* <DialogTitle id="alert-dialog-title">
                <Grid container spacing={1} justifyContent={"center"}>
                    <Grid item>
                        <img src={Check} style={{ width: 50, height: 50 }} className='xs:mx-auto' />
                    </Grid>
                    <Grid item>
                        <Typography variant='h5' sx={{fontWeight: 'bold', marginTop: '10px'}}>
                            Request Submitted
                        </Typography>
                    </Grid>
                </Grid>
            </DialogTitle> */}
        
                <DialogContent>
                    <Grid container spacing={1} justifyContent={"center"}>
                        <Grid item sm={12}>
                            <Typography variant='h6' sx={{textAlign: 'center'}}>
                                Transaction Number
                            </Typography>
                        </Grid>
                        <Grid item sm={12}>
                            <DefaultCopyField fullWidth disabled value={data.transaction_no} sx={inputstyling}/>
                        </Grid>
                        <Grid container justifyContent={"center"} sx={{bgcolor:'#E8E8E8', padding: 2, margin: 2}}>
                            <Typography variant='subtitle2' sx={{marginRight: 4}}>
                                {data.fee !== null && (
                                    <p><strong>Amount:</strong></p>
                                )}
                                {data.requirements != null && (
                                    <p><strong>Requirements:</strong></p>
                                )}
                            </Typography>
                            <Typography variant='subtitle2' sx={{textAlign: 'left'}}>
                                {data.fee !== null && (
                                    <p>{data.fee}</p>
                                )}
                                {data.requirements != null && data.requirements.map((req, index) => (
                                    <p key={index}>{req}</p>
                                ))}
                            </Typography>
                        </Grid>
                        <Grid item sm={12}>
                            <Typography variant='subtitle1' sx={{textAlign: 'center', color: '#950000'}}>
                                Save the transaction number above to track the status of your request.
                            </Typography>
                        </Grid>
                        <Grid item sm={12}>
                            <Typography variant='subtitle2' sx={{textAlign: 'center', padding: 2}}>
                                {data.message}
                            </Typography>
                        </Grid>
                        <Grid container justifyContent={"center"}>
                            <img src={qrCode} alt='qr code' />
                        </Grid>
                        <Grid container justifyContent={"center"}>
                            <Grid item sm={12}>
                                <Typography variant='subtitle1' sx={{textAlign: 'center', color: '#950000'}}>
                                    Enter GCash Reference no.
                                </Typography>
                            </Grid>
                            <Grid item sm={12} sx={{textAlign: 'center'}}>
                                <TextField
                                    placeholder='enter gcash reference no.'
                                />
                            </Grid>
                        </Grid>
                        <Grid item sm={12}>
                            <div className="mt-[1rem] mb-[1rem] flex justify-center">
                                <button className={`text-white py-3 px-3 font-medium shadow-sm rounded-md bg-[#355173]`} onClick={handleClick} type="button">
                                    SUBMIT
                                </button>
                            </div>
                        </Grid>
                        <Grid item sm={12}>
                            <Typography variant='subtitle2' sx={{textAlign: 'center'}}>
                                If you need help, kindly contact our office at (032) 346-9560 / +63969-021-7771 for any concerns.
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
      );
}   

export default {
    CashPaymentModal,
    GCashPaymentModal
} 