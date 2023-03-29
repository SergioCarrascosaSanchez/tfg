package es.urjc.tfg.scarrascosa.restTesting;
import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static io.restassured.path.json.JsonPath.from;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.hasItems;
import static org.hamcrest.CoreMatchers.anything;

import java.util.Arrays;
import java.util.LinkedList;

import static org.assertj.core.api.Assertions.assertThat;
import org.assertj.core.api.Assertions;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.hamcrest.Matchers;

import io.restassured.RestAssured;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DisplayName("Auth REST tests")
public class AuthRestTests {


    @LocalServerPort
    int port;

    @BeforeEach
    public void setUp() throws Exception {
        RestAssured.port = port;
    }

    @DisplayName("is able to signup a new Student")
    @Test
    void StudentSignUp() throws JSONException {
        
        LinkedList<String> roles = new LinkedList<>();
        roles.add("STUDENT");
        String username = "StudentForRestTest";
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
            body(student.toString()).
        when().
            post("/signup").      
        then().
            statusCode(200);
        
        JSONObject studentLogin = new JSONObject();
        studentLogin.put("username", username);
        studentLogin.put("password", password);

        given().
            contentType("application/json").
            body(studentLogin.toString()).
        when().
            post("/login").
        then().
            statusCode(200).
            body("token", anything());
  
    }
    
    @DisplayName("it is able to prevent the signup of a new user who has a role other than Student or Teacher")
    @Test
    void NotStudentSignUp() throws JSONException {
        LinkedList<String> notStudentRoles = new LinkedList<>();
        notStudentRoles.add("NOT_STUDENT");
        
        String username = "StudentForRestTest2";
        String email = "StudentForRestTest2@email.com";
        String password = "StudentForRestTest";
        double balance = 1000.0;
        
        JSONObject notStudent = new JSONObject();
        JSONArray notStudentRoleArray = new JSONArray(notStudentRoles);
        notStudent.put("roles", notStudentRoleArray);
        notStudent.put("username", username);
        notStudent.put("email", email);
        notStudent.put("password", password);
        notStudent.put("initialBalance", balance);
        
        given().
            contentType("application/json").
            body(notStudent.toString()).
        when().
            post("/signup").      
        then().
            statusCode(400);
        
    }
    
    @DisplayName("is able to prevent signup when a username is already used")
    @Test
    void UsernameAlreadyUsed() throws JSONException {
        
        LinkedList<String> roles = new LinkedList<>();
        roles.add("STUDENT");
        String username = "StudentForRestTest3";
        String email = "StudentForRestTes3t@email.com";
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
            body(student.toString()).
        when().
            post("/signup").      
        then().
            statusCode(200);
        
        JSONObject studentLogin = new JSONObject();
        studentLogin.put("username", username);
        studentLogin.put("password", password);

        given().
            contentType("application/json").
            body(studentLogin.toString()).
        when().
            post("/login").      
        then().
            statusCode(200).
            body("token", anything());
        
        
        given().
            contentType("application/json").
            body(student.toString()).
        when().
            post("/signup").      
        then().
            statusCode(409);
  
    }
    
    @DisplayName("is able to signup a new Teacher")
    @Test
    void TeacherSignUp() throws JSONException {
        LinkedList<String> teacherRoles = new LinkedList<>();
        teacherRoles.add("TEACHER");
        
        String username = "TeacherForRestTest";
        String email = "TeacherForRestTest@email.com";
        String password = "TeacherForRestTest";
        
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
        
        JSONObject teacherLogin = new JSONObject();
        teacherLogin.put("username", username);
        teacherLogin.put("password", password);
        
        given().
            contentType("application/json").
            body(teacherLogin.toString()).
        when().
            post("/login").      
        then().
            statusCode(200);
        
    }
    
    @DisplayName("is able to signup a new Teacher")
    @Test
    void repeatedTeacherSignUp() throws JSONException {
        LinkedList<String> teacherRoles = new LinkedList<>();
        teacherRoles.add("TEACHER");
        
        String username = "TeacherForRestTest2";
        String email = "TeacherForRest2Test@email.com";
        String password = "TeacherForRestTest2";
        
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
        
        given().
            contentType("application/json").
            body(teacher.toString()).
        when().
            post("/signup").      
        then().
            statusCode(409);
        
    }

}
