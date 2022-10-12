package es.urjc.tfg.scarrascosa.ScheduledTasks;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import es.urjc.tfg.scarrascosa.Coin.Coin;
import es.urjc.tfg.scarrascosa.Coin.CoinRepository;
import es.urjc.tfg.scarrascosa.DTO.BinanceResponseDTO;

@Component
public class ScheduledTasks {
    
    @Autowired
    private CoinRepository coinRepo;
    
    private RestTemplate restTemplate = new RestTemplate();
    
    public List<BinanceResponseDTO> fetchApiCall(){
        ResponseEntity<BinanceResponseDTO[]> response = restTemplate.exchange("https://api.binance.com/api/v3/ticker/price", HttpMethod.GET, null, BinanceResponseDTO[].class);
        return Arrays.stream(response.getBody()).filter(coin -> coin.getSymbol().endsWith("BUSD")).toList();
    }
    
    @Scheduled(fixedRate = 10000, initialDelay = 10000)
    public void fetchLastValues() {
        
        List<BinanceResponseDTO> responseFilteredList = fetchApiCall();
        
        for(BinanceResponseDTO coinFromFilteredList : responseFilteredList) {
            String symbol = coinFromFilteredList.getSymbol();
            Double value = coinFromFilteredList.getPrice();
            
            Optional<Coin> optionalCoin = this.coinRepo.findByTicker(symbol);
            if(optionalCoin.isPresent()) {
                Coin coin = optionalCoin.get();
                coin.addLastPrice(value);
                this.coinRepo.save(coin);
            }
            else {
                Coin coin = new Coin(symbol);
                coin.addLastPrice(value);
                this.coinRepo.save(coin);
            }
        }
    }
    
    @Scheduled(fixedRate = 1800000 ,initialDelay = 15000)
    public void fetch30mValues() {
        
        List<BinanceResponseDTO> responseFilteredList = fetchApiCall();
        
        for(BinanceResponseDTO coinFromFilteredList : responseFilteredList) {
            String symbol = coinFromFilteredList.getSymbol();
            Double value = coinFromFilteredList.getPrice();
            
            Optional<Coin> optionalCoin = this.coinRepo.findByTicker(symbol);
            if(optionalCoin.isPresent()) {
                Coin coin = optionalCoin.get();
                coin.add30mPrice(value);
                this.coinRepo.save(coin);
            }
            else {
                Coin coin = new Coin(symbol);
                coin.add30mPrice(value);
                this.coinRepo.save(coin);
            }
        }
    }
    
    @Scheduled(cron = "0 0 0 1 * ?")
    public void fetch1dValues() {
        
        List<BinanceResponseDTO> responseFilteredList = fetchApiCall();
        
        for(BinanceResponseDTO coinFromFilteredList : responseFilteredList) {
            String symbol = coinFromFilteredList.getSymbol();
            Double value = coinFromFilteredList.getPrice();
            
            Optional<Coin> optionalCoin = this.coinRepo.findByTicker(symbol);
            if(optionalCoin.isPresent()) {
                Coin coin = optionalCoin.get();
                coin.add1dPrice(value);
                this.coinRepo.save(coin);
            }
            else {
                Coin coin = new Coin(symbol);
                coin.add1dPrice(value);
                this.coinRepo.save(coin);
            }
        }
    }
}
