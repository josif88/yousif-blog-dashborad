import { Button, Col, Input, Row } from "antd";

import { Header, AuthContainer } from "../../components/main";
import { ArticleCard } from "../../components/home";
import { FileAddOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getArticles } from "../api";

export default function Home() {
  const router = useRouter();

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles((data) => {
      data.status && setArticles(data.articles);
      console.log(articles);
    });
  }, []);
  return (
    <AuthContainer>
      <div>
        <Header />
        <div className="home-page container">
          <div className="controls flex">
            <Input.Search style={{ width: 300 }} placeholder="Search" />
            <Button
              onClick={() => {
                router.push("./article/create");
              }}
              icon={<FileAddOutlined />}
              type="primary"
            >
              Add Article
            </Button>
          </div>
          <Row gutter={[20, 20]}>
            {articles.map((item, index) => (
              <Col md={8} sm={12} xs={24}>
                <ArticleCard {...item} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </AuthContainer>
  );
}
