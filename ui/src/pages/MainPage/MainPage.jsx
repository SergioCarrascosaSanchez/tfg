import MainImage from "../../assets/mainpageImage.svg"
import { Navbar, appName } from "../../components/Navbar/Navbar"
import { Box, Button, Typography, Modal, ModalDialog } from "@mui/joy"
import { LoginForm } from '../../components/LoginForm/LoginForm'
import { useState } from 'react'

export const mainPageTitle = `${appName}, la aplicacion de trading de simluacion`

export const altMainPageImage = "simpleMainPageImage"

export const textMainPage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

export const MainPage = () => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true)
    }
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("username")

    return(<>
        <Navbar/>
        <Box sx={{display:"grid", gridTemplateColumns: '55% 45%',gap:15, marginTop:"15vh", marginLeft:"15%",marginRight:"20%"}}>
            <Box sx={{gridColumn:1, alignItems:"center", justifyContent:"center", marginY:"auto"}}>
                <Typography level="display2" component="h1" sx={{marginBottom:"4vh"}}>{mainPageTitle}</Typography>
                <Typography sx={{marginBottom:"4vh"}} level="p" component="p">{textMainPage}</Typography>
                <Button onClick={handleClick}>Iniciar sesión</Button>
            </Box>
            <Box sx={{display: "flex", gridColumns:2, alignItems:"center", justifyContent:"center"}} > 
                <img src={MainImage} width="95%" height="auto" alt={altMainPageImage}></img>
            </Box>
            <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog
                sx={{
                    minWidth: "400px",
                    width: "23vw",
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
                >
                <LoginForm/>
                </ModalDialog>
            </Modal>
        </Box>
        
    </>)
}