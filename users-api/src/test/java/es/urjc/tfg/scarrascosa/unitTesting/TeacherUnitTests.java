package es.urjc.tfg.scarrascosa.unitTesting;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Test;

import es.urjc.tfg.scarrascosa.Student.Student;
import es.urjc.tfg.scarrascosa.Teacher.Teacher;

class TeacherUnitTests {

    @Test
    void constructorEmptyListTest() {
        String name = "Teacher1";
        String email = "teacher1@mail.com";
        String password = "teacherpass";
        Set<Student> list = new HashSet<Student>();
        
        Teacher teacher = new Teacher(name, email, password, list, "TEACHER");
               
        assertThat(teacher.getName()).isEqualTo(name);
        assertThat(teacher.getEmail()).isEqualTo(email);
        assertThat(teacher.getStudentList()).isEqualTo(list);
        assertThat(teacher.getStudentList().size()).isEqualTo(0);
        assertThat(teacher.getPassword()).isEqualTo(password);
    }
    
    @Test
    void constructorFullListTest() {
        String name = "Teacher2";
        String email = "teacher2@mail.com";
        String password = "teacherpass";
        Set<Student> list = new HashSet<Student>();
        
        String studentName_1 = "Student1";
        String studentEmail_1 = "student1@mail.com";
        String studentPassword_1 = "student1pass";
        double studentBalance_1 = 100.0;
        Student student_1 = new Student(studentName_1, studentEmail_1, studentBalance_1, studentPassword_1, "STUDENT");
        list.add(student_1);
        
        String studentName_2 = "Student2";
        String studentEmail_2 = "student2@mail.com";
        String studentPassword_2 = "student2pass";
        double studentBalance_2 = 1000.0;
        Student student_2 = new Student(studentName_2, studentEmail_2, studentBalance_2, studentPassword_2, "STUDENT");
        list.add(student_2);
        
        Teacher teacher = new Teacher(name, email, password, list, "TEACHER");
               
        assertThat(teacher.getName()).isEqualTo(name);
        assertThat(teacher.getEmail()).isEqualTo(email);
        assertThat(teacher.getStudentList()).isEqualTo(list);
        assertThat(teacher.getStudentList().size()).isEqualTo(2);
        assertThat(teacher.getStudentList().contains(student_1)).isEqualTo(true);
        assertThat(teacher.getStudentList().contains(student_2)).isEqualTo(true);
        assertThat(teacher.getPassword()).isEqualTo(password);
    }
    
    @Test
    void addStudentTest() {
        String name = "Teacher3";
        String email = "teacher3@mail.com";
        String password = "teacherpass";
        Set<Student> list = new HashSet<Student>();
        
        String studentName_1 = "Student1";
        String studentEmail_1 = "student1@mail.com";
        String studentPassword_1 = "student1pass";
        double studentBalance_1 = 100.0;
        Student student_1 = new Student(studentName_1, studentEmail_1, studentBalance_1, studentPassword_1, "STUDENT");
        list.add(student_1);
        
        String studentName_2 = "Student2";
        String studentEmail_2 = "student2@mail.com";
        String studentPassword_2 = "student2pass";
        double studentBalance_2 = 1000.0;
        Student student_2 = new Student(studentName_2, studentEmail_2, studentBalance_2, studentPassword_2, "STUDENT");
        list.add(student_2);
        
        Teacher teacher = new Teacher(name, email, password, list, "TEACHER");
               
        assertThat(teacher.getName()).isEqualTo(name);
        assertThat(teacher.getEmail()).isEqualTo(email);
        assertThat(teacher.getStudentList()).isEqualTo(list);
        assertThat(teacher.getStudentList().size()).isEqualTo(2);
        assertThat(teacher.getStudentList().contains(student_1)).isEqualTo(true);
        assertThat(teacher.getStudentList().contains(student_2)).isEqualTo(true);
        assertThat(teacher.getPassword()).isEqualTo(password);
        
        String studentName_3 = "Student1";
        String studentEmail_3 = "student1@mail.com";
        String studentPassword_3 = "student1pass";
        double studentBalance_3 = 100.0;
        Student student_3 = new Student(studentName_3, studentEmail_3, studentBalance_3, studentPassword_3, "STUDENT");
        
        assertThat(teacher.addStudent(student_3)).isEqualTo(true);
        assertThat(teacher.getStudentList().size()).isEqualTo(3);
        assertThat(teacher.getStudentList().contains(student_1)).isEqualTo(true);
        assertThat(teacher.getStudentList().contains(student_2)).isEqualTo(true);
        assertThat(teacher.getStudentList().contains(student_3)).isEqualTo(true);
        
        assertThat(teacher.addStudent(student_3)).isEqualTo(false);
        assertThat(teacher.getStudentList().size()).isEqualTo(3);
        assertThat(teacher.getStudentList().contains(student_1)).isEqualTo(true);
        assertThat(teacher.getStudentList().contains(student_2)).isEqualTo(true);
        assertThat(teacher.getStudentList().contains(student_3)).isEqualTo(true);
        
    }
    
    @Test
    void deleteStudentTest() {
        String name = "Teacher4";
        String email = "teacher4@mail.com";
        String password = "teacherpass";
        Set<Student> list = new HashSet<Student>();
        
        String studentName_1 = "Student1";
        String studentEmail_1 = "student1@mail.com";
        String studentPassword_1 = "student1pass";
        double studentBalance_1 = 100.0;
        Student student_1 = new Student(studentName_1, studentEmail_1, studentBalance_1, studentPassword_1, "STUDENT");
        list.add(student_1);
        
        String studentName_2 = "Student2";
        String studentEmail_2 = "student2@mail.com";
        String studentPassword_2 = "student2pass";
        double studentBalance_2 = 1000.0;
        Student student_2 = new Student(studentName_2, studentEmail_2, studentBalance_2, studentPassword_2, "STUDENT");
        list.add(student_2);
        
        Teacher teacher = new Teacher(name, email, password, list, "TEACHER");
               
        assertThat(teacher.getName()).isEqualTo(name);
        assertThat(teacher.getEmail()).isEqualTo(email);
        assertThat(teacher.getStudentList()).isEqualTo(list);
        assertThat(teacher.getStudentList().size()).isEqualTo(2);
        assertThat(teacher.getStudentList().contains(student_1)).isEqualTo(true);
        assertThat(teacher.getStudentList().contains(student_2)).isEqualTo(true);
        assertThat(teacher.getPassword()).isEqualTo(password);
        
        assertThat(teacher.deleteStudent(student_2)).isEqualTo(true);
        assertThat(teacher.getStudentList().size()).isEqualTo(1);
        assertThat(teacher.getStudentList().contains(student_1)).isEqualTo(true);
        assertThat(teacher.getStudentList().contains(student_2)).isEqualTo(false);
        
        assertThat(teacher.deleteStudent(student_2)).isEqualTo(false);
        assertThat(teacher.getStudentList().size()).isEqualTo(1);
        assertThat(teacher.getStudentList().contains(student_1)).isEqualTo(true);
        assertThat(teacher.getStudentList().contains(student_2)).isEqualTo(false);
        
        
        
        
    }

}
