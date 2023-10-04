import { useRef, useState } from "react";
import "./App.css";
import { useCookies } from "react-cookie";

function App() {
  const emailRef = useRef();
  const passRef = useRef();

  const [cookies, setCookie, removeCookie] = useCookies(["data"]);
  const [token, setToken] = useState(cookies.data || []);

  const handleLog = () => {
    removeCookie("data");
    setToken(false);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: String(emailRef.current.value),
        password: String(passRef.current.value),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data);
        setCookie("data", data, { path: "/" });
      });
  };

  if (token.access_token) {
    return (
      <div>
        <h1>Hello</h1>
        <button onClick={() => handleLog()}>Log Out</button>
      </div>
    );
  } else {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input ref={emailRef} type="text" placeholder="Email" />
          <input ref={passRef} type="password" placeholder="Password" />
          <button>Submit</button>
        </form>
      </>
    );
  }
}

export default App;
