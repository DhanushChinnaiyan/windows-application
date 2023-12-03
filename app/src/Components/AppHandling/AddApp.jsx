import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Base from "../Base/Base";
import { useCommonContext } from "../ContextApi";

const AddApp = () => {
    const[loading,setLoading] = useState(false)
    const {addApps} = useCommonContext()
  const [formData, setFormData] = useState({
    appName: "",
    url: "",
    imageUrl: "",
    iframeUrl: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {

    e.preventDefault();
    setLoading(true)
    addApps(formData,setLoading)
  };

  return (
    <Base>
   <Box component="div" sx={{display:"flex",justifyContent:"center"}}>
   <Box component="form" onSubmit={handleSubmit} className="CommonCard" sx={{width:400}}>
      <Typography component="h1">Add Your App Now</Typography>
   
        <TextField
          id="outlined-multiline-flexible"
          label="App Name"
          name="appName"
          required
          value={formData.appName}
          onChange={handleChange}
          InputProps={{
            sx: {
              color: "rgb(255, 211, 158)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(137, 71, 163)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(250, 140, 195)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(250, 140, 195)",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: "rgb(137, 71, 163)",
              "&.Mui-focused": {
                color: "rgb(250, 140, 195)",
              },
            },
          }}
        />
        <TextField
          id="outlined-textarea"
          label="App URL"
          name="url"
          required
          value={formData.url}
          onChange={handleChange}
          InputProps={{
            sx: {
              color: "rgb(255, 211, 158)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(137, 71, 163)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(250, 140, 195)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(250, 140, 195)",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: "rgb(137, 71, 163)",
              "&.Mui-focused": {
                color: "rgb(250, 140, 195)",
              },
            },
          }}
        />
        <TextField
          id="outlined-textarea"
          label="Image URL"
          name="imageUrl"
          required
          value={formData.imageUrl}
          onChange={handleChange}
          InputProps={{
            sx: {
              color: "rgb(255, 211, 158)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(137, 71, 163)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(250, 140, 195)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(250, 140, 195)",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: "rgb(137, 71, 163)",
              "&.Mui-focused": {
                color: "rgb(250, 140, 195)",
              },
            },
          }}
        />
        <TextField
          id="outlined-textarea"
          label="Iframe URL"
          name="iframeUrl"
          value={formData.iframeUrl}
          onChange={handleChange}
          InputProps={{
            sx: {
              color: "rgb(255, 211, 158)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(137, 71, 163)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(250, 140, 195)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(250, 140, 195)",
              },
            },
          }}
          InputLabelProps={{
            sx: {
              color: "rgb(137, 71, 163)",
              "&.Mui-focused": {
                color: "rgb(250, 140, 195)",
              },
            },
          }}
        />
   
      <TextField
        id="outlined-multiline-static"
        label="Write app description here..."
        name="description"
        required
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        InputProps={{
          sx: {
            color: "rgb(255, 211, 158)",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(137, 71, 163)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(250, 140, 195)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(250, 140, 195)",
            },
          },
        }}
        InputLabelProps={{
          sx: {
            color: "rgb(137, 71, 163)",
            "&.Mui-focused": {
              color: "rgb(250, 140, 195)",
            },
          },
        }}
      />

      <Button variant="contained" type="submit" sx={{backgroundColor:"rgb(93, 23, 121)"}}>
      {loading ? (
            <CircularProgress
              size="30px"
              sx={{ color: "rgb(210, 114, 248)" }}
            />
          ) : (
            "SAVE"
          )}
      </Button>
    </Box>
   </Box>
    </Base>
  );
};

export default AddApp;
