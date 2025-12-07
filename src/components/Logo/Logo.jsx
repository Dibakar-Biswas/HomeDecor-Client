import React from 'react';

import logo from '../../../public/logo.jpeg'

const Logo = () => {
    return (
        <div className='flex items-end'>
            <img className='h-8 w-8' src={logo} alt="" />
            <h3 className="text-3xl font-bold">StyleDecor</h3>
        </div>
    );
};

export default Logo;