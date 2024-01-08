import { useEffect, useState } from "react";
import "./App.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function App() {
  const [profile, setProfile] = useState<any>([]);
  const [user, setUser] = useState<any | []>([]);
  const login = useGoogleLogin({
    onSuccess: (response: any) => {
      console.log(response);
      setUser(response);
    },
    onError: (response) => console.log("Error occured", response),
  });
  useEffect(() => {
    if (user.length > 0) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res: any) => {
          console.log("User object", res);
          setProfile(res.data);
        })
        .catch((err: any) => {
          console.log("Error message", err);
        });
    }
  }, [user]);

  return (
    <>
      {profile ? (
        <div>
          <img src={profile.picture} alt="" />
        </div>
      ) : (
        <h1>Let's see if this works</h1>
      )}
      <button onClick={() => login()}>Sign in with Google🚀</button>
    </>
  );
}

export default App;
