import React from 'react'
import loginImg from "../assets/Images/login.webp";
import Template from "../components/core/Auth/Template";


const Login = () => {
  return (
    <div>
        <Template heading={"Welcome Back"} subHeading1={"Build skills for today, tomorrow, and beyond."} subHeading2={"Education to future-proof your career."} image={loginImg} formType={"Login"} />
    </div>
  )
}

export default Login;