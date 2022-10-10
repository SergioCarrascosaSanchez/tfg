package es.urjc.tfg.scarrascosa;

import static io.restassured.path.json.JsonPath.from;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import es.urjc.tfg.scarrascosa.Coin.Coin;
import es.urjc.tfg.scarrascosa.Coin.CoinRepository;
import io.restassured.RestAssured;
import io.restassured.response.Response;

import static io.restassured.RestAssured.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RestControllerTests {

    @Autowired
    private CoinRepository coinRepository;
    
    @LocalServerPort
    int port;

    @BeforeEach
    public void setUp() throws Exception {
        RestAssured.port = port;
    }
    
    @Test
    void getLastPriceTest() {
        
        String ticker = "SCSBUSD1";
        Double price1 = 10.0;
        Double price2 = 1275.12;
        
        Coin coin = new Coin(ticker);
        coin.addLastPrice(price1);
        coin.addLastPrice(price2);
        
        this.coinRepository.save(coin);
        
        
        
        Response response =
                when().
                    get("/prices-api/{ticker}/last",ticker).
                then().
                    statusCode(200).extract().response();
        
        Float priceResponse = from(response.getBody().asString()).get("price");
        
        assertThat(Double.valueOf(priceResponse.toString())).isEqualTo(price2);
            
        
    }

}
