package com.example.yokubaro.service;

import com.example.yokubaro.entity.User;
import com.example.yokubaro.repository.UserRepository;
import org.springframework.lang.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    // ★フィールドインジェクションの代わりに、コンストラクタで受け取る（推奨される書き方）
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(@NonNull String loginId) throws UsernameNotFoundException {
        // 1. データベースからログインIDでユーザーを検索
        User user = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new UsernameNotFoundException("ユーザーが見つかりません: " + loginId));

        // 2. Spring Securityが扱える「UserDetails」という形式に変換して返す
        return new org.springframework.security.core.userdetails.User(
                user.getLoginId(),
                user.getPassword(),
                new ArrayList<>() // 権限リスト
        );
    }
}