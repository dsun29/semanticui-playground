package edu.umc.sis.wall.controllers;

/**
 * Guitar Model Object.
 *
 * @author $(USER)
 * @see <a href="git.olemiss.edu">git.olemiss.edu</a>
 * @since 8/21/17
 */

import edu.umc.sis.wall.Application;
import edu.umc.sis.wall.models.SisUser;
import edu.umc.sis.wall.services.IMessageByLocaleService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import java.io.IOException;
import java.nio.charset.Charset;

import java.util.Arrays;


import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

/**
 * @author Josh Long
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@WebAppConfiguration
public class RegistrationControllerTest {


    private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    private MockMvc mockMvc;

    private HttpMessageConverter mappingJackson2HttpMessageConverter;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    IMessageByLocaleService messageByLocaleService;



    @Autowired
    void setConverters(HttpMessageConverter<?>[] converters) {

        this.mappingJackson2HttpMessageConverter = Arrays.asList(converters).stream()
                .filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter)
                .findAny()
                .orElse(null);

        assertNotNull("the JSON message converter must not be null",
                this.mappingJackson2HttpMessageConverter);
    }

    @Before
    public void setup() throws Exception {
        this.mockMvc = webAppContextSetup(webApplicationContext).build();

    }



    @Test
    public void registerWithoutPasswordOrEmail() throws Exception {
        mockMvc.perform(post("/user/registration")
                .contentType(contentType))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void registerWithInvalidEmail() throws Exception {
        SisUser user = new SisUser();
        user.setEmail("sundavy@gmailcom");
        user.setPassword("hBxf@1118");
        String userJson = json(user);

        mockMvc.perform(post("/user/registration")
                .contentType(contentType)
                .content(userJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", is(messageByLocaleService.getMessage("email.invalid"))));
    }

    @Test
    public void registerWithInvalidPassword() throws Exception {
        SisUser user = new SisUser();
        user.setEmail("sundavy@gmail.com");
        user.setPassword("hbxf@1118");
        String userJson = json(user);

        mockMvc.perform(post("/user/registration")
                .contentType(contentType)
                .content(userJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", is(messageByLocaleService.getMessage("password.invalid"))));
    }

ls
    
    @Test
    public void registerSuccessful() throws Exception {

        SisUser user = new SisUser();
        user.setEmail("sundavy@gmail.com");
        user.setPassword("hBxf@1118");
        String userJson = json(user);

        System.out.println(userJson);

        mockMvc.perform(post("/user/registration")
                .contentType(contentType)
                .content(userJson))
                .andExpect(content().contentType(contentType))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message", is(messageByLocaleService.getMessage("user.register.success"))));
    }

    protected String json(Object o) throws IOException {
        MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
        this.mappingJackson2HttpMessageConverter.write(
                o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
        return mockHttpOutputMessage.getBodyAsString();
    }
}