package com.kob.backend.consumer.utils;

import com.kob.backend.utils.JwtUtil;
import io.jsonwebtoken.Claims;

public class JwtAuthentication {
    public static Integer getUserId(String token) {
        //token = token.substring(7);

        int userid = -1;
        try {
            Claims claims = JwtUtil.parseJWT(token);
            userid = Integer.parseInt(claims.getSubject());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return userid;
    }
}
