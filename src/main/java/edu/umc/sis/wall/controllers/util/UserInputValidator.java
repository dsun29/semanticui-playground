package edu.umc.sis.wall.controllers.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Guitar Model Object.
 *
 * @author $(USER)
 * @see <a href="git.olemiss.edu">git.olemiss.edu</a>
 * @since 8/18/17
 */
public class UserInputValidator {
    public static boolean isValidEmail(String email) {
        String emailPattern = "^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
        Pattern p = Pattern.compile(emailPattern);
        Matcher m = p.matcher(email);
        return m.matches();
    }

    public static boolean isValidPassword(String password) {
        /*
        (	# Start of group
                    (?=.*\d)		#   must contains one digit from 0-9
                    (?=.*[a-z])		#   must contains one lowercase characters
                    (?=.*[A-Z])		#   must contains one uppercase characters
                    (?=.*[@#$%])		#   must contains one special symbols in the list "@#$%"
                              .		#     match anything with previous condition checking
                    {8,20}	#        length at least 6 characters and maximum of 20
        )	# End of group
         */
        String passwordPattern = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20})";
        Pattern p = Pattern.compile(passwordPattern);
        Matcher m = p.matcher(password);
        return m.matches();
    }
}
