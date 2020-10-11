import Link from "next/link";
import { Card, Button } from "antd";
import moment from "moment";

export function ArticleCard({ id, title, description, image, createdAt }) {
  return (
    <Card className="article-card">
      <img className="img" src={image} />
      <div style={{ padding: 10 }}>
        <h3>{title}</h3>
        <p>{description.substring(0, 35)}</p>
        <div className="flex">
          <span>{moment(createdAt).format("L")}</span>
          <Button type="secondary" href={`/admin/article/${id}`}>
            Edit article
          </Button>
        </div>
      </div>
    </Card>
  );
}
