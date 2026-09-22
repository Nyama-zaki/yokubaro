package com.example.yokubaro.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "posts") // データベースの "posts" テーブルと紐付ける
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_Id")
    private Long id; // 投稿ID

    private String title;  // タイトル

    private String content;   // 本文

    @Column(name = "user_Id")
    private Long userId;   // 投稿したユーザーのID（Userのidと合わせるためLong）

    @Column(name = "post_date")
    private String postDate; // 投稿日

 }