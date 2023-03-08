package es.urjc.tfg.scarrascosa.Trade;

import java.util.ArrayList;

import javax.persistence.Entity;
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
    private ArrayList<Double> chartData;
    private String date;
    
    public Trade(TradeType type, String coin, double quantity, double price, String justification, ArrayList<Double> chartData, String date) {
        this.type = type;
        this.coin = coin;
        this.quantity = quantity;
        this.price = price;
        this.date = date;
        this.justification = justification;
        this.chartData = chartData;
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
    public ArrayList<Double> getChartData() {
        return chartData;
    }
    public void setChartData(ArrayList<Double> chartData) {
        this.chartData = chartData;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    
    
    

}
