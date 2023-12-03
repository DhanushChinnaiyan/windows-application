import React, { useEffect, useState } from "react";
import Base from "../Base/Base";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useCommonContext } from "../ContextApi";

const AppDetails = () => {
  const params = useParams();
  const [appData, setAppData] = useState([]);
  const [loading, setLoading] = useState(true);

  const {deleteApps} = useCommonContext()

  const getApp = async () => {
    try {
      const response = await axios.get(
        `https://windows-application-baclend.onrender.com/api/apps/select/${params.id}`,
        {
          headers: {
            "x-auth-user": localStorage.getItem("userToken"),
          },
        }
      );

      const data = await response.data;

      setAppData(data);
    } catch (error) {
      console.log("Error getting app ", error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApp();
  }, []);

  const handleDelete = () => {
        setLoading(true)
        deleteApps(params.id,setLoading)
  }

  const openExternalLink = (url) => {
    const ipcRenderer = window.ipcRenderer;
    ipcRenderer.send("open-external-link", url);
  };

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
        <Grid
          container
          sx={{ display: "flex", justifyContent: "center", width: "90%" }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            {appData.appName}
          </Typography>

          <Card>
            <Typography component="div" sx={{display:"flex",justifyContent:"flex-end",paddingRight:"10px"}}>
            <IconButton onClick={handleDelete}>
            <DeleteIcon sx={{color:"red",fontSize:"calc(20px + 1vw)"}}/>
            </IconButton>
            </Typography>
            <CardContent
              sx={{
                display: "flex",
                gap: "1rem",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {appData.iframeUrl && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ margin: "30px 0 10px 0" }}
                >
                  <iframe
                    title="Embedded Content"
                    width="350"
                    height="200"
                    src={appData.iframeUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Typography>
              )}
              <Typography component="h5" sx={{ width: "70%" }}>
                {appData.description}
              </Typography>
              <Button
                color="success"
                variant="contained"
                onClick={() => openExternalLink(appData.url)}
              >
                Go to {appData.appName}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Base>
  );
};

export default AppDetails;
