package es.urjc.tfg.scarrascosa.DTO;

public class TradeDTO {
    private String username;
    private String coin;
    private double quantity;
    private double price;
    
    public TradeDTO() {}
    
    public TradeDTO(String username, String coin, double quantity, double price) {
        this.username = username;
        this.coin = coin;
        this.quantity = quantity;
        this.price = price;
    }
    
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
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
}
