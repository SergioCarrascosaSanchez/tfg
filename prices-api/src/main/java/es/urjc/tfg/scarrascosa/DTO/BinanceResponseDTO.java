package es.urjc.tfg.scarrascosa.DTO;

public class BinanceResponseDTO {
    private String symbol;
    private Double price;
    
    private BinanceResponseDTO() {}
    
    private BinanceResponseDTO(String symbol, Double price) {
        this.price = price;
        this.symbol = symbol;
    }
    
    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }
    public String getSymbol() {
        return symbol;
    }
    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }
}
