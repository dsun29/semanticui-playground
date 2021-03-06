package edu.umc.sis.wall.security;

/**
 * Guitar Model Object.
 *
 * @author $(USER)
 * @see <a href="git.olemiss.edu">git.olemiss.edu</a>
 * @since 8/16/17
 */
import edu.umc.sis.wall.dao.UserRepository;
import edu.umc.sis.wall.models.Role;
import edu.umc.sis.wall.models.SisUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;

@Service()
public class CustomUserDetailsService implements UserDetailsService {

    Logger log = LoggerFactory.getLogger(CustomUserDetailsService.class);

    @Autowired
    private UserRepository userRepository;

    public CustomUserDetailsService() {
        super();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            SisUser user = userRepository.findByEmail(username);
            if (user != null) return new User(user.getEmail(), user.getPassword(), getAuthorities(user));
            else{
                throw new UsernameNotFoundException(username + " not found");
            }
        }
        catch (Exception ex) {
            log.error("Exception in CustomUserDetailsService: " + ex);
            throw ex;
        }

    }

    private Collection<GrantedAuthority> getAuthorities(SisUser user) {
        Collection<GrantedAuthority> authorities = new HashSet<>();
        for (Role role : user.getRoles()) {
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(role.getName());
            authorities.add(grantedAuthority);
        }
        return authorities;
    }
}
