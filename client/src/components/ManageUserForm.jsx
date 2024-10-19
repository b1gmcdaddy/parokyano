import React, {useState, useEffect} from "react";
import {
  Button,
  TextField,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import config from "../config";

const ManageUserForm = ({userData, onSave, onCancel}) => {
  const [UserFormData, setUserFormData] = useState({
    first_name: "",
    last_name: "",
    user_type: "staff",
    contact_no: "",
    email: "",
    username: "",
    password: "",
    status: "active",
  });

  useEffect(() => {
    if (userData) {
      setUserFormData(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    setUserFormData({...UserFormData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData) {
        await axios.put(
          `${config.API}/user/editUser/${userData.userID}`,
          UserFormData
        );
      } else {
        await axios.post(`${config.API}/user/createUser`, UserFormData);
      }
      onSave();
    } catch (err) {
      console.error("Error saving user", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{display: "flex", flexDirection: "column", gap: 2}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          marginTop: "10px",
        }}>
        <TextField
          label="First Name"
          name="first_name"
          value={UserFormData.first_name}
          fullWidth
          onChange={handleChange}
          required
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={UserFormData.last_name}
          fullWidth
          onChange={handleChange}
          required
        />
      </Box>
      <TextField
        label="Email"
        name="email"
        value={UserFormData.email}
        fullWidth
        onChange={handleChange}
      />
      <TextField
        label="Contact Number"
        name="contact_no"
        value={UserFormData.contact_no}
        fullWidth
        onChange={handleChange}
      />
      <TextField
        label="Username"
        name="username"
        value={UserFormData.username}
        fullWidth
        onChange={handleChange}
        required
      />
      {userData ? (
        <FormControl component="fieldset">
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup
            name="status"
            value={UserFormData.status}
            onChange={handleChange}
            row>
            <FormControlLabel
              value="active"
              control={<Radio />}
              label="Active"
            />
            <FormControlLabel
              value="inactive"
              control={<Radio />}
              label="Inactive"
            />
          </RadioGroup>
        </FormControl>
      ) : (
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          onChange={handleChange}
          required
        />
      )}

      <Box sx={{display: "flex", justifyContent: "flex-end", gap: 2}}>
        <Button
          variant="contained"
          sx={{backgroundColor: "#355173"}}
          type="submit">
          {userData ? "Edit Account" : "Create Account"}
        </Button>
        <Button variant="" sx={{backgroundColor: "#D9D9D9"}} onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ManageUserForm;
