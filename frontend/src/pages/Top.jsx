import { Link } from "react-router-dom";

function Top() {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {/* アプリのタイトル＆キャッチコピー */}
      <h1 style={{ color: "#20b2aa", marginBottom: "10px" }}>ヨクバロ！</h1>
      <p
        style={{
          color: "#666",
          fontSize: "16px",
          lineHeight: "1.6",
          marginBottom: "25px",
        }}
      >
        WEBで使えるあなただけのメモ！
        <br />
        日記、推し活、コレクションの記録、レシピなどなど…
        <br />
        好きなものを自由に詰め込もう！
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <Link
          to="/register"
          style={{
            backgroundColor: "#20b2aa",
            color: "#fff",
            padding: "10px 25px",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "15px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          新規会員登録
        </Link>
        <Link
          to="/login"
          style={{
            backgroundColor: "#fff",
            color: "#20b2aa",
            border: "2px solid #20b2aa",
            padding: "10px 25px",
            borderRadius: "4px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          ログイン
        </Link>
      </div>

      {/* 操作の案内 */}
      <div
        style={{
          background: "#f8f9fa",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "30px",
          border: "1px solid #e9ecef",
        }}
      >
        <p style={{ color: "#495057", fontSize: "14px", margin: 0 }}>
          👆 上のメニューボタンからも操作できます
        </p>
      </div>

      {/* お知らせスペース */}
      <div
        style={{
          background: "#e0f2f1",
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid #b2dfdb",
          textAlign: "left",
        }}
      >
        <h3 style={{ color: "#00796b", fontSize: "15px", margin: "0 0 8px 0" }}>
          📢 お知らせ
        </h3>
        <p
          style={{
            color: "#004d40",
            fontSize: "13px",
            margin: 0,
            lineHeight: "1.5",
          }}
        >
          ・検索画面に「よく使うタグ機能」を追加しました。
          <br />
        </p>
      </div>
    </div>
  );
}

export default Top;
