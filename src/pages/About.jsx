import React from 'react'

import image1 from "../assets/Images/aboutus1.webp";
import image2 from "../assets/Images/aboutus2.webp";
import image3 from "../assets/Images/aboutus3.webp";

import HighlightText from "../components/core/HomePage/HighlightText";
import foundingImage from "../assets/Images/FoundingStory.png";
import CTAButton from "../components/core/HomePage/Button";
import GetInTouchForm from '../components/core/Auth/GetInTouchForm';

import FooterSection from "../components/common/FooterSection";
import ReviewSlider from '../components/common/ReviewSlider';

const About = () => {
  return (
    <div className=''>


      {/* section 1 */}
      <div className='bg-richblack-700'>

        <div className='bg-richblack-700 relative py-20 lg:w-[55%]  mx-auto flex flex-col gap-3'>

          <h1 className='text-richblack-5 text-4xl px-5 font-bold text-center'>Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"} /> </h1>

          <p className='text-richblack-300 px-2 text-center font-semibold'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>

          <div className="sm:h-[80px] lg:h-[170px]"></div>


          {/* images */}
          <div className='flex  mx-auto gap-10 absolute lg:top-[300px] lg:left-[-200px] '>
            <img src={image1} alt='image1' loading='lazy' />
            <img src={image2} alt='image2' loading='lazy' />
            <img src={image3} alt='image3' loading='lazy' />
          </div>

        </div>


      </div>



      {/* section 2 */}
      <div className='border-b border-richblack-700'>

        <div className='flex pt-40 pb-14 w-10/12 mx-auto'>
          <h1 className='text-4xl p-5 text-richblack-5 font-bold text-center'>
            We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"} />, <span className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffad1f] via-[#fa9d12] to-[#f5381fe9]'>expertise</span>, and community to create an <span className='font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffad1f] via-[#fa9d12] to-[#f5381fe9]'>unparalleled educational experience.</span>
          </h1>
        </div>


      </div>



      {/* section 3 */}
      <div className='w-10/12 flex flex-col mx-auto my-24 gap-28 lg:gap-60'>


        <div className='flex lg:flex-row flex-col gap-10 lg:justify-between lg:items-center'>

          <div className='lg:w-[47%] flex flex-col gap-10 font-semibold text-richblack-300'>

            <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-bold text-transparent '>Our Founding Story</h1>

            <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

            <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>

          </div>

          <div>
            <img src={foundingImage} alt='foundingImage' loading='lazy' className='lg:w-[470px] rounded-sm shadow-custom-red' />
          </div>

        </div>


        <div className='flex lg:flex-row flex-col gap-10 lg:justify-between lg:items-center'>

          <div className='lg:w-[37%] flex flex-col gap-10 font-semibold text-richblack-300'>

            <h1 className='bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-bold text-transparent'>Our Vision</h1>

            <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>


          </div>

          <div className='lg:w-[37%] flex flex-col gap-10 font-semibold text-richblack-300'>

            <h1 className='text-4xl font-bold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent'>Our Mission</h1>


            <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>

          </div>

        </div>

        

      </div>



      {/* section 4 */}
      <div className='bg-richblack-700 py-10' >

        <div className='flex w-10/12 mx-auto justify-around gap-10 flex-wrap'>

          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-richblack-5 text-3xl font-bold'>5K</h1>
            <p className='text-richblack-400 font-semibold'>Active Students</p>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-richblack-5 text-3xl font-bold'>10+</h1>
            <p className='text-richblack-400 font-semibold'>Mentors</p>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-richblack-5 text-3xl font-bold'>200+</h1>
            <p className='text-richblack-400 font-semibold'>Courses</p>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-richblack-5 text-3xl font-bold'>50+</h1>
            <p className='text-richblack-400 font-semibold'>Awards</p>
          </div>

        </div>

      </div>



      {/* section 5 */}
      <div>

        <div className='w-10/12 mx-auto py-20'>

          <div className='flex '>

            <div className='lg:w-1/2'>
              <div className='lg:w-[85%] flex flex-col gap-4 justify-center items-start'>
                <h1 className='text-richblack-5 text-4xl font-bold '>World-Class Learning for <HighlightText text={"Anyone, Anywhere"}/></h1>
                <p className='text-richblack-300 font-semibold'>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
                <CTAButton linkTo={"/login"} active={true}>Learn More</CTAButton>
              </div>
            </div>

            <div className='lg:w-[25%] lg:h-[300px] p-8  flex flex-col gap-8 bg-richblack-700'>
              <h1 className='text-richblack-5 text-xl '>Curriculum Based on Industry Needs</h1>
              <p className='text-richblack-300 font-semibold'>Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</p>
            </div>
            
            <div className='lg:w-[25%] lg:h-[300px] p-8  flex flex-col gap-8 bg-richblack-800'>
              <h1 className='text-richblack-5 text-xl '>Our Learning Methods</h1>
              <p className='text-richblack-300 font-semibold'>Studynotion partners with more than 275+ leading universities and companies to bring</p>
            </div>

          </div>

          <div className='flex flex-row-reverse'>

            <div className='lg:w-[25%] lg:h-[300px] p-8  flex flex-col gap-8 bg-richblack-700'>
              <h1 className='text-richblack-5 text-xl '>Ready to Work</h1>
              <p className='text-richblack-300 font-semibold'>Studynotion partners with more than 275+ leading universities and companies to bring</p>
            </div>

            <div className='lg:w-[25%] lg:h-[300px] p-8  flex flex-col gap-8 bg-richblack-800'>
              <h1 className='text-richblack-5 text-xl '>Rating "Auto-grading"</h1>
              <p className='text-richblack-300 font-semibold'>Studynotion partners with more than 275+ leading universities and companies to bring</p>
            </div>

            <div className='lg:w-[25%] lg:h-[300px] p-8  flex flex-col gap-8 bg-richblack-700'>
              <h1 className='text-richblack-5 text-xl '>Certification</h1>
              <p className='text-richblack-300 font-semibold'>Studynotion partners with more than 275+ leading universities and companies to bring</p>
            </div>

          </div>


        </div>

      </div>



      {/* section 6 */}
      <div className='w-[35%] mx-auto'>
        <GetInTouchForm heading={"Get in Touch"} subHeading={"We'd love to here for you, Please fill out this form."} width={"35%"} />
      </div>



      {/* Reviews */}
      <div className='pt-10'>
        <ReviewSlider />
      </div>



      {/* Footer */}
      <FooterSection />
      
    </div>
  )
}

export default About;