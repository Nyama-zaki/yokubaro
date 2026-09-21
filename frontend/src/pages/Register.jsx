import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [loginId, setLoginId] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginId: loginId,
          password: password,
          userName: userName,
        }),
      });

      if (response.ok) {
        console.log("ユーザー登録成功！");
        alert("ユーザー登録が完了しました！");
        navigate("/login");
      } else {
        setErrorMessage(
          "登録に失敗しました。すでに使われているIDかもしれません。",
        );
      }
    } catch (error) {
      console.error("通信エラー:", error);
      setErrorMessage("サーバーとの通信に失敗しました。");
    }
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
        新規登録
      </h2>

      {errorMessage && (
        <div
          style={{
            color: "red",
            marginBottom: "15px",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          {errorMessage}
        </div>
      )}

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
            ユーザーID
          </label>
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
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
            ユーザーニックネーム
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="例: よくばろ太郎"
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
          ログイン画面へ戻る
        </Link>
      </div>
    </div>
  );
}

export default Register;
