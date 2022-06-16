import "./App.css";
import KakaoLogin from "./api/KakaoLogin";
import NaverLogin from "./api/NaverLogin";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <h2>카카오 로그인 구현</h2> */}
      {/* <KakaoLogin /> */}
      <h2>네이버 로그인 구현</h2>
      <Routes>
        <Route path="/" element={<NaverLogin />} />
      </Routes>
    </div>
  );
}

export default App;
