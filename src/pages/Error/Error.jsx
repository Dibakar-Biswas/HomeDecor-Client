import React from 'react';
import errorImg from '../../assets/errorImg.jpeg'
import { Link } from 'react-router';

const Error = () => {
    return (
        <div>
            <div className='flex justify-center h-6/12 p-4 md:max-h-screen'>
                <img src={errorImg} alt="" />
                
            </div>
            <div className="flex justify-center mb-3"><Link to='/' className='btn btn-primary'>Go to Home</Link></div>
        </div>
    );
};

export default Error;