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

@RestController
@RequestMapping("/prices-api")
public class CoinRestController {
    
    @Autowired
    private CoinRepository coinRepository;
    
    @GetMapping("/{ticker}/last")
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
    
}
