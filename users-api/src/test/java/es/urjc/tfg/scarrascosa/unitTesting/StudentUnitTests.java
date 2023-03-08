package es.urjc.tfg.scarrascosa.unitTesting;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import java.util.LinkedList;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import es.urjc.tfg.scarrascosa.Student.Student;
import es.urjc.tfg.scarrascosa.Trade.Trade;
import es.urjc.tfg.scarrascosa.Trade.TradeType;


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
    "St3, st3@email.com, BTCBUSD, 1.0, 16000.0, justification_1,  true",
    "St4, st4@email.com, ETHBUSD, 0.3, 3000.2, justification_2, false",
    "St5, st5@email.com, ADABUSD, 15000.0, 0.2, justification_3, false",
    "St6, st6@email.com, ADABUSD, 15000.1, 0.2, justification_4, true"
    })
    void addToPortfolioTest(String name, String email, String symbol, double quantity, double price, String justification, boolean throwsException) {
        double initBalance = 3000.0;
        LinkedList<Double> list = new LinkedList<>();
        list.add(2.0);
        list.add(1.0);
        
        Student student = new Student(name, email, initBalance, "123pass", "USER");
        Trade trade = new Trade(TradeType.BUY, symbol, quantity, price, justification, list);
        if(throwsException) {
            assertThatThrownBy(() -> {
                student.addToPortfolio(trade);
            }).isInstanceOf(Exception.class).hasMessageContaining("not enough balance");
            
            assertThat(student.getBalance()).isEqualTo(initBalance);
            
            assertThat(student.getQuantity(symbol)).isEqualTo(0.0);
        }
        else {
            assertDoesNotThrow(() -> {student.addToPortfolio(trade);});
            
            assertThat(student.getBalance()).isEqualTo(initBalance - (quantity*price));
            
            assertThat(student.getQuantity(symbol)).isEqualTo(quantity);
            
            Trade lastTrade = student.getTradeHistory().get(0);
            assertThat(lastTrade.getType()).isEqualTo(TradeType.BUY);
            assertThat(lastTrade.getCoin()).isEqualTo(symbol);
            assertThat(lastTrade.getQuantity()).isEqualTo(quantity);
            assertThat(lastTrade.getPrice()).isEqualTo(price);
            assertThat(lastTrade.getChartData()).isEqualTo(list);
            assertThat(lastTrade.getJustification()).isEqualTo(justification);
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
        String justification = "";
        LinkedList<Double> list = new LinkedList<>();
        list.add(2.0);
        list.add(1.0);
        Student student = new Student(name, email, initBalance, "123pass", "USER");
        Trade trade1 = new Trade(TradeType.BUY, symbol, quantity1, price1, justification, list);
        Trade trade2 = new Trade(TradeType.BUY, symbol, quantity2, price2, justification, list);
        if(throwsException) {
            assertDoesNotThrow(() -> {student.addToPortfolio(trade1);});
            
            assertThat(student.getBalance()).isEqualTo(initBalance - (quantity1*price1));
            
            assertThat(student.getQuantity(symbol)).isEqualTo(quantity1);
            
            assertThatThrownBy(() -> {
                student.addToPortfolio(trade2);
            }).isInstanceOf(Exception.class).hasMessageContaining("not enough balance");
            
            assertThat(student.getBalance()).isEqualTo(initBalance - (quantity1*price1));
            
            assertThat(student.getQuantity(symbol)).isEqualTo(quantity1);
        }
        else {
            assertDoesNotThrow(() -> {student.addToPortfolio(trade1);});
            
            assertThat(student.getBalance()).isEqualTo(initBalance - (quantity1*price1));
            
            assertThat(student.getQuantity(symbol)).isEqualTo(quantity1);
            
            assertDoesNotThrow(() -> {student.addToPortfolio(trade2);});
            
            assertThat(student.getQuantity(symbol)).isEqualTo(quantity1+quantity2);
            
            assertThat(student.getBalance()).isEqualTo(initBalance - (quantity1*price1) - (quantity2*price2));
        }
    }
    @ParameterizedTest
    @CsvSource({
    "St7, st7@email.com, BTCBUSD, 1.0, 170.0, Justification_5, false",
    "St7, st7@email.com, BTCBUSD, 3.2, 170.0, Justification_6, true",
    "St7, st7@email.com, BTCBUSD, 2.0, 170.0, Justification_7, false"
    })
    void sellFromPortfolioTest(String name, String email, String symbol, double quantity, double sellPrice, String justification, boolean throwsException) {
        double balance = 30000.0;
        double buyQuantity = 2.0;
        double buyPrice = 12000.0;
        LinkedList<Double> list = new LinkedList<>();
        list.add(2.0);
        list.add(1.0);
        Student student = new Student(name, email, balance, "123pass", "USER");
        Trade trade = new Trade(TradeType.BUY, symbol, buyQuantity, buyPrice, justification, list);
        
        balance = balance - (buyQuantity*buyPrice);
        assertDoesNotThrow(() -> {student.addToPortfolio(trade);});
        
        if(throwsException) {
            assertThatThrownBy(() -> {
                student.sellFromPortfolio(symbol, quantity, sellPrice);
            }).isInstanceOf(Exception.class).hasMessageContaining("not enough quantity");
            assertThat(student.getQuantity(symbol)).isEqualTo(buyQuantity);
            assertThat(student.getBalance()).isEqualTo(balance);
        }
        else {
            assertDoesNotThrow(() -> {student.sellFromPortfolio(symbol, quantity, sellPrice);});
            assertThat(student.getQuantity(symbol)).isEqualTo(buyQuantity - quantity);
            assertThat(student.getBalance()).isEqualTo(balance + (quantity*sellPrice));
            
        }    
    }
  
}
