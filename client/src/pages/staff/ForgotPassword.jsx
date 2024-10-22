import React, { useState } from "react";
import StaffAppBar from "../../components/StaffAppBar";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {};

  return (
    <div>
      <StaffAppBar />
      <Box
        className="bg-neutral-50"
        sx={{
          width: "100%",
          height: "93vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "8%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "220px", height: "200px" }}
          />
        </Box>
        <Paper
          elevation={2}
          sx={{
            padding: { md: 6, xs: 6 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: "600px",
            marginTop: "50px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { md: "1.55em", xs: "1.25em" },
              textAlign: "center",
            }}
          >
            Forgot Password
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}{" "}
          {/* Display error if any */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              placeholder="Enter your email"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              sx={{ marginBottom: "12px " }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#355173", marginTop: "12px" }}
              type="submit"
            >
              Submit
            </Button>
          </form>
          <Typography sx={{ textAlign: "center", marginTop: "16px" }}>
            Switch to Login
          </Typography>
        </Paper>
      </Box>
    </div>
  );
};

export default ForgotPassword;
