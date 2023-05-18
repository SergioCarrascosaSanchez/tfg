package es.urjc.tfg.scarrascosa.unitTesting;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import es.urjc.tfg.scarrascosa.DTO.TradeDTO;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TradeDTOUnitTests {
    @Test
    public void testGetCoin() {
        String coin = "BTC";
        TradeDTO tradeDTO = new TradeDTO("BUY", coin, 1.5, 50000.0, "Investment", new ArrayList<>());
        Assertions.assertEquals(coin, tradeDTO.getCoin());
    }

    @Test
    public void testSetCoin() {
        String coin = "BTC";
        TradeDTO tradeDTO = new TradeDTO();
        tradeDTO.setCoin(coin);
        Assertions.assertEquals(coin, tradeDTO.getCoin());
    }

    @Test
    public void testGetQuantity() {
        double quantity = 1.5;
        TradeDTO tradeDTO = new TradeDTO("BUY", "BTC", quantity, 50000.0, "Investment", new ArrayList<>());
        Assertions.assertEquals(quantity, tradeDTO.getQuantity());
    }

    @Test
    public void testSetQuantity() {
        double quantity = 1.5;
        TradeDTO tradeDTO = new TradeDTO();
        tradeDTO.setQuantity(quantity);
        Assertions.assertEquals(quantity, tradeDTO.getQuantity());
    }

    @Test
    public void testGetPrice() {
        double price = 50000.0;
        TradeDTO tradeDTO = new TradeDTO("BUY", "BTC", 1.5, price, "Investment", new ArrayList<>());
        Assertions.assertEquals(price, tradeDTO.getPrice());
    }

    @Test
    public void testSetPrice() {
        double price = 50000.0;
        TradeDTO tradeDTO = new TradeDTO();
        tradeDTO.setPrice(price);
        Assertions.assertEquals(price, tradeDTO.getPrice());
    }

    @Test
    public void testGetJustification() {
        String justification = "Investment";
        TradeDTO tradeDTO = new TradeDTO("BUY", "BTC", 1.5, 50000.0, justification, new ArrayList<>());
        Assertions.assertEquals(justification, tradeDTO.getJustification());
    }

    @Test
    public void testSetJustification() {
        String justification = "Investment";
        TradeDTO tradeDTO = new TradeDTO();
        tradeDTO.setJustification(justification);
        Assertions.assertEquals(justification, tradeDTO.getJustification());
    }

    @Test
    public void testGetChartData() {
        List<Double> chartData = Arrays.asList(50000.0, 52000.0, 48000.0);
        TradeDTO tradeDTO = new TradeDTO("BUY", "BTC", 1.5, 50000.0, "Investment", chartData);
        Assertions.assertEquals(chartData, tradeDTO.getChartData());
    }

    @Test
    public void testSetChartData() {
        List<Double> chartData = Arrays.asList(50000.0, 52000.0, 48000.0);
        TradeDTO tradeDTO = new TradeDTO();
        tradeDTO.setChartData(chartData);
        Assertions.assertEquals(chartData, tradeDTO.getChartData());
    }

    @Test
    public void testGetType() {
        String type = "BUY";
        TradeDTO tradeDTO = new TradeDTO(type, "BTC", 1.5, 50000.0, "Investment", new ArrayList<>());
        Assertions.assertEquals(type, tradeDTO.getType());
    }

    @Test
    public void testSetType() {
        String type = "BUY";
        TradeDTO tradeDTO = new TradeDTO();
        tradeDTO.setType(type);
        Assertions.assertEquals(type, tradeDTO.getType());
    }

}
