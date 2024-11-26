import React, {useEffect, useState} from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from "../../assets/imageHeader.jpg";
import logo from "../../assets/logoCert.png";
import Footer from "../../components/Footer";
import {
  Typography,
  Grid,
  Container,
  Box,
  Paper,
  TextField,
  Snackbar,
  Alert,
  AlertTitle,
  Button,
} from "@mui/material";

import {DefaultCopyField} from "@eisberg-labs/mui-copy-field";
import config from "../../config";
import axios from "axios";
import Header from "../../components/Header";

const inputstyling = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      boxShadow: "0 3px 2px rgba(0,0,0,0.1)",
      borderRadius: "3px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#355173",
      borderWidth: "0.5px",
    },
    "& .MuiInputBase-input": {
      fontWeight: "bold",
      marginLeft: "30px",
      fontSize: "18px",
      padding: "12px 0px 12px 0px",
    },
    "&.Mui-disabled .MuiInputBase-input": {
      color: "black",
      WebkitTextFillColor: "black",
    },
  },
};

const contactNumberSplit = (contact) => {
  const lastFour = contact.slice(-4);
  const beforeLastFour = contact.slice(0, -4).replace(/\d/g, "*");
  return beforeLastFour + lastFour;
};

const TrackRequest = () => {
  const [request, setRequest] = useState(null);
  const [service, setService] = useState({});
  const [activity, setActivity] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  const fetchService = async (id) => {
    try {
      const response = await axios.get(
        `${config.API}/service/retrieveByParams`,
        {
          params: {id},
        }
      );
      setService(response.data);
    } catch (err) {
      console.error("Error fetching service:", err);
    }
  };

  const fetchActivity = async (id) => {
    try {
      const response = await axios.get(`${config.API}/logs/retrieveAll`, {
        params: {id},
      });
      setActivity(response.data.result);
    } catch (err) {
      console.error("Error fetching activity:", err);
    }
  };

  useEffect(() => {
    if (request) {
      fetchService(request.service_id);
      fetchActivity(request.requestID);
    }
  }, [request]);

  const statusStyling =
    request?.status === "approved"
      ? {color: "green"}
      : request?.status === "cancelled"
      ? {color: "red"}
      : {color: "orange"};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${config.API}/request/retrieve`, {
        params: {col: "transaction_no", val: input},
      });
      if (
        response.data &&
        Array.isArray(response.data.result) &&
        response.data.result.length > 0
      ) {
        setRequest(response.data.result[0]);
      } else {
        setError({
          message:
            "The transaction code you provided is invalid or does not exist.",
          details: "Please input another transaction code.",
        });
        setRequest(null);
      }
    } catch (err) {
      console.error("Transaction code is wrong or does not exist:", err);
      setError({
        message: "Transaction code is wrong or does not exist.",
        details: "Please try again later.",
      });
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <>
      {error !== null && (
        <Snackbar
          anchorOrigin={{vertical: "top", horizontal: "center"}}
          open={true}
          autoHideDuration={5000}
          onClose={() => setError(null)}>
          <Alert severity="error" sx={{width: "100%"}}>
            <AlertTitle>{error.message}</AlertTitle>
            {error.details}
          </Alert>
        </Snackbar>
      )}
      <NavParishioner />
      <Box
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}>
        <Header
          backgroundImage={imageHeader}
          title="Track Status of Request"
          instruction="Input your transaction number below"
        />
        <Container maxWidth="lg" sx={{mt: 5}}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                elevation={4}
                sx={{
                  height: {md: "140px", xs: "auto"},
                  backgroundColor: "whitesmoke",
                  display: "flex",
                  alignItems: "center",
                  padding: {xs: "20px", md: "40px"},
                }}>
                <Grid
                  container
                  spacing={4}
                  justifyContent="center"
                  alignItems="center">
                  <Grid item xs={12} md={5}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 5,
                        flexDirection: {xs: "column", md: "row"},
                        textAlign: {xs: "center", md: "left"},
                      }}>
                      <img src={logo} className="h-auto md:w-20 xs:w-14" />
                      <div>
                        <Typography
                          sx={{
                            fontSize: {md: "16px", xs: "14px"},
                            fontFamily: "Palatino",
                          }}>
                          Catholic Church of Christ of the Agony
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: {md: "1rem", xs: "0.9rem"},
                            fontFamily: "Tahoma, sans-serif",
                            fontWeight: "900",
                          }}>
                          GETHSEMANE PARISH CHURCH
                        </Typography>
                      </div>
                    </div>
                  </Grid>

                  {/* Right section with input field and button */}
                  <Grid
                    item
                    xs={12}
                    md={7}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "auto",
                      height: "100%",
                    }}>
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        flexDirection: {xs: "column", md: "row"},
                      }}>
                      <TextField
                        label="Input your Transaction Number"
                        variant="standard"
                        fullWidth
                        sx={{
                          width: {md: "60%", xs: "100%"},
                          marginLeft: {md: 0, sm: 5},
                          marginBottom: {xs: 2, md: 0},
                        }}
                        value={input}
                        onChange={handleInputChange}
                      />
                      <Button variant="outlined" onClick={handleSubmit}>
                        CONFIRM
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {request && (
              <>
                <Grid item xs={12} md={5}>
                  <Paper
                    elevation={8}
                    sx={{
                      padding: 4,
                      height: "400px",
                    }}>
                    <Typography variant="h6" sx={{marginBottom: "0.5em"}}>
                      Transaction No.
                    </Typography>
                    <DefaultCopyField
                      fullWidth
                      disabled
                      value={request.transaction_no}
                      sx={inputstyling}
                      inputProps={{
                        style: {textAlign: "center"},
                      }}
                    />

                    <Typography
                      variant="body1"
                      sx={{
                        marginTop: "40px",
                        marginBottom: "10px",
                        fontWeight: "bold",
                      }}>
                      Request Information
                    </Typography>

                    <div>
                      <div className="flex justify-between md:mb-3">
                        <Typography variant="body1">
                          Service Requested:
                        </Typography>
                        <Typography variant="body1">{service?.name}</Typography>
                      </div>

                      <div className="flex justify-between md:mb-3">
                        <Typography variant="body1">Requested By:</Typography>
                        <Typography variant="body1">
                          {request.service_id === 2 ||
                          request.service_id === 3 ||
                          request.service_id === 4 ||
                          request.service_id === 7
                            ? request.first_name + " " + request.last_name
                            : request.service_id === 5 ||
                              request.service_id === 6
                            ? request.father_name
                            : request.requested_by}
                        </Typography>
                      </div>

                      <div className="flex justify-between">
                        <Typography variant="body1">Contact Number:</Typography>
                        <Typography variant="body1">
                          {contactNumberSplit(request.contact_no)}
                        </Typography>
                      </div>
                    </div>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={7}>
                  <Paper
                    elevation={6}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: {xs: 2, sm: 4}, // Adjust padding for small screens
                      height: "400px",

                      position: "relative",
                    }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        fontSize: {xs: "20px", sm: "28px"}, // Adjust font size for smaller screens
                        position: "absolute",
                        top: 15,
                        left: 25,
                        ...statusStyling,
                      }}>
                      {request.status.toLowerCase() === "approved"
                        ? "APPROVED"
                        : request.status.toLowerCase() === "pending"
                        ? "PENDING"
                        : request.status.toLowerCase() === "cancelled"
                        ? "CANCELLED"
                        : "FINISHED"}
                    </Typography>

                    <div className="mt-5 w-full h-3/4 overflow-y-auto">
                      <div
                        className="flex gap-x-3"
                        style={{
                          flexDirection: {xs: "column", sm: "row"},
                          overflowY: "auto",
                        }}>
                        <div className="w-28 text-end">
                          <Typography>
                            {request.date_requested.substring(0, 10)}
                          </Typography>
                        </div>

                        <div
                          className={`relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-300 ${
                            request.status.toLowerCase() === "pending" ||
                            activity == null
                              ? "after:hidden"
                              : ""
                          }`}>
                          <div className="relative z-10 size-7 flex justify-center items-center">
                            <div className="size-2 rounded-full bg-gray-900"></div>
                          </div>
                        </div>

                        <div className="grow pt-0.5 pb-8">
                          <Typography
                            sx={{
                              display: "flex",
                              gap: 2,
                              fontFamily: "Arial",
                            }}>
                            Request Submitted
                          </Typography>

                          <p className="mt-1 text-sm text-gray-600">
                            The request was successfully submitted.
                          </p>
                        </div>
                      </div>

                      {activity.map((item, index) => (
                        <div
                          className="flex gap-x-3"
                          key={item.logID}
                          style={{flexDirection: {xs: "column", sm: "row"}}}>
                          <div className="w-28 text-end">
                            <Typography>
                              {item.date.substring(0, 10)}
                            </Typography>
                          </div>

                          <div
                            className={`relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-300 ${
                              index === activity.length - 1
                                ? "after:hidden"
                                : ""
                            }`}>
                            <div className="relative z-10 size-7 flex justify-center items-center">
                              <div className="size-2 rounded-full bg-gray-800"></div>
                            </div>
                          </div>

                          <div className="grow pt-0.5 pb-8">
                            <Typography
                              sx={{
                                display: "flex",
                                gap: 2,
                                fontFamily: "Arial",
                              }}>
                              {item.activity.split("-")[0]}
                            </Typography>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Paper>
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default TrackRequest;
