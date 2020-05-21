import React, { useState, useRef } from 'react';
import axios from 'axios';

export default function FileUpload() {
  const [success, setSuccess] = useState(false)
  const [url, setUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState([])

  function changeHandler(e) {
    setSuccess(false)
    setUrl('')
    console.log(e)
  }
  
  
  function onFileChange(e) {
    setSelectedFile(e.target.files[0])
    console.log(e.target.files[0])
    console.log(selectedFile)
  }
  function onFileUpload() {
    const formData = new FormData()
    formData.append(
      "myFile",
      selectedFile,
      selectedFile.name
    )
  }

  function uploadFile(e) {
    let file = file.files[0]
    let fileParts = file.files[0].name.split('.')
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    axios.post('/sign_s3', {
      fileName : fileName,
      fileType : fileType
    }).then(res => {
      const returnData = res.data.data.returnData;
      const signedRequest = returnData.signedRequest;
      const url = returnData.url
      setUrl(url)
      console.log("Recieved a signed request " + signedRequest)
      var options = {
        headers: {
          'Content-Type': fileType
        }
      }
      axios.put(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3")
        setSuccess(true)
      })
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }

  const Success_message = () => (
    <div style={{padding:50}}>
      <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
      <a href={url}>Access the file here</a>
      <br/>
    </div>
  )

  return (
    <div className="App">
        <center>
          <h1>UPLOAD A FILE</h1>
          {success ? <Success_message/> : null}
          <input onChange={onFileChange} type="file"/>
          <br/>
          <button onClick={uploadFile}>UPLOAD</button>
        </center>
      </div>
  )

}