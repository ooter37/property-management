import React, {useState} from 'react'

export default function useInput (name, placeholder, type, value, setValue){
    // const [field, setField] = useState('')

    const changeHandler = (e) => {
        setValue(e)
    }
    return (
        <input
        className={`${name}-input`}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={(e) => changeHandler(e)}
        ></input>
    )
}