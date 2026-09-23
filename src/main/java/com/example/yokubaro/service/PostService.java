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

    // 指定したユーザーIDの投稿だけを取得する
    public List<Post> findPostsByUserId(Long userId) {
        return postRepository.findByUserId(userId);
    }

    // 投稿を保存するメソッド（userIdも一緒に保存される）
    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    // 投稿を更新するメソッド（タイトルと本文の両方を更新）
    public void updatePost(Long id, String newTitle, String newContent) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
        post.setTitle(newTitle);
        post.setContent(newContent);
        postRepository.save(post);
    }

    // 投稿を削除するメソッド
    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    // 指定したIDの投稿を1件取得するメソッド
    public Post findPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }
}