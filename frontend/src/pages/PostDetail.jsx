import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// 受付窓口をインポート
import { apiClient } from "../services/api";

function PostDetail() {
  // URLに含まれているパラメータ（:id の部分）を取得する
  const { id } = useParams();

  // 1. サーバーから取得した1件の投稿を入れる箱
  const [post, setPost] = useState(null);
  // 2. ローディング中の状態
  const [loading, setLoading] = useState(true);

  // 3. 画面が表示されたときに、バックエンドから該当IDのデータを取ってくる
  useEffect(() => {
    async function fetchPostDetail() {
      try {
        const data = await apiClient(`/api/posts/${id}`);
        setPost(data);
      } catch (error) {
        console.error("記事の取得に失敗しました:", error);
        setPost(null); // エラーのときはnullにする
      } finally {
        setLoading(false);
      }
    }

    fetchPostDetail();
  }, [id]);

  // 読み込み中の表示
  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>データを読み込み中...</p>
      </div>
    );
  }

  // 記事が見つからなかった場合
  if (!post) {
    return (
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ marginBottom: "20px" }}>
          <Link
            to="/posts"
            style={{ color: "#20b2aa", textDecoration: "none" }}
          >
            &lt; 一覧に戻る
          </Link>
        </div>
        <div
          style={{
            border: "1px solid #666",
            padding: "20px",
            borderRadius: "8px",
            background: "#fff",
          }}
        >
          <span style={{ fontSize: "12px", color: "#333" }}>記事ID: {id}</span>
          <h2
            style={{ marginTop: "10px", marginBottom: "15px", color: "#666" }}
          >
            記事が見つかりません
          </h2>
          <p style={{ lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
            指定されたIDの記事は存在しないか、削除された可能性があります。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/posts" style={{ color: "#20b2aa", textDecoration: "none" }}>
          &lt; 一覧に戻る
        </Link>
      </div>

      <div
        style={{
          border: "1px solid #666",
          padding: "20px",
          borderRadius: "8px",
          background: "#fff",
        }}
      >
        <span style={{ fontSize: "12px", color: "#333" }}>
          記事ID: {post.id}
        </span>
        <h2 style={{ marginTop: "10px", marginBottom: "15px", color: "#666" }}>
          {post.title}
        </h2>
        <p style={{ lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
          {post.content}
        </p>
      </div>

      <Link to={`/posts/${id}/edit`}>
        <button
          style={{
            padding: "6px 12px",
            background: "#20b2aa",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
            marginTop: "15px",
          }}
        >
          この記事を編集
        </button>
      </Link>
    </div>
  );
}

export default PostDetail;
