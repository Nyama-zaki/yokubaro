import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const { id } = useParams(); // URLからIDを取得（編集のときだけ存在する）

  // 編集モードかどうかを判定（idがあれば編集）
  const isEditMode = Boolean(id);

  // 編集モードの場合、初期データを読み込む処理
  useEffect(() => {
    if (isEditMode) {
      // 本来はデータベースやAPIから取得しますが、今回は仮のデータを使用
      const dummyPosts = {
        1: {
          title: "ヨクバロの第一歩！",
          content:
            "Reactのルーティングができました。画面の切り替えがスムーズで気持ちいいですね。",
        },
        2: {
          title: "ランチの記録",
          content:
            "今日のラーメンは美味しかった。次は違う味も試してみたいです。",
        },
      };

      const postToEdit = dummyPosts[id];
      if (postToEdit) {
        setTitle(postToEdit.title);
        setContent(postToEdit.content);
      }
    }
  }, [id, isEditMode]);

  // フォーム送信時の処理
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      console.log(`ID: ${id} の記事を更新:`, { title, content });
      alert(`記事「${title}」を更新しました！（※現在は仮の動作です）`);
    } else {
      console.log("新規登録:", { title, content });
      alert(`「${title}」を新規登録しました！（※現在は仮の動作です）`);
    }

    // 保存後は一覧画面へ戻る
    navigate("/posts");
  };

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
          {/* ★クリックすると本文にタグが追加されるチップ一覧 */}
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
