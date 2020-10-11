import { Button, Card, Col, Input, Row, message } from "antd";
import { useState } from "react";
import { login, register } from "./api";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);

  const submit = (phone, name, email, password) => {
    setLoading(true);
    register({ phone, name, email, password }, (err, result) => {
      if (err) throw err;
      if (!result.status) {
        Object.keys(result.errMsg).forEach((key) => {
          message.error(result.errMsg[key]);
        });
        setLoading(false);
      } else {
        router.replace("/login");
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
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Col>
            <Col span={24}>
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Row>
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
                submit(phone, name, email, password);
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
