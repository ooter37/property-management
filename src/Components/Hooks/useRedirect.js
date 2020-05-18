import { useState } from 'react'

export default function useRedirect() {
    const [redirect, setRedirect] = useState(false)
    // const toggleRedirect = () => {
    //     setRedirect(!redirect)
    // }
    return { redirect, setRedirect }
}