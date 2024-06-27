import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import ThemeContext from "../../Context";


function EditClient({data,open,closeHandler}) {
  const {tempData,setTempData} = React.useContext(ThemeContext);   
  const [emailText, setEmailText] = useState("");
  const [emailOld,setEmailOld] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error,setError] = useState(false);

  const dataHandler = (editData) =>{
    setEmailText(editData?.email);
    setName(editData?.name);
    setEmailOld(editData?.email);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  

  useEffect(()=>{
    setIsOpen(open);
    dataHandler(data);
  },[open]);



  const handleClose = () => {
    setIsOpen(false);
    closeHandler();
  };

  const editDataHandler = () =>{
    const clientData = [...tempData];
    if(clientData.some((res) => res.email === emailText && res.email !== emailOld)){
        setError('Email address is already exist')
        return; 
    }

    const updateData = clientData.map(response => {
        if(response.email === emailOld){
            return {...response,name,email:emailText}
        }
        closeHandler();
        return response;
    });

    setTempData(updateData);
};

  // usually  i use formik to reduce state and for validation but currently i using simple state

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography> Edit Client </Typography>
        <Grid container gap={2}>
          <Grid>
            <TextField
              name="email"
              value={emailText}
              fullWidth
              error={error}
              placeholder="Enter your Email"
              onChange={(event) => setEmailText(event.target.value)}
            />
            {error && <h3>{error}</h3>}
          </Grid>
          <Grid>
            <TextField name="name" fullWidth placeholder="Enter your Name" onChange={(event) =>setName(event.target.value)} value={name}/>
          </Grid>
        </Grid>
          <Grid>
            <Button variant="contained" disabled={!name || !emailText} onClick={()=>editDataHandler()}>Save</Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default EditClient;
