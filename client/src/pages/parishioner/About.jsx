import React from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from '../../assets/imageHeader.jpg';
import Header from '../../components/Header';

import Footer from '../../components/Footer';


const About = () => {
    return(
        <>
            <NavParishioner />
            <Header  
                backgroundImage={imageHeader}
                title="ABOUT GETHSEMANE PARISH"
                instruction=""
            />

            <h1>Hello World</h1>

            <Footer />
        </>
    )
}

export default About