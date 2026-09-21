import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// 受付窓口をインポート
import { apiClient } from "../services/api";

function PostForm() {
  const { id } = useParams(); // URLからIDを取得（編集のときだけ存在する）
  const isEditMode = Boolean(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(isEditMode); // 編集時はデータ取得までロード中にする

  const navigate = useNavigate();

  // 編集モードの場合、画面を開いたときにサーバーから既存データを取得する
  useEffect(() => {
    if (isEditMode) {
      async function fetchPost() {
        try {
          const data = await apiClient(`/api/posts/${id}`);
          setTitle(data.title);
          setContent(data.content);
        } catch (error) {
          console.error("編集データの取得に失敗しました:", error);
          alert("データの取得に失敗しました。");
        } finally {
          setLoading(false);
        }
      }
      fetchPost();
    }
  }, [isEditMode, id]);

  // フォーム送信時の処理（新規登録 or 更新）
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        // 編集（更新）の場合：PUTメソッドでデータを送信
        await apiClient(`/api/posts/${id}`, {
          method: "PUT",
          body: JSON.stringify({ title, content }),
        });
        alert(`記事「${title}」を更新しました！`);
      } else {
        // 新規登録の場合：POSTメソッドでデータを送信
        await apiClient("/api/posts", {
          method: "POST",
          body: JSON.stringify({ title, content }),
        });
        alert(`「${title}」を新規登録しました！`);
      }

      // 保存後は一覧画面へ戻る
      navigate("/posts");
    } catch (error) {
      console.error("保存処理に失敗しました:", error);
      alert("保存に失敗しました。入力内容を確認してください。");
    }
  };

  // 編集モードでデータ読み込み中の表示
  if (loading) {
    return <div style={{ padding: "20px" }}>データを読み込み中...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>{isEditMode ? "投稿編集" : "新規投稿作成"}</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            タイトル
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトルを入力してください"
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            内容
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="メモを残す（#タグ名 を入れておくと、検索画面ですぐ見つかります）"
            rows="5"
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />
          {/* クリックすると本文にタグが追加されるチップ一覧 */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              marginTop: "8px",
              marginBottom: "15px",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "12px", color: "#666" }}>
              よく使うタグを追加:
            </span>
            {["#React", "#備忘録", "#ヨクバロ", "#Java"].map((tag, index) => (
              <button
                key={index}
                type="button"
                onClick={() =>
                  setContent((prev) => prev + (prev ? " " : "") + tag)
                }
                style={{
                  background: "#f1f3f5",
                  color: "#495057",
                  border: "1px solid #ced4da",
                  borderRadius: "12px",
                  padding: "2px 10px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              background: "#20b2aa",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            {isEditMode ? "更新する" : "登録する"}
          </button>
          <Link to="/posts">
            <button
              type="button"
              style={{
                padding: "10px 20px",
                background: "#ccc",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              キャンセル
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
