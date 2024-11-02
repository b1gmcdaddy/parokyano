import React from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from '../../assets/imageHeader.jpg';
import wake from '../../assets/wakemass.jpg'
import outside from '../../assets/outsidemass.jpg'
import funeral from '../../assets/funeral.jpg'
import Header from '../../components/Header';
import { Grid, Box } from '@mui/material';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import SelectorCard from "../../components/SelectionCard";

const containerStyle = {
    margin: '0px',
    padding: '0px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    minWidth: '100%',
  }

const MassSelection = () => {

    return(
        <Box sx={containerStyle}>
            <NavParishioner />
            <Header  
                backgroundImage={imageHeader}
                title="Gethsemane Parish Pastoral Center"
            />
             <div className="max-w-[1440px] mt-6">
            <Link to='/' className="mt-8 md:mb-10 items-center">
                <FontAwesomeIcon icon={faArrowLeftLong}  className="ml-8 md:mr-2"/>
              <p className="hidden md:inline">Return to Home</p>
            </Link>
            </div>
            <h1 align='center' className="font-bold text-xl font-[Arial]">SELECT THE TYPE OF MASS</h1>

            <Grid container spacing={3} padding={5} justifyContent={"center"}
            sx={{marginBottom:"50px"}}>
                <SelectorCard cardImg={wake} serviceName={'Wake'} path={'/wakemass'}/>
                <SelectorCard cardImg={funeral} serviceName={'Funeral'} path={'/funeralmass'}/>
                <SelectorCard cardImg={outside} serviceName={'Outside Mass'} path={'/outsidemass'}/>
            </Grid>
            <Footer />
        </Box>
    )
}

export default MassSelection