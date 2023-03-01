package es.urjc.tfg.scarrascosa.unitTesting;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

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
    
    @ParameterizedTest
    @CsvSource({
    "St3, st3@email.com, BTCBUSD, 1.0, 16000.0, true",
    "St4, st4@email.com, ETHBUSD, 0.3, 3000.2, false",
    "St5, st5@email.com, ADABUSD, 15000.0, 0.2, false",
    "St6, st6@email.com, ADABUSD, 15000.1, 0.2, true"
    })
    void addToPortfolioTest(String name, String email, String symbol, double quantity, double price, boolean throwsException) {
        double initBalance = 3000.0;
        Student student = new Student(name, email, initBalance, "123pass", "USER");
        if(throwsException) {
            assertThatThrownBy(() -> {
                student.addToPortfolio(symbol, quantity, price);
            }).isInstanceOf(Exception.class).hasMessageContaining("not enough balance");
            
            assertThat(student.getBalance()).isEqualTo(initBalance);
            
            assertThat(student.getQuantity(symbol)).isEqualTo(0.0);
        }
        else {
            assertDoesNotThrow(() -> {student.addToPortfolio(symbol, quantity, price);});
            
            assertThat(student.getBalance()).isEqualTo(initBalance - (quantity*price));
            
            assertThat(student.getQuantity(symbol)).isEqualTo(quantity);
        }
    }
    
    @ParameterizedTest
    @CsvSource({
    "St7, st7@email.com, BTCBUSD, 1.0, 12000.0, 1.0, 11000.0, false",
    "St7, st7@email.com, BTCBUSD, 1.0, 15000.0, 1.0, 15000.0, false",
    "St8, st8@email.com, BTCBUSD, 1.0, 12000.0, 3.0, 11000.0, true"
    })
    void addToPortfolioRepeatedSymbolTest(String name, String email, String symbol, double quantity1, double price1,double quantity2, double price2, boolean throwsException) {
        double initBalance = 30000.0;
        Student student = new Student(name, email, initBalance, "123pass", "USER");
        if(throwsException) {
            assertDoesNotThrow(() -> {student.addToPortfolio(symbol, quantity1, price1);});
            
            assertThat(student.getBalance()).isEqualTo(initBalance - (quantity1*price1));
            
            assertThat(student.getQuantity(symbol)).isEqualTo(quantity1);
            
            assertThatThrownBy(() -> {
                student.addToPortfolio(symbol, quantity2, price2);
            }).isInstanceOf(Exception.class).hasMessageContaining("not enough balance");
            
            assertThat(student.getBalance()).isEqualTo(initBalance - (quantity1*price1));
            
            assertThat(student.getQuantity(symbol)).isEqualTo(quantity1);
        }
        else {
            assertDoesNotThrow(() -> {student.addToPortfolio(symbol, quantity1, price1);});
            
            assertThat(student.getBalance()).isEqualTo(initBalance - (quantity1*price1));
            
            assertThat(student.getQuantity(symbol)).isEqualTo(quantity1);
            
            assertDoesNotThrow(() -> {student.addToPortfolio(symbol, quantity2, price2);});
            
            assertThat(student.getQuantity(symbol)).isEqualTo(quantity1+quantity2);
            
            assertThat(student.getBalance()).isEqualTo(initBalance - (quantity1*price1) - (quantity2*price2));
        }
    }
  
}
