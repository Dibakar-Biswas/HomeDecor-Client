import React from 'react';
import { Link } from 'react-router';
import successImg from '../../../../public/success.png'

const PaymentSuccess = () => {
    return (
        <div className='flex flex-col justify-center items-center bg-cyan-200 rounded-2xl p-4'>
            <div className="mb-4 mt-2 ">
                <img className='rounded-2xl' src={successImg} alt="" />
            </div>
            <Link to='/' className='btn btn-primary'>Go to Home</Link>
        </div>
    );
};

export default PaymentSuccess;