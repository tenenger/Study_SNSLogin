import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const NaverLogin = () => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const { naver } = window;
  const location = useLocation();

  // 네이버 로그인 기능 및 버튼 구현
  const naverLogin = new naver.LoginWithNaverId({
    clientId: "rJOz4VuQkXYfVh49P3aO",
    callbackUrl: "http://localhost:3000",
    isPopup: true,
    loginButton: {
      color: "green",
      type: 3,
      height: 50,
    },
  });

  // 로그인 상태 확인하여 사용자 정보 가져오기.
  const getUser = async () => {
    await naverLogin.getLoginStatus((status) => {
      console.log(`로그인?: ${status}`);
      if (status) {
        setUser({ ...naverLogin.user });
        window.opener.location.href = "http://localhost:3000";
        window.close();
      }
    });
  };

  // 백엔드로 토큰 넘겨서 네이버 정보 갖도록 하기
  const getAccessToken = () => {
    if (!location.hash) return;
    setAccessToken(location.hash.split("=")[1].split("&")[0]);
  };

  // localStorage 비워서 로그아웃하기
  // 접근 토큰 삭제 요청 안하는 이유 : 실제 네이버 홈페이지에 로그아웃이 됨
  const naverLogout = () => {
    localStorage.removeItem("com.naver.nid.access_token");
    window.location.reload();
  };

  useEffect(() => {
    naverLogin.init();
    console.log("init!");
    getUser();
    getAccessToken();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>네이버 로그인 성공!</h2>
          <h3>사용자 이름</h3>
          <div>{user.name}</div>
          <h3>사용자 이메일</h3>
          <div>{user.email}</div>
          <h3>사용자 프로필사진</h3>
          <img src={user.profile_image} alt="프로필 사진" />
          <button onClick={naverLogout}>로그아웃</button>
        </div>
      ) : (
        // 네이버 로그인 버튼
        <div>
          <div id="naverIdLogin"></div>
        </div>
      )}
    </div>
  );
};
export default NaverLogin;
