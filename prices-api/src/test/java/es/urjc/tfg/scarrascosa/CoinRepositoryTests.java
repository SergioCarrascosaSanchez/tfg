package es.urjc.tfg.scarrascosa;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import es.urjc.tfg.scarrascosa.Coin.Coin;
import es.urjc.tfg.scarrascosa.Coin.CoinRepository;

@DataJpaTest
class CoinRepositoryTests {
    @Autowired
    private CoinRepository coinRepository;
    
    @Test
    void testSave() {
        
        double price1 = 10.0;
        double price2 = 30.0;
        double price3 = 40.0;
        double price4 = 70.0;
        double price5 = 10.0;
        double price6 = 90.0;
        
        Coin coin = new Coin("SCSBUSD");
        coin.addLastPrice(price1);
        coin.addLastPrice(price2);
        coin.add30mPrice(price3);
        coin.add30mPrice(price4);
        coin.addToListOfAllPrices(price5);
        coin.addToListOfAllPrices(price6);
        
        Coin savedCoin = this.coinRepository.save(coin);
        
        Optional<Coin> optionalCoin = this.coinRepository.findById(savedCoin.getId());
        
        assertThat(optionalCoin.isPresent()).isEqualTo(true);
        
        assertThat(optionalCoin.get().getId()).isEqualTo(savedCoin.getId());
        
        assertThat(optionalCoin.get().getLastPrice()).isEqualTo(price2);
        assertThat(Arrays.asList(optionalCoin.get().getListOf10sPrices().toArray())).isEqualTo(Arrays.asList(price1, price2));
        assertThat(Arrays.asList(optionalCoin.get().getListOf30mPrices().toArray())).isEqualTo(Arrays.asList(price3, price4));
        assertThat(Arrays.asList(optionalCoin.get().getListOfAllPrices().toArray())).isEqualTo(Arrays.asList(price5, price6));
        
    }
    
    @Test
    void findByTicker() {
        
        String ticker = "SCSBUSD";
        
        Coin coin = new Coin(ticker);
        
        this.coinRepository.save(coin);
        
        Optional<Coin> optionalCoin = this.coinRepository.findByTicker(ticker);
        
        assertThat(optionalCoin.isPresent()).isEqualTo(true);
        
        assertThat(optionalCoin.get().getTicker()).isEqualTo(ticker);
    }

}
