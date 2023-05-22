package es.urjc.tfg.scarrascosa.unitTesting.DTO;

import static org.mockito.Mockito.mock;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import es.urjc.tfg.scarrascosa.DTO.StudentDTO;
import es.urjc.tfg.scarrascosa.DTO.TeacherDTO;
import es.urjc.tfg.scarrascosa.Student.Student;

public class TeacherDTOUnitTests {
 

    @Test
    public void testSetGetUsername() {
        TeacherDTO teacherDTO = new TeacherDTO();
        teacherDTO.setUsername("user");
        Assertions.assertEquals("user", teacherDTO.getUsername());
        
    }
    
    @Test
    public void testSetGetRole() {
        TeacherDTO teacherDTO = new TeacherDTO();
        teacherDTO.setRole("TEACHER");
        Assertions.assertEquals("TEACHER", teacherDTO.getRole());
        
    }
    
    @Test
    public void testSetGetStudentList() {
        TeacherDTO teacherDTO = new TeacherDTO();
        StudentDTO studentDTOMock = mock(StudentDTO.class);
        Set<StudentDTO> set = new HashSet<StudentDTO>();
        set.add(studentDTOMock);
        teacherDTO.setStudentList(set);
        Assertions.assertEquals(set, teacherDTO.getStudentList());
        
    }
    
    @Test
    public void testStudentDTOConstructor() {
        StudentDTO studentDTOMock = mock(StudentDTO.class);
        Set<StudentDTO> set = new HashSet<StudentDTO>();
        set.add(studentDTOMock);
        
        TeacherDTO teacherDTO = new TeacherDTO("user", "TEACHER", set);
        
        Assertions.assertEquals(set, teacherDTO.getStudentList());
        Assertions.assertEquals("user", teacherDTO.getUsername());
        Assertions.assertEquals("TEACHER", teacherDTO.getRole());
        
    }
    
    @Test
    public void testStudentConstructor() {
        
        String username = "studentName";
        String email = "studentEmail";
        Double balance = 10.0;
        String roles = "STUDENT";
        Student student = new Student(username, email, balance ,"", roles);
        
        Set<Student> set = new HashSet<Student>();
        set.add(student);
        
        TeacherDTO teacherDTO = new TeacherDTO();
        teacherDTO.TeacherDTOStudentEntity("user", "TEACHER", set);
        
        Assertions.assertEquals("user", teacherDTO.getUsername());
        Assertions.assertEquals("TEACHER", teacherDTO.getRole());
        
    }
   

}
