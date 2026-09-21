package com.example.yokubaro.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // パスワードを安全にハッシュ化するエンコーダーの定義
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // セキュリティの細かいルール（どのページにアクセスできるか等）を設定
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // 今回は簡単のためCSRF保護を一旦無効化（API通信をしやすくするため）
                .authorizeHttpRequests(auth -> auth
                        // ログインやお知らせ、投稿一覧など、誰でもアクセスできるようにしたいAPIのパスがあればここに書きます
                        // 例: .requestMatchers("/api/posts", "/api/login").permitAll()
                        .anyRequest().permitAll() // まずは一旦すべてのリクエストを許可して動かしやすくする場合の設定
                );

        return http.build();
    }
}