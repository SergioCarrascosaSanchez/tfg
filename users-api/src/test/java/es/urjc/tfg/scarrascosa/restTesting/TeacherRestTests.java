package es.urjc.tfg.scarrascosa.restTesting;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static io.restassured.path.json.JsonPath.from;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.hasItems;
import static org.hamcrest.CoreMatchers.not;
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
import io.restassured.response.Response;

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
        String token = teacherSignUp(username);
        given().
            header("Authorization", token).
        when().
            get("/users/"+username).
        then().
            statusCode(200).
            body("username", equalTo(username)).
            body("role", equalTo("TEACHER")).
            body("studentList", equalTo(new LinkedList<>()));
    }
    
    @Test
    void addMultipleStudentToTeacher() throws JSONException {
        String teacherUsername = "teacherRestTest_2";
        
        String token = teacherSignUp(teacherUsername);
        
        given().
            header("Authorization", token).
        when().
            get("/users/"+teacherUsername).
        then().
            statusCode(200).
            body("username", equalTo(teacherUsername)).
            body("role", equalTo("TEACHER")).
            body("studentList", equalTo(new LinkedList<>()));
        
        String student_1 = "studentAddToTeacher_1";
        studentSignUp(student_1);
        
        String student_2 = "studentAddToTeacher_2";
        studentSignUp(student_2);
        
        LinkedList<String> studentList = new LinkedList<>();
        studentList.add(student_1);
        studentList.add(student_2);
        
        JSONObject studentListObject = new JSONObject();
        JSONArray studentListArray = new JSONArray(studentList);
        studentListObject.put("studentList", studentListArray);
        
        given().
            contentType("application/json").
            body(studentListObject.toString()).
        when().
            post("/teacher/"+teacherUsername).      
        then().
            statusCode(200);
        
        given().
            header("Authorization", token).
        when().
            get("/users/"+teacherUsername).
        then().
            statusCode(200).
            body("username", equalTo(teacherUsername)).
            body("role", equalTo("TEACHER")).
            body("studentList.username", hasItems(student_1, student_2)).
            body("studentList.size()", equalTo(2)); 
    }
    
    @Test
    void addRepeatedStudentToTeacher() throws JSONException {
        String teacherUsername = "teacherRestTest_3";
        
        String token = teacherSignUp(teacherUsername);
        
        given().
            header("Authorization", token).
        when().
            get("/users/"+teacherUsername).
        then().
            statusCode(200).
            body("username", equalTo(teacherUsername)).
            body("role", equalTo("TEACHER")).
            body("studentList", equalTo(new LinkedList<>()));
        
        String student_1 = "studentAddToTeacher_3";
        studentSignUp(student_1);
        
        LinkedList<String> studentList = new LinkedList<>();
        studentList.add(student_1);
        
        JSONObject studentListObject = new JSONObject();
        JSONArray studentListArray = new JSONArray(studentList);
        studentListObject.put("studentList", studentListArray);
        
        given().
            contentType("application/json").
            body(studentListObject.toString()).
        when().
            post("/teacher/"+teacherUsername).      
        then().
            statusCode(200);
        
        given().
            header("Authorization", token).
        when().
            get("/users/"+teacherUsername).
        then().
            statusCode(200).
            body("username", equalTo(teacherUsername)).
            body("role", equalTo("TEACHER")).
            body("studentList.username", hasItems(student_1)).
            body("studentList.size()", equalTo(1));
        
        given().
            contentType("application/json").
            body(studentListObject.toString()).
        when().
            post("/teacher/"+teacherUsername).      
        then().
            statusCode(200);
        
        given().
            header("Authorization", token).
        when().
            get("/users/"+teacherUsername).
        then().
            statusCode(200).
            body("username", equalTo(teacherUsername)).
            body("role", equalTo("TEACHER")).
            body("studentList.size()", equalTo(1));
    }
    
    @Test
    void addNonExistingStudentToTeacher() throws JSONException {
        String teacherUsername = "teacherRestTest_4";
        String token = teacherSignUp(teacherUsername);
        given().
            header("Authorization", token).
        when().
            get("/users/"+teacherUsername).
        then().
            statusCode(200);
        
        String student_1 = "studentAddToTeacher_4";
        studentSignUp(student_1);
        
        String student_2 = "studentAddToTeacher_5";
        studentSignUp(student_2);
        
        LinkedList<String> studentList = new LinkedList<>();
        studentList.add(student_1);
        studentList.add(student_2);
        
        JSONObject studentListObject = new JSONObject();
        JSONArray studentListArray = new JSONArray(studentList);
        studentListObject.put("studentList", studentListArray);
        
        given().
            contentType("application/json").
            body(studentListObject.toString()).
        when().
            post("/teacher/"+teacherUsername).      
        then().
            statusCode(200);
        
        given().
            header("Authorization", token).
        when().
            get("/users/"+teacherUsername).
        then().
            statusCode(200).
            body("username", equalTo(teacherUsername)).
            body("role", equalTo("TEACHER")).
            body("studentList.username", hasItems(student_1, student_2)).
            body("studentList.size()", equalTo(2)); 
        
        String student_3 = "studentAddToTeacher_6";
        studentSignUp(student_3);
        
        String student_4 = "studentAddToTeacher_7";
        
        LinkedList<String> studentList_2 = new LinkedList<>();
        studentList_2.add(student_3);
        studentList_2.add(student_4);
        
        JSONObject studentListObject_2 = new JSONObject();
        JSONArray studentListArray_2 = new JSONArray(studentList_2);
        studentListObject_2.put("studentList", studentListArray_2);
        
        given().
            contentType("application/json").
            body(studentListObject_2.toString()).
        when().
            post("/teacher/"+teacherUsername).      
        then().
            statusCode(422);
        
        given().
            header("Authorization", token).
        when().
            get("/users/"+teacherUsername).
        then().
            statusCode(200).
            body("username", equalTo(teacherUsername)).
            body("role", equalTo("TEACHER")).
            body("studentList.username", hasItems(student_1, student_2)).
            body("studentList.username", not(hasItems(student_3, student_4))).
            body("studentList.size()", equalTo(2)); 
    }
    
    
    @Test
    void rejectAcessToOtherUserData() throws JSONException {
        String teacherUsername = "teacherRestTest_5";
        
        String token = teacherSignUp(teacherUsername);
        
        given().
            header("Authorization", token).
        when().
            get("/users/"+teacherUsername).
        then().
            statusCode(200).
            body("username", equalTo(teacherUsername)).
            body("role", equalTo("TEACHER")).
            body("studentList", equalTo(new LinkedList<>()));
        
        String student_1 = "studentAddToTeacher_8";
        studentSignUp(student_1);
        
        given().
            header("Authorization", token).
        when().
            get("/users/"+student_1).
        then().
            statusCode(403);
        
        String teacherUsername_2 = "teacherRestTest_6";
        teacherSignUp(teacherUsername_2);
        
        given().
            header("Authorization", token).
        when().
            get("/users/"+teacherUsername_2).
        then().
            statusCode(403);
    
    }
    
    @Test
    void rejectAccionsWithoutCorrectToken() throws JSONException {
        String username = "teacherRestTest_7";
        String token = teacherSignUp(username);
        
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
    }
    
    String teacherSignUp(String username) throws JSONException {
        
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
        
        JSONObject teacherLogin = new JSONObject();
        teacherLogin.put("username", username);
        teacherLogin.put("password", password);
        
        Response response = given().
                contentType("application/json").
                body(teacherLogin.toString()).  
            when().
                post("/login").      
            then().
                statusCode(200)
            .extract().response();
        
        String token = from(response.getBody().asString()).get("token");
        return "Bearer "+token;
        
    }
    
    void studentSignUp(String username) throws JSONException {
        LinkedList<String> roles = new LinkedList<>();
        roles.add("STUDENT");
        String email = username+"@email.com";
        String password = "pass";
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
    }

}
