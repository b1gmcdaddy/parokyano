import React from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from '../../assets/imageHeader.jpg';
import Header from '../../components/Header';
import { Grid } from '@mui/material';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross, faQuestion } from '@fortawesome/free-solid-svg-icons';



const Certificates = () => {
    return(
        <>
            <NavParishioner />
            <Header  
                backgroundImage={imageHeader}
                title="Request a Service with Gethsemane Parish"
                instruction="Choose from a variety of services available!"
            />

            <h1>Hello World</h1>

            <Footer />
        </>
    )
}

export default Certificates