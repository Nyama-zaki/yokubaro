import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 実際の登録処理（API通信など）はここに書いていきます
    console.log("登録データ:", { username, email, password });

    // 登録完了を想定して、一旦トップページ（またはログイン画面）へ飛ばす例
    alert("ユーザー登録が完了しました！（ダミー）");
    navigate("/");
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        background: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#333" }}>
        ユーザー登録
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              fontSize: "14px",
              color: "#333",
            }}
          >
            ユーザー名
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="例: yokubaro_user"
            required
            style={{
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              fontSize: "14px",
              color: "#333",
            }}
          >
            メールアドレス
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="例: example@email.com"
            required
            style={{
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              fontSize: "14px",
              color: "#333",
            }}
          >
            パスワード
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="8文字以上で入力"
            required
            style={{
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px",
            background: "#20b2aa",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          登録する
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
        <span style={{ color: "#666" }}>すでにアカウントをお持ちですか？ </span>
        <Link
          to="/login"
          style={{
            color: "#20b2aa",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ログインはこちら
        </Link>
      </div>
    </div>
  );
}

export default Register;
