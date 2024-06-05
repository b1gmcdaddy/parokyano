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
import { faCross, faQuestion } from '@fortawesome/free-solid-svg-icons';



const Certificates = () => {

    const certNames = {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: '8px',
        marginRight: '20px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '30px',
    };
    

    return(
        <>
            <NavParishioner />
            <Header  
                backgroundImage={imageHeader}
                title="Gethsemane Parish Pastoral Center"
            />

            <h1 align='center'>Choose a type of Certificate</h1>

            <Grid container spacing={3} padding={5} justifyContent={"center"}>

                <Grid item xs={12} md={3} style={{ position: 'relative' }}>
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

                <Grid item xs={12} md={3} style={{ position: 'relative' }}>
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
                
                <Grid item xs={12} md={3} style={{ position: 'relative' }}>
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