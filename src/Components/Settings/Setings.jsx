import React, { useEffect } from 'react'
import { useUsers } from '../../Features/Context/Context.jsx/AllContext'

function Setings() {

    const {getAllAdmins} = useUsers();

    useEffect(()=>{
getAllAdmins();
    },[])
    return (
        <div>Settings</div>
    )
}

export default Setings
