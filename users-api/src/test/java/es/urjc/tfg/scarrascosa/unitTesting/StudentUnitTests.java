package es.urjc.tfg.scarrascosa.unitTesting;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import es.urjc.tfg.scarrascosa.Student.Student;

class StudentUnitTests {

    @ParameterizedTest
    @CsvSource({
    "St1, st1@email.com, 1000.0",
    "St2, st2@email.com, 50000.0"
    })
    void constructorTest(String name, String email, double balance) {
        Student student = new Student(name, email, balance);
        assertThat(student.getName()).isEqualTo(name);
        assertThat(student.getEmail()).isEqualTo(email);
        assertThat(student.getBalance()).isEqualTo(balance);   
    }
}
