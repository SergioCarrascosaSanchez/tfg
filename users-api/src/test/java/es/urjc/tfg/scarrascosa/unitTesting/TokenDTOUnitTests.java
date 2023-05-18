package es.urjc.tfg.scarrascosa.unitTesting;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import es.urjc.tfg.scarrascosa.DTO.TokenDTO;

public class TokenDTOUnitTests {
    @Test
    public void testGetToken() {
        String tokenValue = "abc123";
        TokenDTO tokenDTO = new TokenDTO(tokenValue);
        Assertions.assertEquals(tokenValue, tokenDTO.getToken());
    }

    @Test
    public void testSetToken() {
        String tokenValue = "abc123";
        TokenDTO tokenDTO = new TokenDTO();
        tokenDTO.setToken(tokenValue);
        Assertions.assertEquals(tokenValue, tokenDTO.getToken());
    }

}
