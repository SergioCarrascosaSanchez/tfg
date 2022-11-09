import { TextField, Button, Box, Typography, Card } from "@mui/joy";
import { Navbar } from "../../components/Navbar/Navbar";

export const MarketName = "Mercados"
export const popularCryptocurrencies = ["BTC", "ETH", "BNB", "XRP", "DOGE", "ADA", "SOL", "MATIC", "DOT"]
export const popularCryptocurrenciesPrices = { "BTC": "19.700$", 
                                        "ETH" : "1.504$",
                                        "BNB": "366.2$",
                                        "XRP": "0.44$",
                                        "DOGE": "0.105$",
                                        "ADA": "0.4$",
                                        "SOL": "26.8$",
                                        "MATIC": "1.14$",
                                        "DOT": "6.68$"}
export const MarketPage = () => {
    return(
        <>
            <Navbar/>
            <Box sx={{mx:"20vw", my:"5vh"}}>
                <Typography level="display2" component="h1" sx={{my:"2vh"}}>
                    {MarketName}
                </Typography>
                <Box sx={{display:"grid", gridTemplateColumns: '80% 10%',gap:1, justifyContent: "space-between"}}>
                    <TextField sx={{gridColumn:1}} placeholder="Buscar criptomoneda"></TextField>
                    <Button sx={{gridColumn:2, minWidth: "90px"}}>Buscar</Button>
                </Box>
                <Box component="ul" sx={{ display: 'flex', gap: 8, flexWrap: 'wrap', p: 0, my: 4 }}>
                {popularCryptocurrencies.map(cryto => 
                    <Card key={`${cryto}Card`} component="li" variant="outlined" sx={{ flexGrow: 1, maxWidth:"300px"}}>
                        <Box sx={{display:"grid", gridTemplateColumns: '50% 50%', gap:0, marginBottom:2}}>
                            <Typography level="h2" component="h2" sx={{gridColumn:1, textAlign: "left"}}>{cryto}</Typography>
                            <Typography level="h2" id={`${cryto}Price`} sx={{gridColumn:2, textAlign: "right"}}>{popularCryptocurrenciesPrices[cryto]}</Typography>
                        </Box>
                        <Box element="div" id={`${cryto}Graph`} sx={{width: "250px", height: "200px", backgroundColor: "#cfcfcf", margin: "auto", borderRadius: "12px"}}></Box>
                    </Card>
                )}
                </Box>
            </Box>
        </>
    )
}