import React from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from '../../assets/imageHeader.jpg';
import baptism from '../../assets/baptism.jpg';
import confirmation from '../../assets/confirmation.jpg';
import wedding from '../../assets/wedding.jpg';
import Header from '../../components/Header';
import { Grid, Card, CardContent, CardMedia, CardActionArea, Typography } from '@mui/material';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import SelectorCard from "../../components/SelectionCard";


const Certificates = () => {

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
            <h1 align='center' className="font-bold text-xl font-[Arial]">Choose a type of Certificate</h1>

            <Grid container spacing={3} padding={5} justifyContent={"center"}
            sx={{marginBottom:"50px"}}>
                <SelectorCard cardImg={baptism} serviceName={'Baptism'}/>
                <SelectorCard cardImg={confirmation} serviceName={'Confirmation'}/>
                <SelectorCard cardImg={wedding} serviceName={'Wedding'}/>
            </Grid>

            <Footer />
        </>
    )
}

export default Certificates