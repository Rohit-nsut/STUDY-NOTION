import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../connectApi";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
// import rzpLogo from "../../assets/Logo/rzp_logo.png"; 
// import { verifyPayment } from "../../../SERVER/controllers/Payments";

// const RAZORPAY_KEY = "rzp_test_5hKFTLvUZlSapS"
// const RAZORPAY_SECRET = "q6D2OUktmprXwBRerLIWUE2z" 


// const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

const {COURSE_VERIFY_API} = studentEndpoints;


// function loadScript(src) {

//     return new Promise( (resolve) => {
//         const script = document.createElement("script");

//         script.src = src;
 
//         script.onload = () => {
//             resolve(true);
//         }

//         script.onerror = () => {
//             resolve(false);
//         }

//         document.body.appendChild(script);
//     })
// }



export async function buyCourse (token, courses, userDetails, navigate, dispatch) {
    
    const toastId = toast.loading("Processing Purchase...");

    try {
        // Simulate a successful payment response
        const mockResponse = {
            razorpay_order_id: "order_mock_123",
            razorpay_payment_id: "payment_mock_123",
            razorpay_signature: "signature_mock_123"
        };

        console.log("Mock Payment Success");
        
        // Directly call verifyPayment with mock data
        verifyPayment({...mockResponse, courses}, token, navigate, dispatch);

        toast.success("Payment Successful, you are added to the course");
    }
    catch (error) {
        console.log("Payment Error", error);
        toast.error("Could not complete the purchase");
    }

    toast.dismiss(toastId);
}



// export async function buyCourse (token, courses, userDetails, navigate, dispatch) {
    
//     const toastId = toast.loading("Loading");

//     try{

//         const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

//         if(!res) {
//             toast.error("RazorPay SDK failed to load");
//             return ;            
//         }

//         // initiate the order
//         const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {courses}, {
//             Authorization: `Bearer ${token}`,
//         })

//         if(!orderResponse.data.success) {
//             throw new Error(orderResponse.data.message);
//         }

//         console.log("OrderResponse", orderResponse);
//         // options
//         const options = {
//             key: RAZORPAY_KEY,
//             currency: orderResponse.data.message.currency,
//             amount: `${orderResponse.data.message.amount}`,
//             order_id: orderResponse.data.message.id,
//             name: "StudyNotion",
//             description: "Thank You for Purchasing the Course",
//             image: rzpLogo,
//             prefill: {
//                 name: `${userDetails.firstName}`,
//                 email: userDetails.email,
//             },  
//             handler: function(response) {
//                 console.log("paymentsuccessemail");
//                 sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
//                 console.log("verify start")
//                 // verify payment
//                 verifyPayment({...response, courses}, token, navigate, dispatch);
//             }
//         }


//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//         console.log(222222, paymentObject,"key",RAZORPAY_KEY,"");
//         paymentObject.on("payment.Failed", function(response) {
//             toast.error("Oops, payment failed");
//             console.log("error Rohit",response.error);
//         }); 
//         console.log("end",paymentObject);
//     }

//     catch (error) {
//         console.log(1);
//         console.log("Payment API Error", error);
//         toast.error("Could not make Payment");
//     }

//     toast.dismiss(toastId);
// }



// async function sendPaymentSuccessEmail(response, amount, token) {
//     console.log("send")
 
//     try{
//         // console.log(2);
//         await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
//             orderId: response.razorpay_order_id,
//             paymentId:response.razorpay_payment_id,
//             amount,
//         }, {
//             Authorization: `Bearer ${token}`,
//         })
//         // console.log(3,result);
//     }

//     catch (error) {
//         console.log(4);
//         console.log("PAYMENT SUCCESS EMAIL ERROR...", error.message,error);
//     }
// }


//verify Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {

    const toastId = toast.loading("Verifying Payment...");

    dispatch(setPaymentLoading(true));
    console.log('veri')

    try {
        
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Payment Successful, you are added to the course");

        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    } 
    catch (error) {
        
        console.log("PAYMENT VERIFY ERROR...", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}