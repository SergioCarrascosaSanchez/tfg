package es.urjc.tfg.scarrascosa;

import static io.restassured.path.json.JsonPath.from;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
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
                    get("/prices-api/last/{ticker}",ticker).
                then().
                    statusCode(200).extract().response();
        
        Float priceResponse = from(response.getBody().asString()).get("price");
        
        assertThat(Double.valueOf(priceResponse.toString())).isEqualTo(price2);
            
        
    }
    
    @ParameterizedTest
    @CsvSource({
    "prices-api/last/SCSBUSD2",
    "prices-api/10s/SCSBUSD3"
    })
    void getPriceTestNotFound(String endpoint) {
        
        when().
            get(endpoint).
        then().
            statusCode(404);
    }
    
    @Test
    void get10sPricesTest() {
        
        String ticker = "SCSBUSD4";
        Double price1 = 10.0;
        Double price2 = 1275.12;
        
        Coin coin = new Coin(ticker);
        
        this.coinRepository.save(coin);
        
        Response response =
                when().
                    get("/prices-api/30m/{ticker}",ticker).
                then().
                    statusCode(200).extract().response();
        
        List<Float> priceResponse = from(response.getBody().asString()).get("prices");
        assertThat(priceResponse).isEqualTo(Arrays.asList());
        
        coin.addLastPrice(price1);
        coin.addLastPrice(price2);
        
        this.coinRepository.save(coin);
        
        Response response2 =
                when().
                    get("/prices-api/10s/{ticker}",ticker).
                then().
                    statusCode(200).extract().response();
        
        List<Float> priceResponse2 = from(response2.getBody().asString()).get("prices");
        List<Double> priceResponseDoubles = priceResponse2.stream().map(floatNumber -> Double.valueOf(floatNumber.toString())).toList();
        assertThat(priceResponseDoubles).isEqualTo(Arrays.asList(price1, price2));
             
    }
    
    @Test
    void get30mPricesTest() {
        
        String ticker = "SCSBUSD5";
        Double price1 = 10.0;
        Double price2 = 1275.12;
        
        Coin coin = new Coin(ticker);
        
        this.coinRepository.save(coin);
        
        Response response =
                when().
                    get("/prices-api/30m/{ticker}",ticker).
                then().
                    statusCode(200).extract().response();
        
        List<Float> priceResponse = from(response.getBody().asString()).get("prices");
        assertThat(priceResponse).isEqualTo(Arrays.asList());
        
        coin.add30mPrice(price1);
        coin.add30mPrice(price2);
        
        this.coinRepository.save(coin);
        
        
        
        Response response2 =
                when().
                    get("/prices-api/30m/{ticker}",ticker).
                then().
                    statusCode(200).extract().response();
        
        List<Float> priceResponse2 = from(response2.getBody().asString()).get("prices");
        List<Double> priceResponseDoubles = priceResponse2.stream().map(floatNumber -> Double.valueOf(floatNumber.toString())).toList();
        assertThat(priceResponseDoubles).isEqualTo(Arrays.asList(price1, price2));
             
    }
    

}