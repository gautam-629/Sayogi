import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setAuth, setToken } from "../store/AuthSlice";
import { makeRefreshRequest } from "../http";

export function useLoadingWithRefresh() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const storedRefreshToken = localStorage.getItem("refreshToken");
      try {
        const { data } = await makeRefreshRequest(storedRefreshToken);
        dispatch(setAuth(data));
        dispatch(setToken(data));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);
  return { loading };
}
