package es.urjc.tfg.scarrascosa.DTO;


import java.util.List;

public class SignUpDTO {
    private List<String> roles;
    private String username;
    private String email;
    private String password;
    private double initialBalance;
    
    public SignUpDTO () {}
    
    public SignUpDTO(String username, String email, String password, double initialBalance, List<String>roles) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.initialBalance = initialBalance;
        this.roles = roles;
    }
    
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public double getInitialBalance() {
        return initialBalance;
    }
    public void setInitialBalance(double initialBalance) {
        this.initialBalance = initialBalance;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

}
