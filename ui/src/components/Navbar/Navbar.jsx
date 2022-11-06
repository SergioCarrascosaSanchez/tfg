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
                    <Typography textColor="white" level="h6">
                        {appName}
                    </Typography>
                </ListItem>
                
                {options.map(option => (
                    <ListItem key={option} sx={{mx: "auto"}}>
                        <Typography textColor="white" level="h6">
                            {option}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Sheet>
       
    )
}