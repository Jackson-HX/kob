package com.kob.matchingsystem.service.impl;

import com.kob.matchingsystem.service.MatchingService;
import com.kob.matchingsystem.service.impl.utils.MatchingPool;
import org.springframework.stereotype.Service;

@Service
public class MatchingServiceImpl implements MatchingService {

    public final static MatchingPool matchingPool = new MatchingPool();

    @Override
    public String addPlayer(Integer userId, Integer rating) {
        System.out.println("add " + userId + " " + rating);
        matchingPool.addPlayer(userId, rating);
        return "add player succcess";
    }

    @Override
    public String removePlayer(Integer userId) {
        System.out.println("remove " + userId);
        matchingPool.removePlayer(userId);
        return "remove success";
    }
}
