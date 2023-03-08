package es.urjc.tfg.scarrascosa.Student;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import es.urjc.tfg.scarrascosa.DTO.StudentDTO;
import es.urjc.tfg.scarrascosa.DTO.TradeDTO;
import es.urjc.tfg.scarrascosa.Trade.Trade;
import es.urjc.tfg.scarrascosa.Trade.TradeRepository;
import es.urjc.tfg.scarrascosa.Trade.TradeType;
import es.urjc.tfg.scarrascosa.UserProfile.UserProfile;
import es.urjc.tfg.scarrascosa.UserProfile.UserProfileRepository;

@RestController
public class StudentRestController {
    
    @Autowired
    private UserProfileRepository repo;
    
    @Autowired
    private TradeRepository tradeRepo;
    
    @GetMapping("/users/{username}")
    public ResponseEntity<StudentDTO> getUserDataByUsername (@PathVariable String username ) {
        Optional<UserProfile> optional = repo.findByName(username);
        if (optional.isPresent()) {
            UserProfile user = optional.get();
            if(user instanceof Student) {
                Student student = (Student) user;
                return ResponseEntity.ok(new StudentDTO(student.getBalance(), student.getPortfolio()));
            }
            else {
                return ResponseEntity.notFound().build();
            } 
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/purchase")
    public ResponseEntity<HttpStatus> purchaseCoin (@RequestBody TradeDTO trade) {
        Optional<UserProfile> optional = repo.findByName(trade.getUsername());
        if (optional.isPresent()) {
            UserProfile user = optional.get();
            if(user instanceof Student) {
                Student student = (Student) user;
                Trade newTrade = new Trade(TradeType.BUY, trade.getCoin(),trade.getQuantity(), trade.getPrice(), trade.getJustification(), trade.getChartData());
                try {
                    student.addToPortfolio(newTrade);
                    this.tradeRepo.save(newTrade);
                    this.repo.save(student);
                    return ResponseEntity.ok().build();
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.PAYMENT_REQUIRED).build();
                }
            }
            else {
                return ResponseEntity.notFound().build();
            } 
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/sell")
    public ResponseEntity<HttpStatus> sellCoin (@RequestBody TradeDTO trade) {
        Optional<UserProfile> optional = repo.findByName(trade.getUsername());
        if (optional.isPresent()) {
            UserProfile user = optional.get();
            if(user instanceof Student) {
                Student student = (Student) user;
                try {
                    student.sellFromPortfolio(trade.getCoin(),trade.getQuantity(), trade.getPrice());
                    this.repo.save(student);
                    return ResponseEntity.ok().build();
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
                }
            }
            else {
                return ResponseEntity.notFound().build();
            } 
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
}
