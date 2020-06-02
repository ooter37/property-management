import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function NoteInput(props) {
    const {note, setNote} = props
    const handleChange = (event) => {
        setNote(event.target.value);
    };
    
    return (
    <TextField
        id="standard-multiline-static"
        label="Notes"
        multiline
        rows={4}
        // defaultValue="Default Value"
        value={note}
        onChange={handleChange}
    />
    );
}