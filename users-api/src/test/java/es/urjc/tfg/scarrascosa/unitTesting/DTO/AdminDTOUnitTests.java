package es.urjc.tfg.scarrascosa.unitTesting.DTO;

import es.urjc.tfg.scarrascosa.DTO.AdminDTO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class AdminDTOUnitTests {
    
    @Test
    public void testGetUsername() {
        String username = "name";
        AdminDTO admin = new AdminDTO(username, "admin");
        Assertions.assertEquals(username, admin.getUsername());
    }
    
    @Test
    public void testSetUsername() {
        String username = "name";
        AdminDTO admin = new AdminDTO();
        admin.setUsername(username);
        Assertions.assertEquals(username, admin.getUsername());
    }
    
    @Test
    public void testGetRole() {
        String role = "admin";
        AdminDTO admin = new AdminDTO("name", role);
        Assertions.assertEquals(role, admin.getRole());
    }
    
    @Test
    public void testSetRole() {
        String role = "admin";
        AdminDTO admin = new AdminDTO();
        admin.setRole(role);
        Assertions.assertEquals(role, admin.getRole());
    }

}
