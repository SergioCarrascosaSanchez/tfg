package es.urjc.tfg.scarrascosa.Trade;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Trade {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private TradeType type;
    private String coin;
    private double quantity;
    private double price;
    private String justification;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<Double> chartData;
    private String date;
    private String feedback;
    
    public Trade() {};
    
    public Trade(TradeType type, String coin, double quantity, double price, String justification, List<Double> chartData) {
        this.type = type;
        this.coin = coin;
        this.quantity = quantity;
        this.price = price;
        this.justification = justification;
        this.chartData = chartData;
        this.feedback = "";
        
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = now.format(formatter);
        
        this.date = formattedDateTime;
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

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
    
    
    

}
