package com.example.yokubaro.controller;

import com.example.yokubaro.entity.Post;
import com.example.yokubaro.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class PostController {

    @Autowired
    private PostService postService;

    // 動作確認用のURL: http://localhost:8080/test-create
    @GetMapping("/test-create")
    public String testCreate() {
        Post post = new Post();
        post.setTitle("コントローラーからの投稿");
        post.setBody("ServiceとController経由で保存できたよ！");
        post.setUserId(1L);
        post.setPostDate("2026-09-15");
        post.setCategoryTag("テスト");

        // 保存処理を呼び出す
        postService.savePost(post);

        return "投稿の保存に成功しました！H2コンソールで確認してね！";
    }
    // 【新規】全投稿を取得してJSONで返すAPI
    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return postService.findAllPosts();
    }
    // 【新規】動作確認用の更新URL: http://localhost:8080/test-update
    @GetMapping("/test-update")
    public String testUpdate() {
        // 例として、IDが 1 の投稿のタイトルを書き換えてみる
        postService.updatePost(1L, "【更新！】タイトルが変わりました");
        return "ID:1 の投稿を更新しました！/posts で確認してね！";
    }

    // 【新規】動作確認用の削除URL: http://localhost:8080/test-delete
    @GetMapping("/test-delete")
    public String testDelete() {
        // 例として、IDが 2 の投稿を削除してみる
        postService.deletePost(2L);
        return "ID:2 の投稿を削除しました！/posts で確認してね！";
    }
}