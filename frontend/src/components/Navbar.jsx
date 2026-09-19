import { Link } from "react-router-dom";

function Navbar() {
  // 今日の日付を取得して YYYY/MM/DD 形式にする処理
  const today = new Date();
  const dateString = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 20px",
        background: "#222",
        color: "#fff",
        borderBottom: "1px solid #444",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {/* 左側：タイトル、日付、ユーザー名 */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2 style={{ margin: 0, color: "#20b2aa" }}>ヨクバロ！</h2>
        </Link>
        <span style={{ fontSize: "14px", color: "#aaa" }}>{dateString}</span>
        <span style={{ fontSize: "14px" }}>ログイン中: user_name さん</span>
      </div>

      {/* 右側：メニューボタン群 */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Link to="/posts/new">
          <button
            style={{
              padding: "8px 14px",
              background: "#20b2aa",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            新規投稿
          </button>
        </Link>
        <Link to="/posts">
          <button
            style={{
              padding: "8px 14px",
              background: "#20b2aa",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            投稿一覧
          </button>
        </Link>
        {/* 記事検索画面はこれから作るので、一旦リンクだけ繋げておきます */}
        <Link to="/search">
          <button
            style={{
              padding: "8px 14px",
              background: "#20b2aa",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            投稿検索
          </button>
        </Link>

        <Link
          to="/login"
          style={{
            marginLeft: "15px",
            color: "#ff6b6b",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ログアウト
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
