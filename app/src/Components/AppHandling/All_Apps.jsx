import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import { useCommonContext } from "../ContextApi";
import {
  Box,
  CircularProgress,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AllApps = () => {
  const navigate = useNavigate();
  const { apps, getApps } = useCommonContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApps(setLoading);
  }, []);


  return (
    <Base>
    {loading ? (
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
          
            <ImageListItem key={idx} sx={{ width: "70px" , boxShadow:"inset 0 0 10px purple",padding:"10px",borderRadius:"10px" }}>
            <abbr title= "Open app details">
            <IconButton onClick={() => navigate(`/app/${item._id}`)}>
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
      </Box>
      )}
    </Base>
  );
};

export default AllApps;
