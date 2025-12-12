import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import successImg from '../../../../public/success.png'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()

    console.log(sessionId);
    
    useEffect(() => {
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
            .then(res => {
                console.log(res.data);
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                    trackingId: res.data.trackingId
                })
            })
        }
    },[sessionId, axiosSecure])

    return (
        <div className='flex flex-col justify-center items-center bg-cyan-200 rounded-2xl p-4 font-semibold'>
            <p className='text-3xl'>Payment Successful {user.displayName}</p>
            <p>Your TransactionId: {paymentInfo.transactionId}</p>
            <p>Your Decoration TrackingId: {paymentInfo.trackingId}</p>
            <div className="mb-4 mt-2 ">
                <img className='rounded-2xl' src={successImg} alt="" />
            </div>
            <Link to='/' className='btn btn-primary'>Go to Home</Link>
        </div>
    );
};

export default PaymentSuccess;