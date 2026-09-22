import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// 受付窓口をインポート
import { apiClient } from "../services/api";

function PostDetail() {
  // URLに含まれているパラメータ（:id の部分）を取得する
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. サーバーから取得した1件の投稿を入れる箱
  const [post, setPost] = useState(null);
  // 2. ローディング中の状態
  const [loading, setLoading] = useState(true);

  // 「削除しますか？」の確認中かどうかを管理するフラグ（最初は false）
  const [showConfirm, setShowConfirm] = useState(false);

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

  // ★削除を実行する関数
  const handleDelete = async () => {
    try {
      await apiClient(`/api/posts/${id}`, {
        method: "DELETE",
      });
      alert("記事を削除しました。");
      navigate("/posts"); // 削除後は一覧画面へ戻る
    } catch (error) {
      console.error("削除に失敗しました:", error);
      alert("削除に失敗しました。");
    }
  };

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

      {/* 編集ボタンと削除エリアを配置するコンテナ */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        {/* 左側：編集ボタン */}
        <Link to={`/posts/${id}/edit`}>
          <button
            style={{
              padding: "6px 12px",
              background: "#20b2aa",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            この記事を編集
          </button>
        </Link>

        {/* 右側：赤文字の削除リンク ＆ はい/いいえ 確認エリア */}
        <div>
          {!showConfirm ? (
            <span
              onClick={() => setShowConfirm(true)}
              style={{
                color: "#d9534f",
                cursor: "pointer",
                fontSize: "14px",
                textDecoration: "underline",
              }}
            >
              この記事を削除
            </span>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
              }}
            >
              <span style={{ color: "#d9534f", fontWeight: "bold" }}>
                この記事を削除しますか？
              </span>
              <button
                onClick={handleDelete}
                style={{
                  background: "#d9534f",
                  color: "white",
                  border: "none",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                はい
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  background: "#ccc",
                  border: "none",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                いいえ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
