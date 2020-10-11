import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const AuthContainer = (props) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let userToken = localStorage.getItem("user_token");
    if (!userToken) {
      router.replace("./login");
      setLoading(false);
    } else {
    }
  }, []);

  return loading && props.children;
};
