import React from 'react'
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor}) => {
  return (
    <div className={` w-full flex ${position} justify-between py-20 `}>


        {/* section 1 */}
        <div className='flex flex-col w-[50%] gap-7 '>

            <h1 className='text-4xl font-bold'>{heading}</h1>

            <p className='text-base text-richblack-300 font-semibold pb-6 mr-20'> {subheading} </p>

            <div className='flex gap-6 pb-2'>
                <CTAButton linkTo={ctabtn1.linkTo} active={ctabtn1.active}>
                    { ctabtn1.btnText}<FaArrowRight />
                </CTAButton>

                <CTAButton linkTo={ctabtn2.linkTo} active={ctabtn2.active}>
                    {ctabtn2.btnText} 
                </CTAButton>
            </div>

        </div>


        {/* section 2 -> codeblock */}
        <div className='flex lg:w-[470px] w-[100%] border-2 border-richblack-700 py-3 relative '>
            {/*  HW -> BG - gradient */}

            <div className={`${backgroundGradient} absolute`}>
            </div>

            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`flex flex-col font-mono ${codeColor}`} >
                <TypeAnimation 

                    sequence={[codeblock, 5000, ""]}
                    repeat={Infinity}
                    cursor={true} 

                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block"
                        }
                    }
                    omitDeletionAnimation={true}

                />

            </div>

        </div>

    </div>
  );
}


export default CodeBlocks;