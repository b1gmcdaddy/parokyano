import React, { useState } from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from '../../assets/imageHeader.jpg';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Grid } from "@mui/material";


const About = () => {

    const [hidden1, setHidden1] = useState(true);
    const [hidden2, setHidden2] = useState(true);
    const [hidden3, setHidden3] = useState(true);

    const cardStyling = {
        position: 'absolute',
        top: 80,
        left: 80,
        padding: '8px',
        color: 'white',
        fontWeight: '700',
        fontSize: '30px',
      };

      const hoverDetails = {
        position: 'absolute',
        bottom: 30,
        right: 30,
        color: 'white',
      };

    return(
        <>
            <NavParishioner />
            <Header  
                backgroundImage={imageHeader}
                title="ABOUT GETHSEMANE PARISH"
                instruction=""
            />
             <div className='w-full px-2 mt-10'>
                <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                    <img className='w-[500px] h-[320px] mx-auto my-4 shadow-md shadow-gray-500 rounded-md' src={imageHeader} alt='/' />
                <div className='flex flex-col justify-center'>
                    <h1 className='md:text-4xl sm:text-3xl tracking-wide text-2xl font-bold py-3'>GETHSEMANE PARISH</h1>
                    <div className='w-[150px] h-[4px] bg-[#355173] rounded-md mb-3'></div>
                        <p className='text-justify font-[Arial]'>
                        More widely known as Gethsemane Parish, the Catholic Church of Christ of the Agony was canonically 
                        erected as a parish on June 7, 1978, by 
                        then Archbishop of Cebu Julio Cardinal Rosales. The center of the parish is the church known for 
                        its modern architectural design by the artist, 
                        architect, priest the late Msgr. Virgilio Yap. It is located along L. 
                        Cabrera Street, Casuntingan, Mandaue City. </p>
                        <h3 className='md:text-2xl sm:text-xl text-lg font-medium py-3'>Catholic Church of Christ of the Agony</h3>
                        <p className='text-justify font-[Arial] italic'>
                        "Then Jesus came with them into a country place which is called Gethsemane; and he said to his
                          disciples: Sit you here, till I go yonder and pray." (Matthew 26:36)
                        </p>
                </div>
                </div>
            </div>
            
            {/*to implement slideshow*/}
            <div className="mt-14">
            <img className='w-[1240px] h-[310px] mx-auto my-4 shadow-md shadow-gray-500 rounded-md' src={imageHeader} />
            </div>

            <div className='max-w-[1240px] mx-auto my-16'>
                <Grid container spacing={6}>
                    <Grid item xs={12} md={4} style={{ position: 'relative' }} onMouseEnter={() => setHidden1(false)} onMouseLeave={() => setHidden1(true)}>
                        <img src={imageHeader} className="object-cover md:h-[380px] w-full rounded-lg shadow-md shadow-gray-500 cursor-pointer
                        hover:scale-105 duration-300" />
                        <h1 style={cardStyling} className="title-outline">MASS SCHEDULES</h1>
                        {
                            hidden1 ? null : <p style={hoverDetails}>Mass Schedule of Gethsemane Church Here.</p>
                        }
                    </Grid>

                    <Grid item xs={12} md={4} style={{ position: 'relative' }} onMouseEnter={() => setHidden2(false)} onMouseLeave={() => setHidden2(true)}>
                        <img src={imageHeader} className="object-cover md:h-[380px] w-full rounded-lg shadow-md shadow-gray-500 cursor-pointer
                        hover:scale-105 duration-300" />
                        <h1 style={cardStyling} className="title-outline">HOW TO VISIT</h1>
                        {
                            hidden2 ? null : <p style={hoverDetails}>Location of Gethsemane Church Here.</p>
                        }
                    </Grid>

                    <Grid item xs={12} md={4} style={{ position: 'relative' }} onMouseEnter={() => setHidden3(false)} onMouseLeave={() => setHidden3(true)} >
                        <img src={imageHeader} className="object-cover md:h-[380px] w-full rounded-lg shadow-md shadow-gray-500 cursor-pointer
                        hover:scale-105 duration-300"/>
                        <h1 style={cardStyling} className="title-outline">CONTACT DETAILS</h1>
                        {
                            hidden3 ? null : <p style={hoverDetails}>Contact Details of Gethsemane Parish Here</p>
                        }
                    </Grid>
                </Grid>
            </div>
   
        <Footer />

        </>
    )
}

export default About