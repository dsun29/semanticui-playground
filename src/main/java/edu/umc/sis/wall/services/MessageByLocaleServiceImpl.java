package edu.umc.sis.wall.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

import java.util.Locale;
import java.util.Map;

/**
 * Guitar Model Object.
 *
 * @author $(USER)
 * @see <a href="git.olemiss.edu">git.olemiss.edu</a>
 * @since 8/17/17
 */

@Component
public class MessageByLocaleServiceImpl implements IMessageByLocaleService {

    @Autowired
    private MessageSource messageSource;

    @Override
    public String getMessage(String id) {
        Locale locale = LocaleContextHolder.getLocale();
        return messageSource.getMessage(id,null,locale);
    }

    @Override
    public String getMessageWithParameters(String id, Map<String, String> parameters) {
        Locale locale = LocaleContextHolder.getLocale();
        String original = messageSource.getMessage(id,null,locale);

        for (Map.Entry<String, String> entry : parameters.entrySet()) {
            original = original.replace(entry.getKey(), entry.getValue());
        }

        return original;
        
    }
    @Override
    public String getMessageWithParameter(String id, String value) {
        Locale locale = LocaleContextHolder.getLocale();
        String original = messageSource.getMessage(id,null,locale);
        return original.replace("%1%", value);

    }



}