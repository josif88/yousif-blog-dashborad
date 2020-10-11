import Header from "../components/header";
import Footer from "../components/footer";
import Card from "../components/card";

export default function Home(props) {
  console.log(props);
  return (
    <div>
      <Header />
      <main>
        <section className="home-cover">
          <img className="home-cover-image" src="./images/home-cover.png" />
          <div className="overlay">
            <div className="blog-container">
              <h1>Simple Blog.</h1>
              <p>A blog created by FikraCamps</p>
            </div>
          </div>
        </section>
        <section className="featured-posts blog-container">
          {props.blog.articles.map((article) => (
            <Card {...article} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://mashriq.herokuapp.com/dash/v1/articles");
  const blog = await res.json();

  return {
    props: {
      blog,
    },
  };
}
