import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../home-carousel/slider2.css';
import './reservations.css';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import API_BASE_URL from '../../apiConfig';
import axios from 'axios';

const ReservationsList = () => {
  const [reservations, setReservations] = useState([]);
  const getBackgroundImage = (sport) => {
    switch (sport) {
      case 'Basketball':
        return 'url(https://media.istockphoto.com/id/165061971/vector/basketball-vector-on-orange-background.jpg?s=612x612&w=0&k=20&c=JxNcNNYM6XlZZeNOMyi35dGQa0SxEjB7VWCydS16qh4=)';
      case 'Swim':
        return 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNnBf6QG2YwxG7e6tbGOgKXe9svZeRDuxWfxAPRky5wAuqcEmAX36QFRFoFbOori0Qwkc&usqp=CAU)';
      case 'Swimming':
          return 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNnBf6QG2YwxG7e6tbGOgKXe9svZeRDuxWfxAPRky5wAuqcEmAX36QFRFoFbOori0Qwkc&usqp=CAU)';
      case 'Baseball':
        return 'url(https://cdn2.vectorstock.com/i/1000x1000/03/61/baseball-field-vector-1860361.jpg)';
      case 'Volleyball':
        return 'url(https://i.pinimg.com/originals/12/43/99/124399c0cd1bea995d36fdab7bb01e22.jpg)';
      case 'Golf':
        return 'url(https://img.freepik.com/premium-photo/3d-render-close-up-golf-ball-green-golf-course-sport-background_46483-6.jpg)';
      case 'Racquetball':
        return 'url(https://thumbs.dreamstime.com/b/squash-player-action-reaching-squash-court-white-man-racquetball-playing-match-squash-sports-equipment-201152159.jpg)';
      case 'Soccer':
        return 'url(https://img.freepik.com/premium-vector/illustration-with-realistic-soccer-ball-flying-into-net-football-goal-against-backdrop-stadium-stands_444390-18810.jpg?w=360)';
      case 'Tennis':
        return 'url(https://media.istockphoto.com/id/479545387/vector/tennis-background-male.jpg?s=612x612&w=0&k=20&c=sj7QUPcClu1qzQNLHyyIIYqK9O0m3oUEbtD3j5l_aK0=)';
      default:
        // Default image if sport is not recognized
        return 'url(default_image_url)';
    }
  };
  useEffect(() => {
    // Function to fetch reservations from the API
    const fetchReservations = async () => {
      try {
        const reservationsApiUrl = `${API_BASE_URL}/reservations`;
        const response = await axios.post(reservationsApiUrl, {}, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`
          },
        });

        //const response = await fetch(reservationsApiUrl);
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setReservations([{"venue_id":32,"reservation_type":"Venue","vname":"name","address":"address","total_cost":"0","total_capacity":10,"sport":"Swim","user_id":26,"reservation_id":22,"capacity_available":10,"cost_paid":1,"start_datetime":"2023-11-25 13:30:00","end_datetime":"2023-11-25 14:30:00","closed":0},{"venue_id":32,"reservation_type":"Venue","vname":"name","address":"address","total_cost":"0","total_capacity":10,"sport":"Swim","user_id":26,"reservation_id":29,"capacity_available":10,"cost_paid":1,"start_datetime":"2023-11-25 13:30:00","end_datetime":"2023-11-25 14:30:00","closed":0},{"venue_id":32,"reservation_type":"Venue","vname":"name","address":"address","total_cost":"0","total_capacity":10,"sport":"Swim","user_id":26,"reservation_id":23,"capacity_available":10,"cost_paid":1,"start_datetime":"2023-11-25 15:30:00","end_datetime":"2023-11-25 17:30:00","closed":0},{"venue_id":32,"reservation_type":"Venue","vname":"name","address":"address","total_cost":"0","total_capacity":10,"sport":"Swim","user_id":26,"reservation_id":30,"capacity_available":10,"cost_paid":1,"start_datetime":"2023-11-25 15:30:00","end_datetime":"2023-11-25 17:30:00","closed":0},{"venue_id":32,"reservation_type":"Venue","vname":"name","address":"address","total_cost":"0","total_capacity":10,"sport":"Swim","user_id":26,"reservation_id":24,"capacity_available":10,"cost_paid":1,"start_datetime":"2023-11-25 18:00:00","end_datetime":"2023-11-25 18:30:00","closed":0},{"venue_id":32,"reservation_type":"Venue","vname":"name","address":"address","total_cost":"0","total_capacity":10,"sport":"Swim","user_id":26,"reservation_id":31,"capacity_available":10,"cost_paid":1,"start_datetime":"2023-11-25 18:00:00","end_datetime":"2023-11-25 18:30:00","closed":0},{"venue_id":32,"reservation_type":"Venue","vname":"name","address":"address","total_cost":"0","total_capacity":10,"sport":"Swim","user_id":26,"reservation_id":25,"capacity_available":10,"cost_paid":1,"start_datetime":"2023-11-26 16:30:00","end_datetime":"2023-11-26 18:30:00","closed":0},{"venue_id":32,"reservation_type":"Venue","vname":"name","address":"address","total_cost":"0","total_capacity":10,"sport":"Swim","user_id":26,"reservation_id":32,"capacity_available":10,"cost_paid":1,"start_datetime":"2023-11-26 16:30:00","end_datetime":"2023-11-26 18:30:00","closed":0},{"venue_id":1,"reservation_type":"Sport","vname":"Bloomington Sports Center","address":"123 Main St","total_cost":"1000","total_capacity":500,"sport":"Basketball","user_id":23,"reservation_id":2,"capacity_available":500,"cost_paid":1,"start_datetime":"2023-12-01 20:09:00","end_datetime":"2023-12-01 20:09:00","closed":1},{"venue_id":4,"reservation_type":"Sport","vname":"Bloomington Baseball Field","address":"101 Pine St","total_cost":"1500","total_capacity":750,"sport":"Baseball","user_id":26,"reservation_id":5,"capacity_available":750,"cost_paid":1,"start_datetime":"2023-12-01 20:09:00","end_datetime":"2023-12-01 20:09:00","closed":0},{"venue_id":5,"reservation_type":"Sport","vname":"Bloomington Swimming Pool","address":"202 Cedar St","total_cost":"900","total_capacity":450,"sport":"Swimming","user_id":27,"reservation_id":6,"capacity_available":450,"cost_paid":1,"start_datetime":"2023-12-01 20:09:00","end_datetime":"2023-12-01 20:09:00","closed":0},{"venue_id":6,"reservation_type":"Sport","vname":"Bloomington Gymnasium","address":"303 Birch St","total_cost":"1100","total_capacity":550,"sport":"Basketball","user_id":28,"reservation_id":7,"capacity_available":550,"cost_paid":1,"start_datetime":"2023-12-01 20:09:00","end_datetime":"2023-12-01 20:09:00","closed":0},{"venue_id":7,"reservation_type":"Sport","vname":"Bloomington Volleyball Court","address":"404 Maple St","total_cost":"700","total_capacity":350,"sport":"Volleyball","user_id":29,"reservation_id":8,"capacity_available":350,"cost_paid":1,"start_datetime":"2023-12-01 20:09:00","end_datetime":"2023-12-01 20:09:00","closed":0},{"venue_id":8,"reservation_type":"Sport","vname":"Bloomington Golf Course","address":"505 Pine St","total_cost":"1300","total_capacity":650,"sport":"Golf","user_id":30,"reservation_id":9,"capacity_available":650,"cost_paid":1,"start_datetime":"2023-12-01 20:09:00","end_datetime":"2023-12-01 20:09:00","closed":0},{"venue_id":9,"reservation_type":"Sport","vname":"Bloomington Racquetball Center","address":"606 Oak St","total_cost":"1000","total_capacity":500,"sport":"Racquetball","user_id":31,"reservation_id":10,"capacity_available":500,"cost_paid":1,"start_datetime":"2023-12-01 20:09:00","end_datetime":"2023-12-01 20:09:00","closed":0},{"venue_id":2,"reservation_type":"Sport","vname":"Bloomington Soccer Park","address":"456 Elm St","total_cost":"800","total_capacity":400,"sport":"Soccer","user_id":24,"reservation_id":3,"capacity_available":400,"cost_paid":1,"start_datetime":"2023-12-02 20:09:00","end_datetime":"2023-12-02 20:09:00","closed":1},{"venue_id":3,"reservation_type":"Sport","vname":"Bloomington Tennis Club","address":"789 Oak St","total_cost":"1200","total_capacity":600,"sport":"Tennis","user_id":25,"reservation_id":4,"capacity_available":600,"cost_paid":1,"start_datetime":"2023-12-03 20:09:00","end_datetime":"2023-12-03 20:09:00","closed":0}]);
      }
    };

    // Call the function to fetch reservations when the component mounts
    fetchReservations();
  }, []);

  return (
    <>
  <div class="subheading">Your upcoming reservations</div>

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
              {reservations.map((reservation) => (
                
       <SwiperSlide>
       <div
         className='reservation'
         style={{
           backgroundImage: getBackgroundImage(reservation.sport),
           backgroundSize: 'cover',
           backgroundPosition: 'center',
         }}
       >
         <ul>
           <li key={reservation.reservation_id}>
             <p>Venue: {reservation.vname}</p>
             <p>Address: {reservation.address}</p>
             <p>Sport: {reservation.sport}</p>
             <p>Start Date/Time: {reservation.start_datetime}</p>
             <p>End Date/Time: {reservation.end_datetime}</p>
             <p>Capacity Available: {reservation.capacity_available}</p>
             <p>Cost Paid: {reservation.cost_paid}</p>
           </li>
         </ul>
       </div>
     </SwiperSlide>
              ))}
              </Swiper>
    
    
    </>
  );
};

export default ReservationsList;
