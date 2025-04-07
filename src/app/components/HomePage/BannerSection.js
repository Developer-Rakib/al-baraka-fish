import Image from 'next/image'
import React from 'react'

function BannerSection() {
    return (
        <div className='flex items-center justify-between text-left py-6 w-[90%] mx-auto'>
            <div className='w-[60%]'>
                <h1 className='text-6xl mb-2 font-extrabold text-[#426B69]'>Hi This is</h1>
                <h1 className='text-4xl text-sky-700 mb-2 '>Al-Baraka Fish</h1>
                <p className='text-4xl font-semibold'>
                    this site is under construction.
                </p>
            </div>
            <div>
                <img src="https://i.ibb.co/KcPSrK85/Screenshot-2025-04-01-at-23-54-04-Google-Maps.png" alt='' />
            </div>

        </div>
    )
}

export default BannerSection
