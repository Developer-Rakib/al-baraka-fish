'use client' // Error boundaries must be Client Components
import Image from "next/image";
import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='text-center mt-32 flex items-center flex-col justify-center'>
            <Image src="/errorImg.svg" alt="Optimized Image" width={350} height={220} />
            <h2 className='text-lg'>Something went wrong!</h2>
            <button
                className='text-blue-600'
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}