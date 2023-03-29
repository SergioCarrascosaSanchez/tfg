package es.urjc.tfg.scarrascosa.Auth;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("userSecurity")
public class UserSecurity {
    public boolean isUserAuthorized(Authentication authentication, String username) {
        return authentication.getName().equals(username);
    }
}
