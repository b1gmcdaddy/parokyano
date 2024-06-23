import { Avatar, Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Container } from '@mui/material'

//all icons are temporary
import DashboardIcon from '@mui/icons-material/Dashboard';
import CampaignIcon from '@mui/icons-material/Campaign';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';


import React from 'react'

const NavStaff = () => {
    return(
        <>      
            <Drawer PaperProps={{
                    sx: {
                        backgroundColor: '#355173',
                        color: 'white'
                    }
                }} 
            variant='permanent' anchor='left' >

                <Box justifyContent='center' sx={{backgroundColor: 'pink'}}>
                    <Avatar src={<PersonIcon />} />
                </Box>

                <List>
                    <ListItemButton>
                        <ListItemIcon sx={{color: 'white'}}>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </List>
                <List>
                    <ListItemButton>
                        <ListItemIcon sx={{color: 'white'}}>
                            <CampaignIcon />
                        </ListItemIcon>
                        <ListItemText primary="Announcements" />
                    </ListItemButton>
                </List>
                <List>
                    <ListItemButton>
                        <ListItemIcon sx={{color: 'white'}}>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Request Services" />
                    </ListItemButton>
                </List>
                <List>
                    <ListItemButton>
                        <ListItemIcon sx={{color: 'white'}}>
                            <BadgeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Request Certificates" />
                    </ListItemButton>
                </List>
                <List>
                     <ListItemButton>
                        <ListItemIcon sx={{color: 'white'}}>
                            <FormatListBulletedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Mass Intentions" />
                    </ListItemButton>
                </List>
                <List>
                    <ListItemButton>
                        <ListItemIcon sx={{color: 'white'}}>
                            <ReceiptLongIcon />
                            </ListItemIcon>
                        <ListItemText primary="Transactions" />
                    </ListItemButton>
                </List>
                <List>
                    <ListItemButton>
                        <ListItemIcon sx={{color: 'white'}}>
                            <CalendarMonthIcon />
                        </ListItemIcon>
                        <ListItemText primary="Schedule" />
                    </ListItemButton>
                </List>     
            </Drawer>
        </>
    )
}

export default NavStaff