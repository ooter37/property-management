import './AddTask.scss'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import {DatePicker,MuiPickersUtilsProvider,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PriceInput from '../../Functions/PriceInput'
import SelectInput from '../../Functions/SelectInput'
import NoteInput from '../../Functions/NoteInput'


// import FormControlLabel from '@material-ui/core/FormControlLabel';



// const taskSelections = [
//     {title: 'Tree Trimming'},
//     {title: 'Pool Repair'},
//     {title: 'House Repair'},
//     {title: 'Exterior Painting'},
// ];
const taskSelections = [
    'Tree Trimming',
    'Pool Repair',
    'House Repair',
    'Exterior Painting'
];

function AddTask(props) {
    const [type, setType] = useState('');
    const [date, setDate] = useState(new Date());
    const [price, setPrice] = useState(0)
    const [urgent, setUrgent] = useState(false)
    const [note, setNote] = useState('')
    const [contact, setContact] = useState('')

    //TEST HERE
    const submitNewTask = () => {
        if (props.user.data) {
            const userId = props.user.data.user_id
            const houseId = props.selectedHouse
            axios.post('/api/tasks', {userId, houseId, type, date, price, urgent, note, contact})
            .then(() => {
                axios.get(`/api/tasks/${props.selectedHouse}`).then(res => {
                    props.setTasks(res.data)
                })
            })
        }
    }

        return (
        <div>
            <form className='add-task-form' autoComplete="off" onSubmit={submitNewTask}>
                <div className='input-mini-container'> {/* Name and urgent checkbox container */}
                    <SelectInput selections={taskSelections} value={type} setValue={setType} />
                    <FormControlLabel control={<Checkbox checked={urgent} onChange={() => setUrgent(!urgent)} name="urgent"/>} label="Urgent"/>
                </div>
                <div className='input-mini-container'> {/* Date and price container */}
                    <TextField value={contact} onChange={(e) => setContact(e.target.value)} label="Serviceman" />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}> <DatePicker value={date} onChange={setDate}/> </MuiPickersUtilsProvider>
                </div>
                    <NoteInput note={note} setNote={setNote} />
                <div className='input-mini-container'>
                    <PriceInput label='Estimated cost.' price={price} setPrice={setPrice} />
                    <Button variant='contained' type='submit'>Submit</Button>
                </div>
            </form>
                {/* <button onClick={() => console.log(type)}>log</button> */}
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(AddTask)