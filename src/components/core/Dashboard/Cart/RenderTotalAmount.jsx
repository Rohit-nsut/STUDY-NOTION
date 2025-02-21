import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CTAButton from "../../../core/HomePage/Button";
import { useNavigate } from 'react-router-dom';
import { buyCourse } from '../../../../services/operations/studentFeatureAPI';

const RenderTotalAmount = () => {

  const {cart, total} = useSelector( (state) => state.cart);
  const {token} = useSelector( (state) => state.auth);
  const {user} = useSelector( (state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [discountedCost, setDiscountedCost] = useState(0);

  function discountedCost (cost) {
    let discount = cost/10;

    return Math.round(cost - discount);
  }

  const handleBuyCourse = () => {

      const courses = cart.map( (course) => course._id);
      buyCourse(token, courses, user, navigate, dispatch);
  }

  return (
    <div className='w-1/4 my-8 flex flex-col gap-5 bg-richblack-800 rounded-lg px-5 py-6 border-richblack-700 border'>

      <div>
        <p className='text-richblack-300 text-lg'>Total: </p>
        <p className='text-2xl text-yellow-50 font-semibold'>Rs. {`${discountedCost(total)}`} </p>
        <p className='text-richblack-300 opacity-60'> <s>Rs. {total} </s> </p>
      </div>

      <div onClick={ () => handleBuyCourse()}>
        <CTAButton active={true}>
          Buy Now
        </CTAButton>
      </div>
        
    </div>
  )
}

export default RenderTotalAmount;