package com.example.yokubaro.controller;

import com.example.yokubaro.entity.Post;
import com.example.yokubaro.entity.User;
import com.example.yokubaro.repository.UserRepository;
import com.example.yokubaro.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserRepository userRepository;

    // --- ログイン中ユーザーの投稿だけを取得 ---
    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        // 1. ログイン中のユーザー名を取得
        String currentLoginId = SecurityContextHolder.getContext().getAuthentication().getName();

        // 2. Optional<User> として取得し、中身を取り出す（見つからなければ例外を投げる）
        User user = userRepository.findByLoginId(currentLoginId)
                .orElseThrow(() -> new RuntimeException("ログインユーザーが見つかりません: " + currentLoginId));

        // 3. そのユーザーの投稿だけに絞って返す
        return postService.findPostsByUserId(user.getUserId());
    }

    // --- 1件詳細取得 ---
    @GetMapping("/posts/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.findPostById(id);
    }

    // --- 新規登録（ログイン中ユーザーのIDを自動で紐付け） ---
    @PostMapping("/posts")
    public Post createPost(@RequestBody Post post) {
        // 1. ログイン中のユーザー情報を安全に取得
        String currentLoginId = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByLoginId(currentLoginId)
                .orElseThrow(() -> new RuntimeException("ログインユーザーが見つかりません: " + currentLoginId));

        // 2. 投稿データにログイン中の userId をセット
        post.setUserId(user.getUserId());

        // 現在の日時を取得し、24H表記の文字列にフォーマット
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm");
        String formattedDate = now.format(formatter);
        post.setPostDate(formattedDate);

        return postService.savePost(post);
    }

    // --- 更新 ---
    @PutMapping("/posts/{id}")
    public Post updatePost(@PathVariable Long id, @RequestBody Post updatedPost) {
        postService.updatePost(id, updatedPost.getTitle(), updatedPost.getContent());
        return updatedPost;
    }

    // --- 削除 ---
    @DeleteMapping("/posts/{id}")
    public Map<String, String> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return Map.of("message", "Deleted successfully");
    }
}