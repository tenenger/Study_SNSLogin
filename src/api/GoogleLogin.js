import React, { useEffect, useRef, useState } from "react";
import { Buffer } from "buffer";

export const GoogleLogin = () => {
  // 옛날 버전....
  //   const { gapi } = window;

  //   const handleSuccess = (res) => {
  //     console.log(`SUCCESS: ${res}`);
  //   };

  //   const handleFailure = (res) => {
  //     console.log(`FAILED: ${res}`);
  //   };

  //   const googleInit = async () => {
  //     await gapi.load("auth2", () => {
  //       gapi.auth2.init({
  //         client_id:
  //           "671295305902-n3b8pdlio9eq71l5d9e6aiv3n1gngeen.apps.googleusercontent.com",
  //         scope: "profile email",
  //       });
  //     });
  //   };

  //   const googleButton = async () => {
  //     await gapi.signin2.render("googleLoginBtn", {
  //       scope: "profile email",
  //       longtitle: true,
  //       theme: "dark",
  //       width: 240,
  //       height: 36,
  //       onsuccess: { handleSuccess },
  //       onfailure: { handleFailure },
  //     });
  //   };
  const { google } = window;
  const googleRef = useRef();
  const [user, setUser] = useState(null);
  const handleCallback = (res) => {
    const jwt = res.credential;
    const payload = jwt.split(".")[1]; //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
    const base64Payload = Buffer.from(payload, "base64");
    const result = JSON.parse(base64Payload);
    console.log(result);
    localStorageSave(result);
    setUser({ ...result });
  };
  const googleInit = async () => {
    await google.accounts.id.initialize({
      client_id:
        "671295305902-n3b8pdlio9eq71l5d9e6aiv3n1gngeen.apps.googleusercontent.com",
      callback: handleCallback,
    });
    google.accounts.id.renderButton(googleRef.current, {
      //   type: "icon",
      type: "standard",
      theme: "outline",
      //   theme: "filled_black",
      //   theme: "filled_blue",
      //   size: "large",
      size: "medium",
      //   size: "small",
      shape: "circle",
      //   shape: "rectangular",
      //   logo_alignment: "left",
      //   logo_alignment: "center",
      //   width: 300,
      //   text: "siginin_with",
      //   text: "Signup_with",
      //   text: "continue_with",
      //   text: "signin",
    });
    // google.accounts.id.prompt();
  };

  const localStorageSave = ({ ...rest }) => {
    localStorage.setItem("email", rest.email);
    localStorage.setItem("name", rest.name);
    localStorage.setItem("picture", rest.picture);
  };

  const handleLogout = () => {
    google.accounts.id.disableAutoSelect();
  };

  useEffect(() => {
    googleInit();
    // googleButton();
  }, []);
  return (
    <div>
      {user ? (
        <div>
          <h2>사용자 이메일</h2>
          <h3>{user.email}</h3>
          <h2>사용자 이름</h2>
          <h3>{user.name}</h3>
          <h2>사용자 프로필사진</h2>
          <img src={user.picture} alt="" />
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div style={{ margin: "auto", width: 400 }}>
          <div ref={googleRef} id="googleLoginBtn"></div>
        </div>
      )}
    </div>
  );
};
