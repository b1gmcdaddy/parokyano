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


const Certificates = () => {

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

            <h1 align='center' className="font-bold text-xl font-[Arial]">Choose a type of Certificate</h1>

            <Grid container spacing={1} padding={5} justifyContent={"center"}
            sx={{marginBottom:"80px"}}>

                <Grid item xs={12} md={2} style={{ position: 'relative' }}>
                    <Card sx={{ maxWidth: 345,
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        }
                     }}>
                        <CardActionArea>
                            <CardMedia sx={{
                                '&:hover': {
                                    opacity: 0.85,
                                },
                                height: 300
                            }}
                                component="img"
                                height="140"
                                image={baptism}
                                alt="baptism"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Baptism
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} md={2} style={{ position: 'relative' }} sx={{marginX: {xs: 0, md: '100px'}}}>
                    <Card sx={{ maxWidth: 345,
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        }
                     }}>
                        <CardActionArea>
                            <CardMedia sx={{
                                '&:hover': {
                                    opacity: 0.85,
                                },
                                height: 300
                            }}
                                component="img"
                                height="140"
                                image={confirmation}
                                alt="confirmation"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Confirmation
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                
                <Grid item xs={12} md={2} style={{ position: 'relative' }}>
                    <Card sx={{ maxWidth: 345,
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        }
                     }}>
                        <CardActionArea>
                            <CardMedia sx={{
                                '&:hover': {
                                    opacity: 0.85,
                                },
                                height: 300
                            }}
                                component="img"
                                height="140"
                                image={wedding}
                                alt="wedding"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Wedding
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

            </Grid>

            <Footer />
        </>
    )
}

export default Certificates