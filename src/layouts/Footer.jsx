import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import "../styles/App.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white">
      <div className="container p-4 pb-0 footer-container">
        <section className="mb-4">
          {/* Facebook */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="facebook.com"
            role="button"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>

          {/* Twitter */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>

          {/* Google */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <FontAwesomeIcon icon={faGoogle} />
          </a>

          {/* Instagram */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>

          {/* Linkedin */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>

          {/* Github */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="#!"
            role="button"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </section>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: "#171616" }}>
        &copy; 2024 AwesomeSite. All rights reserved.
        <p className="text-white mt-2">
          Crafted with <span style={{ color: "#ff9805" }}>&hearts;</span> by
          Piotr Schodowski
        </p>
      </div>
    </footer>
  );
};

export default Footer;
