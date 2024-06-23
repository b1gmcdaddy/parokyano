import { Avatar, Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'

//all icons are temporary
import DashboardIcon from '@mui/icons-material/Dashboard';
import CampaignIcon from '@mui/icons-material/Campaign';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';


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
                variant='permanent' anchor='left'>

                {/* avatar and staff name goes here */}
                <Box container justifyContent='center' alignItems='center' 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: 2,
                    }}>
                    <div>
                        <Avatar sx={{width: 100, height: 100}} src={<PersonIcon />} />
                    </div>
                    <div>
                        <Typography variant='h6'>
                            Hello World!
                        </Typography>
                    </div>
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

                <Box container position='fixed' justifyContent='center' bottom={5} left={2}>
                    <List>
                        <ListItemButton>
                            <ListItemIcon sx={{color: 'white'}}>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

export default NavStaff