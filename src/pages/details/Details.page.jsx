import React, { useContext, useEffect, useState } from "react";
import { AllDataContext } from "../../context/AllData.context";
import { Link, useLocation } from "react-router-dom";
import HtmlToParagraphs from "../../components/HtmlToParagraph.component";
import defaultEventImage from "../../assets/images/event-default.png";

const DetailsPage = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const { eventDatas } = useContext(AllDataContext);
  const location = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
    eventDatas
      ?.filter((data) => data.pid === Number(location.pathname.split("/")[2]))
      .map((eventData) => setEventDetails(eventData));
  }, [eventDatas, location.pathname]);

  console.log(eventDetails);

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  const removeComments = (content) => {
    return content ? content.replace(/<!--[\s\S]*?-->/g, "") : "";
  };

  const sanitizedContent = removeComments(eventDetails?.post_content);

  return (
    <section className="event-details-section">
      <div className="wrapper">
        {eventDetails !== null ? (
          <div className="inner-event-details">
            <div className="event-details">
              <div className="image">
                <img
                  src={
                    eventDetails.image !== ""
                      ? eventDetails.image
                      : defaultEventImage
                  }
                  alt=""
                />
              </div>

              <div className="content">
                <div className="posted-info">
                  <div className="post-item">
                    <i className="far fa-user"></i>
                    by {eventDetails.cats}
                  </div>

                  <div className="post-item">
                    <i className="far fa-calendar-alt"></i>
                    {formatDate(eventDetails.post_date)}
                  </div>
                </div>

                <h2 className="event-title">{eventDetails.title}</h2>

                <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
              </div>
            </div>

            <div className="event-details-other">
              <div className="latest-events">
                <h2>{eventDetails.cats}</h2>

                <div className="event-list">
                  {eventDatas !== null
                    ? eventDatas
                        ?.filter(
                          (data) =>
                            data.cats === eventDetails.cats &&
                            data.pid !== Number(location.pathname.split("/")[2])
                        )
                        .filter((data, idx) => idx < 10)
                        .map((event, idx) => (
                          <Link to={`/details/${event.pid}`} key={idx}>
                            <div className="item">
                              <div className="image">
                                <img
                                  src={
                                    event.image !== ""
                                      ? event.image
                                      : defaultEventImage
                                  }
                                  alt={event.title}
                                />
                              </div>

                              <div className="content">
                                <h3>{event.title}</h3>

                                <div className="date">
                                  <i className="far fa-calendar-alt"></i>
                                  {formatDate(event.post_date)}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))
                    : "Loading..."}
                </div>
              </div>
            </div>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    </section>
  );
};

export default DetailsPage;
