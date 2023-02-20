package es.urjc.tfg.scarrascosa.Student;

import java.util.HashMap;

import javax.persistence.Entity;

import es.urjc.tfg.scarrascosa.UserProfile.UserProfile;

@Entity
public class Student extends UserProfile{
    
    private double balance;
    private HashMap<String, Double> portfolio;
    
    public Student() {}
    
    public Student(String name, String email, double initBalance, String password, String... roles) {
        super(name, email, password, roles);
        this.balance = initBalance;
        this.portfolio = new HashMap<>();
    }
    
    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
    
    public HashMap<String, Double> getPortfolio() {
        return portfolio;
    }
}