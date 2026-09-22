import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // 判定中：null, ログイン中：true, 未ログイン：false

  useEffect(() => {
    // サーバーに現在のログイン状態を確認しに行く
    fetch("/api/user/me")
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  // 判定中のときは「読み込み中...」などを表示してチラつきを防ぐ
  if (isAuthenticated === null) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>確認中...</div>
    );
  }

  // ログインしていなければ、ログイン画面へ強制ジャンプ
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ログインしていれば、そのまま中身（行きたかったページ）を表示する
  return children;
}
