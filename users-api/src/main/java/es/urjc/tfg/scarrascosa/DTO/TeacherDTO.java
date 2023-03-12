package es.urjc.tfg.scarrascosa.DTO;

import java.util.HashSet;
import java.util.Set;

import es.urjc.tfg.scarrascosa.Student.Student;


public class TeacherDTO {
    private String username;
    private Set<StudentDTO> studentList;
    
    public TeacherDTO() {}
    
    public TeacherDTO(String username, Set<StudentDTO> studentList) {
        this.username = username;
        this.studentList = studentList;
    }
    
    public void TeacherDTOStudentEntity(String username, Set<Student> studentList) {
        this.username = username;
        this.studentList = new HashSet<>();
        for(Student student: studentList) {
            StudentDTO studentDto = new StudentDTO(student.getName(), student.getBalance(), student.getPortfolio(), student.getTradeHistory());
            this.studentList.add(studentDto);
        }
    }
    
    public Set<StudentDTO> getStudentList() {
        return studentList;
    }
    public void setStudentList(Set<StudentDTO> studentList) {
        this.studentList = studentList;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

}
