import React, {useState} from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from "../../assets/imageHeader.jpg";
import massSchedules from "../../assets/massSchedules.jpeg";
import schedules from "../../assets/schedules.jpg";
import about from "../../assets/about.jpg";
import carousel1 from "../../assets/carousel1.jpg";
import carousel2 from "../../assets/carousel2.jpg";
import carousel3 from "../../assets/carousel3.jpg";
import directions from "../../assets/directions.jpeg";
import contact from "../../assets/contact.jpeg";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  Grid,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import {blue, lightBlue} from "@mui/material/colors";

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState("");
  const slides = [
    {
      url: carousel1,
    },
    {
      url: carousel2,
    },
    {
      url: carousel3,
    },
  ];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const handleOpen = (type) => {
    setOpenModal(true);
    setData(type);
  };

  return (
    <>
      <NavParishioner />
      <Header
        backgroundImage={imageHeader}
        title="GETHSEMANE PARISH"
        instruction=""
      />

      <Container
        sx={{maxWidth: "1240px", marginX: "auto", marginY: {md: "4em"}}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <img
              className="mx-auto shadow-md shadow-gray-500 rounded-md"
              src={about}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">About Gethsemane Parish</Typography>
            <div className="w-[120px] h-[4px] bg-[#355173] rounded-md my-2"></div>
            <Typography sx={{textAlign: "justify", marginY: "1.5em"}}>
              More widely known as Gethsemane Parish, the Catholic Church of
              Christ of the Agony was canonically erected as a parish on June 7,
              1978, by then Archbishop of Cebu Julio Cardinal Rosales. The
              center of the parish is the church known for its modern
              architectural design by the artist, architect, priest the late
              Msgr. Virgilio Yap. It is located along L. Cabrera Street,
              Casuntingan, Mandaue City. 
            </Typography>
            <Typography variant="h6" sx={{marginBottom: "0.5em"}}>
              Catholic Church of Christ of the Agony
            </Typography>
            <Typography sx={{fontStyle: "italic", textAlign: "justify"}}>
              "Then Jesus came with them into a country place which is called
              Gethsemane; and he said to his disciples: Sit you here, till I go
              yonder and pray." (Matthew 26:36)
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <div className="relative max-w-[1240px] m-auto mt-14">
        <div
          style={{backgroundImage: `url(${slides[currentIndex].url})`}}
          className=" h-[320px] rounded-md bg-center bg-cover duration-500"></div>

        <div
          onClick={prevSlide}
          className="absolute top-[50%] left-5 transform -translate-y-1/2 rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <NavigateBeforeRoundedIcon sx={{width: 40, height: 40}} />
        </div>

        <div
          onClick={nextSlide}
          className="absolute top-[50%] right-5 transform -translate-y-1/2 rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <NavigateNextRoundedIcon sx={{width: 40, height: 40}} />
        </div>

        <div className="flex top-4 justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`w-2 h-2 mx-1 rounded-full cursor-pointer ${
                currentIndex === slideIndex ? "bg-white" : "bg-gray-500"
              }`}></div>
          ))}
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto my-16">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4} style={{position: "relative"}}>
            <Card>
              <CardActionArea onClick={() => handleOpen("schedules")}>
                <CardMedia
                  component="img"
                  image={massSchedules}
                  sx={{height: 250}}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Mass Schedules
                  </Typography>
                  <Typography variant="body2" sx={{color: "text.secondary"}}>
                    Click to View Details
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} style={{position: "relative"}}>
            <Card>
              <CardActionArea onClick={() => handleOpen("directions")}>
                <CardMedia
                  component="img"
                  image={directions}
                  sx={{height: 250}}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    How to Visit
                  </Typography>
                  <Typography variant="body2" sx={{color: "text.secondary"}}>
                    Click to View Details
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} style={{position: "relative"}}>
            {" "}
            <Card>
              <CardActionArea onClick={() => handleOpen("contact")}>
                <CardMedia component="img" image={contact} sx={{height: 250}} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Contact Details
                  </Typography>
                  <Typography variant="body2" sx={{color: "text.secondary"}}>
                    Click to View Details
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
      <CardModals
        open={openModal}
        data={data}
        close={() => setOpenModal(false)}
      />
      <Footer />
    </>
  );
};

const CardModals = ({open, close, data}) => {
  return (
    <Dialog
      onClose={close}
      maxWidth={data == "schedules" ? "lg" : "sm"}
      aria-labelledby="customized-dialog-title"
      open={open}>
      <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
        {data === "schedules"
          ? "Mass Schedules"
          : data === "directions"
          ? "How to Visit"
          : "Contact Details"}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={close} // This should call close, which is passed as a prop
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}>
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {data === "schedules" && (
          <Typography gutterBottom>
            <img src={schedules} style={{width: "auto", height: "auto"}} />
          </Typography>
        )}
        {data === "directions" && (
          <Typography gutterBottom>
            For those interested in visiting the church, you can ride a jeepney
            heading to the North Bus Terminal and get off at the corner of A. S.
            Fortuna Street. From here, you can take a stroll or ride a pedicab,
            tricycle, or habal-habal motorcycle to the Gethsemane Church. <br />
            <br />
            If you’re coming from downtown Cebu City, you can ride a jeepney
            with code 01k and get off along the A. Soriano Avenue. From here,
            you can transfer to another jeepney headed to Consolacion or Liloan.
            Once you reach the corner to A.S. Fortuna Street, get off and ride a
            jeep with code 22I. After a five-minute ride, get off and find a
            tricycle or pedicab to take you to the parish.
            <br />
            <br />
            You may also view the Maps location through this link: <br />
            <a
              href="https://www.waze.com/live-map/directions/gethsemane-parish-l.c.-cabrera-mandaue?to=place.w.81199207.812188682.2356473"
              target="_blank"
              rel="noopener noreferrer"
              style={{color: "#1976d2", textDecoration: "underline"}}>
              Gethsemane Parish on Waze Maps
            </a>
          </Typography>
        )}
        {data === "contact" && (
          <Typography gutterBottom>
            Telephone Number: (032) 346-9650 <br />
            <br />
            You may also reach us through our official Facebook Page: <br />
            <a
              href="https://www.facebook.com/@gethsemaneparish1978/"
              target="_blank"
              rel="noopener noreferrer"
              style={{color: "#1976d2", textDecoration: "underline"}}>
              Gethsemane Parish Official FB Page
            </a>
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={close}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default About;
