import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import config from "../config";

const ManageUserForm = ({ onSave, onCancel }) => {

      const [UserFormData, setUserFormData] = useState({
        first_name: '',           
        last_name: '',
        user_type: 'staff',
        contact_no: '',
        email: '',
        username: '',
        password: '',
        status: 'active'
    })

    const handleChange = (e) => {
        setFormData({...UserFormData, [e.target.name]: e.target.value})
    }

    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2, marginTop: '10px'}}>
            <TextField label="First Name" fullWidth required />
            <TextField label="Last Name" fullWidth required />
            </Box>
            <TextField label="Email"  />
            <TextField label="Contact Number"  />
            <TextField label="Username" required />
            <TextField label="Password" required />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="contained" sx={{backgroundColor: '#355173'}} type="submit">Create Account</Button>
                <Button variant="" sx={{backgroundColor: '#D9D9D9'}} onClick={onCancel}>Cancel</Button>
            </Box>

        </Box>
    );
};

export default ManageUserForm;
