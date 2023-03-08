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
    
    public double getQuantity(String ticker) {
        if(this.portfolio.containsKey(ticker)) {
            return this.portfolio.get(ticker);
        }
        else {
            return 0.0;
        }
    }
    
    public void addToPortfolio (String coin, double quantity, double price) throws Exception {
        if((quantity*price)<=this.balance) {
            this.setBalance(this.balance - (quantity*price));
            this.portfolio.put(coin, this.getQuantity(coin)+quantity);
        }
        else {
            throw new Exception("not enough balance");
        }
    }
    public void sellFromPortfolio(String coin, double quantity, double price) throws Exception {
        double portfolioQuantity = this.getQuantity(coin);
        if(portfolioQuantity >= quantity) {
            this.portfolio.put(coin, (portfolioQuantity - quantity));
            this.balance = this.balance + quantity*price;
            if(this.getQuantity(coin) == 0.0) {
                this.portfolio.remove(coin);
            }
        }
        else {
            throw new Exception("not enough quantity: "+portfolioQuantity+" left");
        }
    }
 
}