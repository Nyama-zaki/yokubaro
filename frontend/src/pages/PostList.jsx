import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// 「受付窓口」をインポート
import { apiClient } from "../services/api";

function PostList() {
  // 1. サーバーから取得した投稿を入れるための箱（最初は空っぽの配列 []）
  const [posts, setPosts] = useState([]);

  // 2. ローディング中やエラーの表示を管理したい場合の箱
  const [loading, setLoading] = useState(true);

  // 3. 画面が表示されたタイミング（初回）に1回だけ実行する処理
  useEffect(() => {
    async function fetchPosts() {
      try {
        // 受付窓口を使って、バックエンドの「/api/posts」（投稿一覧のエンドポイント）にデータを取りに行く
        const data = await apiClient("/api/posts");
        setPosts(data); // ゲットしたデータを箱に入れる！
      } catch (error) {
        console.error("投稿一覧の取得に失敗しました:", error);
      } finally {
        setLoading(false); // 通信が終わったらローディングを終わらせる
      }
    }

    fetchPosts();
  }, []); // 最後の空の配列 `[]` により、「最初に画面が開いたとき1回だけ動く」ルールになります

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>投稿一覧</h2>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/posts/new">
          <button style={{ padding: "8px 16px", cursor: "pointer" }}>
            新規投稿する
          </button>
        </Link>
      </div>

      {/* 読み込み中の表示 */}
      {loading ? (
        <p>データを読み込み中...</p>
      ) : (
        /* 投稿のリストを表示 */
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {posts.length === 0 ? (
            <p>まだ投稿がありません。</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "8px",
                }}
              >
                {/* 「記事ID」と「投稿日時」を左右に配置 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#666",
                    marginBottom: "8px",
                  }}
                >
                  <span>記事ID: {post.id}</span>
                  <span>投稿日時: {post.postDate}</span>
                </div>

                {/* タイトルは下に配置 */}
                <h3 style={{ margin: "0 0 10px 0" }}>{post.title}</h3>
                <p style={{ margin: "0 0 10px 0" }}>{post.content}</p>

                {/* 詳細画面へのリンク（IDを渡す） */}
                <Link to={`/posts/${post.id}`}>
                  <span
                    style={{ color: "#20b2aa", textDecoration: "underline" }}
                  >
                    詳細を見る
                  </span>
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default PostList;
