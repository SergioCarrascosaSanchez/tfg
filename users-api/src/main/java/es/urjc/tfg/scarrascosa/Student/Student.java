package es.urjc.tfg.scarrascosa.Student;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;

import es.urjc.tfg.scarrascosa.Trade.Trade;
import es.urjc.tfg.scarrascosa.UserProfile.UserProfile;

@Entity
public class Student extends UserProfile{
    
    private double balance;
    @Lob
    private HashMap<String, Double> portfolio;
    @ElementCollection(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private List<Trade> tradeHistory;
    
    public Student() {}
    
    public Student(String name, String email, double initBalance, String password, String... roles) {
        super(name, email, password, roles);
        this.balance = initBalance;
        this.portfolio = new HashMap<>();
        this.tradeHistory = new LinkedList<Trade>();
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
    
    public List<Trade> getTradeHistory() {
        return tradeHistory;
    }

    public void setTradeHistory(List<Trade> tradeHistory) {
        this.tradeHistory = tradeHistory;
    }
    
    public double getQuantity(String ticker) {
        if(this.portfolio.containsKey(ticker)) {
            return this.portfolio.get(ticker);
        }
        else {
            return 0.0;
        }
    }
    
    public void addToPortfolio (Trade trade) throws Exception {
        if((trade.getQuantity()*trade.getPrice())<=this.balance) {
            this.setBalance(this.balance - (trade.getQuantity()*trade.getPrice()));
            this.portfolio.put(trade.getCoin(), this.getQuantity(trade.getCoin())+trade.getQuantity());
            this.tradeHistory.add(0, trade);
        }
        else {
            throw new Exception("not enough balance");
        }
    }
    public void sellFromPortfolio(Trade trade) throws Exception {
        double portfolioQuantity = this.getQuantity(trade.getCoin());
        if(portfolioQuantity >= trade.getQuantity()) {
            this.portfolio.put(trade.getCoin(), (portfolioQuantity - trade.getQuantity()));
            this.tradeHistory.add(0, trade);
            this.setBalance(this.balance + trade.getQuantity()*trade.getPrice());
            if(this.getQuantity(trade.getCoin()) == 0.0) {
                this.portfolio.remove(trade.getCoin());
            }
        }
        else {
            throw new Exception("not enough quantity: "+portfolioQuantity+" left");
        }
    }
 
}