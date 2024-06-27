import { Button, Input } from "@mui/material";

function UploadData({clientRecordHandler}) {

    const jsonFileHandler = () =>{
        document.getElementById("fileInput").click();
    };

    const handleChange = (event) =>{
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0], "UTF-8");
        fileReader.onload = event => {
            event.target.result
            // here we are passing Json File data to Parent componet no need to manage state golbally
            clientRecordHandler(JSON.parse(event.target.result))
        };

        
    };


  return (
    <>
        <Input type="file"  id="fileInput" style={{ display: "none" }} accept={'.json'} onChange={handleChange} />

        <Button variant="contained" onClick={()=>jsonFileHandler()}>Upload Json File</Button>
    </>
  )
}

export default UploadData