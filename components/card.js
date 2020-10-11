import Link from "next/link";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import moment from "moment";

const Card = ({ title, athor, createdAt, image, id }) => {
  return (
    <>
      <div className="post-card">
        <div className="post-thumbnail">
          <LazyLoadImage className="img" src={image} />
        </div>
        <h3>{title}</h3>
        <span>{athor}</span>
        <div className="post-info">
          <Link href={`article/${id}`}>
            <a>Reade article</a>
          </Link>
          <span>{moment(createdAt).format('ll')}</span>
        </div>
      </div>
    </>
  );
};

export default Card;
