import * as React from 'react';
import Box from '@mui/joy/Box';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import { Typography } from "@mui/joy";
import { useState } from "react";

export const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
        setLoading(true)
        setTimeout(() => setLoading(false), 3000);
    }

    const handleChange = (event) => {
        switch (event.target.name){
            case "username": 
                setUsername(event.target.value)
                break
            case "password": 
                setPassword(event.target.value)
                break
        }
    }

    let LoadingButton

    if(!loading){
        LoadingButton = 
            <Button variant="solid" onClick={handleSubmit}>
                Iniciar sesión
            </Button>
    }
    else{
        LoadingButton = 
        <Button variant="solid" onClick={handleSubmit} loading>
        </Button>
    }

    return ( 
    <>
        
        <Box
            sx={{
                py: 5,
                px: 5,
                display: 'grid',
                gap: 2,
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
            >
            <Typography level="h2">Iniciar sesión</Typography>
            <TextField name="username" label="Usuario" variant="outlined" onChange={handleChange}/>
            <TextField name="password" role="password" label="Contraseña" type="password" variant="outlined" onChange={handleChange}/>
            {LoadingButton}
        </Box>
        
    </> 
    )
}