import { useParams, Link } from "react-router-dom";

function PostDetail() {
  // URLに含まれているパラメータ（:id の部分）を取得する
  const { id } = useParams();

  // 仮のデータ（本来はIDに合わせてデータベースやバックエンドから取得します）
  const dummyPosts = {
    1: {
      title: "ヨクバロの第一歩！",
      content:
        "Reactのルーティングができました。画面の切り替えがスムーズで気持ちいいですね。そうですね！",
    },
    2: {
      title: "ランチの記録",
      content:
        "今日のラーメンは美味しかった。次は違う味も試してみたいです。\nお店の名前は～～～駅は○駅！昼11時から営業中。",
    },
  };

  // 取得したIDに対応するデータを探す（なければ「見つかりません」にする）
  const post = dummyPosts[id] || {
    title: "記事が見つかりません",
    content: "指定されたIDの記事は存在しないか、削除された可能性があります。",
  };

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
        <span style={{ fontSize: "12px", color: "#333" }}>記事ID: {id}</span>
        <h2 style={{ marginTop: "10px", marginBottom: "15px", color: "#666" }}>
          {post.title}
        </h2>
        <p style={{ lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
          {post.content}
        </p>
      </div>

      {dummyPosts[id] && (
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
      )}
    </div>
  );
}

export default PostDetail;
