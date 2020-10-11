import { Button, Card, Col, Input, Row, message } from "antd";
import { useState } from "react";
import { login } from "./api";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const submit = (user, password) => {
    setLoading(true);
    login({ email, password }, (err, result) => {
      if (err) throw err;
      if (!result.status) {
        Object.keys(result.errMsg).forEach((key) => {
          message.error(result.errMsg[key]);
        });
        setLoading(false);
      } else {
        localStorage.setItem("user_token", result.token);
        localStorage.setItem("user_name", JSON.stringify(result.user));
        router.replace("/admin");
        setLoading(false);
      }
    });
  };
  return (
    <div className="center">
      <div className="login-page">
        <Card>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
            <Col span={24}>
              <Input.Password
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Button
              loading={isLoading}
              block
              type="primary"
              onClick={() => {
                submit(email, password);
              }}
            >
              LogIn
            </Button>
          </Row>

          <Row style={{ marginTop: 10 }}>
            <Button
              loading={isLoading}
              block
              type="primary"
              onClick={() => {
                router.replace("./register");
              }}
            >
              Register
            </Button>
          </Row>
        </Card>
      </div>
    </div>
  );
}
