package es.urjc.tfg.scarrascosa.Auth;

import java.io.IOException;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.interfaces.DecodedJWT;

import es.urjc.tfg.scarrascosa.UserProfile.RepositoryUserDetailsService;

@Component
public class JwtFilter extends OncePerRequestFilter{
    
    private JwtUtil jwtUtil;
    private RepositoryUserDetailsService repository;
    
    public JwtFilter(JwtUtil jwtTokenUtil, RepositoryUserDetailsService userRepo) {
        this.jwtUtil = jwtTokenUtil;
        this.repository = userRepo;
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String requestURI = request.getRequestURI();
        if (requestURI.equals("/login") || requestURI.equals("/signup")) {
            filterChain.doFilter(request, response);
            return;
        }
        
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (!StringUtils.hasText(header) || !header.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token de autorización no encontrado en la solicitud");
            return;
        }
        
        String token = header.split(" ")[1].trim();
        DecodedJWT decodedToken = jwtUtil.verify(token);
        if (decodedToken == null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token de autorización no encontrado en la solicitud");
            return;
        }
        
        UserDetails userDetails;
        
        try{
            userDetails = repository.loadUserByUsername(jwtUtil.getUsername(decodedToken));
        }
        catch(UsernameNotFoundException ex){
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token de autorización no encontrado en la solicitud");
            return;
        }
        
        UsernamePasswordAuthenticationToken
        authentication = new UsernamePasswordAuthenticationToken(
            userDetails, null,userDetails.getAuthorities());

        authentication.setDetails(
            new WebAuthenticationDetailsSource().buildDetails(request)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(request, response);
    }

}
