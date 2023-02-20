package es.urjc.tfg.scarrascosa.Student;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import es.urjc.tfg.scarrascosa.DTO.StudentDTO;
import es.urjc.tfg.scarrascosa.DTO.TradeDTO;
import es.urjc.tfg.scarrascosa.UserProfile.UserProfileRepository;

@RestController
public class StudentRestController {
    
    @Autowired
    private UserProfileRepository repo;
    
    @GetMapping("/users/{username}")
    public ResponseEntity<StudentDTO> getUserDataByUsername (@PathVariable String username ) {
        Optional<Student> optional = repo.findByName(username);
        if (optional.isPresent()) {
            Student student = optional.get(); 
            return ResponseEntity.ok(new StudentDTO(student.getBalance(), student.getPortfolio()));
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/purchase")
    public ResponseEntity<HttpStatus> purchaseCoin (@RequestBody TradeDTO trade) {
        Optional<Student> optional = repo.findByName(trade.getUsername());
        if (optional.isPresent()) {
            Student student = optional.get(); 
            try {
                student.addToPortfolio(trade.getCoin(),trade.getQuantity(), trade.getPrice());
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
}
