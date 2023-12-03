import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './slider2.css';

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';


const HomeCarousel = () => {
  return (
    <>
  <div class='container'>
  <span class="subheading">All upcoming events/activties</span>
  <span className="homeBodyButtons">
      <a href="/venues">
          <a className='buttons' buttonStyle="buttonOutline" buttonSize="buttonLarge">
              RESERVE NOW
          </a>
      </a>
  </span>
  </div> 
      <Swiper
        modules={[EffectCoverflow, Autoplay, Pagination]}
        autoplay={{
            delay: 1000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false
        }}
        speed={600}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://admissions.indiana.edu/images/steps/rcd.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNEslIzehHtl4GIyfPmszgn8n3zUqWUzJQaR0sPDoq3xtVLXs7WOfkRRmX7jjW4fooZXU&usqp=CAU" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://recsports.indiana.edu/images/special-event-images/specialevents_main.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://schmidt-arch.com/wp-content/uploads/2016/06/IU_auditorium_audience_stage-1030x813.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ9FcVCMs3ky_rfnXmrVQFbvJbaLI4QBgQ6g&usqp=CAU" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ4QFzxlEwNPwagaYZ5_PiV76mBksU0YDZ1g&usqp=CAU" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrNJ5UnkztlI6O5m8RV-romu63EHPbGFAu6A&usqp=CAU" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://jandevents.com/wp-content/uploads/jand-party-1600x900.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
export default HomeCarousel;