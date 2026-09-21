package com.example.yokubaro.controller;

import com.example.yokubaro.entity.Post;
import com.example.yokubaro.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
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
    // 全投稿を取得してJSONで返すAPI
    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return postService.findAllPosts();
    }
    // 動作確認用の更新URL: http://localhost:8080/test-update
    @GetMapping("/test-update")
    public String testUpdate() {
        // 例として、IDが 1 の投稿のタイトルを書き換えてみる
        postService.updatePost(1L, "【更新！】タイトルが変わりました");
        return "ID:1 の投稿を更新しました！/posts で確認してね！";
    }

    // 動作確認用の削除URL: http://localhost:8080/test-delete
    @GetMapping("/test-delete")
    public String testDelete() {
        // 例として、IDが 2 の投稿を削除してみる
        postService.deletePost(2L);
        return "ID:2 の投稿を削除しました！/posts で確認してね！";
    }
    // --- 新規登録の窓口 ---
    @org.springframework.web.bind.annotation.PostMapping("/posts")
    public Post createPost(@org.springframework.web.bind.annotation.RequestBody Post post) {
        return postService.savePost(post);
    }

    // --- 1件詳細取得の窓口 ---
    @GetMapping("/posts/{id}")
    public Post getPostById(@org.springframework.web.bind.annotation.PathVariable Long id) {
        // Service側に該当IDを探すメソッドがある想定です。なければ後で合わせます！
        return postService.findPostById(id);
    }

    // --- 更新の窓口 ---
    @org.springframework.web.bind.annotation.PutMapping("/posts/{id}")
    public Post updatePost(@org.springframework.web.bind.annotation.PathVariable Long id, @org.springframework.web.bind.annotation.RequestBody Post updatedPost) {
        // 更新処理の呼び出し
        postService.updatePost(id, updatedPost.getTitle()); // （必要に応じて content も更新できるように調整します）
        return updatedPost;
    }

}