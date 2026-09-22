package com.example.yokubaro.service;

import com.example.yokubaro.entity.Post;
import com.example.yokubaro.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    // 投稿を保存するメソッド
    public Post savePost(Post post) {
        return postRepository.save(post);
    }
    // すべての投稿を取得するメソッド
    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }

    // 投稿を更新するメソッド（タイトルと本文の両方を更新）
    public void updatePost(Long id, String newTitle, String newContent) {
        // 1. 該当するIDの投稿を探す
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        // 2. タイトルと本文を書き換える
        post.setTitle(newTitle);
        post.setContent(newContent);
        // 3. 保存
        postRepository.save(post);
    }

    // 投稿を削除するメソッド
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    // 指定したIDの投稿を1件取得するメソッド
    public Post findPostById(Long id) {
        // データベースからIDで検索し、見つからない場合はnullを返す（または例外を投げる）
        return postRepository.findById(id).orElse(null);
    }
}

