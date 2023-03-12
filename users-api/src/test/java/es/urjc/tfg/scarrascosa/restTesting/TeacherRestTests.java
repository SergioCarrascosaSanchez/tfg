package es.urjc.tfg.scarrascosa.restTesting;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.jupiter.api.Assertions.*;

import java.util.LinkedList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

import io.restassured.RestAssured;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DisplayName("Teacher REST tests")
class TeacherRestTests {
    
    @LocalServerPort
    int port;

    @BeforeEach
    public void setUp() throws Exception {
        RestAssured.port = port;
    }
    
    @Test
    void getTeacherDataByUsername() throws JSONException {
        String username = "teacherRestTest_1";
        teacherSignUp(username);
        when().
            get("/teacher/"+username).
        then().
            statusCode(200).
            body("username", equalTo(username)).
            body("studentList", equalTo(new LinkedList<>()));
    }
    
    void teacherSignUp(String username) throws JSONException {
        
        LinkedList<String> teacherRoles = new LinkedList<>();
        teacherRoles.add("TEACHER");
        
        String email = username+"@email.com";
        String password = "pass";
        
        JSONObject teacher = new JSONObject();
        JSONArray teacherRolesArray = new JSONArray(teacherRoles);
        teacher.put("roles", teacherRolesArray);
        teacher.put("username", username);
        teacher.put("email", email);
        teacher.put("password", password);
        
        given().
            contentType("application/json").
            body(teacher.toString()).
        when().
            post("/signup").      
        then().
            statusCode(200);
        
    }

}
