import React, { useEffect, useState } from "react";
import UploadData from "./UploadData";
import ClientList from "./ClientList";
import NoRecordFound from "../Comman/NoRecordFound";
import { Grid, TextField } from "@mui/material";
import ThemeContext from "../../Context";

function ClientsData() {
  const [searchText, setSearchText] = useState("");

  // ContextData 
  const {clientRecord,setClientRecord,tempData,setTempData} = React.useContext(ThemeContext);   

  // we are manageing data from which data is uploaded
  const getDataHandler = (data) => {
    // here we get old data and push latest plus old data
    const allData = [...clientRecord, ...data];
    removeDuplicateValue(allData);
  };

  useEffect(() => {
    clientRecordDataHandler();
  }, []);

  //  Manage Client Record data
  const clientRecordDataHandler = () => {
    //  if data state length zero than get data from localStorage
  };

  const searchDataHandler = (value) => {
    setSearchText(value);
    if (value !== "") {
      const searchItem = tempData.filter(
        (response) =>
            // as per the requermient we need filter all fileds for the search Funcanlity
          response.id.toString().includes(value.toLowerCase()) ||
          response.name.toLowerCase().includes(value.toLowerCase()) ||
          response.email.toLowerCase().includes(value.toLowerCase())
      );
      setTempData(searchItem);
    } else {
      setTempData(clientRecord);
    }
  };

  

  

  // here we are remove duplicate email value
  const removeDuplicateValue = (data) => {
    const clientData = [...data];
    const uniqueData = clientData.reduce((acc, current) => {
      const x = acc.find((item) => item.email === current.email);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    setTempData(uniqueData);
    setClientRecord(uniqueData);
  };

  return (
    <>
      <Grid container sx={{justifyContent:"end"}}>
            <UploadData clientRecordHandler={getDataHandler} />
      </Grid>
      <TextField
        size="small"
        placeholder="Search..."
        onChange={(event) => searchDataHandler(event.target.value)}
        value={searchText}
      />
      {tempData && tempData.length > 0 ? (
        <ClientList />
      ) : (
        <NoRecordFound />
      )}
    </>
  );
}

export default ClientsData;
