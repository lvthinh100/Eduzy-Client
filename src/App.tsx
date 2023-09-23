import { useEffect } from "react";
import "./App.css";
import MyRouter from "./routes";
import { getMe } from "./api";
import { useAppDispatch } from "./hooks/redux";
import { authActions } from "./redux/slices/authSlice";
import React from "react";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: response } = await getMe();
        dispatch(authActions.setUser({ user: response.data.data }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [dispatch]);
  return <MyRouter />;
}

export default App;
