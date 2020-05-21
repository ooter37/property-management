import React, { useState } from 'react';
import axios from 'axios';

export default function FileUpload() {
  const [success, setSuccess] = useState(false)
  const [url, setUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState('')

  function changeHandler(e) {
    setSuccess(false)
    setUrl('')
    setSelectedFile(e.target.files[0])
  }

  function sendFile(e) {
    let fileParts = selectedFile.name.split('.')
    axios.post('/sign_s3', {fileName : fileParts[0],fileType : fileParts[1]}).then(res => {
      setUrl(res.data.data.returnData.url)
      console.log(`Recieved signed request: ${res.data.data.returnData.signedRequest}`)
      axios.put(res.data.data.returnData.signedRequest,selectedFile,{headers: {'Content-Type': fileParts[1]}})
      .then(() => {
        console.log("File upload successful.")
        setSuccess(true)
      })
      .catch(err => {
        alert("ERROR " + JSON.stringify(err));
      })
    })
    .catch(err => {
      alert(JSON.stringify(err));
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
          <input onChange={changeHandler} type="file"/>
          <br/>
          <button onClick={sendFile}>UPLOAD</button>
        </center>
      </div>
  )

}