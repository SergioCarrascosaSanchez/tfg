package es.urjc.tfg.scarrascosa.restTesting;
import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static io.restassured.path.json.JsonPath.from;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.hasItems;
import static org.hamcrest.CoreMatchers.not;

import java.util.LinkedList;

import org.assertj.core.api.Assertions;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

import io.restassured.RestAssured;
import io.restassured.response.Response;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DisplayName("Student REST tests")
public class StudentRestTests {
    @Value("${passwords.admin}")
    private String adminPass;
    
    private String adminToken;
    
    @LocalServerPort
    int port;

    @BeforeEach
    public void setUp() throws Exception {
        RestAssured.port = port;
        JSONObject admin = new JSONObject();
        admin.put("username", "Admin");
        admin.put("password", adminPass);
        
        Response response = given().
                contentType("application/json").
                body(admin.toString()).  
            when().
                post("/login").      
            then().
                statusCode(200)
            .extract().response();
        
        String responseToken = from(response.getBody().asString()).get("token");
        this.adminToken = "Bearer "+responseToken;
    }

    @DisplayName("is able to buy a coin")
    @Test
    void BuyCoinTest() throws JSONException {
        
        String username = "StudentForRestTest_1";
        String token = signupUser(username);
        
        Response getBalanceResponse =
            given().
                header("Authorization", token).
            when().
                get("/users/"+username).
            then().
                statusCode(200).
                body("username", equalTo(username)).
                body("role", equalTo("STUDENT")).
                body("tradeHistory", equalTo(new LinkedList<>())).
            extract().response();
        
        Float initialBalanceFloat = from(getBalanceResponse.getBody().asString()).get("balance");
        
        Double initialBalance = initialBalanceFloat.doubleValue();
        
        String coin = "TestCoin1";
        double quantity = 2.0;
        double price = 0.4055;
        String justification = "adjhagsdjkhgad";
        LinkedList<Double> list = new LinkedList<>();
        list.add(1.2);
        list.add(2.0);
        JSONArray pricesArray = new JSONArray(list);
        
        JSONObject trade = new JSONObject();
        trade.put("type", "BUY");
        trade.put("coin", coin);
        trade.put("quantity", quantity);
        trade.put("price", price);
        trade.put("justification", justification);
        trade.put("chartData", pricesArray);
        
        given().
            contentType("application/json").
            header("Authorization", token).
            body(trade.toString()).
        when().
            post("students/"+username+"/trade").
        then().
            statusCode(200);
        
        
        Response afterPurchaseResponse =
            given().
                header("Authorization", token).
            when().
                get("/users/"+username).
            then().
                statusCode(200).
                body("username", equalTo(username)).
                body("role", equalTo("STUDENT")).
                body("portfolio.coin", hasItems(coin)).
                body("tradeHistory.justification", hasItems(justification)).
                body("tradeHistory.coin", hasItems(coin)).
                body("tradeHistory.type", hasItems("BUY")).
            extract().response();
        
        Float finalBalanceFloat = from(afterPurchaseResponse.getBody().asString()).get("balance");
        Double finalBalance = finalBalanceFloat.doubleValue();
        Assertions.assertThat(finalBalance).isCloseTo((initialBalance - (quantity*price)), Assertions.within(0.0001)); 
    }
    
    @DisplayName("is able detect if has no balance enough to complete trade")
    @Test
    void NoBalanceTest() throws JSONException {
        
        String username = "StudentForRestTest_2";
        String token = signupUser(username);
        
        Response getBalanceResponse =
            given().
                header("Authorization", token).
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
        String justification = "adjhagsdjkhgad";
        LinkedList<Double> list = new LinkedList<>();
        list.add(1.2);
        list.add(2.0);
        JSONArray pricesArray = new JSONArray(list);
        
        JSONObject trade = new JSONObject();
        trade.put("type", "BUY");
        trade.put("coin", coin);
        trade.put("quantity", quantity);
        trade.put("price", price);
        trade.put("justification", justification);
        trade.put("chartData", pricesArray);
        
        given().
            contentType("application/json").
            header("Authorization", token).
            body(trade.toString()).
        when().
            post("students/"+username+"/trade").
        then().
            statusCode(402); 
        
        
        Response getBalanceFinalResponse =
            given().
                header("Authorization", token).
            when().
                get("/users/"+username).
            then().
                statusCode(200).
                body("username", equalTo(username)).
                body("role", equalTo("STUDENT")).
                body("tradeHistory", equalTo(new LinkedList<>())).
            extract().response();
        
        Float finalBalanceFloat = from(getBalanceFinalResponse.getBody().asString()).get("balance");
        
        Double finalBalance = finalBalanceFloat.doubleValue();
        Assertions.assertThat(finalBalance).isCloseTo(initialBalance, Assertions.within(0.0001));
    }
    
    @DisplayName("is able to sell a coin")
    @Test
    void SellCoinTest() throws JSONException {
        
        String username = "StudentForRestTest_3";
        String token = signupUser(username);
        
        String coin = "TestCoin3";
        double quantity = 2.0;
        double price = 0.4055;
        String justification = "adjhagsdjkhgad";
        LinkedList<Double> list = new LinkedList<>();
        list.add(1.2);
        list.add(2.0);
        JSONArray pricesArray = new JSONArray(list);
        
        JSONObject trade = new JSONObject();
        trade.put("type", "BUY");
        trade.put("coin", coin);
        trade.put("quantity", quantity);
        trade.put("price", price);
        trade.put("justification", justification);
        trade.put("chartData", pricesArray);
        
        given().
            contentType("application/json").
            header("Authorization", token).
            body(trade.toString()).
        when().
            post("students/"+username+"/trade").
        then().
            statusCode(200);
        
        
        Response afterPurchaseResponse =
            given().
                header("Authorization", token).
            when().
                get("/users/"+username).
            then().
                statusCode(200).
                body("username", equalTo(username)).
                body("role", equalTo("STUDENT")).
                body("portfolio.coin", hasItems(coin)).
                body("tradeHistory.justification", hasItems(justification)).
                body("tradeHistory.coin", hasItems(coin)).
                body("tradeHistory.type", hasItems("BUY")).
            extract().response();
        
        Float afterPurchaseBalanceFloat = from(afterPurchaseResponse.getBody().asString()).get("balance");
        Double afterPurchaseBalance = afterPurchaseBalanceFloat.doubleValue();
        
        double quantity2 = 2.0;
        double price2 = 0.6055;
        String justification2 = "adjhagsdjkhgad";
        LinkedList<Double> list2 = new LinkedList<>();
        list.add(1.2);
        list.add(2.0);
        JSONArray pricesArray2 = new JSONArray(list2);
        
        JSONObject sellTrade = new JSONObject();
        sellTrade.put("type", "SELL");
        sellTrade.put("coin", coin);
        sellTrade.put("quantity", quantity2);
        sellTrade.put("price", price2);
        sellTrade.put("justification", justification2);
        sellTrade.put("chartData", pricesArray2);
        
        given().
            contentType("application/json").
            header("Authorization", token).
            body(sellTrade.toString()).
        when().
            post("students/"+username+"/trade").
        then().
            statusCode(200);
        
        Response afterSellResponse =
            given().
                header("Authorization", token).
            when().
                get("/users/"+username).
            then().
                statusCode(200).
                body("username", equalTo(username)).
                body("role", equalTo("STUDENT")).
                body("portfolio.coin", not(hasItems(coin))).
                body("tradeHistory.justification", hasItems(justification, justification2)).
                body("tradeHistory.coin", hasItems(coin, coin)).
                body("tradeHistory.type", hasItems("BUY", "SELL")).
            extract().response();
            
        Float afterSellBalanceFloat = from(afterSellResponse.getBody().asString()).get("balance");
        Double afterSellBalance = afterSellBalanceFloat.doubleValue();
        Assertions.assertThat(afterSellBalance).isCloseTo((afterPurchaseBalance + (quantity2*price2)), Assertions.within(0.0001));
        
    }
    
    @DisplayName("is able detect if has no quantity enough to complete trade")
    @Test
    void SellCoinNotQuantityEnoughTest() throws JSONException {
        
        String username = "StudentForRestTest_4";
        String token = signupUser(username);
        
        String coin = "TestCoin4";
        double quantity = 2.0;
        double price = 0.4055;
        String justification = "adjhagsdjkhgad";
        LinkedList<Double> list = new LinkedList<>();
        list.add(1.2);
        list.add(2.0);
        JSONArray pricesArray = new JSONArray(list);
        
        JSONObject trade = new JSONObject();
        trade.put("type", "BUY");
        trade.put("coin", coin);
        trade.put("quantity", quantity);
        trade.put("price", price);
        trade.put("justification", justification);
        trade.put("chartData", pricesArray);
        
        given().
            contentType("application/json").
            header("Authorization", token).
            body(trade.toString()).
        when().
            post("students/"+username+"/trade").
        then().
            statusCode(200);
        
        
        Response afterPurchaseResponse =
            given().
                header("Authorization", token).
            when().
                get("/users/"+username).
            then().
                statusCode(200).
                body("username", equalTo(username)).
                body("role", equalTo("STUDENT")).
                body("portfolio.coin", hasItems(coin)).
                body("tradeHistory.justification", hasItems(justification)).
                body("tradeHistory.coin", hasItems(coin)).
                body("tradeHistory.type", hasItems("BUY")).
            extract().response();
        
        Float afterPurchaseBalanceFloat = from(afterPurchaseResponse.getBody().asString()).get("balance");
        Double afterPurchaseBalance = afterPurchaseBalanceFloat.doubleValue();
        
        double quantity2 = 3.0;
        double price2 = 0.6055;
        String justification2 = "adjhagsdjkhgad_2";
        LinkedList<Double> list2 = new LinkedList<>();
        list.add(1.2);
        list.add(2.0);
        JSONArray pricesArray2 = new JSONArray(list2);
        
        JSONObject sellTrade = new JSONObject();
        sellTrade.put("type", "SELL");
        sellTrade.put("coin", coin);
        sellTrade.put("quantity", quantity2);
        sellTrade.put("price", price2);
        sellTrade.put("justification", justification2);
        sellTrade.put("chartData", pricesArray2);
        
        given().
            contentType("application/json").
            header("Authorization", token).
            body(sellTrade.toString()).
        when().
            post("students/"+username+"/trade").
        then().
            statusCode(400);
        
        Response afterSellResponse =
            given().
                header("Authorization", token).
            when().
                get("/users/"+username).
            then().
                statusCode(200).
                body("username", equalTo(username)).
                body("role", equalTo("STUDENT")).
                body("portfolio.coin", hasItems(coin)).
                body("tradeHistory.justification", hasItems(justification)).
                body("tradeHistory.justification", not(hasItems(justification2))).
                body("tradeHistory.coin", hasItems(coin)).
                body("tradeHistory.type", hasItems("BUY")).
                body("tradeHistory.type", not(hasItems("SELL"))).
            extract().response();
            
        Float afterSellBalanceFloat = from(afterSellResponse.getBody().asString()).get("balance");
        Double afterSellBalance = afterSellBalanceFloat.doubleValue();
        Assertions.assertThat(afterSellBalance).isCloseTo(afterPurchaseBalance, Assertions.within(0.0001));
    }
    
    @Test
    void rejectAcessToOtherUserData() throws JSONException {
        String username = "StudentForRestTest_5";
        String token = signupUser(username);
        
        given().
            header("Authorization", token).
        when().
            get("/users/"+username).
        then().
            statusCode(200);
        
        String username2 = "StudentForRestTest_6";
        signupUser(username2);
        
        given().
            header("Authorization", token).
        when().
            get("/users/"+username2).
        then().
            statusCode(403);    
    }
    
    @Test
    void rejectTradesForOtherStudent() throws JSONException {
        String username = "StudentForRestTest_7";
        String token = signupUser(username);
        
        String username2 = "StudentForRestTest_8";
        signupUser(username2);
        
        String coin = "TestCoin5";
        double quantity = 2.0;
        double price = 0.4055;
        String justification = "adjhagsdjkhgad";
        LinkedList<Double> list = new LinkedList<>();
        list.add(1.2);
        list.add(2.0);
        JSONArray pricesArray = new JSONArray(list);
        
        JSONObject trade = new JSONObject();
        trade.put("type", "BUY");
        trade.put("coin", coin);
        trade.put("quantity", quantity);
        trade.put("price", price);
        trade.put("justification", justification);
        trade.put("chartData", pricesArray);
        
        given().
            contentType("application/json").
            header("Authorization", token).
            body(trade.toString()).
        when().
            post("students/"+username2+"/trade").
        then().
            statusCode(403);
    }
    
    @Test
    void rejectAccionsWithoutCorrectToken() throws JSONException {
        String username = "StudentForRestTest_9";
        String token = signupUser(username);
        
        given().
            contentType("application/json").
        when().
            get("users/"+username).
        then().
            statusCode(403);
        
        
        given().
            contentType("application/json").
            header("Authorization", "").
        when().
            get("users/"+username).
        then().
            statusCode(403);
        
        
        given().
            contentType("application/json").
            header("Authorization", token.substring(7)).
        when().
            get("users/"+username).
        then().
            statusCode(403);
        
        
        given().
            contentType("application/json").
            header("Authorization", token.substring(0, token.length()-1)).
        when().
            get("users/"+username).
        then().
            statusCode(403);
        
        
        String coin = "TestCoin5";
        double quantity = 2.0;
        double price = 0.4055;
        String justification = "adjhagsdjkhgad";
        LinkedList<Double> list = new LinkedList<>();
        list.add(1.2);
        list.add(2.0);
        JSONArray pricesArray = new JSONArray(list);
        
        JSONObject trade = new JSONObject();
        trade.put("type", "BUY");
        trade.put("coin", coin);
        trade.put("quantity", quantity);
        trade.put("price", price);
        trade.put("justification", justification);
        trade.put("chartData", pricesArray);
        
        
        given().
            contentType("application/json").
            body(trade.toString()).
        when().
            post("students/"+username+"/trade").
        then().
            statusCode(403);
        
        given().
            contentType("application/json").
            header("Authorization", "").
            body(trade.toString()).
        when().
            post("students/"+username+"/trade").
        then().
            statusCode(403);
        
        
        given().
            contentType("application/json").
            header("Authorization", token.substring(7)).
            body(trade.toString()).
        when().
            post("students/"+username+"/trade").
        then().
            statusCode(403);
        
        trade.put("type", "SELL");
        
        given().
            contentType("application/json").
            header("Authorization", "").
            body(trade.toString()).
        when().
            post("students/"+username+"/trade").
        then().
            statusCode(403);
        
        
        trade.put("type", "BUY");
        
        given().
            contentType("application/json").
            header("Authorization", token.substring(0, token.length() -1)).
            body(trade.toString()).
        when().
            post("students/"+username+"/trade").
        then().
            statusCode(403);
        
        trade.put("type", "SELL");
        
        given().
            contentType("application/json").
            header("Authorization", token.substring(7)).
            body(trade.toString()).
        when().
            post("students/"+username+"/trade").
        then().
            statusCode(403);
    
    
        given().
            contentType("application/json").
            header("Authorization", token.substring(0, token.length() -1)).
            body(trade.toString()).
        when().
            post("students/"+username+"/trade").
        then().
            statusCode(403);
    }
    
    @Test
    void rejectTradesWithIncorrectType() throws JSONException {
        String username = "StudentForRestTest_10";
        String token = signupUser(username);
        
        String coin = "TestCoin7";
        double quantity = 2.0;
        double price = 0.4055;
        String justification = "adjhagsdjkhgad";
        LinkedList<Double> list = new LinkedList<>();
        list.add(1.2);
        list.add(2.0);
        JSONArray pricesArray = new JSONArray(list);
        
        JSONObject trade = new JSONObject();
        trade.put("type", "COMPRA");
        trade.put("coin", coin);
        trade.put("quantity", quantity);
        trade.put("price", price);
        trade.put("justification", justification);
        trade.put("chartData", pricesArray);
        
        given().
            contentType("application/json").
            header("Authorization", token).
            body(trade.toString()).
        when().
            post("students/"+username+"/trade").
        then().
            statusCode(400);
    }
    
    String signupUser(String username) throws JSONException {
        LinkedList<String> roles = new LinkedList<>();
        roles.add("STUDENT");
        String email = "StudentForRestTest@email.com";
        String password = "StudentForRestTest";
        double balance = 1000.0;
        
        JSONObject student = new JSONObject();
        JSONArray rolesArray = new JSONArray(roles);
        student.put("roles", rolesArray);
        student.put("username", username);
        student.put("email", email);
        student.put("password", password);
        student.put("initialBalance", balance);

        given().
            contentType("application/json").
            header("Authorization", this.adminToken).
            body(student.toString()).
        when().
            post("/signup").      
        then().
            statusCode(200);
        
        JSONObject studentLogin = new JSONObject();
        studentLogin.put("username", username);
        studentLogin.put("password", password);

        Response response = given().
            contentType("application/json").
            body(studentLogin.toString()).
        when().
            post("/login").      
        then().
            statusCode(200)
            .extract().response();
        
        String token = from(response.getBody().asString()).get("token");
        return "Bearer "+token;
        
    }

}