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
                .csrf(csrf -> csrf.disable()) // CSRF無効化
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/login").permitAll() // ログイン用URLは誰でもアクセスOKにする
                        .anyRequest().permitAll() // 他のページも一旦自由に
                )
                .formLogin(form -> form
                        .loginProcessingUrl("/api/login") // ReactからこのURLにPOSTを送るとJavaが自動でログイン処理してくれます
                        .successHandler((request, response, authentication) -> {
                            response.setStatus(200); // ログイン成功したらステータス200を返す
                        })
                        .failureHandler((request, response, exception) -> {
                            response.setStatus(401); // ログイン失敗したら401（認証エラー）を返す
                        })
                );

        return http.build();
    }
}