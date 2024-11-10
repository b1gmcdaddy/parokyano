import React, {useEffect, useState} from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from "../../assets/imageHeader.jpg";
import Footer from "../../components/Footer";
import {Typography, Grid, Container, Box, Paper} from "@mui/material";
import {DefaultCopyField} from "@eisberg-labs/mui-copy-field";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import config from "../../config";
import axios from "axios";

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
      padding: "12px",
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
  const locate = useLocation();
  const request = locate.state.requestData?.result[0];
  const [service, setService] = useState({});
  const [activity, setActivity] = useState({});
  console.log(request);

  const fetchService = async (id) => {
    try {
      const response = await axios.get(
        `${config.API}/service/retrieveByParams`,
        {
          params: {
            id: id,
          },
        }
      );
      console.log(response.data);
      setService(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchActivity = async (id) => {
    try {
      const response = await axios.get(`${config.API}/logs/retrieveAll`, {
        params: {
          id: id,
        },
      });
      console.log(response.data);
      setActivity(response.data.result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchService(request.service_id);
    fetchActivity(request.requestID);
  }, [request]);

  useEffect(() => {
    console.log(service);
  }, [service]);

  const statusStyling =
    request.status === "approved"
      ? {color: "green"}
      : request.status === "cancelled"
      ? {color: "red"}
      : {color: "orange"};

  return (
    <>
      <NavParishioner />
      <Box
        sx={{
          backgroundImage: `url(${imageHeader})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          paddingTop: 8,
          paddingBottom: 8,
        }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={5}>
              <Paper elevation={3} sx={{padding: 4}}>
                <Typography
                  gutterBottom
                  sx={{textAlign: "center", fontSize: "18px"}}>
                  Transaction No.
                </Typography>
                <DefaultCopyField
                  fullWidth
                  disabled
                  value={request.transaction_no}
                  sx={inputstyling}
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
                    <Typography variant="body1">Service Requested:</Typography>
                    <Typography variant="body1">{service?.name}</Typography>
                  </div>

                  <div className="flex justify-between md:mb-3">
                    <Typography variant="body1">Requested By:</Typography>
                    <Typography variant="body1">
                      {request.requested_by}
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
              <Paper elevation={3} sx={{padding: 4}}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    fontSize: "28px",
                    ...statusStyling,
                  }}>
                  {request.status.toLowerCase() == "approved"
                    ? "APPROVED"
                    : request.status.toLowerCase() == "pending"
                    ? "PENDING"
                    : request.status.toLowerCase() == "cancelled"
                    ? "CANCELLED"
                    : "FINISHED"}
                </Typography>

                {activity.length > 0 ? (
                  activity.map((item) => (
                    <div
                      key={item.logID}
                      className="md:mt-8 md:flex justify-between p-8">
                      <Typography>{item.date.substring(0, 10)}</Typography>
                      <Typography>{item.activity.split("-")[0]}</Typography>
                    </div>
                  ))
                ) : (
                  <div>loading..</div>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default TrackRequest;
