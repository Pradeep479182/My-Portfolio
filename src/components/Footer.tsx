import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer-title">Connect with me</h2>

      <div className="footer-icons">
        <a
          href="https://github.com/Pradeep479182"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={24} />
        </a>

        <a
          href="https://www.linkedin.com/in/pradeep-rakavi-27146b38b/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={24} />
        </a>

        </div>

      <p className="footer-copy">
        &copy; {new Date().getFullYear()} Frontend. All rights reserved.
      </p>
    </footer>
  );
}
