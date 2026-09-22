package com.example.yokubaro.config;

import com.example.yokubaro.entity.User;
import com.example.yokubaro.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // テスト用ユーザーのID（お好きなものに変更可能）
            String testLoginId = "test_user_001";

            // すでに存在するかチェックして、なければ作成する
            if (!userRepository.existsByLoginId(testLoginId)) {
                User user = new User();
                user.setLoginId(testLoginId);
                // パスワードも自動でハッシュ化して安全に保存します（例では "password123" に設定）
                user.setPassword(passwordEncoder.encode("123456az"));
                user.setUserName("テストユーザー001");

                userRepository.save(user);
                System.out.println(">>> 【自動生成】テストユーザーを作成しました: ID = " + testLoginId);
            }
        };
    }
}
