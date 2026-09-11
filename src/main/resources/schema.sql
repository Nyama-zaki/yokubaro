-- 1. ユーザーテーブルの作成
CREATE TABLE IF NOT EXISTS users (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     login_id VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_name VARCHAR(50) NOT NULL
    );

-- 2. 投稿テーブルの作成
CREATE TABLE IF NOT EXISTS posts (
                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                     title VARCHAR(100) NOT NULL,
    body TEXT NOT NULL,
    category_tag VARCHAR(50),
    post_date DATE,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
    );