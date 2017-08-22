package edu.umc.sis.wall.services;

/**
 * Guitar Model Object.
 *
 * @author $(USER)
 * @see <a href="git.olemiss.edu">git.olemiss.edu</a>
 * @since 8/21/17
 */


import edu.umc.sis.wall.Application;
import edu.umc.sis.wall.config.PersistenceJPAConfig;
import edu.umc.sis.wall.config.SecurityConfig;
import edu.umc.sis.wall.dao.UserRepository;
import edu.umc.sis.wall.models.Role;
import edu.umc.sis.wall.models.SisUser;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collection;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = Application.class)
@WebAppConfiguration
public class UserServiceIntegrationTest {


    @Autowired
    private UserRepository myUserRepository;

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private IUserService userService;


    //

    @Test
    public void registerNewUserAccountSuccess() throws Exception {

        final String email = "sundavy2@gmail.com";
        final String password = "213";
        final String ip = "12.12.32.12";

        SisUser newUser = null;
        try {
            newUser = userService.registerNewUserAccount(email, password, ip);
        }
        catch (Exception e){
            throw e;
        }

        assertNotNull(newUser);

        final SisUser user = userService.getUserByID(newUser.getId());

        assertEquals(user.getEmail(), email);

        assertTrue(passwordEncoder.matches(password, user.getPassword()));

        assertFalse(user.isUsing2FA());
        assertEquals(20, user.getSecret().length());

        //check default roles
        Collection<Role> roles = user.getRoles();
        assertEquals(1, roles.size());

        assertTrue(roles.contains("ROLE_READER"));

    }


    @Test(expected = DuplicateKeyException.class)
    public void registerNewUserAccountFailWithExsitingEmail() throws Exception {

        final String email = "sundavy3@gmail.com";
        final String password = "213";
        final String ip = "12.12.32.12";

        final String password2 = "bacdefetd";
        final String ip2 = "12.12.32.12";


        SisUser newUser = null;
        try {
            newUser = userService.registerNewUserAccount(email, password, ip);
        }
        catch (Exception e){
            throw e;
        }

        assertNotNull(newUser);

        userService.registerNewUserAccount(email, password2, ip2);

    }

}