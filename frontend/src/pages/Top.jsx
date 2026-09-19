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
          marginBottom: "30px",
        }}
      >
        WEBで使えるあなただけのメモ！
        <br />
        日記、推し活、コレクションの記録、レシピ…
        <br />
        好きなものを自由に詰め込もう！
      </p>

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
          👆 上のメニューボタンから操作してください
        </p>
      </div>

      {/* ★お知らせスペース（後から変えやすいように枠にしておく） */}
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
          ・検索画面に「よく使うタグ機能」を追加しました！
          <br />
          ・今日もマイペースに記録を残していきましょう♪
        </p>
      </div>
    </div>
  );
}

export default Top;
