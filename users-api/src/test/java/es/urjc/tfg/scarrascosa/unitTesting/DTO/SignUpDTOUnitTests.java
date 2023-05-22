package es.urjc.tfg.scarrascosa.unitTesting.DTO;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import es.urjc.tfg.scarrascosa.DTO.SignUpDTO;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class SignUpDTOUnitTests {

    @Test
    public void testGetUsername() {
        String username = "name";
        SignUpDTO signUpDTO = new SignUpDTO(username, "name@example.com", "password123", 100.0, new ArrayList<>());
        Assertions.assertEquals(username, signUpDTO.getUsername());
    }

    @Test
    public void testSetUsername() {
        String username = "name";
        SignUpDTO signUpDTO = new SignUpDTO();
        signUpDTO.setUsername(username);
        Assertions.assertEquals(username, signUpDTO.getUsername());
    }

    @Test
    public void testGetEmail() {
        String email = "name@example.com";
        SignUpDTO signUpDTO = new SignUpDTO("name", email, "password123", 100.0, new ArrayList<>());
        Assertions.assertEquals(email, signUpDTO.getEmail());
    }

    @Test
    public void testSetEmail() {
        String email = "name@example.com";
        SignUpDTO signUpDTO = new SignUpDTO();
        signUpDTO.setEmail(email);
        Assertions.assertEquals(email, signUpDTO.getEmail());
    }

    @Test
    public void testGetPassword() {
        String password = "password123";
        SignUpDTO signUpDTO = new SignUpDTO("name", "name@example.com", password, 100.0, new ArrayList<>());
        Assertions.assertEquals(password, signUpDTO.getPassword());
    }

    @Test
    public void testSetPassword() {
        String password = "password123";
        SignUpDTO signUpDTO = new SignUpDTO();
        signUpDTO.setPassword(password);
        Assertions.assertEquals(password, signUpDTO.getPassword());
    }

    @Test
    public void testGetInitialBalance() {
        double initialBalance = 100.0;
        SignUpDTO signUpDTO = new SignUpDTO("name", "name@example.com", "password123", initialBalance, new ArrayList<>());
        Assertions.assertEquals(initialBalance, signUpDTO.getInitialBalance());
    }

    @Test
    public void testSetInitialBalance() {
        double initialBalance = 100.0;
        SignUpDTO signUpDTO = new SignUpDTO();
        signUpDTO.setInitialBalance(initialBalance);
        Assertions.assertEquals(initialBalance, signUpDTO.getInitialBalance());
    }

    @Test
    public void testGetRoles() {
        List<String> roles = Arrays.asList("admin", "user");
        SignUpDTO signUpDTO = new SignUpDTO("name", "name@example.com", "password123", 100.0, roles);
        Assertions.assertEquals(roles, signUpDTO.getRoles());
    }

    @Test
    public void testSetRoles() {
        List<String> roles = Arrays.asList("admin", "user");
        SignUpDTO signUpDTO = new SignUpDTO();
        signUpDTO.setRoles(roles);
        Assertions.assertEquals(roles, signUpDTO.getRoles());
    }

}
