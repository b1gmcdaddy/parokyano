import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from "../../assets/imageHeader.jpg";
import Footer from "../../components/Footer";
import {Box, Typography, Button, Snackbar} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import {Link} from "react-router-dom";
import axios from "axios";
import config from "../../config";

const pageContainerStyle = {
  margin: "0px",
  padding: "0px",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  minWidth: "100%",
};

const containerStyle = {
  backgroundImage: `url(${imageHeader})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  position: "relative",
};

const overlayStyle = {
  backgroundColor: "rgba(255, 255, 245, 0.75)",
};

const TrackStatus = () => {
  const [error, setError] = useState({});
  const [captchaValue, setCaptchaValue] = useState(null);
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  const isCaptchaChecked = captchaValue !== null;
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${config.API}/request/retrieve`, {
        params: {
          col: "transaction_no",
          val: input.transaction_no,
        },
      });
      if (
        response.data &&
        Array.isArray(response.data.result) &&
        response.data.result.length > 0
      ) {
        navigate("/track-request", {state: {requestData: response.data}});
      } else {
        setError({
          message:
            "The transaction code you provided is invalid or does not exist.",
          details: "Please input another transaction code.",
        });
      }
    } catch (err) {
      console.error("Transaction code is wrong or does not exist: ", err);
    }
  };

  return (
    <>
      {error && (
        <Snackbar
          open={true}
          autoHideDuration={5000}
          onClose={() => setError(null)}
          message={
            <>
              <span style={{fontWeight: "bold", fontSize: "18px"}}>
                {error.message}
              </span>
              <p>{error.details}</p>
            </>
          }
        />
      )}
      <Box sx={pageContainerStyle}>
        <NavParishioner />
        <div style={containerStyle}>
          <div
            style={overlayStyle}
            className="absolute top-56 w-full p-14 text-center z-0 ">
            <div className="z-10 mx-auto">
              <h1 className="md:text-4xl font-bold mb-5">
                Track Status of Request
              </h1>
              <p>
                Enter your transaction code below to see the status of your
                request
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  name="transaction_no"
                  type="text"
                  onChange={handleChange}
                  className="border-slate-700 rounded-md mt-10 shadow-md shadow-slate-600 md:py-3 md:px-48 text-center focus:outline-none"
                  style={{borderWidth: "0.1px"}}
                  placeholder="e.g. 2024-10-270f8e1172fb76203522b4"
                />
                <div className="mt-10 flex justify-center">
                  <ReCAPTCHA
                    sitekey="6LeCEPMpAAAAANAqLQ48wTuNOGmTPaHcMxJh4xaJ"
                    onChange={handleCaptchaChange}
                  />
                </div>
                <div className="mt-5 flex justify-center">
                  <Button
                    variant="contained"
                    sx={{backgroundColor: "#355173"}}
                    disabled={!isCaptchaChecked}
                    type="submit">
                    Confirm
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </Box>
    </>
  );
};

export default TrackStatus;
