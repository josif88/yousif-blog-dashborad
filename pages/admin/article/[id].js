import { AuthContainer, Header } from "../../../components/main";
import { Input, Button, Typography, Row, message, Popover } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { addArticle, getArticle, editArticle } from "../../api";

export default function Article() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    router.query && console.log(router.query);

    if (router && router.query) {
      getArticle(router.query.id, (err, data) => {
        if (!data.status) {
          Object.keys(data.errMsg).forEach((key) => {
            message.error(data.errMsg[key]);
          });
        } else {
          setIsEdit(true);
          setText(data.article.text);
          setTitle(data.article.title);
          setImage(data.article.image);
          setDescription(data.article.description);
        }
      });
    }
  }, [router]);

  const addArticleHandle = (title, text, description, image) => {
    addArticle(
      {
        text,
        title,
        description,
        image,
        athor: Number(JSON.parse(localStorage.getItem("user_name")).id),
      },

      (err, result) => {
        if (err) throw err;
        if (!result.status) {
          Object.keys(result.errMsg).forEach((key) => {
            message.error(result.errMsg[key]);
          });
        } else {
          router.push("/admin");
        }
      }
    );
  };

  const editArticleHandle = (title, text, description, image) => {
    editArticle(
      router.query.id,
      {
        title,
        text,
        description,
        image,
      },

      (err, result) => {
        if (err) throw err;
        if (!result.status) {
          Object.keys(result.errMsg).forEach((key) => {
            message.error(result.errMsg[key]);
          });
        } else {
          router.push("/admin");
        }
      }
    );
  };

  var ReactQuill;

  if (typeof window !== "undefined") {
    ReactQuill = require("react-quill");
  }

  return (
    <AuthContainer>
      <div className="AddArticle">
        <Header />
        <div className="container">
          <div className="controls flex">
            <Input.Search style={{ width: 300 }} placeholder="Search" />
            <Button
              disabled={title && text && image && description ? false : true}
              icon={<SaveOutlined />}
              onClick={() =>
                isEdit
                  ? editArticleHandle(title, text, description, image)
                  : addArticleHandle(title, text, description, image)
              }
              type="primary"
            >
              Save
            </Button>
          </div>

          <Typography.Title>Add Article</Typography.Title>
          <Row style={{ marginTop: 20 }}>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Input
              placeholder="short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Popover content={<img src={!image ? "" : image} />}>
              <Input
                placeholder="Image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Popover>
          </Row>

          {ReactQuill && (
            <ReactQuill
              style={{ marginTop: 20, height: 200 }}
              theme="snow"
              value={text}
              onChange={(value) => setText(value)}
            />
          )}
        </div>
      </div>
    </AuthContainer>
  );
}
