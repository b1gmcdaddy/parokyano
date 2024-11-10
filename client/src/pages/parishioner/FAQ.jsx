import React, {useState} from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from "../../assets/imageHeader.jpg";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "../../components/Footer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {Box} from "@mui/material";

const sampleFAQs = [
  {
    title: "How to Request for Services?",
    content:
      "Go to the Services Page. Select a service you want to request (e.g. Mass Intention, Baptism, Blessing). Fill up the form with the required details and information, pass the reCAPTCHA test, and click the submit button.",
  },
  {
    title: "Payment",
    content:
      "For select services, you may opt to go for either Cash or GCash. For cash payments, you will be instructed to head over to the parish office and pay the specified amount. Make sure to take note of your request transaction number for easier processing. For GCash payments, copy your GCash reference number and paste it into the request form for verification.",
  },
  {
    title: "Requirements",
    content:
      "For services such as Wedding and Baptism, you are required to submit requirements in order to proceed with the approval of the request. For this reason, you must submit the requirements physically to the parish office so the staff can take note of it and appropriately update your request.",
  },
  {
    title: "How do I know the Status of my Request?",
    content:
      "At the top right of the Services page, Click the 'Track Status of Request' button. You will have to input the transaction number of your request and pass the reCAPTCHA test in order to view the status of your request. Once submitted, you will see your request information, as well as the updates of your request (e.g. approved, pending, cancelled).",
  },
  {
    title: "Help and Support",
    content:
      "If you are struggling to operate the system, kindly contact our office at (032) 346-9560. More information is available at the ABOUT page.",
  },
];

const containerStyle = {
  margin: "0px",
  padding: "0px",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  minWidth: "100%",
};

const FAQ = () => {
  return (
    <Box sx={containerStyle}>
      <NavParishioner />
      <Header
        backgroundImage={imageHeader}
        title="Frequently Asked Questions"
      />
      <div className="max-w-[1440px] mt-6">
        <Link to="/" className="mt-8 md:mb-10 items-center">
          <FontAwesomeIcon icon={faArrowLeftLong} className="ml-8 md:mr-2" />
          <p className="hidden md:inline">Return to Home</p>
        </Link>
      </div>

      <div className="max-w-[1040px] md:mt-5 mx-auto py-10 rounded-xl shadow-gray-400">
        <div className="flex justify-center items-center font-[tahoma]">
          <span className="font-bold md:text-6xl xs:text-3xl">F</span>
          <h1 className="font-bold md:text-4xl xs:text-xl mr-2">requently</h1>
          <span className="font-bold md:text-6xl xs:text-3xl">A</span>
          <h1 className="font-bold md:text-4xl xs:text-xl mr-2">sked</h1>
          <span className="font-bold md:text-6xl xs:text-3xl">Q</span>
          <h1 className="font-bold md:text-4xl xs:text-xl">uestions</h1>
        </div>
        <div className="md:mt-8 xs:mt-4 md:text-center xs:text-justify xs:px-4 md:max-w-[600px] mx-auto">
          <h3>
            Find questions and answers related to Gethsemane Parish and
            Parokyano's service request system, updates, and support.
          </h3>
        </div>
      </div>

      <div className="mt-6 max-w-[1040px] mx-auto w-full">
        <div className="mb-20">
          {sampleFAQs.map((faq, index) => (
            <div key={index}>
              <Accordion className="py-3 rounded-full mb-5">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className="font-bold text-lg">
                  {faq.title}
                </AccordionSummary>
                <AccordionDetails>{faq.content}</AccordionDetails>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </Box>
  );
};

export default FAQ;
