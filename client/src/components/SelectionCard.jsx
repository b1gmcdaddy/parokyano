import { Card, CardActionArea, CardContent,CardMedia, Grid, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function SelectorCard({cardImg, serviceName, path}){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(path);
    };
    return(
        <Grid item>
            <CardActionArea onClick={handleClick}>
                <Card elevation={12} sx={{height: 300, width: 310, bgcolor: '#E8E8E8',padding: 1, transition: '0.3s ease', '&:hover': {
                    transform: 'scale(1.05)'
                }, '&:hover .MuiCardMedia-root': {
                    transition: '0.3s ease', 
                    opacity: 1
                }}}>
                    <CardMedia
                    sx={{
                        borderRadius: 1,
                        opacity: 0.5,
                    }}
                    component="img"
                    height="194"
                    image= {cardImg}
                    alt={serviceName}/>
                    <CardContent sx={{display: 'flex',justifyContent: 'center', alignItems:'center'}}> 
                        <Typography variant='h4' sx={{marginTop: 1, fontWeight: 'bold'}}>
                            {serviceName}
                        </Typography>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
}

export default SelectorCard