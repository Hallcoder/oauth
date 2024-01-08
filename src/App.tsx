import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  CredentialResponse,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState([]);
  const login = useGoogleLogin({
    onSuccess: (response: any) => setUser(response),
    onError: (response) => console.log("Error occured", response),
  });
  function onSuccess(credentialResponse: CredentialResponse): void {
    console.log(credentialResponse);
  }

  function onFailure() {
    console.log("Error occurred");
  }

  return (
    <>
      <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
    </>
  );
}

export default App;
