import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
//all icons are temporary
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CampaignIcon from "@mui/icons-material/Campaign";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const sideBarWidth = 240;

const sideBarItems = [
  { icon: <DashboardIcon />, label: "Dashboard", path: "/dashboard" },
  { icon: <CampaignIcon />, label: "Announcements", path: "/staff-events" },
  {
    icon: <AssignmentIcon />,
    label: "Service Requests",
    path: "/service-requests",
  },
  {
    icon: <BadgeIcon />,
    label: "Certificate Requests",
    path: "/cert-requests",
  },
  {
    icon: <FormatListBulletedIcon />,
    label: "Mass Intentions",
    path: "/manage-intentions",
  },
  {
    icon: <ReceiptLongIcon />,
    label: "Transactions",
    path: "/manage-transactions",
  },
  {
    icon: <CalendarMonthIcon />,
    label: "Schedules",
    path: "/manage-schedules",
  },
];

const NavStaff = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const navigateSettings = () => {
    navigate("/settings");
  };

  // const drawer = (
  //   <div style={{backgroundColor: "#355173", height: "100vh"}}>
  //     <Toolbar />
  //     <Box justifyContent='center' alignItems='center' sx={{ display: 'flex', flexDirection: 'column', margin: 2 }}>
  //                   <div>
  //                       <Avatar sx={{width: 100, height: 100}}>
  //                         <PersonIcon sx={{width: 70, height: 70}}/>
  //                       </Avatar>
  //                   </div>
  //                   <div>
  //                       <Typography variant='h6' sx={{marginTop: "14px", color:"whitesmoke"}}>
  //                           Hello World!
  //                       </Typography>
  //                   </div>
  //               </Box>

  const drawer = (
    <div style={{ backgroundColor: "#355173", height: "100vh" }}>
      <Toolbar />
      <Box
        justifyContent="center"
        alignItems="center"
        sx={{ display: "flex", flexDirection: "column", margin: 2 }}
      >
        <div>
          <Avatar sx={{ width: 100, height: 100 }}>
            <PersonIcon sx={{ width: 70, height: 70 }} />
          </Avatar>
        </div>
        <div>
          <Typography
            variant="h6"
            sx={{ marginTop: "14px", color: "whitesmoke" }}
          >
            Hello World!
          </Typography>
        </div>
      </Box>

      <List sx={{ color: "whitesmoke" }}>
        {sideBarItems.map((items, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton component={Link} to={items.path}>
              <ListItemIcon sx={{ color: "white" }}>{items.icon}</ListItemIcon>
              <ListItemText primary={items.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box
        justifyContent="center"
        sx={{ position: "fixed", bottom: "1em", left: "1.5em" }}
      >
        <List>
          <ListItemButton>
            <ListItemIcon sx={{ color: "white" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{ color: "white" }}
              onClick={() => {
                const refreshToken = localStorage.getItem("refreshToken");

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate("/login");
              }}
            />
          </ListItemButton>
        </List>
      </Box>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${sideBarWidth}px)` },
          ml: { sm: `${sideBarWidth}px` },
          backgroundColor: "#D9D9D9",
        }}
      >
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              letterSpacing: "3px",
              color: "#00000e",
              flexGrow: 1,
              mx: { md: "30px" },
            }}
          >
            Parokyano
          </Typography>

          <IconButton onClick={navigateSettings}>
            <SettingsRoundedIcon
              on
              className="md:mr-8 text-neutral-950"
              sx={{ mx: { md: "30px" } }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: sideBarWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: sideBarWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: sideBarWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavStaff;
