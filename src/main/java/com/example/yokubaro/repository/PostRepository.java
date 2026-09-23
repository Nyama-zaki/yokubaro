package com.example.yokubaro.repository;

import com.example.yokubaro.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // 指定したuserIdの投稿だけをすべて取得するルール
    List<Post> findByUserId(Long userId);

}