package es.urjc.tfg.scarrascosa.UserProfile;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import es.urjc.tfg.scarrascosa.Student.Student;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<Student> findByName(String name);
}
