package es.urjc.tfg.scarrascosa.restTesting;
import static io.restassured.RestAssured.given;
import static io.restassured.path.json.JsonPath.from;
import static org.hamcrest.CoreMatchers.anything;
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
public class AuthRestTests {

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
            header("Authorization", this.adminToken).
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
    
    @DisplayName("it is able to prevent the signup of a new user who has a role other than Student, Teacher or Admin")
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
            header("Authorization", this.adminToken).
            body(notStudent.toString()).
        when().
            post("/signup").      
        then().
            statusCode(400);
        
    }
    
    @DisplayName("is able to prevent signup when a student username is already used")
    @Test
    void UsernameAlreadyUsed() throws JSONException {;
        
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
            header("Authorization", this.adminToken).
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
            header("Authorization", this.adminToken).
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
            header("Authorization", this.adminToken).
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
    
    @DisplayName("is able to prevent signup when a teacher username is already used")
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
            header("Authorization", this.adminToken).
            body(teacher.toString()).
        when().
            post("/signup").      
        then().
            statusCode(200);
        
        given().
            contentType("application/json").
            header("Authorization", this.adminToken).
            body(teacher.toString()).
        when().
            post("/signup").      
        then().
            statusCode(409);
        
    }
    
    @DisplayName("is able to signup a new Admin")
    @Test
    void AdminSignUp() throws JSONException {
        
        LinkedList<String> adminRoles = new LinkedList<>();
        adminRoles.add("ADMIN");
        
        String username = "AdminForRestTest";
        String email = "AdminForRestTest@email.com";
        String password = "AdminForRestTest";
        
        JSONObject admin = new JSONObject();
        JSONArray adminRolesArray = new JSONArray(adminRoles);
        admin.put("roles", adminRolesArray);
        admin.put("username", username);
        admin.put("email", email);
        admin.put("password", password);
        
        given().
            contentType("application/json").
            header("Authorization", this.adminToken).
            body(admin.toString()).
        when().
            post("/signup").      
        then().
            statusCode(200);
        
        JSONObject adminLogin = new JSONObject();
        adminLogin.put("username", username);
        adminLogin.put("password", password);
        
        given().
            contentType("application/json").
            body(adminLogin.toString()).
        when().
            post("/login").      
        then().
            statusCode(200);
        
    }
    
    @DisplayName("is able to prevent signup when a admin username is already used")
    @Test
    void repeatedAdminSignUp() throws JSONException {
        
        LinkedList<String> adminRoles = new LinkedList<>();
        adminRoles.add("ADMIN");
        
        String username = "AdminForRestTest2";
        String email = "AdminForRestTest2@email.com";
        String password = "AdminForRestTest";
        
        JSONObject admin = new JSONObject();
        JSONArray adminRolesArray = new JSONArray(adminRoles);
        admin.put("roles", adminRolesArray);
        admin.put("username", username);
        admin.put("email", email);
        admin.put("password", password);
        
        given().
            contentType("application/json").
            header("Authorization", this.adminToken).
            body(admin.toString()).
        when().
            post("/signup").      
        then().
            statusCode(200);
        
        given().
            contentType("application/json").
            header("Authorization", this.adminToken).
            body(admin.toString()).
        when().
            post("/signup").      
        then().
            statusCode(409);
        
    }
    
    @DisplayName("is able to prevent login if credentials are incorrect")
    @Test
    void rejectLogin() throws JSONException {
        LinkedList<String> teacherRoles = new LinkedList<>();
        teacherRoles.add("TEACHER");
        
        String username = "TeacherForRestTest3";
        String email = "TeacherForRest3Test@email.com";
        String password = "TeacherForRestTest3";
        
        JSONObject teacher = new JSONObject();
        JSONArray teacherRolesArray = new JSONArray(teacherRoles);
        teacher.put("roles", teacherRolesArray);
        teacher.put("username", username);
        teacher.put("email", email);
        teacher.put("password", password);
        
        given().
            contentType("application/json").
            header("Authorization", this.adminToken).
            body(teacher.toString()).
        when().
            post("/signup").      
        then().
            statusCode(200);
        
        JSONObject teacherLogin = new JSONObject();
        teacherLogin.put("username", username);
        teacherLogin.put("password", password.substring(1));
        
        given().
            contentType("application/json").
            body(teacherLogin.toString()).
        when().
            post("/login").      
        then().
            statusCode(403);
        
        JSONObject teacherLogin2 = new JSONObject();
        teacherLogin2.put("username", username.substring(1));
        teacherLogin2.put("password", password);
        
        given().
            contentType("application/json").
            body(teacherLogin2.toString()).
        when().
            post("/login").      
        then().
            statusCode(403);
        
        JSONObject teacherLogin3 = new JSONObject();
        teacherLogin3.put("username", username.substring(1));
        teacherLogin3.put("password", password.substring(1));
        
        given().
            contentType("application/json").
            body(teacherLogin3.toString()).
        when().
            post("/login").      
        then().
            statusCode(403);
        
        
        
        LinkedList<String> studentRoles = new LinkedList<>();
        studentRoles.add("STUDENT");
        
        String username2 = "TeacherForRestTest4";
        String email2 = "TeacherForRest4Test@email.com";
        String password2 = "TeacherForRestTest4";
        
        JSONObject student = new JSONObject();
        JSONArray studentRolesArray = new JSONArray(studentRoles);
        student.put("roles", studentRolesArray);
        student.put("username", username2);
        student.put("email", email2);
        student.put("password", password2);
        
        given().
            contentType("application/json").
            header("Authorization", this.adminToken).
            body(student.toString()).
        when().
            post("/signup").      
        then().
            statusCode(200);
        
        JSONObject studentLogin = new JSONObject();
        studentLogin.put("username", username2);
        studentLogin.put("password", password2.substring(1));
        
        given().
            contentType("application/json").
            body(studentLogin.toString()).
        when().
            post("/login").      
        then().
            statusCode(403);
        
        JSONObject studentLogin2 = new JSONObject();
        studentLogin2.put("username", username2.substring(1));
        studentLogin2.put("password", password2);
        
        given().
            contentType("application/json").
            body(studentLogin2.toString()).
        when().
            post("/login").      
        then().
            statusCode(403);
        
        JSONObject studentLogin3 = new JSONObject();
        studentLogin3.put("username", username2.substring(1));
        studentLogin3.put("password", password2.substring(1));
        
        given().
            contentType("application/json").
            body(studentLogin3.toString()).
        when().
            post("/login").      
        then().
            statusCode(403);
        
    }

}
