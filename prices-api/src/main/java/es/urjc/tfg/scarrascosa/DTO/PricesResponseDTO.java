package es.urjc.tfg.scarrascosa.DTO;

import java.util.List;

public class PricesResponseDTO {
    private List<Double> prices;

    public PricesResponseDTO() {}
    
    public List<Double> getPrices() {
        return prices;
    }

    public void setPrices(List<Double> prices) {
        this.prices = prices;
    }
    
}
