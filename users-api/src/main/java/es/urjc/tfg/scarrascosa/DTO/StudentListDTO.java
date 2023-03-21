package es.urjc.tfg.scarrascosa.DTO;

import java.util.List;

public class StudentListDTO {
    private List<String> studentList;
    
    public StudentListDTO() {}
    
    public StudentListDTO (List<String> studentList) {
        this.studentList = studentList;
    }
    
    public List<String> getStudentList() {
        return studentList;
    }

    public void setStudentList(List<String> studentList) {
        this.studentList = studentList;
    }

}
