import React from 'react';

import logo from '../../../public/logo.jpeg'

const Logo = () => {
    return (
        <div className='flex items-end'>
            <img className='h-8 w-8 rounded-xl' src={logo} alt="" />
            <h3 className="text-3xl font-bold"><span className='text-pink-600 ml-1'>Style</span>Decor</h3>
        </div>
    );
};

export default Logo;