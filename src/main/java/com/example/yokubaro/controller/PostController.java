package com.example.yokubaro.controller;

import com.example.yokubaro.entity.Post;
import com.example.yokubaro.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class PostController {

    @Autowired
    private PostService postService;

    // --- 全投稿を取得 ---
    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return postService.findAllPosts();
    }

    // --- 1件詳細取得 ---
    @GetMapping("/posts/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postService.findPostById(id);
    }

    // --- 新規登録 ---
    @PostMapping("/posts")
    public Post createPost(@RequestBody Post post) {
        return postService.savePost(post);
    }

    // --- 更新 ---
    @PutMapping("/posts/{id}")
    public Post updatePost(@PathVariable Long id, @RequestBody Post updatedPost) {
        // タイトルと本文の両方を渡して更新する
        postService.updatePost(id, updatedPost.getTitle(), updatedPost.getContent());
        return updatedPost;
    }

// --- 削除 ---
    @DeleteMapping("/posts/{id}")
    public Map<String, String> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        // JSON形式のデータ（Map）を返す
        return Map.of("message", "Deleted successfully");
    }
}