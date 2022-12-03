package es.urjc.tfg.scarrascosa.Student;

public class Student {
    private String name;
    private String email;
    private double balance;
    
    
    public Student(String name, String email, double initBalance) {
        this.name = name;
        this.email = email;
        this.balance = initBalance;
        
    }
    
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

}