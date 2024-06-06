import axios from 'axios';

const FLUTTERWAVE_API_URL = 'https://api.fyndah.com/api/v1/organization/flutterwave/pay';

export const initiatePayment = async (paymentData) => {
    try {
        const response = await axios.post(FLUTTERWAVE_API_URL, paymentData, {
            headers: {
                'Content-Type': 'application/json',
                // Include any other headers your API might require
            },
        });
        return console.log(response.data);
    } catch (error) {
        console.error('Error initiating payment', error);
        throw error;
    }
};