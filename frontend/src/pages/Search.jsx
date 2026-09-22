import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// 受付窓口をインポート
import { apiClient } from "../services/api";

function Search() {
  const [keyword, setKeyword] = useState("");

  // 1. サーバーから取得した実際の投稿データを入れる箱（最初は空っぽ）
  const [allPosts, setAllPosts] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(true);

  // 2. 画面が開いたときに、バックエンドから全投稿を取得する
  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const data = await apiClient("/api/posts");
        setAllPosts(data);
      } catch (error) {
        console.error("投稿データの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllPosts();
  }, []);

  // データベースの投稿本文から「#〇〇」というタグを自動で集めて重複をなくす処理
  const allTags = Array.from(
    new Set(
      allPosts.flatMap((post) => {
        // content が null などの場合のエラーを防ぐため (post.content || "") にしています
        const text = post.content || "";
        const matches = text.match(/#[^\s#]+/g);
        return matches ? matches : [];
      }),
    ),
  );

  // 実際の検索処理（キーワードやタグが含まれるものをフィルタリング）
  const executeSearch = (searchWord) => {
    const results = allPosts.filter((post) => {
      const title = post.title || "";
      const content = post.content || "";
      return (
        content.toLowerCase().includes(searchWord.toLowerCase()) ||
        title.toLowerCase().includes(searchWord.toLowerCase())
      );
    });
    setSearchResults(results);
    setHasSearched(true);
  };

  // 検索フォーム送信時の処理
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("検索キーワード:", keyword);
    executeSearch(keyword);
  };

  // タグチップをクリックしたときの処理
  const handleTagClick = (tag) => {
    setKeyword(tag);
    executeSearch(tag);
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        データを読み込み中...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "#ccc" }}>投稿記事検索</h2>

      {/* 検索フォーム */}
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: "10px", marginBottom: "15px" }}
      >
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="キーワードや #タグ で検索..."
          style={{
            flex: 1,
            padding: "10px",
            boxSizing: "border-box",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#20b2aa",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          検索
        </button>
      </form>

      {/* ★検索窓の下に、実際の投稿から抽出したタグチップを表示するエリア */}
      {allTags.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "25px",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "13px", color: "#666", marginRight: "4px" }}>
            よく使うタグ:
          </span>
          {allTags.map((tag, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleTagClick(tag)}
              style={{
                background: "#b8c5c4",
                color: "#00796b",
                border: "1px solid #20b2aa",
                borderRadius: "15px",
                padding: "4px 12px",
                fontSize: "13px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* 検索結果エリア */}
      <div>
        {hasSearched ? (
          searchResults.length > 0 ? (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              {searchResults.map((post) => (
                <li
                  key={post.id}
                  style={{
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    background: "#fff",
                  }}
                >
                  <Link
                    to={`/posts/${post.id}`}
                    style={{
                      textDecoration: "none",
                      color: "#20b2aa",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {post.title}
                  </Link>
                  <p
                    style={{
                      color: "#666",
                      margin: "8px 0 0 0",
                      fontSize: "14px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {post.content}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#666", textAlign: "center" }}>
              一致する投稿が見つかりませんでした。
            </p>
          )
        ) : (
          <p style={{ color: "#999", textAlign: "center" }}>
            上のタグをクリックするか、キーワードを入力して検索してください。
          </p>
        )}
      </div>
    </div>
  );
}

export default Search;
