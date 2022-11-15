import { List, ListItem, Sheet, Typography } from "@mui/joy";

export const options = ["Mercados", "Mi perfil"]; 
export const appName = "Nombre"

export const Navbar = () => {
    return(
        <Sheet color="primary" variant="solid">
            <List row sx={{
                flexGrow: 0,
                marginLeft: '5%',
                marginRight:'5%',
                padding: '5px'
                }}>

                <ListItem>
                    <Typography textColor="white" level="h6" id={`${appName}Navbar`}>
                        {appName}
                    </Typography>
                </ListItem>
                
                {options.map(option => (
                    <ListItem key={`${option}Navbar}`} sx={{mx: "auto"}}>
                        <Typography textColor="white" level="h6" id={`${option}Navbar`}>
                            {option}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Sheet>
       
    )
}