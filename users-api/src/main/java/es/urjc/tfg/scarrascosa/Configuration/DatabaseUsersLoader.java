package es.urjc.tfg.scarrascosa.Configuration;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import es.urjc.tfg.scarrascosa.Student.Student;
import es.urjc.tfg.scarrascosa.UserProfile.UserProfileRepository;

@Component
public class DatabaseUsersLoader {
    
    @Value("${passwords.admin}")
    private String adminPass;
    @Value("${passwords.user}")
    private String userPass;
    
    @Autowired
    private UserProfileRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    private void initDatabase() {
        userRepository.save(new Student("User", "Sergio User", 1000.0, passwordEncoder.encode(this.userPass), "USER"));
        userRepository.save(new Student("Admin", "Sergio Admin",1000.0, passwordEncoder.encode(this.adminPass), "USER", "ADMIN"));
    }
}
