package com.kob.backend.service.impl.user.bot;

import com.kob.backend.Mapper.BotMapper;
import com.kob.backend.pojo.Bot;
import com.kob.backend.pojo.User;
import com.kob.backend.service.impl.utils.UserDetailsImpl;
import com.kob.backend.service.user.bot.AddService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AddServiceImpl implements AddService {

    @Autowired
    BotMapper botMapper;

    @Override
    public Map<String, String> add(Map<String, String> data) {
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();
        User user = loginUser.getUser();

        String title = data.get("title");
        String content = data.get("content");
        String description = data.get("description");

        System.out.println("Exists here");

        Map<String, String> result = new HashMap<>();
        if (title == null || title.length() == 0) {
            result.put("error_message", "Empty Title");
            return result;
        }

        if (title.length() > 100) {
            result.put("error_message", "title length <= 100");
            return result;
        }

        if (description == null || description.length() == 0) {
            description = "Default description, waiting to be added";
        }

        if (description.length() > 300) {
            result.put("error_message", "description length <= 300");
            return result;
        }

        if (content == null || content.length() == 0) {
            result.put("error_message", "Empty Content");
            return result;
        }

        if (content.length() > 10000) {
            result.put("error_message", "content length <= 10000");
            return result;
        }

        Date now = new Date();
        Bot bot = new Bot(null, user.getId(), title, description, content, 1500, now, now);

        botMapper.insert(bot);
        result.put("error_message", "success");

        // System.out.println("Before return");

        return result;
    }
}
