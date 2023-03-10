package es.urjc.tfg.scarrascosa.unitTesting;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;

import es.urjc.tfg.scarrascosa.Trade.Trade;
import es.urjc.tfg.scarrascosa.Trade.TradeType;

class TradeUnitTests {

    @Test
    void CreateTrade() {
        
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
        
    }

}
