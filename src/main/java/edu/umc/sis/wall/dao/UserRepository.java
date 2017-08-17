package edu.umc.sis.wall.dao;

/**
 * Guitar Model Object.
 *
 * @author $(USER)
 * @see <a href="git.olemiss.edu">git.olemiss.edu</a>
 * @since 8/16/17
 */


import edu.umc.sis.wall.models.SisUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<SisUser, Long> {
    SisUser findByUsername(String username);

}