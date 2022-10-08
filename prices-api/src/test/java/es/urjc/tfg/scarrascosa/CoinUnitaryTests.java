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
    void getLastPrice(double price) {
        
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
    void testAddToPriceListOf10mPrices(double price1, double price2, double price3) {
        
        String ticker = "SCSBUSD";
        Coin coin = new Coin(ticker);
        
        assertThat(coin.getListOf10mPrices().size()).isEqualTo(0);
        
        coin.addLastPrice(price1);
        coin.addLastPrice(price2);
        coin.addLastPrice(price3);
        
        assertThat(coin.getListOf10mPrices()).isEqualTo(Arrays.asList(price1, price2, price3));
    }
    
    @Test
    void testAddMaxPricesToListOf10mPrices() {
        
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
    
    @Test
    void testAddPriceToPrices() {
        
        String ticker = "SCSBUSD";
        Coin coin = new Coin(ticker);
        
        assertThat(coin.getListOf1dPrices().size()).isEqualTo(0);
        
        double price1 = 10.0;
        double price2 = 20.0;
        double price3 = 15.0;
        
        coin.add1dPrice(price1);
        coin.add1dPrice(price2);
        coin.add1dPrice(price3);
        
        assertThat(coin.getListOf1dPrices()).isEqualTo(Arrays.asList(price1, price2, price3));
        
    }
    
    @Test
    void testDeleteAll1dPrices() {
        
        String ticker = "SCSBUSD";
        Coin coin = new Coin(ticker);
        
        assertThat(coin.getListOf1dPrices().size()).isEqualTo(0);
        
        double price1 = 10.0;
        double price2 = 20.0;
        double price3 = 15.0;
        
        coin.add1dPrice(price1);
        coin.add1dPrice(price2);
        coin.add1dPrice(price3);
        
        assertThat(coin.getListOf1dPrices()).isEqualTo(Arrays.asList(price1, price2, price3));
        
        coin.delete1dPrices();
        
        assertThat(coin.getListOf1dPrices()).isEqualTo(Arrays.asList());
    }
    
    @Test
    void testAddToAllPrices() {
        
        String ticker = "SCSBUSD";
        Coin coin = new Coin(ticker);
        
        assertThat(coin.getListOfAllPrices().size()).isEqualTo(0);
        
        double price1 = 10.0;
        double price2 = 20.0;
        coin.addToListOfAllPrices(price1);
        coin.addToListOfAllPrices(price2);
        
        assertThat(coin.getListOfAllPrices()).isEqualTo(Arrays.asList(price1, price2));
        
    }

}
