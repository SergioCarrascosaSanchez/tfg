package es.urjc.tfg.scarrascosa;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import es.urjc.tfg.scarrascosa.DTO.PriceResponseDTO;

class PriceResponseDTOTests {

    private PriceResponseDTO priceResponseDTO;

    @BeforeEach
    public void setUp() {
        priceResponseDTO = new PriceResponseDTO();
    }

    @Test
    public void testGetPrice() {
        double expectedPrice = 10.0;
        priceResponseDTO.setPrice(expectedPrice);
        double actualPrice = priceResponseDTO.getPrice();

        Assertions.assertEquals(expectedPrice, actualPrice, 0.0001);
    }

    @Test
    public void testSetPrice() {
        double expectedPrice = 10.0;
        priceResponseDTO.setPrice(expectedPrice);
        double actualPrice = priceResponseDTO.getPrice();

        Assertions.assertEquals(expectedPrice, actualPrice, 0.0001);
    }

}
