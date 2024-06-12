import { Grid, Box, Card, Typography, CardContent, IconButton, Collapse, CardActions } from "@mui/material"
import AnnouncementCard from "../../components/AnnouncementCard";
import imageHeader from '../../assets/imageHeader.jpg'
import NavParishioner from "../../components/NavParishioner";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { React, useState } from "react"

const Events = () => {

    const dummyData = [
        {
            title: "Anouncement 1",
            date_posted: "June 12",
            details: "further details here"
        },
        {
            title: "Anouncement 2",
            date_posted: "June 12",
            details: "further details here"
        },
        {
            title: "Anouncement 3",
            date_posted: "June 12",
            details: "further details here"
        }
    ];

    console.log(dummyData)


    return(
        <>
            <NavParishioner />
            <Header 
                title="Gethsemane Parish Pastoral Center"
                backgroundImage={imageHeader}
            />
                <Grid spacing={2} container justifyContent={"center"} sx={{margin: 5}}>
                    {dummyData.map((data, index) => (
                        <Grid item key={index}>
                            <AnnouncementCard
                                title={data.title}
                                date_posted={data.date_posted}
                                details={data.details}
                            />
                        </Grid>
                    ))}
                </Grid>
            <Footer />
        </>
    )
}

export default Events