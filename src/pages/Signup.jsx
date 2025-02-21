import React from 'react';
import signupImg from "../assets/Images/signup.webp";
import Template from "../components/core/Auth/Template";

const Signup = () => {
  return (
    <div>
        <Template heading={"Join the millions learning to code with StudyNotion for free"} subHeading1={"Build skills for today, tomorrow, and beyond."} subHeading2={"Education to future-proof your career."} image={signupImg} formType={"Signup"} />
    </div>
  )
}

export default Signup;