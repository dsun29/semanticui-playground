package edu.umc.sis.wall.security;

/**
 * Guitar Model Object.
 *
 * @author $(USER)
 * @see <a href="git.olemiss.edu">git.olemiss.edu</a>
 * @since 8/16/17
 */


import edu.umc.sis.wall.dao.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

public class CustomAuthenticationProvider extends DaoAuthenticationProvider {

    @Autowired
    private UserRepository userRepository;

    Logger log = LoggerFactory.getLogger(CustomAuthenticationProvider.class);


    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {


        String name = authentication.getName();
        String password = authentication.getCredentials().toString();
        UserDetails u = null;
        //return new UsernamePasswordAuthenticationToken("bac", "9999", null);

        System.out.println(name + "<>"  + password);

        try {
            u = getUserDetailsService().loadUserByUsername(name);
        } catch (UsernameNotFoundException ex) {
            log.error("User '" + name + "' not found");
        } catch (Exception e) {
            log.error("Exception in CustomDaoAuthenticationProvider: " + e);
        }

        if (u != null) {
            System.out.println(name + "<>"  + u.getPassword());
            if (u.getPassword().equals(password)) {
                return new UsernamePasswordAuthenticationToken(u, password, u.getAuthorities());
            }
        }

        throw new BadCredentialsException(messages.getMessage("CustomDaoAuthenticationProvider.badCredentials", "Bad credentials"));

    }


}