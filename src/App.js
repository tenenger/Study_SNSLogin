import { useEffect } from "react";
import "./App.css";

function App() {
  const { Kakao } = window;
  const initKakao = () => {
    const jsKey = "3c5fd0d61672a00438664be501823461";
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(jsKey);
      console.log(Kakao.isInitialized());
    }
  };
  const kakaoLogin = () => {
    Kakao.Auth.login({
      success() {
        Kakao.API.request({
          url: "/v2/user/me",
          success(res) {
            alert(JSON.stringify(res));
            const kakaoAccount = res.kakao_account;
            console.log(kakaoAccount);
          },
          fail(error) {
            console.log(error);
          },
        });
      },
      fail(error) {
        console.log(error);
      },
    });
  };

  useEffect(() => {
    initKakao();
  }, []);

  return (
    <div className="App">
      <h2>카카오 로그인 구현</h2>
      <button onClick={kakaoLogin}>
        <img
          src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
          width="222"
          alt="카카오 로그인 버튼"
        />
      </button>
    </div>
  );
}

export default App;
