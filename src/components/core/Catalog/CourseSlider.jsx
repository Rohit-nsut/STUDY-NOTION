import React from 'react'
// import Swiper from 'swiper';
import {SwiperSlide, Swiper} from "swiper/react"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css"
import {Pagination, Autoplay, Navigation} from 'swiper/modules';

import CourseCard from './CourseCard';

const CourseSlider = ({courses}) => {

  return (
    <div className='flex justify-center mx-auto'>

      {
        courses?.length ? (
          <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={35}
            modules={[Pagination, Autoplay, Navigation]}
            pagination={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            breakpoints={{
              1024: {slidesPerView: 3}
            }}
          >

            {
              courses?.map( (course,index) => (
                <SwiperSlide key={index}>
                  <CourseCard course={course} key={index} Width={"w-[400px]"} Height={"h-[250px]"} />
                </SwiperSlide>
              ))
            }

          </Swiper>
        ) : (<div>Courses Not Found</div>)
      }
        
    </div>
  )
}

export default CourseSlider;