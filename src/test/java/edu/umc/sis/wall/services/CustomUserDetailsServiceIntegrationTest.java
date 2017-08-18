package edu.umc.sis.wall.services;

/**
 * Guitar Model Object.
 *
 * @author $(USER)
 * @see <a href="git.olemiss.edu">git.olemiss.edu</a>
 * @since 8/18/17
 */

import static org.junit.Assert.assertEquals;

import edu.umc.sis.wall.config.PersistenceJPAConfig;
import edu.umc.sis.wall.config.SecurityConfig;
import edu.umc.sis.wall.dao.UserRepository;
import edu.umc.sis.wall.models.SisUser;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {SecurityConfig.class, PersistenceJPAConfig.class})
@WebAppConfiguration
public class CustomUserDetailsServiceIntegrationTest {

    private static final String USERNAME = "user";
    private static final String PASSWORD = "pass";
    private static final String USERNAME2 = "user2";

    @Autowired
    private UserRepository myUserRepository;

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //

    @Test
    public void givenExistingUser_whenAuthenticate_thenRetrieveFromDb() {
        SisUser user = new SisUser();
        user.setEmail(USERNAME);
        user.setPassword(passwordEncoder.encode(PASSWORD));

        myUserRepository.save(user);

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(USERNAME, PASSWORD);
        Authentication authentication = authenticationProvider.authenticate(auth);

        assertEquals(authentication.getName(), USERNAME);
    }

    @Test(expected = BadCredentialsException.class)
    public void givenIncorrectUser_whenAuthenticate_thenBadCredentialsException() {
        SisUser user = new SisUser();
        user.setEmail(USERNAME);
        user.setPassword(passwordEncoder.encode(PASSWORD));

        myUserRepository.save(user);

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(USERNAME2, PASSWORD);
        authenticationProvider.authenticate(auth);
    }

    //

    @After
    public void tearDown() {
        //myUserRepository.removeUserByUsername(USERNAME);
    }

}