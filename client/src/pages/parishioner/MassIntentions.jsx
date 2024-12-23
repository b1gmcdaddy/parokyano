import React from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from "../../assets/imageHeader.jpg";
import wake from "../../assets/thanksgiving.jpg";
import outside from "../../assets/outsidemass.jpg";
import funeral from "../../assets/petition.jpg";
import Header from "../../components/Header";
import { Grid, Box } from "@mui/material";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SelectorCard from "../../components/SelectionCard";

const containerStyle = {
  margin: "0px",
  padding: "0px",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  minWidth: "100%",
};

const MassIntentions = () => {
  return (
    <Box sx={containerStyle}>
      <NavParishioner />
      <Header
        backgroundImage={imageHeader}
        title="Gethsemane Parish Pastoral Center"
      />
      <div className="max-w-[1440px] mt-6">
        <Link to="/" className="mt-8 md:mb-10 items-center">
          <FontAwesomeIcon icon={faArrowLeftLong} className="ml-8 md:mr-2" />
          <p className="hidden md:inline">Return to Home</p>
        </Link>
      </div>
      <h1 align="center" className="font-bold text-xl font-[Arial]">
        Choose a Type of Mass Intention
      </h1>

      <Grid
        container
        spacing={3}
        padding={5}
        justifyContent={"center"}
        sx={{ marginBottom: "50px" }}
      >
        <SelectorCard
          cardImg={wake}
          serviceName={"Thanksgiving"}
          path={"/mass-intention-thanksgiving"}
        />
        <SelectorCard
          cardImg={funeral}
          serviceName={"Petition"}
          path={"/mass-intention-petition"}
        />
        <SelectorCard
          cardImg={outside}
          serviceName={"Souls"}
          path={"/mass-intention-souls"}
        />
      </Grid>
      <Footer />
    </Box>
  );
};

export default MassIntentions;
