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
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { jwtDecode } from "jwt-decode";

const sideBarWidth = 240;

const staffSideBarItems = [
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

const adminSideBarItems = [
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
  {
    icon: <PersonAddAlt1Icon />,
    label: "Configurations",
    path: "/manage-configurations",
  },
];

const NavStaff = (props) => {
  const { window } = props;
  const user = JSON.parse(localStorage.getItem("user"));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const decoded = jwtDecode(token);

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

  const drawerColor = decoded.role == "staff" ? "#355173" : "rgb(15 23 42)";

  const drawer = (
    <div
      style={{
        backgroundColor: drawerColor,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
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
            sx={{
              marginTop: "8px",
              color: "whitesmoke",
              textAlign: "center",
            }}
          >
            {user.name}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              marginTop: "4px",
              color: "whitesmoke",
              textAlign: "center",
            }}
          >
            {decoded.role == "admin" ? "Admin" : "Staff"}
          </Typography>
        </div>
      </Box>

      <List sx={{ color: "whitesmoke", paddingTop: 3 }}>
        {" "}
        {(decoded.role === "staff" ? staffSideBarItems : adminSideBarItems).map(
          (items, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <ListItemButton component={Link} to={items.path}>
                <ListItemIcon sx={{ color: "white" }}>
                  {items.icon}
                </ListItemIcon>
                <ListItemText primary={items.label} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>

      <Box
        justifyContent="center"
        sx={{
          padding: "1em 0",
          backgroundColor: drawerColor,
          marginTop: "auto",
        }}
      >
        <List>
          <ListItem
            sx={{
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
              width: "100%",
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon sx={{ color: "white", paddingLeft: ".2em" }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{ color: "white" }}
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
              />
            </ListItemButton>
          </ListItem>
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
