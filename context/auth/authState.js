import { useState } from "react";
import AuthContext from "./authContext";

const AuthState = (props) => {
  const host = "https://expensetracker-backend-phi.vercel.app";

  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token")
      }
    });
    const data = await response.json();
    setUser(data.user.name);
  }
  return (
    <AuthContext.Provider value={{ user, fetchUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState