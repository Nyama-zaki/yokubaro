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
}