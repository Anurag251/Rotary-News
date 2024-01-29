/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { apis } from "../utils/api";

export const AllDataContext = createContext();

export const AllDataProvider = ({ children }) => {
  const [navDatas, setNavDatas] = useState(null);
  const [eventDatas, setEventDatas] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch top-nav data
    fetchData("/top-nav", setNavDatas);

    // Fetch homepage_api data
    fetchData("/homepage_api", (data) => setEventDatas(data.News));

    // // Fetch banner_api data
    // fetchData("/homepage_api", (data) => console.log(data));
  }, []);

  const fetchData = async (endpoint, setDataCallback) => {
    try {
      const response = await apis.get(endpoint);

      if (response.status === 200) {
        setDataCallback(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AllDataContext.Provider
      value={{
        loading,
        setLoading,
        navDatas,
        eventDatas,
      }}
    >
      {children}
    </AllDataContext.Provider>
  );
};

// https://news.rotarydistrict3292.org.np/wp-json/api/posts/3
// https://news.rotarydistrict3292.org.np/wp-json/api/top-nav
// https://news.rotarydistrict3292.org.np/wp-json/api/homepage_api
