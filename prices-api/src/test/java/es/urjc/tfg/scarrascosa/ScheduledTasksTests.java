package es.urjc.tfg.scarrascosa;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import es.urjc.tfg.scarrascosa.Coin.Coin;
import es.urjc.tfg.scarrascosa.Coin.CoinRepository;
import es.urjc.tfg.scarrascosa.DTO.BinanceResponseDTO;
import es.urjc.tfg.scarrascosa.ScheduledTasks.ScheduledTasks;

@SpringBootTest
class ScheduledTasksTests {

    @Mock
    private CoinRepository coinRepo;

    @Mock
    private Environment env;

    @InjectMocks
    private ScheduledTasks scheduledTasks;

    private RestTemplate restTemplate;

    private final String url = "http://example.com/prices";
    private final String password = "password";

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        restTemplate = mock(RestTemplate.class);
        scheduledTasks.setRestTemplate(restTemplate);
        ReflectionTestUtils.setField(scheduledTasks, "url", url);
        ReflectionTestUtils.setField(scheduledTasks, "pass", password);
    }

    @Test
    public void testFetchApiCall_WithProdProfile() {
        when(env.getActiveProfiles()).thenReturn(new String[] { "prod" });
        BinanceResponseDTO[] responseDTOs = { new BinanceResponseDTO("BTCBUSD", 50000.0) };
        ResponseEntity<BinanceResponseDTO[]> responseEntity = ResponseEntity.ok(responseDTOs);
        when(restTemplate.exchange(anyString(), any(HttpMethod.class), any(HttpEntity.class),
                eq(BinanceResponseDTO[].class)))
                        .thenReturn(responseEntity);

        List<BinanceResponseDTO> result = scheduledTasks.fetchApiCall();

        assertEquals(1, result.size());
        assertEquals("BTCBUSD", result.get(0).getSymbol());
        assertEquals(50000.0, result.get(0).getPrice(), 0.001);
        verify(restTemplate).exchange(eq(url), eq(HttpMethod.POST), any(HttpEntity.class),
                eq(BinanceResponseDTO[].class));
    }

    @Test
    public void testFetchApiCall_WithoutProdProfile() {
        when(env.getActiveProfiles()).thenReturn(new String[] { "dev" });
        BinanceResponseDTO[] responseDTOs = { new BinanceResponseDTO("BTCBUSD", 50000.0) };
        ResponseEntity<BinanceResponseDTO[]> responseEntity = ResponseEntity.ok(responseDTOs);
        when(restTemplate.exchange(anyString(), any(HttpMethod.class), any(), eq(BinanceResponseDTO[].class)))
                .thenReturn(responseEntity);

        List<BinanceResponseDTO> result = scheduledTasks.fetchApiCall();

        assertEquals(1, result.size());
        assertEquals("BTCBUSD", result.get(0).getSymbol());
        assertEquals(50000.0, result.get(0).getPrice(), 0.001);
        verify(restTemplate).exchange(eq(url), eq(HttpMethod.GET), isNull(), eq(BinanceResponseDTO[].class));
    }

    @Test
    public void testFetchLastValues_CoinExists() {

        String ticker = "BTCBUSD";
        Double price = 5000.0;
        
        setRestTemplateConfig(ticker, price);

        Coin existingCoin = mock(Coin.class);
        when(coinRepo.findByTicker(ticker)).thenReturn(Optional.of(existingCoin));

        scheduledTasks.fetchLastValues();

        verify(coinRepo).findByTicker(ticker);
        verify(existingCoin).addLastPrice(price);
        verify(coinRepo).save(existingCoin);
    }

    @Test
    public void testFetchLastValues_CoinDoesNotExist() {
        String ticker = "BTCBUSD";
        setRestTemplateConfig(ticker, 5000.0);
        when(coinRepo.findByTicker(ticker)).thenReturn(Optional.empty());
        scheduledTasks.fetchLastValues();
        
        verify(coinRepo).findByTicker(ticker);
        verify(coinRepo).save(any(Coin.class));
    }
    
    @Test
    public void testFetch30mValues_CoinExists() {

        String ticker = "BTCBUSD";
        Double price = 5000.0;
        
        setRestTemplateConfig(ticker, price);

        Coin existingCoin = mock(Coin.class);
        when(coinRepo.findByTicker(ticker)).thenReturn(Optional.of(existingCoin));

        scheduledTasks.fetch30mValues();

        verify(coinRepo).findByTicker(ticker);
        verify(existingCoin).add30mPrice(price);
        verify(coinRepo).save(existingCoin);
    }

    @Test
    public void testFetch30mValues_CoinDoesNotExist() {
        String ticker = "BTCBUSD";
        setRestTemplateConfig(ticker, 5000.0);
        when(coinRepo.findByTicker(ticker)).thenReturn(Optional.empty());
        scheduledTasks.fetch30mValues();
        
        verify(coinRepo).findByTicker(ticker);
        verify(coinRepo).save(any(Coin.class));
    }
    
    @Test
    public void testFetch1dValues_CoinExists() {

        String ticker = "BTCBUSD";
        Double price = 5000.0;
        
        setRestTemplateConfig(ticker, price);

        Coin existingCoin = mock(Coin.class);
        when(coinRepo.findByTicker(ticker)).thenReturn(Optional.of(existingCoin));

        scheduledTasks.fetch1dValues();

        verify(coinRepo).findByTicker(ticker);
        verify(existingCoin).add1dPrice(price);
        verify(coinRepo).save(existingCoin);
    }

    @Test
    public void testFetch1dValues_CoinDoesNotExist() {
        String ticker = "BTCBUSD";
        setRestTemplateConfig(ticker, 5000.0);
        when(coinRepo.findByTicker(ticker)).thenReturn(Optional.empty());
        scheduledTasks.fetch1dValues();
        
        verify(coinRepo).findByTicker(ticker);
        verify(coinRepo).save(any(Coin.class));
    }
    
    
    private void setRestTemplateConfig(String ticker, Double price){
        when(env.getActiveProfiles()).thenReturn(new String[] { "dev" });
        BinanceResponseDTO[] responseDTOs = { new BinanceResponseDTO(ticker, price) };
        ResponseEntity<BinanceResponseDTO[]> responseEntity = ResponseEntity.ok(responseDTOs);
        when(restTemplate.exchange(anyString(), any(HttpMethod.class), any(), eq(BinanceResponseDTO[].class)))
                .thenReturn(responseEntity);
        
    }
}
