import { Typography, Avatar, Popover, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

export function Header() {
  const [name, setName] = useState("");

  const signOut = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user");
    router.replace("/login");
  };

  useEffect(() => {
    let userInfo = localStorage.getItem("user_name");
    setName(JSON.parse(userInfo).name);
  }, []);

  const router = useRouter();

  return (
    <header>
      <div className="container flex title-placeholder">
        <Typography.Title
          style={{ color: "#fff", margin: 0, padding: 0 }}
          level={3}
        >
          Dashboard
        </Typography.Title>
        <div className="user-info">
          <Typography.Text
            strong={true}
            style={{ color: "#fff", marginRight: 5 }}
          >
            {name}
          </Typography.Text>
          <Popover
            content={
              <div>
                <Typography.Text strong>Change Password</Typography.Text>
                <br />
                <Button type="link" onClick={signOut}>
                  Sign out
                </Button>
              </div>
            }
          >
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
          </Popover>
        </div>
      </div>
    </header>
  );
}
