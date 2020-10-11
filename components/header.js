import { Button } from "antd";

const Header = () => {
  return (
    <div className="blog-header">
      <div className="blog-container ">
        <div className="blog-content flex">
          <h1 style={{ color: "#fff" }}>Fikra Camps</h1>
          <ul style={{color:'#fff !important'}}>
            <li>
              <h4>
                <a href="#">Home</a>
              </h4>
            </li>
            <li>
              <h4>
                <a href="#">About</a>
              </h4>
            </li>
            <li>
              <Button type="secondary" href="/admin">
                Admin
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
