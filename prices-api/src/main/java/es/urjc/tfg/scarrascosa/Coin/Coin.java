package es.urjc.tfg.scarrascosa.Coin;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Entity
public class Coin {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String ticker;
    private double lastPrice;
    private static final int MAX_10s_PRICES = 50;
    @ElementCollection
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Double> listOf10sPrices;
    @ElementCollection
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Double> listOf30mPrices;
    @ElementCollection
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Double> listOf1dPrices;
    
    public Coin() {}
    
    public Coin(String ticker) {
        this.ticker = ticker;
        this.listOf10sPrices = new LinkedList<>();
        this.listOf30mPrices = new LinkedList<>();
        this.listOf1dPrices = new LinkedList<>();
    }
    
    public Long getId() {
        return this.id;
    }
    
    public String getTicker() {
        return this.ticker;
    }
    
    public void addLastPrice(double price) {
        this.lastPrice = price;
        add10sPrice(price);
    }
    
    public double getLastPrice() {
        return lastPrice;
    }

    public List<Double> get10sPrices() {
        return this.listOf10sPrices;
    }
    
    public void add10sPrice(double price) {
        if(listOf10sPrices.size() == MAX_10s_PRICES) {
            listOf10sPrices.remove(0);
        }
        this.listOf10sPrices.add(price);
    }

    public void add30mPrice(double price) {
        this.listOf30mPrices.add(price);
    }

    public List<Double> get30mPrices() {
        return this.listOf30mPrices;
    }

    public void delete30mPrices() {
        this.listOf30mPrices = new LinkedList<>();
    }

    public void add1dPrice(double price) {
        this.listOf1dPrices.add(price);
        
    }

    public List<Double> getListOf1dPrices() {
        return this.listOf1dPrices;
        
    }

}
