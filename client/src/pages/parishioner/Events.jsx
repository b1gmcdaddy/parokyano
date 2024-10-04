import {
  Grid,
  Box,
  Card,
  Typography,
  CardContent,
  IconButton,
  Collapse,
  CardActions,
} from "@mui/material";
import AnnouncementCard from "../../components/AnnouncementCard";
import imageHeader from "../../assets/imageHeader.jpg";
import NavParishioner from "../../components/NavParishioner";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { React, useEffect, useState } from "react";
import config from "../../config";
import axios from "axios";

const Events = () => {
  const [announcement, setAnnouncement] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          `${config.API}/announcement/retrieve-all`
        );
        setAnnouncement(response.data);
      } catch (err) {
        console.error("error retrieving from server", err);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <>
      <NavParishioner />
      <Header
        title="Gethsemane Parish Pastoral Center"
        backgroundImage={imageHeader}
      />
      <Grid spacing={2} container justifyContent={"center"} sx={{ margin: 5 }}>
        {announcement != null &&
          announcement.map((event, index) => (
            <Grid item key={index}>
              <AnnouncementCard
                title={event.title}
                date_announced={event.date_announced}
                description={event.description}
              />
            </Grid>
          ))}
      </Grid>
      <Footer />
    </>
  );
};

export default Events;
