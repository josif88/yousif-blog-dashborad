import Header from "../../components/header";
import Footer from "../../components/footer";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import moment from "moment";
 
import { useEffect, useState } from "react";

const Article = (props) => {
  
  
  const [article, setArticle] = useState({});

  useEffect(() => {
    setArticle(props.post.article);
  }, []);
  return (
    <div>
      <Header />
      <main>
        <section class="blog-container">
          <section class="title">
            <div>
              <h2>{article.title}</h2>
              <small>By {article.athor}</small>
            </div>
            <small>{moment(article.createdAt).format('ll')}</small>
          </section>
        </section>

        <section class="blog-container">
          <LazyLoadImage class="cover"  src={article.image} />
          
          <div dangerouslySetInnerHTML={{__html: article.text}}/>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default Article;



export async function getStaticPaths() {
  const res = await fetch("https://mashriq.herokuapp.com/dash/v1/articles");
  const posts = await res.json();

  const paths = posts.articles.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Call an external API endpoint to get posts
  const res = await fetch(
    `https://mashriq.herokuapp.com/dash/v1/article/${params.id}`
  );
  const post = await res.json();

  return { props: { post } };
}
