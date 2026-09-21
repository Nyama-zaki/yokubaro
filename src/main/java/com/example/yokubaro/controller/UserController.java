package com.example.yokubaro.controller;

import com.example.yokubaro.entity.User;
import com.example.yokubaro.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public static class RegisterRequest {
        public String loginId;
        public String password;
        public String userName;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        if (userRepository.existsByLoginId(request.loginId)) {
            return ResponseEntity.badRequest().body("このログインIDはすでに使用されています。");
        }

        User user = new User();
        user.setLoginId(request.loginId);
        user.setPassword(passwordEncoder.encode(request.password));
        user.setUserName(request.userName);

        userRepository.save(user);

        return ResponseEntity.ok("ユーザー登録が成功しました！");
    }

    @GetMapping("/user/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body("ログインしていません");
        }
        User user = userRepository.findByLoginId(userDetails.getUsername()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body("ユーザーが見つかりません");
        }

        return ResponseEntity.ok(Map.of("userName", user.getUserName()));
    }

    // ログアウト用の処理
    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate(); // セッションを破壊してログアウト状態にする
        }
        return ResponseEntity.ok("ログアウトしました");
    }
}