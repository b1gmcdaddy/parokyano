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


const MassIntentions = () => {

    return(
        <>
            <NavParishioner />
            <Header  
                backgroundImage={imageHeader}
                title="Gethsemane Parish Pastoral Center"
            />
             <div className="max-w-[1440px] mt-6 mx-auto">
            <Link to='/' className="mt-8 md:mb-10 items-center">
                <FontAwesomeIcon icon={faArrowLeftLong}  className="ml-8 md:mr-2"/>
              <p className="hidden md:inline">Return to Home</p>
            </Link>
            </div>
            <h1 align='center' className="font-bold text-xl font-[Arial]">Choose a Type of Mass Intention</h1>

            <Grid container spacing={3} padding={5} justifyContent={"center"}
            sx={{marginBottom:"50px"}}>
                <SelectorCard cardImg={wake} serviceName={'Thanksgiving'} path={'/'}/>
                <SelectorCard cardImg={funeral} serviceName={'Petition'} path={'/'}/>
                <SelectorCard cardImg={outside} serviceName={'Souls'} path={'/'}/>
            </Grid>
            <Footer />
        </>
    )
}

export default MassIntentions