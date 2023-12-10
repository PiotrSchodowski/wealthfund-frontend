import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
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
          {/* Linkedin */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.linkedin.com/in/piotr-schodowski-7bb09328a/"
            role="button"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>

          {/* Github */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://github.com/PiotrSchodowski"
            role="button"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          {/* Facebook */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.facebook.com"
            role="button"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>

          {/* Instagram */}
          <a
            className="btn btn-outline-light btn-floating m-1"
            href="https://www.instagram.com"
            role="button"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </section>
      </div>

      <div
        className="text-center p-3"
        style={{
          backgroundColor: "#171616",
          fontVariant: "small-caps",
          fontSize: "1.1rem",
          color: "#fafbfb",
        }}
      >
        <span style={{ fontSize: "15px", fontWeight: "bold" }}>
          {" "}
          &copy; 2024
        </span>{" "}
        AwesomeSite. all rights reserved.
        <p className="text-white mt-2">
          crafted <FontAwesomeIcon icon={faCog} style={{ color: "#ff9805" }} />{" "}
          by piotr schodowski
        </p>
      </div>
    </footer>
  );
};

export default Footer;
