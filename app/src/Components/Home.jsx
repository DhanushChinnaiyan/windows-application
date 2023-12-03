import React, { useEffect, useState } from "react";
import Base from "./Base/Base";
import { useCommonContext } from "./ContextApi";
import {
  Box,
  CircularProgress,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { apps, getApps } = useCommonContext();
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    getApps(setLoading);
  }, []);

  const openExternalLink = (url) => {
    const ipcRenderer = window.ipcRenderer;
    ipcRenderer.send("open-external-link", url);
  };

  return (
    <Base>
{
  loading ? (
    <Typography
      component="div"
      sx={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Typography>
  ) : (
      <Box component="div" sx={{display:"flex",gap:"1rem"}}>
        {apps.map((item, idx) => (
          <ImageListItem key={idx} sx={{ width: "70px" }}>
            <abbr title = "Open app">
            <IconButton onClick={() => openExternalLink(item.url)}>
              <img
                srcSet={item.imageUrl}
                src={item.imageUrl}
                alt={item.appName}
                loading="lazy"
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              />
            </IconButton>
            </abbr>
            <ImageListItemBar
              sx={{ textAlign: "center" }}
              position="below"
              title={item.appName}
            />
          </ImageListItem>
        ))}
      </Box>)
    }
    </Base>
  );
};

export default Home;
