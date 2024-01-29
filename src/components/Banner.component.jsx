import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Navigation } from "swiper/modules";

import { AllDataContext } from "../context/AllData.context";
import HtmlToParagraphs from "./HtmlToParagraph.component";
import { Link } from "react-router-dom";

export const BannerComponent = () => {
  const { eventDatas } = useContext(AllDataContext);
  console.log(eventDatas);

  return (
    <div className="banner-section">
      <div className="wrapper">
        <Swiper
          spaceBetween={0}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          className="mySwiper"
        >
          {eventDatas !== null
            ? eventDatas
                .filter((data) => data.cats === "Rotary International")
                .map((event, idx) => (
                  <SwiperSlide key={idx}>
                    <Link to={`details/${event.pid}`}>
                      <div className="item">
                        <div className="content">
                          <h2>{event.title}</h2>

                          <HtmlToParagraphs
                            data={event?.post_content}
                            length={200}
                          />
                        </div>

                        <div className="image">
                          <img src={event.image} alt={event.title} />
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
            : "Loading..."}
        </Swiper>
      </div>
    </div>
  );
};
