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
import es.urjc.tfg.scarrascosa.DTO.FeedbackDTO;
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
    public ResponseEntity<Object> getUserDataByUsername(@PathVariable String username) {
        Optional<UserProfile> optional = repo.findByName(username);
        if (optional.isPresent()) {
            UserProfile user = optional.get();

            if (user instanceof Student) {
                Student student = (Student) user;
                StudentDTO studentDTO = createStudentDTO(student);
                return ResponseEntity.ok(studentDTO);
            } else if (user instanceof Teacher) {
                Teacher teacher = (Teacher) user;
                TeacherDTO teacherDTO = createTeacherDTO(username, teacher);
                return ResponseEntity.ok(teacherDTO);
            } else if (user.getRoles().contains("ADMIN")) {
                AdminDTO adminDTO = createAdminDTO(username);
                return ResponseEntity.ok(adminDTO);
            }
        }

        return ResponseEntity.notFound().build();
    }

    private StudentDTO createStudentDTO(Student student) {
        return new StudentDTO(student.getName(), "STUDENT", student.getBalance(),
                student.getPortfolio(), student.getTradeHistory());
    }

    private TeacherDTO createTeacherDTO(String username, Teacher teacher) {
        TeacherDTO teacherDTO = new TeacherDTO();
        teacherDTO.TeacherDTOStudentEntity(username, "TEACHER", teacher.getStudentList());
        return teacherDTO;
    }

    private AdminDTO createAdminDTO(String username) {
        return new AdminDTO(username, "ADMIN");
    }

    @PostMapping("/students/{username}/trade")
    public ResponseEntity<HttpStatus> tradeCoin(@PathVariable String username, @RequestBody TradeDTO trade) {
        Optional<UserProfile> optional = repo.findByName(username);
        if (optional.isPresent()) {
            UserProfile user = optional.get();

            if (user instanceof Student) {
                Student student = (Student) user;

                if (trade.getType().equals(TradeType.BUY.toString())) {
                    try {
                        Trade newTrade = createTradeObject(TradeType.BUY, trade);
                        student.addToPortfolio(newTrade);
                        saveTradeAndStudent(newTrade, student);
                        return ResponseEntity.ok().build();
                    } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.PAYMENT_REQUIRED).build();
                    }
                } else if (trade.getType().equals(TradeType.SELL.toString())) {
                    try {
                        Trade newTrade = createTradeObject(TradeType.SELL, trade);
                        student.sellFromPortfolio(newTrade);
                        saveTradeAndStudent(newTrade, student);
                        return ResponseEntity.ok().build();
                    } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
                    }
                }

                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }

            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.notFound().build();
    }

    private Trade createTradeObject(TradeType tradeType, TradeDTO tradeDTO) {
        return new Trade(tradeType, tradeDTO.getCoin(), tradeDTO.getQuantity(), tradeDTO.getPrice(),
                tradeDTO.getJustification(), tradeDTO.getChartData());
    }

    private void saveTradeAndStudent(Trade trade, Student student) {
        this.tradeRepo.save(trade);
        this.repo.save(student);
    }

    @PostMapping("/teacher/{username}")
    public ResponseEntity<HttpStatus> addStudentToTeacher(@PathVariable String username,
            @RequestBody StudentListDTO studentListDTO) {
        Optional<UserProfile> optional = repo.findByName(username);
        if (optional.isPresent()) {
            UserProfile user = optional.get();
            if (user instanceof Teacher) {
                Teacher teacher = (Teacher) user;
                for (String studentUsername : studentListDTO.getStudentList()) {
                    Optional<UserProfile> studentOptional = repo.findByName(studentUsername);
                    if (studentOptional.isPresent()) {
                        UserProfile studentUser = studentOptional.get();
                        if (studentUser instanceof Student) {
                            Student student = (Student) studentUser;
                            teacher.addStudent(student);
                        } else {
                            return ResponseEntity.unprocessableEntity().build();
                        }
                    } else {
                        return ResponseEntity.unprocessableEntity().build();
                    }
                }
                this.repo.save(teacher);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("teachers/{teacherUsername}/students/{studentUsername}/trades/{id}/feedback")
    public ResponseEntity<HttpStatus> addFeedback(@PathVariable String teacherUsername,
            @PathVariable String studentUsername, @PathVariable Long id, @RequestBody FeedbackDTO feedback) {
        Optional<UserProfile> teacherOptional = repo.findByName(teacherUsername);
        Optional<UserProfile> studentOptional = repo.findByName(studentUsername);
        Optional<Trade> tradeOptional = tradeRepo.findById(id);

        if (teacherOptional.isEmpty() || studentOptional.isEmpty() || tradeOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Teacher teacher = (Teacher) teacherOptional.get();
        Student student = (Student) studentOptional.get();
        Trade trade = tradeOptional.get();

        if (teacher.getStudentList().contains(student) && student.getTradeHistory().contains(trade)) {
            trade.setFeedback(feedback.getFeedback());
            this.tradeRepo.save(trade);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
