import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const RequestNotice = ({ open, onClose, reqUrl }) => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (isChecked) {
      onClose();
      navigate(reqUrl);
    }
  };

  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <div className='md:flex items-center md:ml-8'>
          <img src={logo} style={{ width: 100, height: 100 }} className='xs:mx-auto' />
          <h1 className='font-bold leading-tight' style={{color:'#355173'}}>Catholic Church of Christ of the Agony - Gethsemane Church</h1>
        </div>
      </DialogTitle>

      <DialogContent>
        <Box id="alert-dialog-description">
          <h1 className='text-center text-lg font-medium mb-3'>Service Request Notice</h1>
          <h3 className='text-center px-3'>Welcome to Gethsemane Parish!<br/>
          If you are a non-parishioner, you will need to obtain a parish permit
          from the parish where you reside. To acquire a parish permit:</h3>
          <ol className='mt-3 px-4 text-justify mb-3'>
            <li className='font-bold'>1. Contact Your Local Parish Office</li>
            <p>&nbsp;&nbsp;&nbsp;Visit or call the parish office in the area where you reside, specifically the area where you are registered as a voter. 
            Explain that you need a parish permit to avail services at Gethsemane Parish.</p>
            <li className='font-bold mt-5'>2. Provide Necessary Information</li>
            <p>&nbsp;&nbsp;&nbsp;Be prepared to provide your personal details (name, address, contact information). Specify 
                the service you wish to avail at Gethsemane Parish. 
                You may need to submit certain documents for verification, such as proof of 
                residence and identification. Your local parish may have specific requirements, 
                so ask them for a complete list of needed documents.</p>
            <li className='font-bold mt-5'>3. Submit the Parish Permit to Gethsemane Parish</li>
            <p>&nbsp;&nbsp;&nbsp;Bring it to our parish office in person. Upon verification of the permit, you will be able 
            to proceed with your service request.</p>
          </ol>
        </Box>
        <FormGroup style={{ justifyContent: 'center', alignItems: 'center' }}>
          <FormControlLabel
            control={<Checkbox checked={isChecked} onChange={() => setIsChecked(event.target.checked)} />}
            label="I have read and understood this policy statement"
            style={{ fontFamily: 'tahoma' }}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleContinue} disabled={!isChecked}>Continue</Button>
        <Button onClick={onClose}>Exit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RequestNotice;
