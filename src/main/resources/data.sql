-- 動作確認用の初期ユーザー（パスワードは平文または適切な形式で）
INSERT INTO users (login_id, password, user_name) VALUES ('testuser1', 'password123', 'テストユーザー');

-- 動作確認用の初期投稿
INSERT INTO posts (title, body, category_tag, post_date, user_id)
VALUES ('はじめての投稿', 'Spring BootとH2データベースの接続テストです。', '日常', '2026-09-11', 1);