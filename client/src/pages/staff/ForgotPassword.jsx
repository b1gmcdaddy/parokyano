import React, {useState} from "react";
import StaffAppBar from "../../components/StaffAppBar";
import {Box, Paper, TextField, Button, Typography, Alert} from "@mui/material";
import logo from "../../assets/logo.png";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import config from "../../config";
import emailjs from "@emailjs/browser";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resetToken = Math.random().toString(36).substring(2, 15); // Example token generation
    const res = await axios.post(`${config.API}/auth/request-password-reset`, {
      email: email,
      password: resetToken,
    });

    if (res.status == 200) {
      const resetLink = `Your new password is: ${resetToken}`;

      const templateParams = {
        to_name: "User", // Customize as needed
        reset_link: resetLink,
      };

      try {
        await emailjs.send(
          "service_o2izpe4",
          "template_6undcon",
          templateParams,
          "kJTNEAcM6BA0TgUcJ"
        );

        alert("Password reset email sent! Check your inbox.");
      } catch (err) {
        console.error("Error sending email:", err);
        setError("Failed to send email. Please try again later.");
      }
    }
  };

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
        }}>
        <Box
          sx={{
            position: "absolute",
            top: "8%",
            display: "flex",
            justifyContent: "center",
          }}>
          <img
            src={logo}
            alt="Logo"
            style={{width: "220px", height: "200px"}}
          />
        </Box>
        <Paper
          elevation={2}
          sx={{
            padding: {md: 6, xs: 6},
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: "600px",
            marginTop: "50px",
          }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {md: "1.55em", xs: "1.25em"},
              textAlign: "center",
            }}>
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
              sx={{marginBottom: "12px "}}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{backgroundColor: "#355173", marginTop: "12px"}}
              type="submit">
              Submit
            </Button>
            {message && <p>{message}</p>}
          </form>
          <Typography sx={{textAlign: "center", marginTop: "16px"}}>
            <Button
              type="button"
              onClick={() => {
                navigate("/login");
              }}>
              Switch to Login
            </Button>
          </Typography>
        </Paper>
      </Box>
    </div>
  );
};

export default ForgotPassword;
