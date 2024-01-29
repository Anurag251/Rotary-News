import React from "react";
import defaultEventImage from "../assets/images/event-default.png";
import { Link } from "react-router-dom";

export const EventCardComponent = ({ event }) => {
  return (
    <Link to={`details/${event.pid}`}>
      <div className="item" title={event.title}>
        <div className="image">
          <img
            src={event.image !== "" ? event.image : defaultEventImage}
            alt={event.title}
          />
        </div>

        <div className="content">
          <h3 className="name">{event.title}</h3>
        </div>
      </div>
    </Link>
  );
};
