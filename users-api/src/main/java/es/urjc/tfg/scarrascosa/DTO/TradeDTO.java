package es.urjc.tfg.scarrascosa.DTO;

import java.util.ArrayList;
import java.util.List;

public class TradeDTO {
    private String type;
    private String coin;
    private double quantity;
    private double price;
    private String justification;
    private List<Double> chartData;

    public TradeDTO() {
    }

    public TradeDTO(String type, String coin, double quantity, double price, String justification,
            List<Double> chartData) {
        this.type = type;
        this.coin = coin;
        this.quantity = quantity;
        this.price = price;
        this.justification = justification;
        this.chartData = chartData;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
