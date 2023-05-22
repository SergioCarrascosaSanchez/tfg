package es.urjc.tfg.scarrascosa.unitTesting.DTO;

import es.urjc.tfg.scarrascosa.DTO.LoginFormUserDTO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class LoginFormUserDTOUnitTests {
    @Test
    public void testGetUsername() {
        String username = "name";
        LoginFormUserDTO loginFormUserDTO = new LoginFormUserDTO(username, "password123");
        Assertions.assertEquals(username, loginFormUserDTO.getUsername());
    }

    @Test
    public void testSetUsername() {
        String username = "name";
        LoginFormUserDTO loginFormUserDTO = new LoginFormUserDTO();
        loginFormUserDTO.setUsername(username);
        Assertions.assertEquals(username, loginFormUserDTO.getUsername());
    }

    @Test
    public void testGetPassword() {
        String password = "password123";
        LoginFormUserDTO loginFormUserDTO = new LoginFormUserDTO("name", password);
        Assertions.assertEquals(password, loginFormUserDTO.getPassword());
    }

    @Test
    public void testSetPassword() {
        String password = "password123";
        LoginFormUserDTO loginFormUserDTO = new LoginFormUserDTO();
        loginFormUserDTO.setPassword(password);
        Assertions.assertEquals(password, loginFormUserDTO.getPassword());
    }

}
