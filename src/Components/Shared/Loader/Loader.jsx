import React from 'react';

const Loader = () => {
    return (
        <div className='flex  justify-center items-center w-full min-h-screen'>
            <span className="loading loading-spinner text-[#8FA748] font-extrabold w-8 h-8"></span>
        </div>
    );
};

export default Loader;