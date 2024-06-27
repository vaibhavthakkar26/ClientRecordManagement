import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import EditClient from "./EditClient";
import ThemeContext from "../../Context";
import { Grid } from "@mui/material";

// eslint-disable-next-line react/prop-types
function ClientList() {
  const { tempData, setClientRecord, setTempData } =
    React.useContext(ThemeContext);

  const clientData = tempData || [];
  const [totalData, setTotalData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    setTotalData(tempData);
  }, [tempData]);

  const [page, setPage] = useState("");
  const itemPerPage = 5;

  const deleteHandler = (email) => {
    const clientAllData = [...tempData];
    const removeParticularData = clientAllData.filter(
      (response) => response.email !== email
    );
    setClientRecord(removeParticularData);
    setTempData(removeParticularData);
  };

  const pageChangeHandler = (e, newPage) => {
    setPage(newPage);
    const startIndex = (newPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    setTotalData(clientData.slice(startIndex, endIndex));
  };

  const editDataHandler = (response) => {
    setEditOpen(true);
    setEditData(response);
  };

  const modalCloseHandler = () => {
    setEditOpen(false);
  };

  return (
    <div style={{ height: 400, width: "100%" ,marginTop:20}}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totalData &&
              totalData.map((response) => {
                const { id, name, email } = response;
                return (
                  <TableRow
                    key={response.email}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <EditIcon onClick={() => editDataHandler(response)} />
                      <DeleteIcon onClick={() => deleteHandler(email)} />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
         
        </Table>
      </TableContainer>
      <Grid container sx={{justifyContent:"end",marginTop:2}}>
      <Pagination
            count={Math.ceil(clientData.length / itemPerPage)}
            page={page}
            onChange={pageChangeHandler}
          />
      </Grid>
      <EditClient
        data={editData}
        open={editOpen}
        closeHandler={modalCloseHandler}
      />
    </div>
  );
}

export default ClientList;
