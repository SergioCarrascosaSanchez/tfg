package es.urjc.tfg.scarrascosa.Teacher;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import es.urjc.tfg.scarrascosa.Student.Student;
import es.urjc.tfg.scarrascosa.UserProfile.UserProfile;

@Entity
public class Teacher extends UserProfile{
    
    @OneToMany
    private Set<Student> studentList;
    
    public Teacher() {}
    
    public Teacher(String name, String email, String password, Set<Student> studentList, String... roles) {
        super(name, email, password, roles);
        this.studentList = studentList;
    }
    
    public Teacher(String name, String email, String password, String... roles) {
        super(name, email, password, roles);
        this.studentList = new HashSet<Student>();
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
