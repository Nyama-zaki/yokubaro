package com.example.yokubaro.controller;

import com.example.yokubaro.entity.User;
import com.example.yokubaro.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // リクエストボディを受け取るための入れ物（DTO）
    public static class RegisterRequest {
        public String loginId;
        public String password;
        public String userName;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        // 1. すでに同じログインIDが存在するかチェック
        if (userRepository.existsByLoginId(request.loginId)) {
            return ResponseEntity.badRequest().body("このログインIDはすでに使用されています。");
        }

        // 2. ユーザーエンティティを作成
        User user = new User();
        user.setLoginId(request.loginId);
        // パスワードをハッシュ化して保存！
        user.setPassword(passwordEncoder.encode(request.password));
        user.setUserName(request.userName);

        // 3. データベースに保存
        userRepository.save(user);

        return ResponseEntity.ok("ユーザー登録が成功しました！");
    }
}