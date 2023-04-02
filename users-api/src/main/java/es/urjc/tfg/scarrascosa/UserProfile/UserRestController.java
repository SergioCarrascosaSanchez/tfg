package es.urjc.tfg.scarrascosa.UserProfile;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import es.urjc.tfg.scarrascosa.DTO.AdminDTO;
import es.urjc.tfg.scarrascosa.DTO.StudentDTO;
import es.urjc.tfg.scarrascosa.DTO.StudentListDTO;
import es.urjc.tfg.scarrascosa.DTO.TeacherDTO;
import es.urjc.tfg.scarrascosa.DTO.TradeDTO;
import es.urjc.tfg.scarrascosa.Student.Student;
import es.urjc.tfg.scarrascosa.Teacher.Teacher;
import es.urjc.tfg.scarrascosa.Trade.Trade;
import es.urjc.tfg.scarrascosa.Trade.TradeRepository;
import es.urjc.tfg.scarrascosa.Trade.TradeType;

@RestController
public class UserRestController {
    
    @Autowired
    private UserProfileRepository repo;
    
    @Autowired
    private TradeRepository tradeRepo;
    
    @GetMapping("/users/{username}")
    public ResponseEntity<Object> getUserDataByUsername (@PathVariable String username ) {
        Optional<UserProfile> optional = repo.findByName(username);
        if (optional.isPresent()) {
            UserProfile user = optional.get();
            if(user instanceof Student) {
                Student student = (Student) user;
                return ResponseEntity.ok(new StudentDTO(student.getName(), "STUDENT" ,student.getBalance(), student.getPortfolio(), student.getTradeHistory()));
            }
            else if(user instanceof Teacher) {
                Teacher teacher = (Teacher) user;
                TeacherDTO teacherDTO = new TeacherDTO();
                teacherDTO.TeacherDTOStudentEntity(username, "TEACHER", teacher.getStudentList());
                return ResponseEntity.ok(teacherDTO);
            }
            else if(user.getRoles().contains("ADMIN")) {
                AdminDTO teacherDTO = new AdminDTO(username, "ADMIN");
                return ResponseEntity.ok(teacherDTO);
            }
            else {
                return ResponseEntity.notFound().build();
            } 
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/students/{username}/purchase")
    public ResponseEntity<HttpStatus> purchaseCoin (@PathVariable String username, @RequestBody TradeDTO trade) {
        Optional<UserProfile> optional = repo.findByName(username);
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
    
    @PostMapping("/students/{username}/sell")
    public ResponseEntity<HttpStatus> sellCoin (@PathVariable String username, @RequestBody TradeDTO trade) {
        Optional<UserProfile> optional = repo.findByName(username);
        if (optional.isPresent()) {
            UserProfile user = optional.get();
            if(user instanceof Student) {
                Student student = (Student) user;
                Trade newTrade = new Trade(TradeType.SELL, trade.getCoin(),trade.getQuantity(), trade.getPrice(), trade.getJustification(), trade.getChartData());
                try {
                    student.sellFromPortfolio(newTrade);
                    this.tradeRepo.save(newTrade);
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
    
    @PostMapping("/teacher/{username}")
    public ResponseEntity<HttpStatus> addStudentToTeacher (@PathVariable String username, @RequestBody StudentListDTO studentListDTO ) {
        Optional<UserProfile> optional = repo.findByName(username);
        if (optional.isPresent()) {
            UserProfile user = optional.get();
            if(user instanceof Teacher) {
                Teacher teacher = (Teacher) user;
                for(String studentUsername : studentListDTO.getStudentList()) {
                    Optional<UserProfile> studentOptional = repo.findByName(studentUsername);
                    if (studentOptional.isPresent()) {
                        UserProfile studentUser = studentOptional.get();
                        if(studentUser instanceof Student) {
                            Student student = (Student) studentUser;
                            teacher.addStudent(student);
                        }
                        else {
                            return ResponseEntity.unprocessableEntity().build();
                        } 
                    }
                    else {
                        return ResponseEntity.unprocessableEntity().build();
                    }
                }
                this.repo.save(teacher);
                return ResponseEntity.ok().build();
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
