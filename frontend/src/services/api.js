// バックエンドの通信先アドレス（通信先の住所。公開するときはここのURLを変更）
const API_BASE_URL = "http://localhost:8080";

// サーバーと通信するための共通関数
export async function apiClient(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`サーバーエラー: ${response.status}`);
    }

    // 中身がある場合はJSONとして読み込む
    const data = response.status !== 204 ? await response.json() : null;
    return data;
  } catch (error) {
    console.error("API通信エラー:", error);
    throw error;
  }
}
