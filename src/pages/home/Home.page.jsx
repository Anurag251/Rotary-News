import React, { useContext, useState } from "react";
import { EventCardComponent } from "../../components/EventCard.component";
import { AllDataContext } from "../../context/AllData.context";
import { BannerComponent } from "../../components/Banner.component";

export const HomePage = () => {
  const { eventDatas } = useContext(AllDataContext);
  const [selectedEvent, setSelectedEvent] = useState("");

  const eventCategories =
    eventDatas !== null && eventDatas !== "Loading"
      ? [...new Set(eventDatas.map((cat) => cat.cats))]
      : null;

  // console.log(eventCategories);

  return (
    <div className="Home">
      <BannerComponent />

      <section className="event-section event-page">
        <div className="wrapper">
          <div className="event-categories">
            <div className="section-title">
              <h2>Rotary News</h2>
            </div>
            <ul>
              <li
                className={`${selectedEvent === "" ? "active" : ""}`}
                onClick={() => setSelectedEvent("")}
              >
                All
              </li>
              {eventCategories?.map((eventCategory) => (
                <li
                  className={`${
                    selectedEvent === eventCategory ? "active" : ""
                  }`}
                  onClick={() => setSelectedEvent(eventCategory)}
                >
                  {eventCategory}
                </li>
              ))}
            </ul>
          </div>

          <div className="event-list">
            {eventDatas !== null
              ? eventDatas
                  .filter((data) =>
                    selectedEvent !== ""
                      ? data.cats === selectedEvent
                      : selectedEvent === ""
                  )
                  .map((event, idx) => (
                    <EventCardComponent key={idx} event={event} />
                  ))
              : "Loading..."}
          </div>
        </div>
      </section>
    </div>
  );
};
