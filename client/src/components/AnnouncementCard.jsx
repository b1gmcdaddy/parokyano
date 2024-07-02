import { Grid, Card, Typography, CardContent, IconButton, Collapse, CardActions } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { React, useState } from "react"

const AnnouncementCard = ({ title, date_announced, description}) => {

    const [expanded, setExpanded] = useState(false);
    // const dateLocal = date_announced.toLocaleTimeString()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return(
        <>
            <Grid container justifyContent={"center"}>
                <Grid item>
                    <Card sx={{ width: 800 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {date_announced}
                            </Typography>
                        </CardContent>

                        <CardActions disableSpacing>
                            <IconButton
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                                sx={{
                                    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s',
                                    marginLeft: 'auto'
                                }}
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>

                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>
                                    {description}
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default AnnouncementCard