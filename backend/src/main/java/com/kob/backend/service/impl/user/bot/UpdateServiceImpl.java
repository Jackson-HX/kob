package com.kob.backend.service.impl.user.bot;

import com.kob.backend.Mapper.BotMapper;
import com.kob.backend.pojo.Bot;
import com.kob.backend.pojo.User;
import com.kob.backend.service.impl.utils.UserDetailsImpl;
import com.kob.backend.service.user.bot.UpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class UpdateServiceImpl implements UpdateService {

    @Autowired
    private BotMapper botMapper;

    @Override
    public Map<String, String> update(Map<String, String> data) {

        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();
        User user = loginUser.getUser();

        int bot_id = Integer.parseInt(data.get("bot_id"));
        String title = data.get("title");
        String description = data.get("description");
        String content = data.get("content");

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

        Bot bot = botMapper.selectById(bot_id);
        if (bot == null) {
            result.put("error_message", "Bot not found");
            return result;
        }

        // illegal access
        if (!bot.getUserId().equals(user.getId())) {
            result.put("error_message", "Illegal access to other bots");
            return result;
        }

        // update the bot info
        Date now = new Date();
        Bot new_bot = new Bot (
                bot.getId(),
                user.getId(),
                title,
                description,
                content,
                bot.getRating(),
                bot.getCreatetime(),
                now
        );

        botMapper.updateById(new_bot);
        result.put("error_message", "success");

        return result;
    }
}
