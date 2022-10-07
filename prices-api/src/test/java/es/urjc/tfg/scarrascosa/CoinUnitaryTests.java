package es.urjc.tfg.scarrascosa;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import es.urjc.tfg.scarrascosa.Coin.Coin;

class CoinUnitaryTests {

    
    @ParameterizedTest
    @CsvSource({
    "SCSBUSD",
    "ABCBUSD"
    })
    void constructorTest(String ticker) {
        
        Coin coin = new Coin(ticker);
        
        assertThat(coin.getTicker()).isEqualTo(ticker);
        
    }
    
    
    
    @ParameterizedTest
    @CsvSource({
    "10.0",
    "20.0"
    })
    void getLastPrice(Double price) {
        
        String ticker = "SCSBUSD";
        Coin coin = new Coin(ticker);
        
        coin.addLastPrice(price);
        
        assertThat(coin.getLastPrice()).isEqualTo(price);
        
    }
    
    @ParameterizedTest
    @CsvSource({
    "10.0, 20.0, 30.0",
    "20.0, 10.0, 40.0"
    })
    void testAddPriceListOf10mPrices(Double price1, Double price2, Double price3) {
        String ticker = "SCSBUSD";
        Coin coin = new Coin(ticker);
        
        coin.addLastPrice(price1);
        coin.addLastPrice(price2);
        coin.addLastPrice(price3);
        
        assertThat(coin.getListOf10mPrices()).isEqualTo(Arrays.asList(price1, price2, price3));
    }
    
    @Test
    void testAddMaxPricesListOf10mPrices() {
        
        String ticker = "SCSBUSD";
        Coin coin = new Coin(ticker);
        
        List<Double> list = new LinkedList<>();
        for(double i = 0; i<50; i++) {
            list.add(i);
            coin.addLastPrice(i);
        }
        list.remove(0);
        list.add(50.0);
        
        coin.addLastPrice(50.0);
        
        assertThat(coin.getListOf10mPrices()).isEqualTo(list);
        
    }

}
