package es.urjc.tfg.scarrascosa.unitTesting;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.boot.test.context.SpringBootTest;

import es.urjc.tfg.scarrascosa.Student.Student;


class StudentUnitTests {

    @ParameterizedTest
    @CsvSource({
    "St1, st1@email.com, 1000.0, 329847hj2b34hug234htr234f",
    "St2, st2@email.com, 50000.0, hk23g4g2376324yu324g76gsdfy"
    })
    void constructorTest(String name, String email, double balance, String password) {
        Student student = new Student(name, email, balance, password, "USER");
               
        assertThat(student.getName()).isEqualTo(name);
        assertThat(student.getEmail()).isEqualTo(email);
        assertThat(student.getBalance()).isEqualTo(balance);   
        assertThat(student.getPassword()).isEqualTo(password);
        assertThat(student.getPortfolio().size()).isEqualTo(0);
    }
}
