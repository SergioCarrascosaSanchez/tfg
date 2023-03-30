package es.urjc.tfg.scarrascosa.restTesting;
import static io.restassured.RestAssured.given;
import static io.restassured.path.json.JsonPath.from;
import static org.hamcrest.CoreMatchers.anything;
import static org.hamcrest.CoreMatchers.equalTo;

import java.util.LinkedList;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

import io.restassured.RestAssured;
import io.restassured.response.Response;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DisplayName("Auth REST tests")
public class AdminRestTest {

    @Value("${passwords.admin}")
    private String adminPass;
    
    @LocalServerPort
    int port;

    @BeforeEach
    public void setUp() throws Exception {
        RestAssured.port = port;
    }

    @DisplayName("is able get Admin data")
    @Test
    void adminLogin() throws JSONException {

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
        String token = "Bearer "+responseToken;
        
        System.out.println(token);
        
        given().
            header("Authorization", token).
        when().
            get("/users/"+"Admin").
        then().
            statusCode(200).
            body("username", equalTo("Admin")).
            body("role", equalTo("ADMIN"));
  
    }
    
    
}
