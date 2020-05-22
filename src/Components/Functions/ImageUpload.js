import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Swal from 'sweetalert2'

export default function ImageUpload(props) {
    // const [success, setSuccess] = useState(false)
    // const [url, setUrl] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    
    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader()
            reader.onload = (e) => {
                Swal.fire({
                title: 'Uploaded Picture',
                imageUrl: e.target.result,
                imageAlt: 'The uploaded picture',
                showCancelButton: true
            }).then(res => {
                if (res.value) {
                    sendFile(selectedFile)
                } else {
                    setSelectedFile('')
                }
            })
            }
            reader.readAsDataURL(selectedFile)
        }
    }, [selectedFile])

    // function changeHandler(e) {
    //     setSuccess(false)
    //     setUrl('')}

    function sendFile(e) {
    let fileParts = e.name.split('.')
    // let fileName = fileParts[0]
    let fileName = props.selectedHouse
    axios.post('/sign_s3', {fileName : fileName,fileType : fileParts[1]}).then(res => {
        // setUrl(res.data.data.returnData.url)
        console.log(`Recieved signed request: ${res.data.data.returnData.signedRequest}`)
        axios.put(res.data.data.returnData.signedRequest,selectedFile,{headers: {'Content-Type': fileParts[1]}})
        .then(() => {
            axios.put(`/api/houses/${fileName}`)
        console.log("File upload successful.")
        // setSuccess(true)
    }).then(() => {
        props.setHouses('')
            console.log('starting the axios call to update houses')
        axios.get('/api/houses').then(res => {
            props.setHouses(res.data)
            console.log('all complete')
            // if (res.data[0]){props.setSelectedHouse(res.data[0].house_id)}
})
    })
    .catch(err => {
        alert("ERROR " + JSON.stringify(err));
    })
    })
    .catch(err => {
        alert(JSON.stringify(err));
    })
}

// const successMessage = () => (
//     <div style={{padding:50}}>
//         <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
//         <a href={url}>View uploaded image</a>
//         <br/>
//     </div>)
    
    return (
    <div>
        <button onClick={() => {
            // props.setHouses('')
            console.log(props.houses)
            }}>console log</button>
        {/* <button onClick={sendFile}>UPLOAD</button> */}
            <IconButton onClick={() => {
                            Swal.mixin({
                                confirmButtonText: 'Next &rarr;',
                                showCancelButton: true,
                            }).queue([
                                {title: 'Update House Picture',
                                input: 'file',
                                inputAttributes: {
                                    'accept': 'image/*',
                                    'aria-label': 'Upload your profile picture'
                                },
                                inputValue: `${selectedFile}`,
                                inputValidator: (value) => {if (!value) return 'Please select an image.'},
                                preConfirm: async (file) => {
                                    if (file) {
                                        return file}}
                            }]).then((result) => {
                                    if (result.value) {
                                        setSelectedFile(result.value[0])}
                                })
                        }} color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
            </IconButton>
    </div>)
}