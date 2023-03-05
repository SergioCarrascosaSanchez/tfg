package es.urjc.tfg.scarrascosa.restTesting;
import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static io.restassured.path.json.JsonPath.from;
import static org.hamcrest.CoreMatchers.hasItems;
import static org.hamcrest.CoreMatchers.not;
import static org.assertj.core.api.Assertions.assertThat;
import org.assertj.core.api.Assertions;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.hamcrest.Matchers;

import io.restassured.RestAssured;
import io.restassured.response.Response;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DisplayName("Student REST tests")
public class StudentRestTests {


    @LocalServerPort
    int port;

    @BeforeEach
    public void setUp() throws Exception {
        RestAssured.port = port;
    }

    @DisplayName("is able to buy a coin")
    @Test
    void BuyCoinTest() throws JSONException {
        
        String username = "User";
        
        Response getBalanceResponse =
            when().
                get("/users/"+username).
            then().
                statusCode(200).
            extract().response();
        
        Float initialBalanceFloat = from(getBalanceResponse.getBody().asString()).get("balance");
        
        Double initialBalance = initialBalanceFloat.doubleValue();
        
        String coin = "TestCoin1";
        double quantity = 2.0;
        double price = 0.4055;
        
        
        JSONObject trade = new JSONObject();
        trade.put("username", username);
        trade.put("coin", coin);
        trade.put("quantity", quantity);
        trade.put("price", price);
        
        given().
            contentType("application/json").
            body(trade.toString()).
        when().
            post("/purchase").
        then().
            statusCode(200);
        
        
        Response afterPurchaseResponse =
            when().
                get("/users/"+username).
            then().
                statusCode(200).
                body("portfolio.coin", hasItems(coin)).
            extract().response();
        
        Float finalBalanceFloat = from(afterPurchaseResponse.getBody().asString()).get("balance");
        Double finalBalance = finalBalanceFloat.doubleValue();
        Assertions.assertThat(finalBalance).isCloseTo((initialBalance - (quantity*price)), Assertions.within(0.0001)); 
    }
    
    @DisplayName("is able detect if has no balance enough to complete trade")
    @Test
    void NoBalanceTest() throws JSONException {
        
        String username = "User";
        
        Response getBalanceResponse =
            when().
                get("/users/"+username).
            then().
                statusCode(200).
            extract().response();
        
        Float initialBalanceFloat = from(getBalanceResponse.getBody().asString()).get("balance");
        
        Double initialBalance = initialBalanceFloat.doubleValue();
        
        String coin = "TestCoin2";
        double quantity = 0.95;
        double price = 200000.0;
        
        
        JSONObject trade = new JSONObject();
        trade.put("username", username);
        trade.put("coin", coin);
        trade.put("quantity", quantity);
        trade.put("price", price);
        
        given().
            contentType("application/json").
            body(trade.toString()).
        when().
            post("/purchase").
        then().
            statusCode(402); 
        
        
        Response getBalanceFinalResponse =
            when().
                get("/users/"+username).
            then().
                statusCode(200).
            extract().response();
        
        Float finalBalanceFloat = from(getBalanceFinalResponse.getBody().asString()).get("balance");
        
        Double finalBalance = finalBalanceFloat.doubleValue();
        Assertions.assertThat(finalBalance).isCloseTo(initialBalance, Assertions.within(0.0001));
    }
    
    @DisplayName("is able to sell a coin")
    @Test
    void SellCoinTest() throws JSONException {
        
        String username = "User";        
        String coin = "TestCoin3";
        double quantity = 2.0;
        double price = 0.4055;
        
        JSONObject trade = new JSONObject();
        trade.put("username", username);
        trade.put("coin", coin);
        trade.put("quantity", quantity);
        trade.put("price", price);
        
        given().
            contentType("application/json").
            body(trade.toString()).
        when().
            post("/purchase").
        then().
            statusCode(200);
        
        
        Response afterPurchaseResponse =
            when().
                get("/users/"+username).
            then().
                statusCode(200).
                body("portfolio.coin", hasItems(coin)).
            extract().response();
        
        Float afterPurchaseBalanceFloat = from(afterPurchaseResponse.getBody().asString()).get("balance");
        Double afterPurchaseBalance = afterPurchaseBalanceFloat.doubleValue();
        
        double quantity2 = 2.0;
        double price2 = 0.6055;
        
        JSONObject sellTrade = new JSONObject();
        sellTrade.put("username", username);
        sellTrade.put("coin", coin);
        sellTrade.put("quantity", quantity2);
        sellTrade.put("price", price2);
        
        given().
            contentType("application/json").
            body(sellTrade.toString()).
        when().
            post("/sell").
        then().
            statusCode(200);
        
        Response afterSellResponse =
            when().
                get("/users/"+username).
            then().
                statusCode(200).
                body("portfolio.coin", not(hasItems(coin))).
            extract().response();
            
        Float afterSellBalanceFloat = from(afterSellResponse.getBody().asString()).get("balance");
        Double afterSellBalance = afterSellBalanceFloat.doubleValue();
        Assertions.assertThat(afterSellBalance).isCloseTo((afterPurchaseBalance + (quantity2*price2)), Assertions.within(0.0001));
        
    }
    
    @DisplayName("is able detect if has no quantity enough to complete trade")
    @Test
    void SellCoinNotQuantityEnoughTest() throws JSONException {
        
        String username = "User";        
        String coin = "TestCoin3";
        double quantity = 2.0;
        double price = 0.4055;
        
        JSONObject trade = new JSONObject();
        trade.put("username", username);
        trade.put("coin", coin);
        trade.put("quantity", quantity);
        trade.put("price", price);
        
        given().
            contentType("application/json").
            body(trade.toString()).
        when().
            post("/purchase").
        then().
            statusCode(200);
        
        
        Response afterPurchaseResponse =
            when().
                get("/users/"+username).
            then().
                statusCode(200).
                body("portfolio.coin", hasItems(coin)).
            extract().response();
        
        Float afterPurchaseBalanceFloat = from(afterPurchaseResponse.getBody().asString()).get("balance");
        Double afterPurchaseBalance = afterPurchaseBalanceFloat.doubleValue();
        
        double quantity2 = 3.0;
        double price2 = 0.6055;
        
        JSONObject sellTrade = new JSONObject();
        sellTrade.put("username", username);
        sellTrade.put("coin", coin);
        sellTrade.put("quantity", quantity2);
        sellTrade.put("price", price2);
        
        given().
            contentType("application/json").
            body(sellTrade.toString()).
        when().
            post("/sell").
        then().
            statusCode(400);
        
        Response afterSellResponse =
            when().
                get("/users/"+username).
            then().
                statusCode(200).
                body("portfolio.coin", hasItems(coin)).
            extract().response();
            
        Float afterSellBalanceFloat = from(afterSellResponse.getBody().asString()).get("balance");
        Double afterSellBalance = afterSellBalanceFloat.doubleValue();
        Assertions.assertThat(afterSellBalance).isCloseTo(afterPurchaseBalance, Assertions.within(0.0001));
    }

}