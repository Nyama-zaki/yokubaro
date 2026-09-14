package com.example.yokubaro.entity;//パッケージ名

//必要な部品の読み込み↓
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
//必要な部品の読み込み↑

@Entity//DBテーブルとやりとりするエンティティです
@Table(name = "users") // データベースの "users" テーブルと紐付け
@Data                  // Lombokを使ってGetter/Setterなどを自動生成する便利アノテーション
public class User {//ここからUserクラス始まり

    @Id//主キー
    @GeneratedValue(strategy = GenerationType.IDENTITY)//ID自動採番
    private Long id; // IDを保存する変数
    @Column(name = "login_id")
    private String loginId;  // ログインID

    private String password; // パスワード

    private String userName; // ユーザー名
}