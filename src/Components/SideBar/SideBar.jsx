import * as React from "react";
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  Group,
  Book,
  Settings,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import adminphoto from "../../assets/edulogo.jpg";

const drawerWidth = 240;

const pages = [
  { name: "Dashboard", icon: <Dashboard />, path: "/" },
  { name: "Users", icon: <Group />, path: "/users" },
  { name: "Lessons", icon: <Book />, path: "/lessons" },
  { name: "Settings", icon: <Settings />, path: "/settings" },
];

export default function ResponsiveSidebar({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <div>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          
       
        }}
      >
<Avatar src={adminphoto} sx={{ width: 100, height: 100 ,mt:2,objectFit:"cover"}} /> 
        <Typography sx={{ fontWeight: 600 }}>Edu Master</Typography>
        <Typography sx={{ color: "gray", fontSize: "0.85rem",marginBottom:2 }}>
          Administrator
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem key={page.name} disablePadding>
            <ListItemButton onClick={() => navigate(page.path)}>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: "white",
          color: "black",
          boxShadow: "none",
          borderBottom: "1px solid #eee",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap display={"flex"}  alignItems="center">
            <Avatar src={adminphoto} sx={{ width: 50, height: 50 ,objectFit:"cover"}} /> 
            Edu Master Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
