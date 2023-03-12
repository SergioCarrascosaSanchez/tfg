package es.urjc.tfg.scarrascosa.Teacher;

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
import es.urjc.tfg.scarrascosa.DTO.StudentListDTO;
import es.urjc.tfg.scarrascosa.DTO.TeacherDTO;
import es.urjc.tfg.scarrascosa.Student.Student;
import es.urjc.tfg.scarrascosa.UserProfile.UserProfile;
import es.urjc.tfg.scarrascosa.UserProfile.UserProfileRepository;

@RestController
public class TeacherRestController {
    @Autowired
    private UserProfileRepository repo;
    
    @GetMapping("/teacher/{username}")
    public ResponseEntity<TeacherDTO> getTeacherDataByUsername (@PathVariable String username ) {
        Optional<UserProfile> optional = repo.findByName(username);
        if (optional.isPresent()) {
            UserProfile user = optional.get();
            if(user instanceof Teacher) {
                Teacher teacher = (Teacher) user;
                TeacherDTO teacherDTO = new TeacherDTO();
                teacherDTO.TeacherDTOStudentEntity(username, teacher.getStudentList());
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
