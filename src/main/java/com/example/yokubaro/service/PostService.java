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
    public void savePost(Post post) {
        postRepository.save(post);
    }
    // 【新規】すべての投稿を取得するメソッド
    public List<Post> findAllPosts() {
        return postRepository.findAll();
    }

    // 【新規】投稿を更新するメソッド
    public void updatePost(Long id, String newTitle) {
        // 1. 該当するIDの投稿を探す（見つからなければ例外を投げる）
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        // 2. タイトルを書き換える
        post.setTitle(newTitle);
        // 3. saveすると同じIDなので上書き（更新）される
        postRepository.save(post);
    }

    // 【新規】投稿を削除するメソッド
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }
}