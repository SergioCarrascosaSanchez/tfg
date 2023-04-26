package es.urjc.tfg.scarrascosa.Rest;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.urjc.tfg.scarrascosa.Coin.Coin;
import es.urjc.tfg.scarrascosa.Coin.CoinRepository;
import es.urjc.tfg.scarrascosa.DTO.PriceResponseDTO;
import es.urjc.tfg.scarrascosa.DTO.PricesResponseDTO;

@RestController
@RequestMapping("/prices-api")
public class CoinRestController {
    
    @Autowired
    private CoinRepository coinRepository;
    
    @GetMapping("/last/{ticker}")
    public ResponseEntity<PriceResponseDTO> getLastPriceByTicker(@PathVariable String ticker) {
        
        Optional<Coin> optionalCoin = this.coinRepository.findByTicker(ticker);
        if(optionalCoin.isPresent()) {
            Coin coin = optionalCoin.get();
            PriceResponseDTO response = new PriceResponseDTO();
            response.setPrice(coin.getLastPrice());
            return new ResponseEntity<PriceResponseDTO>(response, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
    }
    
    @GetMapping("/10s/{ticker}")
    public ResponseEntity<PricesResponseDTO> get10sPricesByTicker(@PathVariable String ticker) {
        
        Optional<Coin> optionalCoin = this.coinRepository.findByTicker(ticker);
        if(optionalCoin.isPresent()) {
            Coin coin = optionalCoin.get();
            PricesResponseDTO response = new PricesResponseDTO();
            response.setPrices(coin.get10sPrices());
            return new ResponseEntity<PricesResponseDTO>(response, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/30m/{ticker}")
    public ResponseEntity<PricesResponseDTO> get30mPricesByTicker(@PathVariable String ticker) {
        
        Optional<Coin> optionalCoin = this.coinRepository.findByTicker(ticker);
        if(optionalCoin.isPresent()) {
            Coin coin = optionalCoin.get();
            PricesResponseDTO response = new PricesResponseDTO();
            response.setPrices(coin.get30mPrices());
            return new ResponseEntity<PricesResponseDTO>(response, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/1d/{ticker}")
    public ResponseEntity<PricesResponseDTO> get1dPricesByTicker(@PathVariable String ticker) {
        
        Optional<Coin> optionalCoin = this.coinRepository.findByTicker(ticker);
        if(optionalCoin.isPresent()) {
            Coin coin = optionalCoin.get();
            PricesResponseDTO response = new PricesResponseDTO();
            response.setPrices(coin.getListOf1dPrices());
            return new ResponseEntity<PricesResponseDTO>(response, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        
    }
    
}
