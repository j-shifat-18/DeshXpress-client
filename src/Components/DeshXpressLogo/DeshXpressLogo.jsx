import React from 'react';
import logo from '../../assets/images/logo.png'

const DeshXpressLogo = () => {
    return (
        <div className='flex items-end'>
            <img className='mb-2' src={logo} alt="" />
            <p className='text-3xl font-extrabold -ml-2'>DeshXpress</p>
        </div>
    );
};

export default DeshXpressLogo;