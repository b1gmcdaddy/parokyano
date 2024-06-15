import React, { useState } from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from '../../assets/imageHeader.jpg';
import Header from '../../components/Header';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const sampleFAQs = [
    {title: "Title 1", content: "faq number 1 ni..."},
    {title: "Title 2", content: "faq number 2 ni..."},
    {title: "Title 3", content: "faq number 3 ni..."},
    {title: "Title 4", content: "faq number 4 ni..."},
    {title: "Title 5", content: "faq number 5 ni..."},
]


const FAQ = () => {
  return (
    <>
            <NavParishioner />
            <Header  
                backgroundImage={imageHeader}
                title="Frequently Asked Questions"
            />
            <div className="max-w-[1440px] mt-6 mx-auto">
            <Link to='/' className="mt-8 md:mb-10 items-center">
                <FontAwesomeIcon icon={faArrowLeftLong}  className="ml-8 md:mr-2"/>
              <p className="hidden md:inline">Return to Home</p>
            </Link>
            </div>

            <div className="max-w-[1040px] mt-5 mx-auto py-10 rounded-xl bg-[#CDAB52] shadow-lg shadow-gray-400">
                <div className="flex justify-center items-center font-[tahoma]">
                    <span className="font-bold text-6xl">F</span>
                    <h1 className="font-bold text-lg mr-2">requently</h1>
                    <span className="font-bold text-6xl">A</span>
                    <h1 className="font-bold text-lg mr-2">sked</h1>
                    <span className="font-bold text-6xl">Q</span>
                    <h1 className="font-bold text-lg">uestions</h1>
                </div>
            </div>

            <div className="mt-12 max-w-[1040px] mx-auto ">
                <div className="mb-10">
                    {sampleFAQs.map((faq, index) => (
                        <div key={index}>
                        <Accordion className="py-3 rounded-full mb-5" >
                          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header"
                          className="font-bold text-lg">
                            {faq.title}
                          </AccordionSummary>
                          <AccordionDetails>
                            {faq.content}
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    ))}
                </div>
            </div>
            <Footer />
   
        </>
  )
}

export default FAQ