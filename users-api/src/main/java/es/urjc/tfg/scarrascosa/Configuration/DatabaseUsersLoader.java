package es.urjc.tfg.scarrascosa.Configuration;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import es.urjc.tfg.scarrascosa.UserProfile.UserProfile;
import es.urjc.tfg.scarrascosa.UserProfile.UserProfileRepository;

@Component
public class DatabaseUsersLoader {
    
    @Value("${passwords.admin}")
    private String adminPass;
    
    @Autowired
    private UserProfileRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    private void initDatabase() {
        userRepository.save(new UserProfile("Admin", "Admin@admin.com", passwordEncoder.encode(this.adminPass), "ADMIN"));
    }
}
