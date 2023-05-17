package es.urjc.tfg.scarrascosa;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import es.urjc.tfg.scarrascosa.DTO.BinanceResponseDTO;

public class BinanceResponseDTOTest {

    private BinanceResponseDTO binanceResponseDTO;


    @Test
    public void testPriceGetterAndSetter() {
        binanceResponseDTO = new BinanceResponseDTO();
        double expectedPrice = 10.0;
        binanceResponseDTO.setPrice(expectedPrice);
        double actualPrice = binanceResponseDTO.getPrice();

        Assertions.assertEquals(expectedPrice, actualPrice, 0.0001);
    }

    @Test
    public void testSymbolGetterAndSetter() {
        binanceResponseDTO = new BinanceResponseDTO();
        String expectedSymbol = "BTC";
        binanceResponseDTO.setSymbol(expectedSymbol);
        String actualSymbol = binanceResponseDTO.getSymbol();

        Assertions.assertEquals(expectedSymbol, actualSymbol);
    }
    
    @Test
    public void testConstructorWithArguments() {
        String expectedSymbol = "BTC";
        double expectedPrice = 10.0;

        BinanceResponseDTO binanceResponseDTO = new BinanceResponseDTO(expectedSymbol, expectedPrice);

        Assertions.assertEquals(expectedSymbol, binanceResponseDTO.getSymbol());
        Assertions.assertEquals(expectedPrice, binanceResponseDTO.getPrice(), 0.0001);
    }
}
