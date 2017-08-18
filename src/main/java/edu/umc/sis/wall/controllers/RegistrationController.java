package edu.umc.sis.wall.controllers;

/**
 * Guitar Model Object.
 *
 * @author $(USER)
 * @see <a href="git.olemiss.edu">git.olemiss.edu</a>
 * @since 8/17/17
 */

import java.io.UnsupportedEncodingException;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;


import edu.umc.sis.wall.controllers.util.GenericResponse;
import edu.umc.sis.wall.controllers.util.UserInputValidator;
import edu.umc.sis.wall.models.SisUser;
import edu.umc.sis.wall.models.VerificationToken;
import edu.umc.sis.wall.services.IUserService;
import edu.umc.sis.wall.services.MessageByLocaleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class RegistrationController {
    private final Logger LOGGER = LoggerFactory.getLogger(getClass());

    @Autowired
    private IUserService userService;


    @Autowired
    MessageByLocaleService messageByLocaleService;



    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ApplicationEventPublisher eventPublisher;

    @Autowired
    private Environment env;

    public RegistrationController() {
        super();
    }

    // Registration
    @RequestMapping(value = "/user/registration", method = RequestMethod.POST)
    @ResponseBody
    public GenericResponse registerUserAccount(final HttpServletRequest request) throws IllegalArgumentException, Exception{
        String email = request.getParameter("username");
        String password = request.getParameter("password");
        String ip = request.getRemoteAddr();

        if (email == null || password == null){
            throw new IllegalArgumentException(messageByLocaleService.getMessage("parameter.missing"));
        }

        UserInputValidator validator = new UserInputValidator();


        if (!validator.isValidEmail(email)){
            throw new IllegalArgumentException(messageByLocaleService.getMessage("email.invalid"));
        }
        if (!validator.isValidPassword(password)){
            throw new IllegalArgumentException(messageByLocaleService.getMessage("password.invalid"));
        }

        final SisUser registered = userService.registerNewUserAccount(email, password, ip);
        //eventPublisher.publishEvent(new OnRegistrationCompleteEvent(registered, request.getLocale(), getAppUrl(request)));
        return new GenericResponse(messageByLocaleService.getMessage("user.register.success"));
    }

    @RequestMapping(value = "/registrationConfirm", method = RequestMethod.GET)
    public String confirmRegistration(final Locale locale, final Model model, @RequestParam("token") final String token) throws UnsupportedEncodingException {
        final String result = userService.validateVerificationToken(token);
        if (result.equals("valid")) {
            final SisUser user = userService.getUser(token);
            System.out.println(user);
            if (user.isUsing2FA()) {
                model.addAttribute("qr", userService.generateQRUrl(user));
                return "redirect:/qrcode.html?lang=" + locale.getLanguage();
            }
            model.addAttribute("message", messageByLocaleService.getMessage("message.accountVerified"));
            return "redirect:/login?lang=" + locale.getLanguage();
        }

        model.addAttribute("message", messageByLocaleService.getMessage("auth.message."));
        model.addAttribute("expired", "expired".equals(result));
        model.addAttribute("token", token);
        return "redirect:/badUser.html?lang=" + locale.getLanguage();
    }



    // ============== NON-API ============

    private SimpleMailMessage constructResendVerificationTokenEmail(final String contextPath, final Locale locale, final VerificationToken newToken, final SisUser user) {
        final String confirmationUrl = contextPath + "/registrationConfirm.html?token=" + newToken.getToken();
        final String message = messageByLocaleService.getMessage("message.resendToken");
        return constructEmail("Resend Registration Token", message + " \r\n" + confirmationUrl, user);
    }

    private SimpleMailMessage constructResetTokenEmail(final String contextPath, final Locale locale, final String token, final SisUser user) {
        final String url = contextPath + "/user/changePassword?id=" + user.getId() + "&token=" + token;
        final String message = messageByLocaleService.getMessage("message.resetPassword");
        return constructEmail("Reset Password", message + " \r\n" + url, user);
    }

    private SimpleMailMessage constructEmail(String subject, String body, SisUser user) {
        final SimpleMailMessage email = new SimpleMailMessage();
        email.setSubject(subject);
        email.setText(body);
        email.setTo(user.getEmail());
        email.setFrom(env.getProperty("support.email"));
        return email;
    }

    private String getAppUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }

}