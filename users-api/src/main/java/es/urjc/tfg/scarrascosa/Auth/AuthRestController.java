package es.urjc.tfg.scarrascosa.Auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import es.urjc.tfg.scarrascosa.DTO.LoginFormUserDTO;

@RestController
public class AuthRestController {
    
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
    public ResponseEntity<HttpStatus> login(@RequestBody LoginFormUserDTO dto) {
        try {
            Authentication auth = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(auth);
            return new ResponseEntity<HttpStatus>(HttpStatus.OK);
        } catch (BadCredentialsException ex) {
            return new ResponseEntity<HttpStatus>(HttpStatus.UNAUTHORIZED);
        }
    }
}
