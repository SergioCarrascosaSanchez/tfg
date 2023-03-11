package es.urjc.tfg.scarrascosa.Teacher;

import java.util.Set;

import es.urjc.tfg.scarrascosa.Student.Student;
import es.urjc.tfg.scarrascosa.UserProfile.UserProfile;

public class Teacher extends UserProfile{
    private Set<Student> studentList;
    
    public Teacher() {}
    
    public Teacher(String name, String email, String password, Set<Student> studentList, String... roles) {
        super(name, email, password, roles);
        this.studentList = studentList;
    }

    public Set<Student> getStudentList() {
        return studentList;
    }

    public void setStudentList(Set<Student> studentList) {
        this.studentList = studentList;
    }
    
    public boolean addStudent(Student student) {
        return this.studentList.add(student);
    }
    
    public boolean deleteStudent(Student student) {
        return this.studentList.remove(student);
    }

}
