package es.urjc.tfg.scarrascosa;

import static org.assertj.core.api.Assertions.assertThat;

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
        
        Coin coin = new Coin("SCSBUSD");
        
        Coin savedCoin = this.coinRepository.save(coin);
        
        Optional<Coin> optionalCoin = this.coinRepository.findById(savedCoin.getId());
        
        assertThat(optionalCoin.isPresent()).isEqualTo(true);
        
        assertThat(optionalCoin.get().getId()).isEqualTo(savedCoin.getId());
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
