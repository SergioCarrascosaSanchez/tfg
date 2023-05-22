package es.urjc.tfg.scarrascosa.DTO;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import es.urjc.tfg.scarrascosa.Trade.Trade;
import es.urjc.tfg.scarrascosa.Trade.TradeType;

public class StudentDTO {
    
    private String username;
    private String role;
    private double balance;
    private LinkedList<PortfolioItem> portfolio;
    private LinkedList<TradeItem> tradeHistory;
    
    public StudentDTO () {}
    
    public StudentDTO (String username, String role, double balance, LinkedList<PortfolioItem> portfolio, LinkedList<TradeItem> tradeHistory) {
        this.username = username;
        this.role = role;
        this.setBalance(balance);
        this.portfolio = portfolio;
        this.tradeHistory = tradeHistory;
    }
    
    public StudentDTO (String username, String role, double balance, HashMap<String, Double> portfolioMap, List<Trade> tradeList) {
        this.username = username;
        this.role = role;
        this.setBalance(balance);
        this.portfolio = new LinkedList<PortfolioItem>();
        if(!portfolioMap.isEmpty()) {
            for ( String key : portfolioMap.keySet() ) {
                this.portfolio.add(new PortfolioItem(key, portfolioMap.get(key)));
            }
        }
        this.tradeHistory = new LinkedList<TradeItem>();
        if(!tradeList.isEmpty()) {
            for(Trade trade : tradeList) {
                this.tradeHistory.add(new TradeItem(trade.getId(),trade.getType(), trade.getCoin(), trade.getQuantity(), trade.getPrice(), trade.getJustification(), trade.getChartData(), trade.getDate(), trade.getFeedback()));
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
    
    public LinkedList<TradeItem> getTradeHistory(){
        return this.tradeHistory;
    }
    public void setTradeHistory(LinkedList<TradeItem> tradeHistory) {
        this.tradeHistory = tradeHistory;
        
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public class PortfolioItem{
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
    
    public class TradeItem{
        private Long id;
        private TradeType type;
        private String coin;
        private double quantity;
        private double price;
        private String justification;
        private List<Double> chartData;
        private String date;
        private String feedback;
        
        public TradeItem() {};
        
        public TradeItem(Long id, TradeType type, String coin, double quantity, double price, String justification, List<Double> chartData, String date, String feedback) {
            this.id = id;
            this.type = type;
            this.coin = coin;
            this.quantity = quantity;
            this.price = price;
            this.justification = justification;
            this.chartData = chartData;
            this.date = date;
            this.feedback = feedback;
        }
        
        public TradeType getType() {
            return this.type;
        }
        public void setType(TradeType tradeType) {
            this.type = tradeType;
        }
        public String getCoin() {
            return coin;
        }
        public void setCoin(String coin) {
            this.coin = coin;
        }
        public double getQuantity() {
            return quantity;
        }
        public void setQuantity(double quantity) {
            this.quantity = quantity;
        }
        public double getPrice() {
            return price;
        }
        public void setPrice(double price) {
            this.price = price;
        }
        public String getJustification() {
            return justification;
        }
        public void setJustification(String justification) {
            this.justification = justification;
        }
        public List<Double> getChartData() {
            return chartData;
        }
        public void setChartData(List<Double> chartData) {
            this.chartData = chartData;
        }
        public String getDate() {
            return date;
        }
        public void setDate(String date) {
            this.date = date;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getFeedback() {
            return feedback;
        }

        public void setFeedback(String feedback) {
            this.feedback = feedback;
        }
    }
}


