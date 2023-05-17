package es.urjc.tfg.scarrascosa.ScheduledTasks;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import es.urjc.tfg.scarrascosa.Coin.Coin;
import es.urjc.tfg.scarrascosa.Coin.CoinRepository;
import es.urjc.tfg.scarrascosa.DTO.BinanceResponseDTO;

@Component
@EnableScheduling
public class ScheduledTasks {
    
    @Autowired
    private CoinRepository coinRepo;
    
    @Autowired
    Environment env;
    
    @Value("${prices.url}")
    private String url;
    
    @Value("${prices.password}")
    private String pass;
    
    private RestTemplate restTemplate = new RestTemplate(); 
    
    public List<BinanceResponseDTO> fetchApiCall(){
        
        ResponseEntity<BinanceResponseDTO[]> response;
        
        if(Arrays.stream(env.getActiveProfiles()).anyMatch(
                env -> (env.equalsIgnoreCase("prod")))){
            
            String requestJson = "{\"key\":\""+this.pass+"\"}";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> entity = new HttpEntity<String>(requestJson,headers);
            
            response = restTemplate.exchange(url, HttpMethod.POST, entity, BinanceResponseDTO[].class);
            
        }else{
            response = restTemplate.exchange(url, HttpMethod.GET, null, BinanceResponseDTO[].class);
        }
        return Arrays.stream(response.getBody()).filter(coin -> coin.getSymbol().endsWith("BUSD")).toList();
    }
    
    @Scheduled(cron = "1/10 * * * * ?")
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
    
    @Scheduled(cron = "0 0/30 * * * ?")
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
    
    @Scheduled(cron = "0 0 0 * * ?")
    public void fetch1dValues() {
        
        List<BinanceResponseDTO> responseFilteredList = fetchApiCall();
        
        for(BinanceResponseDTO coinFromFilteredList : responseFilteredList) {
            String symbol = coinFromFilteredList.getSymbol();
            Double value = coinFromFilteredList.getPrice();
            
            Optional<Coin> optionalCoin = this.coinRepo.findByTicker(symbol);
            if(optionalCoin.isPresent()) {
                Coin coin = optionalCoin.get();
                coin.add1dPrice(value);
                coin.delete30mPrices();
                this.coinRepo.save(coin);
            }
            else {
                Coin coin = new Coin(symbol);
                coin.add1dPrice(value);
                this.coinRepo.save(coin);
            }
        }
    }
    
    public void setRestTemplate(RestTemplate rt) {
        this.restTemplate = rt;
    }
}
