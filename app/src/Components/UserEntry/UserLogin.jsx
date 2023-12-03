import {
    Box,
    Button,
    CircularProgress,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useCommonContext } from "../ContextApi";
  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";
  import { decodeToken } from "react-jwt";
  
  const UserLogin = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const userToken = localStorage.getItem("userToken");
      let user 
      if(userToken) user = decodeToken(userToken)
    //   console.log(user);
      if (user) {
        navigate("/", { replace: true });
      }
    }, []);
  
    const [formData, setFormData] = useState({
      email: "dhanushmd4021@gmail.com",
      password: "12345678",
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        setLoading(true);
    
        const response = await axios.post(`https://windows-application-baclend.onrender.com/api/user/login`,formData);
        const data = await response.data;
        if (data.message === "User logined successfully") {
          localStorage.setItem("userToken", data.token);
          navigate("/");
        }
      } catch (error) {
        alert(error.response.data.message);
        console.log("Login error ", error.response.data);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Typography component="div" className="userEntryCard">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: 300 }}
          className="CommonCard"
        >
          <Typography component="h1">Login Your Account</Typography>
  
          <TextField
            id="outlined-textarea"
            label="Email"
            name="email"
            type="password"
            required
            value={formData.email}
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
            label="Password"
            name="password"
            type="password"
            required
            value={formData.password}
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
  
          <Button
            disabled={loading}
            variant="contained"
            type="submit"
            sx={{ backgroundColor: "rgb(93, 23, 121)" }}
          >
            {loading ? (
              <CircularProgress
                size="30px"
                sx={{ color: "rgb(210, 114, 248)" }}
              />
            ) : (
              "LOGIN"
            )}
          </Button>
          <Link to="/signup" className="Link">
            I dont have an account? Register here
          </Link>
        </Box>
      </Typography>
    );
  };
  
  export default UserLogin;
  