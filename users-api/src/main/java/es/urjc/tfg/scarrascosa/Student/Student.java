package es.urjc.tfg.scarrascosa.Student;

import javax.persistence.Entity;

import es.urjc.tfg.scarrascosa.UserProfile.UserProfile;

@Entity
public class Student extends UserProfile{
    
    private double balance;
    
    public Student() {}
    
    public Student(String name, String email, double initBalance, String password, String... roles) {
        super(name, email, password, roles);
        this.balance = initBalance;
    }
    
    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}