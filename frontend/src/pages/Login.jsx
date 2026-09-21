import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Spring Securityの標準ログインは通常フォームデータ（x-www-form-urlencoded）形式で受け付けます
    const formData = new URLSearchParams();
    formData.append("username", loginId); // Spring Securityのデフォルトは 'username' という名前で受け取ります
    formData.append("password", password);

    try {
      const response = await fetch("/api/login", {
        // バックエンドのエンドポイントに合わせて調整してください
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      if (response.ok) {
        console.log("ログイン成功！");
        // ブラウザ全体をリロードしながらトップ画面へ移動する
        window.location.href = "/";
      } else {
        setErrorMessage("ログインIDまたはパスワードが間違っています。");
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
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>ログイン画面</h2>
      {errorMessage && (
        <div style={{ color: "red", marginBottom: "15px", fontSize: "14px" }}>
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            ログインID:
          </label>
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            パスワード:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#20b2aa",
            color: "#white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          ログイン
        </button>
      </form>
    </div>
  );
}
