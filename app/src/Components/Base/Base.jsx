import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import "./Base.css";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BookIcon from '@mui/icons-material/Book';

// MUI functions

const Base = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ backgroundColor: "rgb(93, 23, 121)", height: "60px" }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <IconButton onClick={() => navigate("/")}>
                <abbr title="Home">
                  <HomeIcon sx={{color:"aliceblue",fontSize:"calc(20px + 1vw)"}}/>
                </abbr>
              </IconButton>
            </Box>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              OPEZEE
            </Typography>
            <Box component="div" sx={{display:"flex",gap:"1rem"}}>
            <IconButton onClick={() => navigate("/apps/Details")}>
                <abbr title="View apps details">
                  <BookIcon sx={{color:"aliceblue",fontSize:"calc(20px + 1vw)"}}/>
                </abbr>
              </IconButton>
              <IconButton onClick={() => navigate("/app/add")}>
                <abbr title="Add new app">
                  <AddToQueueIcon sx={{color:"aliceblue",fontSize:"calc(20px + 1vw)"}}/>
                </abbr>
              </IconButton>
              <IconButton onClick={handleLogout}>
                <abbr title="Logout">
                  <LogoutIcon sx={{color:"aliceblue",fontSize:"calc(20px + 1vw)"}}/>
                </abbr>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Children */}
      <div style={{ margin: "100px 0 0 40px" }}>{children}</div>
    </>
  );
};

export default Base;
