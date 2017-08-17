package edu.umc.sis.wall.services;

/**
 * Guitar Model Object.
 *
 * @author $(USER)
 * @see <a href="git.olemiss.edu">git.olemiss.edu</a>
 * @since 8/17/17
 */

import edu.umc.sis.wall.models.PasswordResetToken;
import edu.umc.sis.wall.models.SisUser;
import edu.umc.sis.wall.models.VerificationToken;
import java.io.UnsupportedEncodingException;

public interface IUserService {

    SisUser registerNewUserAccount(String email, String password) throws UserAlreadyExistException;

    SisUser getUser(String verificationToken);

    void saveRegisteredUser(SisUser user);

    void deleteUser(SisUser user);

    void createVerificationTokenForUser(SisUser user, String token);

    VerificationToken getVerificationToken(String VerificationToken);

    VerificationToken generateNewVerificationToken(String token);

    void createPasswordResetTokenForUser(SisUser user, String token);

    SisUser findUserByEmail(String email);

    PasswordResetToken getPasswordResetToken(String token);

    SisUser getUserByPasswordResetToken(String token);

    SisUser getUserByID(long id);

    void changeUserPassword(SisUser user, String password);

    boolean checkIfValidOldPassword(SisUser user, String password);

    String validateVerificationToken(String token);

    String generateQRUrl(SisUser user) throws UnsupportedEncodingException;

    SisUser updateUser2FA(boolean use2FA);

}