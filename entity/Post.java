package com.example.yokubaro.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "posts") // データベースの "posts" テーブルと紐付ける
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 投稿ID

    private String title;  // タイトル

    private String body;   // 本文

    private Long userId;   // 投稿したユーザーのID（Userのidと合わせるためLong）

    private String postDate; // 投稿日
}