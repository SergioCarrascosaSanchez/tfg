package es.urjc.tfg.scarrascosa.unitTesting;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;

import es.urjc.tfg.scarrascosa.Trade.Trade;
import es.urjc.tfg.scarrascosa.Trade.TradeType;

class TradeUnitTests {

    @Test
    void CreateTradeAndModify() {
        
        TradeType type = TradeType.BUY;
        
        String coin = "TestTradeCoin";
        
        double quantity = 2.0;
        
        double price = 1111.34;
        
        String justification = "Esto es un texto de prueba para probar la aplicacion Esto es un texto de prueba para probar la aplicacion Esto es un texto de prueba para probar la aplicacion Esto es un texto de prueba para probar la aplicacion Esto es un texto de prueba para probar la aplicacion Esto es un texto de prueba para probar la aplicacion";
        
        ArrayList<Double> chartData = new ArrayList<>();
        chartData.add(10.2);
        chartData.add(10.4);
        chartData.add(10.9);
        chartData.add(10.1);
        chartData.add(10.4);
        chartData.add(10.7);
        chartData.add(10.24);
        chartData.add(10.21);
        chartData.add(10.5);
        chartData.add(10.1);
        
        Trade newTrade = new Trade(type, coin, quantity, price, justification, chartData);
        
        assertThat(newTrade.getType()).isEqualTo(type);
        assertThat(newTrade.getCoin()).isEqualTo(coin);
        assertThat(newTrade.getQuantity()).isEqualTo(quantity);
        assertThat(newTrade.getPrice()).isEqualTo(price);
        assertThat(newTrade.getJustification()).isEqualTo(justification);
        assertThat(newTrade.getChartData()).isEqualTo(chartData);
        assertThat(newTrade.getFeedback()).isBlank();
        
    }
    
    @Test
    void setValues() {
        TradeType type = TradeType.SELL;
        
        String coin = "TestTradeCoin2";
        
        double quantity = 4.1;
        
        double price = 2324311.34;
        
        String justification = "Esto es un texto de prueba para probar la aplicacion Esto es un texto de prueba para probar la aplicacion Esto es un texto de prueba para probar la aplicacion Esto es un texto de prueba para probar la aplicacion Esto es un texto de prueba para probar la aplicacion Esto es un texto de prueba para probar la aplicacion";
        
        String feedback = "Este trade es correcto porque has identificado correctamente el patron";
        
        ArrayList<Double> chartData = new ArrayList<>();
        
        Trade newTrade = new Trade(type, coin, quantity, price, justification, chartData);
        
        assertThat(newTrade.getFeedback()).isBlank();
        
        newTrade.setFeedback(feedback);
        assertThat(newTrade.getFeedback()).isEqualTo(feedback);
        
        
        TradeType type2 = TradeType.BUY;
        newTrade.setType(type2); 
        assertThat(newTrade.getType()).isEqualTo(type2);
        
        String coin2 = "TestTradeCoin3";
        newTrade.setCoin(coin2);
        assertThat(newTrade.getCoin()).isEqualTo(coin2);
        
        double quantity2 = 35.0;
        newTrade.setQuantity(quantity2);
        assertThat(newTrade.getQuantity()).isEqualTo(quantity2);
        
        double price2 = 1.235;
        newTrade.setPrice(price2);
        assertThat(newTrade.getPrice()).isEqualTo(price2);
        
        String justification2 = "Justification2";
        newTrade.setJustification(justification2);
        assertThat(newTrade.getJustification()).isEqualTo(justification2);
        
        ArrayList<Double> chartData2 = new ArrayList<>();
        chartData2.add(10.2);
        chartData2.add(10.4);
        chartData2.add(10.9);
        chartData2.add(10.1);
        chartData2.add(10.4);
        chartData2.add(10.7);
        chartData2.add(10.24);
        chartData2.add(10.21);
        chartData2.add(10.5);
        chartData.add(10.1);
        newTrade.setChartData(chartData2);
        assertThat(newTrade.getChartData()).isEqualTo(chartData2);
    }

}
