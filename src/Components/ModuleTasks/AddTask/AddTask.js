import React, {useState, useRef} from 'react'
// import Swal from 'sweetalert2/src/sweetalert2.js'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import './AddTask.scss'

export default function AddTask(props) {
    // const [type,setType] = useState()
    const [startDate, setStartDate] = useState(new Date());
    const addTask = (name,date) => {
        console.log(name,date)
    }
    const MySwal = withReactContent(Swal)
    
    return (
        <div>
            Add Task Component
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            <button
                        className='button edit-baby-button'
                        onClick={() => {
                            MySwal.mixin({
                                input: 'text',
                                confirmButtonText: 'Next &rarr;',
                                showCancelButton: true,
                                progressSteps: ['1', '2']
                            }).queue([
                                {title: 'Name',
                                html: <DatePicker className='datepicker' selected={startDate} onChange={date => setStartDate(date)} />,
                                inputValue: `${moment(startDate).format("MMMM Do")}`,
                                inputValidator: (value) => {if (!value) return 'Please enter a name.'}
                            },
                                {title: 'Identifier',
                                text: 'Enter a new identifier or leave as is to keep existing identifier.', 
                                // inputValue: `${this.state.babyIdentifier}`,
                                inputValidator: (value) => {if (value.length < 4) return 'Please enter an identifier that is at least four characters in length.'}
                            }])
                                .then((result) => {
                                    if (result.value) {
                                        this.updateBaby(result.value[0],result.value[1])
                                    }
                                })
                        }}
                    >Edit Baby</button>
            <button onClick={() => {
                MySwal.fire({
                    title: <p>Hello World</p>,
                    footer: 'Copyright 2018',
                    html: <DatePicker selected={startDate} onChange={date => setStartDate(date)} />,
                    // onOpen: () => {
                    //   // `MySwal` is a subclass of `Swal`
                    //   //   with all the same instance & static methods
                    //   MySwal.clickConfirm()
                    // }
                  })
                //   .then(() => {
                //     return MySwal.fire(<p>Shorthand works too</p>)
                //   })
                console.log(startDate)
            }}>Swal</button>
            <button onClick={() => console.log(startDate)}>check</button>
        </div>
    )
}