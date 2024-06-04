// import axios from "axios"
import { useState } from "react";
import { initiatePayment } from "./FlutterwaveConfig";



function Flutterwave() {
    const txRef = new Date().getTime().toString();

    const [paymentData, setPaymentData] = useState({
        // Define your payment data structure
        tx_ref: { txRef },
        amount: 10000,
        currency: 'NGN',
        payment_method: 'card, ussd, account',
        customer: {
            email: 'test@example.com',
            phone: '123',
            name: 'John Doe',
        },
        // Add other required fields
    });

    const handlePayment = async () => {
        try {
            const result = await initiatePayment(paymentData);
            console.log('Payment initiated successfully:', result);
            // Handle the successful payment initiation
        } catch (error) {
            console.error('Error initiating payment:', error);
            // Handle the error
        }
    };

    return (
        <div>
            <button onClick={handlePayment}>payment</button>
        </div>
    )
}

export default Flutterwave