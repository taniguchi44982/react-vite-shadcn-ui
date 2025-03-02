import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Auth = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);

  // Magic Link送信
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert("ログインエラー：" + error.message);
    } else {
      alert("Magic Linkを送信しました！メールを確認してください。");
    }
  };

  // トークン取得
  const fetchToken = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      alert("ログインしていません");
    } else {
      setToken(data.session.access_token || null);
    }
  };

  return (
    <div>
      <h2>Magic Linkでログイン</h2>
      <input
        type="email"
        placeholder="メールアドレスを入力"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Magic Link送信</button>

      <h2>ログイン後のトークン取得</h2>
      <button onClick={fetchToken}>トークン取得</button>
      
      {token && (
        <div>
          <h3>アクセストークン:</h3>
          <textarea readOnly value={token} rows={5} cols={40}></textarea>
        </div>
      )}
    </div>
  );
};

export default Auth;
