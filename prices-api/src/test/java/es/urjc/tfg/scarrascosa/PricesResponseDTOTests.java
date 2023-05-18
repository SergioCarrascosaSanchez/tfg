package es.urjc.tfg.scarrascosa;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;

import es.urjc.tfg.scarrascosa.DTO.PricesResponseDTO;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class PricesResponseDTOTests {

    private PricesResponseDTO pricesResponseDTO;

    @BeforeEach
    public void setUp() {
        pricesResponseDTO = new PricesResponseDTO();
    }

    @Test
    public void testGetPrices() {
        List<Double> expectedPrices = Arrays.asList(10.0, 20.0, 30.0);
        pricesResponseDTO.setPrices(expectedPrices);
        List<Double> actualPrices = pricesResponseDTO.getPrices();

        Assertions.assertEquals(expectedPrices, actualPrices);
    }

    @Test
    public void testSetPrices() {
        List<Double> expectedPrices = Arrays.asList(10.0, 20.0, 30.0);
        pricesResponseDTO.setPrices(expectedPrices);
        List<Double> actualPrices = pricesResponseDTO.getPrices();

        Assertions.assertEquals(expectedPrices, actualPrices);
    }
}
