import React from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from '../../assets/imageHeader.jpg';
import wake from '../../assets/wakemass.jpg'
import outside from '../../assets/outsidemass.jpg'
import funeral from '../../assets/funeral.jpg'
import Header from '../../components/Header';
import { Grid } from '@mui/material';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import SelectorCard from "../../components/SelectionCard";


const MassSelection = () => {

    return(
        <>
            <NavParishioner />
            <Header  
                backgroundImage={imageHeader}
                title="Gethsemane Parish Pastoral Center"
            />
            <Link to='/' className="max-w-[1440px] mx-auto mt-8 md:mb-6 md:flex items-center">
                <FontAwesomeIcon icon={faArrowLeftLong}  className="ml-8 md:mr-2"/>
                <p className="xs:hidden md:flex">Return to Home</p>
            </Link>
            <h1 align='center' className="font-bold text-xl font-[Arial]">SELECT THE TYPE OF MASS</h1>

            <Grid container spacing={3} padding={5} justifyContent={"center"}
            sx={{marginBottom:"50px"}}>
                <SelectorCard cardImg={wake} serviceName={'Wake'}/>
                <SelectorCard cardImg={funeral} serviceName={'Funeral'}/>
                <SelectorCard cardImg={outside} serviceName={'Outside Mass'}/>
            </Grid>
            <Footer />
        </>
    )
}

export default MassSelection