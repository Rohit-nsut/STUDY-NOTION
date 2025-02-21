import React, { useState } from "react"
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";

import CTAButton from "../components/core/HomePage/Button";

import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"

import FooterSection from "../components/common/FooterSection";
import { HomePageExplore } from "../data/homepage-explore";
import Cards from "../components/core/HomePage/Cards";

import { IoSchool } from "react-icons/io5";
import { IoDiamondSharp } from "react-icons/io5";
import { HiCodeBracketSquare } from "react-icons/hi2";
import { SlBadge } from "react-icons/sl";

import TimelineImage from "../assets/Images/TimelineImage.png";
import Know_your_progress from "../assets/Images/Know_your_progress.svg";
import Compare_with_others from "../assets/Images/Compare_with_others.svg";
import Plan_with_others from "../assets/Images/Plan_your_lessons.svg";
import Instructor from "../assets/Images/Instructor.png";
import ReviewSlider from "../components/common/ReviewSlider";





const Home = () => {


    const [category, setCategory] = useState(HomePageExplore[0].tag);
    

    return (

        <div className="bg-richblack-900">


            {/* section 1 */}
            <div className="flex flex-col  mx-auto my-16 w-11/12 items-center text-white justify-between gap-10 max-w-maxContent">

                <Link to={"/signup"}>

                    <div className=" group rounded-l-full rounded-r-full bg-richblack-800 p-1  transition-all duration-200 hover:scale-95">

                        <div className="flex gap-4 items-center text-richblack-200 justify-center group-hover:bg-richblack-900 px-7 py-2 rounded-full">
                            <p className="text-base font-semibold ">Become an Instructor</p>
                            <FaArrowRight className="text-base" />
                        </div>

                    </div>

                </Link>

                <div className="flex gap-4 flex-col justify-center items-center">
                    <h1 className="text-4xl text-white font-semibold">Empower Your Future with <HighlightText text={"Coding Skills"} /> </h1>

                    <p className="text-lg text-richblack-300 font-semibold w-[85%] text-center">With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>
                </div>

                <div className="flex gap-6 justify-between ">

                    <CTAButton linkTo={"/signup"} active={true}>
                        Learn More
                    </CTAButton>

                    <CTAButton linkTo={"/signup"} active={false}>
                        Book a Demo
                    </CTAButton>
                    
                </div>

                {/* Video */}
                <div className="shadow-custom-blue">
                    <video muted loop autoPlay className="shadow-custom-white">
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>


                
                {/* code Section 1 */}
                <div>
                    <CodeBlocks 
                        position={"flex-row"}
                        heading={
                            <div>
                                Unlock your <HighlightText text={"coding potential"} /> with our online courses.
                            </div>
                        } 
                        
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."} 
                        ctabtn1={
                            {
                                btnText: "Try it Yourself",
                                linkTo: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                linkTo: "/signup",
                                active: false,
                            }
                        }

                        codeblock={`<!DOCTYPE html> \n <html lang="en"> \n <head> \n <title>This is my page</title> \n </head> \n <body> \n <h1> <a href="/">Header</a> </h1> \n <nav> <a href="/one">One</a> <a \n href="/two">Two</a> <a href="/three">Three</a> \n </nav> \n </body>`}
                        
                        codeColor={"text-yellow-25"}

                        backgroundGradient={"codeblock1"}
                     />
                </div>


                {/* code Section 2 */}
                <div>
                    <CodeBlocks 
                        position={"flex-row-reverse"}
                        heading={
                            <div>
                                Start <HighlightText text={"coding in"} />
                                <br/>
                                <HighlightText text={"seconds"} />
                            </div>
                        } 
                        
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."} 
                        ctabtn1={
                            {
                                btnText: "Continue Lesson",
                                linkTo: "/signup",
                                active: true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                linkTo: "/signup",
                                active: false,
                            }
                        }

                        codeblock={`import React from "react"; \n import CTAButton from "./Button"; \n import TypeAnimation form "react-type"; \n import { FaArrowRight } form "react-icons/fa"; \n \n const Home = () => { \n return ( \n <div>Home</div> \n ) \n } \n export default Home;`}
                        
                        codeColor={"text-white"}

                        backgroundGradient={"codeblock2"}
                     />
                </div>



                {/* show courses by filter */}
                <div className="flex flex-col gap-12 my-10 justify-center items-center pb-20 relative">

                    <div className="flex flex-col gap-6 "> 

                        <div className="flex flex-col gap-2">
                            <h1 className="text-4xl font-bold text-center">Unlock the <HighlightText text={"Power of Code"}/></h1>

                            <p className="text-base font-semibold text-richblack-300 text-center">Learn to Build Anything You Can Imagine</p>
                        </div>

                        <div className="flex gap-7 bg-richblack-800 p-1 rounded-full shadow-sm shadow-richblack-100">

                            {
                                HomePageExplore.map( (con) => (
                                    <div className={`px-6 py-2 text-richblack-200 font-semibold hover:bg-richblack-900 hover:text-richblack-100 rounded-full cursor-pointer transition-all duration-200 ${category === con.tag ? `bg-richblack-900` : `bg-richblack-800`}`} onClick={() => setCategory(con.tag)} > {con.tag} </div>
                                ))
                            }

                        </div>

                    </div>

                    {/* Cards */}

                    <div className=" flex flex-col gap-14 absolute top-[85%]">
                        {HomePageExplore.filter((con) => con.tag === category).map((con) => (
                            <Cards key={con.tag} data={con.courses} />
                        ))}

                        <div className="flex justify-center gap-8">
                            <CTAButton linkTo={"/signup"} active={true}> Explore Full Catalog <FaArrowRight /> </CTAButton>
                            <CTAButton linkTo={"/signup"} active={false}> Learn More </CTAButton>
                        </div>
                    </div>

                </div>

            </div>




            {/* section 2 */}

            <div className="w-full bg-pure-greys-5">

                <div className="bg-white w-full h-[320px] flex HomePageBg">
                </div>

                <div className="w-10/12 flex flex-col gap-20 mx-auto py-20">


                    <div className="flex justify-between gap-10">
                        <div className="w-[45%]" >
                            <h1 className="text-4xl font-semibold">Get the skills you need for a <HighlightText text={"job that is in demand."} /></h1>
                        </div>
                        <div className="flex w-[40%] text-base flex-col gap-8 justify-center items-start text-richblack-700">
                            <h1 className="text-left">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</h1>
                            <CTAButton linkTo={"/signup"} active={true}>Learn More</CTAButton>
                        </div>
                    </div>



                    <div className="flex justify-around">

                        <div className="flex flex-col gap-3 text-black">

                            <div className="flex items-center gap-7">
                                <SlBadge className="bg-white p-2 rounded-full text-5xl text-blue-500" />
                                <div>
                                    <h1 className="text-lg font-semibold">Leadership</h1>
                                    <p>Fully committed to the success company</p>
                                </div>
                            </div>

                            <div className="border-l border-dashed border-richblack-400 h-14 mx-6"></div>


                            <div className="flex items-center gap-7">
                                <IoSchool className="text-pink-200 text-5xl p-2 bg-white rounded-full" />
                                <div>
                                    <h1 className="text-lg font-semibold">Responsibility</h1>
                                    <p>Students will always be our top priority</p>
                                </div>
                            </div>

                            <div className="border-l border-dashed border-richblack-400 h-14 mx-6"></div>

                            <div className="flex items-center gap-7">
                                <IoDiamondSharp className="text-caribbeangreen-300 text-5xl p-2 bg-white rounded-full" />
                                <div>
                                    <h1 className="text-lg font-semibold">Flexibility</h1>
                                    <p>The ability to switch is an important skills</p>
                                </div>
                            </div>

                            <div className="border-l border-dashed border-richblack-400 h-14 mx-6"></div>

                            <div className="flex items-center gap-7">
                                <HiCodeBracketSquare className="text-yellow-200 text-5xl p-2 bg-white rounded-full"/>
                                <div>
                                    <h1 className="text-lg font-semibold">Solve the problem</h1>
                                    <p>Code your way to a solution</p>
                                </div>
                            </div>
                        </div>

                        <div>

                        </div>

                        <div className="shadow-custom-white relative">
                            <img src={TimelineImage} className="h-[470px] shadow-custom-blue " alt="" />

                            <div className="bg-[#014A32] w-11/12 mx-auto absolute left-6 bottom-[-60px]">
                                <div className="flex justify-between p-10">
                                    <div className="flex px-5 items-center gap-8 border-r border-[#05A77B]">
                                        <h1 className="text-4xl text-white font-bold">10</h1>
                                        <p className="text-[#05A77B] text-sm">YEARS EXPERIENCE</p>
                                    </div>
                                    <div className="flex items-center gap-8 px-5 pl-10">
                                        <h1 className="text-4xl font-bold text-white">250</h1>
                                        <p className="text-[#05A77B] text-sm">TYPES OF COURSES</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>



                    <div className="flex mt-16 flex-col justify-center items-center gap-5">

                        <h1 className="text-4xl font-semibold">Your swiss knife for <HighlightText text={" learning any language"} /></h1>
                        <p className="text-lg font-medium w-[70%] text-center">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>

                        <div className="flex w-10/12 mx-auto justify-center items-center ">

                            <img src={Know_your_progress} className="h-[430px] object-contain lg:-mr-32 " alt="know_your_progress" loading="lazy" />
                            <img src={Compare_with_others} className="h-[540px] object-contain lg:-mb-10 lg:-mt-0 -mt-12" alt="Compare_with_others" loading="lazy" />
                            <img src={Plan_with_others} className="h-[500px] object-contain lg:-ml-36 lg:-mt-5 -mt-16" alt="Plan_with_others" loading="lazy" />
                        </div>

                        <div>
                            <CTAButton linkTo={"/signup"} active={true}>Learn More</CTAButton>
                        </div>

                    </div>


                </div>

            </div>



            {/* section 3 */}

            <div className="">

                <div className="w-10/12  mx-auto my-20 flex gap-20 items-center">

                    <div className="shadow-custom-whiteup">
                        <img src={Instructor} className="w-[1000px]" loading="lazy" alt="Instructor" />
                    </div>

                    <div className="text-white flex flex-col justify-center gap-10 font-semibold items-start">
                        <h1 className="text-4xl">Become an <br/> <HighlightText text={"instructor"} /></h1>
                        <p className="text-richblack-300">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                        <CTAButton linkTo={"/signup"} active={true}>Start Teaching Today <FaArrowRight /></CTAButton>
                    </div>

                </div>

            </div>


            {/* Review Slider */}

            <ReviewSlider />


            {/* footer section */}
            <FooterSection />
            
            

        </div>
    );

}


export default Home;