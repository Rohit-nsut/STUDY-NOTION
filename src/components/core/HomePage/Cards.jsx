import React, { useState } from 'react'
import { FaUserFriends } from "react-icons/fa";
import { ImTree } from "react-icons/im";


const Cards = (props) => {

  let data = props.data;
  
  const [card, setCard] = useState(data[0].heading);

  function clickHandler (value) {
    setCard(value);
  }



  return (
    <div className='flex justify-between gap-16'>
        {
            data.map( (con) => (
                <div className={`text-richblack-400  cursor-pointer ${card === con.heading ? `bg-white shadow-custom-yellow ` : ` bg-richblack-800` }  p-5 w-[380px] h-[300px] flex flex-col justify-between transition-all duration-75`} onClick={() => clickHandler(con.heading)}>
                    <div className='flex flex-col gap-5'>
                        <h1 className={`${card === con.heading  ? `text-black` : `text-richblack-50`} text-lg font-semibold`}> {con.heading} </h1>
                        <p> {con.description} </p>
                    </div>

                    {/* <div></div> */}

                    <div className={`flex justify-between text-base font-medium border-t border-dashed pt-3 ${card === con.heading ? `text-blue-500` : `text-richblack-400`}`}>
                        <h1 className='flex gap-2 items-center'> <FaUserFriends /> {con.level} </h1>
                        <h1 className='flex gap-2 items-center'> <ImTree /> {con.lessionNumber} Lesson</h1>
                    </div>
                </div>
            ))
        }
    </div>
  );
}

export default Cards;