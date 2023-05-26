package es.urjc.tfg.scarrascosa.unitTesting.DTO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import es.urjc.tfg.scarrascosa.DTO.StudentDTO;
import es.urjc.tfg.scarrascosa.DTO.StudentDTO.PortfolioItem;
import es.urjc.tfg.scarrascosa.Student.Student;
import es.urjc.tfg.scarrascosa.Trade.Trade;
import es.urjc.tfg.scarrascosa.Trade.TradeType;


public class StudentDTOUnitTests {

    @Test
    public void testGettersAndSetters() {
        String username = "john123";
        String role = "STUDENT";
        double balance = 1000.0;
        LinkedList<StudentDTO.PortfolioItem> portfolio = new LinkedList<>();
        LinkedList<StudentDTO.TradeItem> tradeHistory = new LinkedList<>();

        StudentDTO studentDTO = new StudentDTO();
        studentDTO.setUsername(username);
        studentDTO.setRole(role);
        studentDTO.setBalance(balance);
        studentDTO.setPortfolio(portfolio);
        studentDTO.setTradeHistory(tradeHistory);

        Assertions.assertEquals(username, studentDTO.getUsername());
        Assertions.assertEquals(role, studentDTO.getRole());
        Assertions.assertEquals(balance, studentDTO.getBalance());
        Assertions.assertEquals(portfolio, studentDTO.getPortfolio());
        Assertions.assertEquals(tradeHistory, studentDTO.getTradeHistory());
    }

    @Test
    public void testPortfolioItemGettersAndSetters() {
        String coin = "BTC";
        Double quantity = 5.0;

        StudentDTO.PortfolioItem portfolioItem = new StudentDTO().new PortfolioItem();
        portfolioItem.setCoin(coin);
        portfolioItem.setQuantity(quantity);

        Assertions.assertEquals(coin, portfolioItem.getCoin());
        Assertions.assertEquals(quantity, portfolioItem.getQuantity());
    }

    @Test
    public void testTradeItemGettersAndSetters() {
        Long id = 1L;
        TradeType type = TradeType.BUY;
        String coin = "BTC";
        double quantity = 2.0;
        double price = 50000.0;
        String justification = "Investment";
        List<Double> chartData = null;
        String date = "2022-01-01";
        String feedback = "Positive";

        StudentDTO.TradeItem tradeItem = new StudentDTO().new TradeItem();
        tradeItem.setId(id);
        tradeItem.setType(type);
        tradeItem.setCoin(coin);
        tradeItem.setQuantity(quantity);
        tradeItem.setPrice(price);
        tradeItem.setJustification(justification);
        tradeItem.setChartData(chartData);
        tradeItem.setDate(date);
        tradeItem.setFeedback(feedback);

        Assertions.assertEquals(id, tradeItem.getId());
        Assertions.assertEquals(type, tradeItem.getType());
        Assertions.assertEquals(coin, tradeItem.getCoin());
        Assertions.assertEquals(quantity, tradeItem.getQuantity());
        Assertions.assertEquals(price, tradeItem.getPrice());
        Assertions.assertEquals(justification, tradeItem.getJustification());
        Assertions.assertEquals(chartData, tradeItem.getChartData());
        Assertions.assertEquals(date, tradeItem.getDate());
        Assertions.assertEquals(feedback, tradeItem.getFeedback());
    }
}
