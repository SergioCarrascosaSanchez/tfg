package es.urjc.tfg.scarrascosa.Auth;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import es.urjc.tfg.scarrascosa.DTO.LoginFormUserDTO;
import es.urjc.tfg.scarrascosa.DTO.SignUpDTO;
import es.urjc.tfg.scarrascosa.DTO.TokenDTO;
import es.urjc.tfg.scarrascosa.Student.Student;
import es.urjc.tfg.scarrascosa.Teacher.Teacher;
import es.urjc.tfg.scarrascosa.UserProfile.UserProfile;
import es.urjc.tfg.scarrascosa.UserProfile.UserProfileRepository;

@RestController
public class AuthRestController {
    
    @Autowired
    private UserProfileRepository repo;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authManager;
    
    @GetMapping("/privateUser")
    public ResponseEntity<String> sayHelloUser() {
        return ResponseEntity.ok("Hello user");
    }
    
    @GetMapping("/privateAdmin")
    public ResponseEntity<String> sayHelloAdmin() {
        return ResponseEntity.ok("Hello admin");
    }
    
    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody LoginFormUserDTO dto) {
        try {
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(auth);
            String token = jwtUtil.createToken(dto.getUsername());
            return ResponseEntity.ok(new TokenDTO(token));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
    
    @PostMapping("/signup")
    public ResponseEntity<HttpStatus> signup(@RequestBody SignUpDTO dto) {
        Optional<UserProfile> optionalUserProfile = this.repo.findByName(dto.getUsername());
        if(optionalUserProfile.isEmpty()) {
            if(dto.getRoles().contains("STUDENT")) {
                Student student = new Student(dto.getUsername(), dto.getEmail(), dto.getInitialBalance(), passwordEncoder.encode(dto.getPassword()), "STUDENT");
                this.repo.save(student);
                return new ResponseEntity<HttpStatus>(HttpStatus.OK);
            }  
            else if (dto.getRoles().contains("TEACHER")) {
                Teacher teacher = new Teacher(dto.getUsername(), dto.getEmail(), passwordEncoder.encode(dto.getPassword()), "TEACHER");
                this.repo.save(teacher);
                return new ResponseEntity<HttpStatus>(HttpStatus.OK);
            }
            else if (dto.getRoles().contains("ADMIN")) {
                UserProfile admin = new UserProfile(dto.getUsername(), dto.getEmail(), passwordEncoder.encode(dto.getPassword()), "ADMIN");
                this.repo.save(admin);
                return new ResponseEntity<HttpStatus>(HttpStatus.OK);
            }
            else {
                return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);   
            }
        }
        else {
            return new ResponseEntity<HttpStatus>(HttpStatus.CONFLICT);
        }
        
    }
}
