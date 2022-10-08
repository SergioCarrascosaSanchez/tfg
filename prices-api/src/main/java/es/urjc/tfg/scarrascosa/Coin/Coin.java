package es.urjc.tfg.scarrascosa.Coin;

import java.util.LinkedList;
import java.util.List;

public class Coin {
    
    private String ticker;
    private double lastPrice;
    private static final int MAX_10s_PRICES = 50;
    private List<Double> listOf10sPrices;
    private List<Double> listOf30mPrices;
    private List<Double> listOfAllPrices;
    
    public Coin(String ticker) {
        this.ticker = ticker;
        this.listOf10sPrices = new LinkedList<>();
        this.listOf30mPrices = new LinkedList<>();
        this.listOfAllPrices = new LinkedList<>();
    }

    public String getTicker() {
        return this.ticker;
    }
    
    public void addLastPrice(double price) {
        this.lastPrice = price;
        addToListOf10sPrices(price);
    }
    
    public double getLastPrice() {
        return lastPrice;
    }

    public List<Double> getListOf10sPrices() {
        return this.listOf10sPrices;
    }
    
    public void addToListOf10sPrices(double price) {
        if(listOf10sPrices.size() == MAX_10s_PRICES) {
            listOf10sPrices.remove(0);
        }
        this.listOf10sPrices.add(price);
    }

    public void add30mPrice(double price) {
        this.listOf30mPrices.add(price);
    }

    public List<Double> getListOf30mPrices() {
        return this.listOf30mPrices;
    }

    public void delete30mPrices() {
        this.listOf30mPrices = new LinkedList<>();
    }

    public void addToListOfAllPrices(double price) {
        this.listOfAllPrices.add(price);
        
    }

    public List<Double> getListOfAllPrices() {
        return this.listOfAllPrices;
        
    }

}
