import React from 'react'
import NavParishioner from '../../components/NavParishioner';
import imageHeader from '../../assets/imageHeader.jpg';
import Header from '../../components/Header';



const Home = () => {
  return (
    <>
    <NavParishioner />
    <Header  
    backgroundImage={imageHeader}
    title="Request a Service with Gethsemane Parish"
    instruction="Choose from a variety of services available!"/>
    </>
  )
}

export default Home