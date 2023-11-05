import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        {Array.isArray(content) && content.length > 0 ? (
          <ul>
            {content.map((user, index) => (
              <li key={index}>{user.name}</li>
            ))}
          </ul>
        ) : (
          <p>No user data available</p>
        )}
      </header>
    </div>
  );
};

export default BoardAdmin;
