import { Link } from "react-router-dom";

function PostList() {
  // 仮のデータ（あとでデータベースから取得するようにします）
  const dummyPosts = [
    {
      id: 1,
      title: "ヨクバロの第一歩！",
      content: "Reactのルーティングができました。",
    },
    { id: 2, title: "ランチの記録", content: "今日のラーメンは美味しかった。" },
  ];

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

      {/* 投稿のリストを表示 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {dummyPosts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {/* 詳細画面へのリンク（IDを渡す） */}
            <Link to={`/posts/${post.id}`}>
              <span style={{ color: "#20b2aa", textDecoration: "underline" }}>
                詳細を見る
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;
