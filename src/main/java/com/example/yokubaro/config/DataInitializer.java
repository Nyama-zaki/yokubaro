package com.example.yokubaro.config;

import com.example.yokubaro.entity.Post;
import com.example.yokubaro.entity.User;
import com.example.yokubaro.repository.PostRepository;
import com.example.yokubaro.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository,
                                      PostRepository postRepository,
                                      PasswordEncoder passwordEncoder) {
        return args -> {
            String testLoginId = "test_user_001";

            // 1. テストユーザーがすでに存在するかチェックし、なければ新規作成して保存する
            User user = userRepository.findByLoginId(testLoginId).orElseGet(() -> {
                User newUser = new User();
                newUser.setLoginId(testLoginId);
                newUser.setPassword(passwordEncoder.encode("123456az"));
                newUser.setUserName("テストユーザー001");
                User savedUser = userRepository.save(newUser);
                System.out.println(">>> 【自動生成】テストユーザーを作成しました: ID = " + testLoginId);
                return savedUser;
            });

            // 2. データベース全体の投稿数が「0件」の場合のみ、初期投稿データを3件自動作成する
            if (postRepository.count() == 0) {
                // 投稿1
                Post post1 = new Post();
                post1.setTitle("テスト投稿！");
                post1.setContent("うまく投稿されるかな～　＃初めての投稿　#ヨクバロ");
                post1.setUserId(user.getUserId());
                post1.setPostDate("2026/09/01 09:00");
                postRepository.save(post1);

                // 投稿2
                Post post2 = new Post();
                post2.setTitle("映画みた");
                post2.setContent("#映画鑑賞　#★★★★☆　○○映画館でレイトショー！...");
                post2.setUserId(user.getUserId());
                post2.setPostDate("2026/09/05 01:00");
                postRepository.save(post2);

                // 投稿3
                Post post3 = new Post();
                post3.setTitle("ごはん");
                post3.setContent("#イタリアン　#リピ確定　隣市の気になってた所に行ってきた。パスタが有名だけどなんとコーヒーが絶品！...");
                post3.setUserId(user.getUserId());
                post3.setPostDate("2026/09/20 12:29");
                postRepository.save(post3);

                System.out.println(">>> 【自動生成】テスト用の初期投稿データを3件登録しました！");
            }
        };
    }
}