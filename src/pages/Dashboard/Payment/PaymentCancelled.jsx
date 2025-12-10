import React from 'react';
import failedImg from '../../../../public/failed.png'
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className='flex flex-col justify-center items-center bg-red-400 rounded-2xl p-4'>
            <div className="mb-4 mt-2 ">
                <img className='rounded-2xl' src={failedImg} alt="" />
            </div>
            <Link to='/dashboard/my-decorations' className='btn btn-primary'>Try Again</Link>
        </div>
    );
};

export default PaymentCancelled;