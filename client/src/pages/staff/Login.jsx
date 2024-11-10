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

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.API}/auth/login`, loginData);

      if (response) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response.data);

        if (response.data.role === "staff" || response.data.role === "admin") {
          navigate("/dashboard", { replace: true });
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials or server issue.");
    }
  };

  return (
    <div>
      <StaffAppBar />
      <Box
        className="bg-neutral-50"
        sx={{
          width: "100%",
          height: "98vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            padding: {  md: 3, xs:  3  },
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <Box
            sx={{
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
          
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { md: "1.55em", xs: "1.25em" },
              textAlign: "center",
            }}
          >
            Gethsemane Parish Church
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: { md: "1.55em" },
              fontSize: { md: "14px", xs: "10px" },
            }}
          >
            Please login to your account
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}{" "}
          {/* Display error if any */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              sx={{ marginBottom: "12px " }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#355173", marginTop: "12px" }}
              type="submit"
            >
              Login
            </Button>
          </form>
          <Typography sx={{ textAlign: "center", marginTop: "16px" }}>
            <button
              type="button"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password?
            </button>
          </Typography>
        </Paper>
      </Box>
    </div>
  );
};

export default Login;
