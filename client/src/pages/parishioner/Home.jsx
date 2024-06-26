import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavParishioner from '../../components/NavParishioner';
import imageHeader from '../../assets/imageHeader.jpg';
import Header from '../../components/Header';
import { Grid } from '@mui/material';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross, faQuestion } from '@fortawesome/free-solid-svg-icons';
import RequestNotice from '../../components/RequestNotice';


const Home = () => {
  const [open, setOpen] = useState(false);
  const [reqUrl, setReqUrl] = useState('');

  const handleClickOpen = (url) => {
    setReqUrl(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const serviceNames = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: '8px',
    marginRight: '20px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '24px'
  };
  
  const navigate = useNavigate();

  const navigateToPage = (url) => {
    navigate(`/${url}`);
  }
  

  return (
    <>
      <NavParishioner />
      <Header  
        backgroundImage={imageHeader}
        title="Request a Service with Gethsemane Parish"
        instruction="Choose from a variety of services available!"
      />
      <div className='max-w-[1440px] mx-auto mt-8'>
        <div className='flex justify-between mb-8'>
          <h1 className='md:text-3xl font-bold xs:text-center xs:text-xl'>Services Offered</h1>
          <button className='rounded-md border-0 border-gray-300 shadow-md shadow-slate-300 
          px-4 py-1 hover:bg-slate-100 xs:text-center' onClick={() => navigateToPage('track-status')}>Track Status of Request</button>
        </div>
        <RequestNotice open={open} onClose={handleClose} reqUrl={reqUrl} />

        <Grid container spacing={1}>
          <Grid item xs={12} md={3} style={{ position: 'relative' }} onClick={() => handleClickOpen('wedding')}>
            <img src={imageHeader} alt="Service 1" className="object-cover md:h-[380px] w-full rounded-lg shadow-md shadow-gray-500 cursor-pointer
           hover:scale-105 duration-300 hover:opacity-85" />
            <h1 style={serviceNames}>Wedding</h1>
          </Grid>

          <Grid item xs={12} md={3} style={{ position: 'relative' }}>
            <div className='relative' onClick={() => handleClickOpen('/baptism')}>
            <img src={imageHeader} alt="Service 2" className="object-cover md:h-[186px] w-full rounded-lg shadow-md shadow-gray-500 mb-2 cursor-pointer
             hover:scale-105 duration-300 hover:opacity-85" />
            <h1 style={serviceNames}>Baptism</h1>
            </div>
            <img src={imageHeader} alt="Service 3" onClick={() => handleClickOpen('/anointing')} className="object-cover md:h-[186px] w-full rounded-lg shadow-md shadow-gray-500 cursor-pointer
             hover:scale-105 duration-300 hover:opacity-85" />
            <h1 style={serviceNames}>Anointing of the Sick</h1>
          </Grid>

          <Grid item xs={12} md={3} style={{ position: 'relative' }}>
            <img src={imageHeader} alt="Service 4" onClick={() => handleClickOpen('/mass-selection')} className="object-cover md:h-[380px] w-full rounded-lg shadow-md shadow-gray-500 cursor-pointer
             hover:scale-105 duration-300 hover:opacity-85" />
            <h1 style={serviceNames}>Request a Mass</h1>
          </Grid>
          
          <Grid item xs={12} md={3} style={{ position: 'relative' }}>
            <div className='relative' onClick={() => handleClickOpen('/blessing')}>
            <img src={imageHeader} alt="Service 2" className="object-cover md:h-[186px] w-full rounded-lg shadow-md shadow-gray-500 mb-2 cursor-pointer
             hover:scale-105 duration-300 hover:opacity-85" />
            <h1 style={serviceNames}>Request a Blessing</h1>
            </div>
            <img src={imageHeader} alt="Service 3" onClick={() => handleClickOpen('/mass-intention-select')} className="object-cover md:h-[186px] w-full rounded-lg shadow-md shadow-gray-500 cursor-pointer
             hover:scale-105 duration-300 hover:opacity-85" />
            <h1 style={serviceNames}>Mass Intentions</h1>
          </Grid>
        </Grid>

        <div className='w-full py-12'>
          <div className='max-w-[1440px] mx-auto grid md:grid-cols-2 gap-8'>
            <div className='w-full shadow-xl flex flex-col px-8 py-0 rounded-lg relative' style={{backgroundColor:'#E8E8E8'}}>
              <div className="flex items-center"> 
                <FontAwesomeIcon icon={faCross} className='text-4xl' />
                <div className='p-4'>
                  <h2 className='text-lg font-bold'>Request for a Certificate Here!</h2>
                  <p className='text-base'>Parokyano and Gethsemane Parish Staff will assist you!</p>
                </div>
                <button className='font-medium md:absolute md:right-4 bg-white shadow-lg rounded-2xl px-3 py-2
                hover:scale-105 duration-300' onClick={() => navigateToPage('certificates')}>Request a Certificate</button>
              </div>
            </div>

              <div className='w-full shadow-xl flex flex-col px-8 py-0 rounded-lg relative' style={{backgroundColor:'#E8E8E8'}}>
                <div className="flex items-center"> 
                  <FontAwesomeIcon icon={faQuestion} className='text-4xl' />
                  <div className='p-4'>
                    <h2 className='text-lg font-bold'>Got Any questions?</h2>
                    <p className='text-base'>Visit our FAQs Section to Learn More!</p>
                  </div>
                  <button className='text-white font-medium md:absolute md:right-6 shadow-lg rounded-2xl px-3 py-2
                  hover:scale-105 duration-300' style={{backgroundColor:'#355173'}} onClick={() => navigateToPage('frequently-asked')}>Visit FAQs</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    <Footer />
    </>
  )
}

export default Home;
