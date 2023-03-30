package es.urjc.tfg.scarrascosa.Auth;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

@Component
public class JwtUtil {

    public static final long TOKEN_EXPIRE_TIME = 10 * 60 * 60 * 1000;
    public static final String TOKEN_ISSUER = "scs-tfg-2023";

    @Value("${jwt.secret}")
    private String secret;

    public String createToken(String username) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(this.secret);
            String token = JWT.create()
                    .withIssuer(TOKEN_ISSUER)
                    .withSubject(username)
                    .withExpiresAt(new Date(System.currentTimeMillis() + TOKEN_EXPIRE_TIME))
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException exception) {
            return "";
        }
    }

    public DecodedJWT verify(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(this.secret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(TOKEN_ISSUER)
                    .build();
            return verifier.verify(token);
        } catch (JWTVerificationException exception) {
            return null;
        }
    }
    
    public String getUsername (DecodedJWT token) {
        return token.getSubject();
    }

}
