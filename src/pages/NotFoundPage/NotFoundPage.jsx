import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => (
  <div className={s.pageContainer}>
    <h1 className={s.pageTitle}>Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className={s.homeLink}>Go to Home</Link>
  </div>
);

export default NotFoundPage;
