package es.urjc.tfg.scarrascosa.Configuration;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

import es.urjc.tfg.scarrascosa.UserProfile.RepositoryUserDetailsService;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    
    @Autowired
    RepositoryUserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10, new SecureRandom());
    }
    
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean ()throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
                
        http
            .formLogin().disable()
            .logout()
            .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.OK));
        
        http.authorizeRequests().antMatchers(HttpMethod.GET, "/privateUser").hasRole("USER");
        http.authorizeRequests().antMatchers(HttpMethod.GET, "/privateAdmin").hasRole("ADMIN");
        
        // Allow H2 console
        http.authorizeRequests().antMatchers("/h2-console/**").permitAll();
        http.headers().frameOptions().sameOrigin();
        
        http.authorizeRequests().anyRequest().permitAll();
        
        
        http.cors().and().csrf().disable();
        
        

        
    }
    
}

