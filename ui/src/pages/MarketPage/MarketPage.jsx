import { TextField, Button } from "@mui/joy";

export const MarketName = "Mercados"
export const popularCryptocurrencies = ["BTC", "ETH", "BNB", "XRP", "DOGE", "ADA", "SOL", "MATIC", "DOT", "SHIB"]
export const popularCryptocurrenciesPrices = { "BTC": 1, 
                                        "ETH" : 2,
                                        "BNB": 3,
                                        "XRP": 4,
                                        "DOGE": 5,
                                        "ADA": 6,
                                        "SOL": 7,
                                        "MATIC": 8,
                                        "DOT": 9,
                                        "SHIB": 10}
export const MarketPage = () => {
    return(
        <>
            <h1>{MarketName}</h1>
            <TextField></TextField>
            <Button>Buscar</Button>
            {popularCryptocurrencies.map(cryto => <div>
                <h3>{cryto}</h3>
                <h4 id={`${cryto}Price`}>{popularCryptocurrenciesPrices[cryto]}</h4>
                <div id={`${cryto}Graph`}></div>
                </div>
            )}
        </>
    )
}