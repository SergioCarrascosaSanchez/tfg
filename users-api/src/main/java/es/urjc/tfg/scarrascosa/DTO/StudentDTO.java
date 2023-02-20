package es.urjc.tfg.scarrascosa.DTO;

import java.util.HashMap;
import java.util.LinkedList;

public class StudentDTO {
    
    private double balance;
    private LinkedList<PortfolioItem> portfolio;
    
    public StudentDTO () {}
    
    public StudentDTO (double balance, LinkedList<PortfolioItem> portfolio) {
        this.setBalance(balance);
        this.portfolio = portfolio;
    }
    
    public StudentDTO (double balance, HashMap<String, Double> portfolioMap) {
        this.setBalance(balance);
        this.portfolio = new LinkedList<PortfolioItem>();
        if(!portfolioMap.isEmpty()) {
            for ( String key : portfolioMap.keySet() ) {
                this.portfolio.add(new PortfolioItem(key, portfolioMap.get(key)));
            }
        }
    }
    
    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
    
    public LinkedList<PortfolioItem> getPortfolio() {
        return this.portfolio;
    }

    public void setPortfolio(LinkedList<PortfolioItem> portfolio) {
        this.portfolio = portfolio;
    }

    private class PortfolioItem{
        private String coin;
        private Double quantity;
        
        public PortfolioItem() {}
        
        public PortfolioItem(String coin, Double quantity) {
            this.coin = coin;
            this.quantity = quantity;
        }
        
        public String getCoin() {
            return coin;
        }
        public void setCoin(String coin) {
            this.coin = coin;
        }
        public Double getQuantity() {
            return quantity;
        }
        public void setQuantity(Double quantity) {
            this.quantity = quantity;
        }
    }
}


