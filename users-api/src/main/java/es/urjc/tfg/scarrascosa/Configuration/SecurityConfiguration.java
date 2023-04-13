package es.urjc.tfg.scarrascosa.Configuration;

import java.security.SecureRandom;

import javax.servlet.http.HttpServletResponse;

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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;

import es.urjc.tfg.scarrascosa.Auth.JwtFilter;
import es.urjc.tfg.scarrascosa.UserProfile.RepositoryUserDetailsService;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    RepositoryUserDetailsService userDetailsService;

    @Autowired
    private JwtFilter jwtTokenFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10, new SecureRandom());
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
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

        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

        http.authorizeRequests().antMatchers("/login").permitAll();
        http.authorizeRequests().antMatchers("/signup").hasRole("ADMIN");
        http.authorizeRequests().antMatchers("/teacher/{username}").hasRole("ADMIN");
        http.authorizeRequests().antMatchers("/teacher/{username}/trade/{id}/feedback").hasRole("TEACHER");
        http.authorizeRequests().antMatchers("/users/{username}").access("hasAnyRole('STUDENT', 'TEACHER', 'ADMIN') and @userSecurity.isUserAuthorized(authentication,#username)");
        http.authorizeRequests().antMatchers("/students/{username}/purchase").access("hasRole('STUDENT') and @userSecurity.isUserAuthorized(authentication,#username)");
        http.authorizeRequests().antMatchers("/students/{username}/sell").access("hasRole('STUDENT') and @userSecurity.isUserAuthorized(authentication,#username)");
        http.headers().frameOptions().sameOrigin();

        http.cors().and().csrf().disable();

    }

}
