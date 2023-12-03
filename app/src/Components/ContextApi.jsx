import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const commonContext = createContext();
export const useCommonContext = () => useContext(commonContext);

const ContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [apps, setApps] = useState([]);

  const getApps = async (setLoading) => {
    try {
      const response = await axios.get(`https://windows-application-baclend.onrender.com/api/apps`, {
        headers: {
          "x-auth-user": localStorage.getItem("userToken"),
        },
      });

      const data = await response.data;
      setApps(data);
    } catch (error) {
      console.log("Error getting apps ", error.response.data);
    } finally{
        setLoading(false)
    }
  };

  const addApps = async (formData, setLoading) => {
    try {
      const response = await axios.post(
        `https://windows-application-baclend.onrender.com/api/apps/add`,
        formData,
        {
          headers: {
            "x-auth-user": localStorage.getItem("userToken"),
          },
        }
      );

      await response.data;
      const updatedApps = [...apps,formData];

      setApps(updatedApps);

      navigate("/");
    } catch (error) {
      console.log("Error adding app ", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteApps = async (id, setLoading) => {
    try {
      await axios.delete(`https://windows-application-baclend.onrender.com/api/apps/delete/${id}`, {
        headers: {
          "x-auth-user": localStorage.getItem("userToken"),
        },
      });
      navigate("/");
    } catch (error) {
      console.log("Error deleting app ", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    apps,
    setApps,
    getApps,
    addApps,
    deleteApps,
  };

  return (
    <commonContext.Provider value={value}>{children}</commonContext.Provider>
  );
};

export default ContextProvider;
