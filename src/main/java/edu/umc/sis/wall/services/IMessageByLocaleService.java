package edu.umc.sis.wall.services;

import java.util.Map;

/**
 * Guitar Model Object.
 *
 * @author $(USER)
 * @see <a href="git.olemiss.edu">git.olemiss.edu</a>
 * @since 8/17/17
 */
public interface IMessageByLocaleService {

    public String getMessage(String id);

    public String getMessageWithParameter(String id, String value);


    public String getMessageWithParameters(String id, Map<String, String> paramemters);
}
