package es.urjc.tfg.scarrascosa.Configuration;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import es.urjc.tfg.scarrascosa.Student.Student;
import es.urjc.tfg.scarrascosa.UserProfile.UserProfileRepository;

@Component
public class DatabaseUsersLoader {

    @Autowired
    private UserProfileRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    private void initDatabase() {
        userRepository.save(new Student("Sergio", "Sergio", 1000.0, passwordEncoder.encode("pass"), "USER"));
        userRepository.save(new Student("Sergio2", "Sergio2",1000.0, passwordEncoder.encode("adminpass"), "USER", "ADMIN"));
    }
}
