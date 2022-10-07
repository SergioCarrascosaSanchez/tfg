package es.urjc.tfg.scarrascosa.Coin;

import java.util.LinkedList;
import java.util.List;

public class Coin {
    
    private String ticker;
    private double lastPrice;
    private static final int MAX_10m_PRICES = 50;
    private List<Double> listOf10mPrices;
    
    public Coin(String ticker) {
        this.ticker = ticker;
        this.listOf10mPrices = new LinkedList<>();
    }

    public String getTicker() {
        return this.ticker;
    }
    
    public void addLastPrice(double price) {
        this.lastPrice = price;
        addToListOf10mPrices(price);
    }
    
    public double getLastPrice() {
        return lastPrice;
    }

    public List<Double> getListOf10mPrices() {
        return this.listOf10mPrices;
    }
    
    public void addToListOf10mPrices(double price) {
        if(listOf10mPrices.size() == MAX_10m_PRICES) {
            listOf10mPrices.remove(0);
        }
        this.listOf10mPrices.add(price);
    }

}
