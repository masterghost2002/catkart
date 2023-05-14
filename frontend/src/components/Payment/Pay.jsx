import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../../requestMethods';
const Button = styled.button`
    width:100%;
    padding: 10px;
    background-color:black;
    color:white;
    font-weight:600;
    border:none;
    border-radius:6px;
    cursor:pointer;
`
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
export default function Pay() {
    const cart = useSelector((state)=>state.cart);
    const navigate = useNavigate();
    // console.log(cart);
    const [isLoading, setIsLoading] = useState(false);
    async function displayRazorpay() {
        setIsLoading(true);
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const result = await axios.post(`${BASE_URL}/checkout/payment`, {amount: cart.total});
        
        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
        setIsLoading(false);
        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;
        
        const options = {
            key: "rzp_test_HyEy1Cwhwl7xm4", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Cat Kart",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                
                const result = await axios.post(`${BASE_URL}/payment/success`, data);
                
                navigate('/success');
                console.log(result);
            },
            notes: {
                address: "Cat Cart",
            },
            theme: {
                color: "#008080",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }


    return (
        <Button className="App-link" onClick={displayRazorpay}>
           {isLoading?"Loading...":`Pay ₹ ${cart.total}`}
        </Button>
    )
}
