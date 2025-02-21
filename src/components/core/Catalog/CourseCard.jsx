import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import GetAvgRating from '../../../utils/avgRating';
import RatingStars from '../../common/RatingStars';

const CourseCard = ({course,Height}) => {



  const [avgReviewCount, setAvgReviewCount] = useState(0);


  useEffect( () => {
    const count = GetAvgRating(course?.ratingandReviews);
    setAvgReviewCount(count);
  },[course])


  return (
    <div className='text-richblack-5'>

      <Link to={`/courses/${course?._id}`}>

        <div className='flex flex-col gap-3'>
          <div>
            <img src={course?.thumbnail}
            alt='course ka thumbnail'
            className={`${Height} lg:w-[400px] rounded-xl object-cover`}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <p> {course?.courseName} </p>
            <p> {course?.instructor?.firstName} {course?.instructor?.lastName} </p>
            <div className='flex gap-2'>
              <span> {avgReviewCount || 0} </span>
              <RatingStars Review_Count={avgReviewCount} />
              <span> {course?.ratingandReviews?.length} </span>
            </div>
            <p> Rs. {course?.price} </p>
          </div>
        </div>

      </Link>
        
    </div>
  )
}

export default CourseCard;