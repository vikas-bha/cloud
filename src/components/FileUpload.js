import React from 'react'
import { useState } from 'react'
import axios from "axios";
import './FileUpload.css';
const FileUpload = ({contract, account, provider}) => {

  const [file, setFile] = useState(null);
  const [fileName , setFileName] = useState("NO image selected");
  const handleSubmit= async(e)=>{
    e.preventDefault();
    if(file){
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `dd6d8eb045dda73c4dbe`,
            pinata_secret_api_key: `afafec62495061dbfb112339db5c3ded19f661c6d4a53ff0a3d924a5c76a56b3`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;

       // const signer = contract.connect(provider.getSigner())
       // add function is written in the upload contract
        contract.add(account, ImgHash);
        alert("successfulyy image uploaded")
        setFileName("No image selected");
        setFile(null);
      } catch (error) {
        alert("unable to upload the image to pinata")
        
      }
    }


  }
  const retreiveFile = (e)=>{
    const data = e.target.files[0];
    // files is an array which keeps the object of the selected file
    // since we have to select one this files[0]
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend=()=>{
      setFile(e.target.files[0]);
    }
    // if you have read the whole file totally then do the following operation
    setFileName(e.target.files[0].name);
    e.preventDefault();
  }
  return (
    <div className='top'>
      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor='file-upload' className='choose'>choose Image</label>
        <input disabled={!account} type={"file"} id="file-upload" name='data' onChange={retreiveFile}/>
        <span className='textArea'>Image :{fileName}</span>
        <button type='submit' disabled={!file} className='upload'>Submit</button>
      </form>
    </div>
  )
}

export default FileUpload